import React, { useEffect, useState } from "react";
//import component
import SectionContainer from "../../../../components/container";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CommonButton from "../../../../components/button/commonbutton";
//import image
import earningNode from "../../../../assets/img/node/earning-node.png";
import staking_contract from "../../../../utils/contracts/staking_contract";
import node_manager_contract from "../../../../utils/contracts/node_manager_contract";
import { useAccount, useReadContract } from "wagmi";
import {
  getBalance,
  writeContract,
  waitForTransactionReceipt,
  getChainId,
  getChains,
  readContract,
  getGasPrice,
} from "@wagmi/core";
import { config } from "../../../../components/wallets/config";
import useInterval from "../../../../hooks/useInterval";
import {
  convertAndDivide,
  formatNumDynDecimal,
  formatTokenBalance,
} from "../../../../utils";
import MessageBox from "../../../../components/message/messageBox";
import { FAIURE, PENDING } from "../../../../utils/mesages";
import { useModal } from "../../../../contexts/useModal";
import { taikoHeklaClient } from "../../../../components/wallets/viemConfig";
import { parseGwei, parseEther, parseUnits } from "viem";

const stakingContract = {
  address: staking_contract.CONTRACT_ADDRESS,
  abi: staking_contract.CONTRACT_ABI,
};
const nodeManagerContract = {
  address: node_manager_contract.CONTRACT_ADDRESS,
  abi: node_manager_contract.CONTRACT_ABI,
};
const Earning = () => {
  const [tab, setTab] = useState(0);
  const [taikoAmount, setTaikoAmount] = useState(0);
  const [bachiAmount, setBachiAmount] = useState(0);
  const chains = getChains(config);
  const chainId = getChainId(config);
  const currentChain = chains.find((chain) => chain.id === chainId);
  const { address } = useAccount();
  const chainDecimal = currentChain?.nativeCurrency?.decimals;
  const chainSymbol = currentChain?.nativeCurrency?.symbol;
  //
  const [firstNodeId, setFirstNodeId] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const { setConnectWalletModalVisible } = useModal();
  const onOpenConnectWalletModal = () => setConnectWalletModalVisible(true);
  const getFirstNodeId = async () => {
    const totalNode = await readContract(config, {
      ...nodeManagerContract,
      functionName: "getUserTotalNode",
      args: [address],
    });
    if (Number(totalNode) > 0) {
      const nodeId = await readContract(config, {
        ...nodeManagerContract,
        functionName: "getNodeIdByIndex",
        args: [address, 0],
      });
      setFirstNodeId(Number(nodeId));
    }
  };

  useEffect(() => {
    address && getFirstNodeId();
  }, [address]);
  //
  const getFarmAmounts = async () => {
    const farmAmounts = await readContract(config, {
      ...stakingContract,
      functionName: "getRewardAmountsIncremental",
      args: [[firstNodeId]],
    });

    setBachiAmount(Number(farmAmounts[0]));
    setTaikoAmount(Number(farmAmounts[1]));
  };

  const [taikoClaimedAmount, setTaikoClaimedAmount] = useState(0);
  const [bachiClaimedAmount, setBachiClaimedAmount] = useState(0);
  const getClaimedAmount = async () => {
    const claimedAmounts = await readContract(config, {
      ...stakingContract,
      functionName: "rewardClaimedInfors",
      args: [address],
    });

    console.log({ claimedAmounts });
    setTaikoClaimedAmount(Number(claimedAmounts[1]));
    setBachiClaimedAmount(Number(claimedAmounts[0]));
  };

  const { data: nodeData } = useReadContract({
    ...nodeManagerContract,
    functionName: "nodeTiers",
    args: [firstNodeId],
  });

  useEffect(() => {
    address && getClaimedAmount();
  }, [address]);

  useInterval(() => {
    address && getFarmAmounts();
  }, 3000);

  const mining = [
    {
      name: "Taiko",
      speed: nodeData ? Number(nodeData[3]) : 0,
      level: "1",
      amount: formatTokenBalance(
        convertAndDivide(taikoAmount, chainDecimal),
        6
      ),
    },
    {
      name: "Bachi",
      speed: nodeData ? Number(nodeData[3]) : 0,
      level: "1",
      amount: formatTokenBalance(
        convertAndDivide(bachiAmount, chainDecimal),
        6
      ),
    },
  ];

  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [txHash, setTxHash] = useState("");
  const handleCloseMessage = () => {
    setIsLoading(false);
    setStatus(null);
  };

  const handleClaim = async () => {
    setDisabled(true);
    let claimMode = 0;
    if (mining[tab].name == "Taiko") {
      claimMode = 1;
    } else claimMode = 0;
    const balance = await getBalance(config, {
      address: address,
    });
    if (!address) {
      setMessage("You not connected wallet");
      setStatus("failure");
      setIsLoading(true);
      setDisabled(false);
      return;
    }

    if (claimMode == 0) {
      const bachiMinClaimAmount = await readContract(config, {
        ...stakingContract,
        functionName: "bachiMinClaimAmount",
      });
      if (Number(bachiMinClaimAmount) > bachiAmount) {
        setMessage("The minimum quantity has not been reached");
        setStatus("failure");
        setIsLoading(true);
        setDisabled(false);
        return;
      }
    } else {
      const [taikoMinClaimAmount, stakingContractBalance] = await Promise.all([
        readContract(config, {
          ...stakingContract,
          functionName: "taikoMinClaimAmount",
        }),
        getBalance(config, {
          address: stakingContract.address,
        }),
      ]);

      if (Number(taikoMinClaimAmount) > taikoAmount) {
        setMessage("The minimum quantity has not been reached");
        setStatus("failure");
        setIsLoading(true);
        setDisabled(false);
        return;
      }
      if (Number(stakingContractBalance.formatted) < taikoAmount) {
        setMessage("Not enough balance");
        setStatus("failure");
        setIsLoading(true);
        setDisabled(false);
        return;
      }
    }
    const txObj = {
      ...stakingContract,
      functionName: "claimAllRewards",
      args: [[Number(firstNodeId)], claimMode],
    };
    const [gasPrice, gasLimit] = await Promise.all([
      getGasPrice(config),
      taikoHeklaClient.estimateContractGas({
        ...txObj,
        account: address,
      }),
    ]);

    const gasFeeToEther = Number(gasLimit * gasPrice) / 10 ** chainDecimal;

    if (Number(balance.formatted) < gasFeeToEther) {
      setMessage("Not enough balance");
      setStatus("failure");
      setIsLoading(true);
      setDisabled(false);
      return;
    }

    setMessage(PENDING.txAwait);
    setStatus(null);
    setIsLoading(true);
    try {
      const hash = await writeContract(config, {
        ...txObj,
      });
      if (hash) {
        console.log({ hash });
        setTxHash(hash);
        const result = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        if (result?.status == "success") {
          getClaimedAmount();
          setMessage("Claim successful");
          setStatus("success");
          setIsLoading(true);
          setDisabled(false);
          return;
        } else {
          setMessage(FAIURE.txFalure);
          setStatus("failure");
          setIsLoading(true);
          setDisabled(false);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      setMessage(FAIURE.txFalure);
      setStatus("failure");
      setIsLoading(true);
      setDisabled(false);
    }
  };

  return (
    <>
      <SectionContainer padding={"0px"}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          paddingTop={{ base: "60px", "2xl": "108px" }}
        >
          <CommonButton
            marginBottom={"34px"}
            padding={"37px 35px 34px 35px"}
            border="0.5px solid var(--color-main) !important"
            width={{ base: "100%", "2xl": "40%" }}
          >
            <Flex flexDirection={"column"}>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={{ base: "15px", "2xl": "30px" }}
              >
                <Text
                  fontSize={{ base: "24px", "2xl": "40px" }}
                  fontWeight={400}
                  fontFamily="var(--font-text-extra)"
                  color="var(--color-main)"
                >
                  BACHI Balance
                </Text>
                <CommonButton
                  backgroundColor="var(--color-main)"
                  padding={"16px 30px 15px 30px"}
                >
                  <Text
                    fontSize={{ base: "18px", "2xl": "24px" }}
                    fontWeight={400}
                  >
                    Withdraw
                  </Text>
                </CommonButton>
              </Flex>
              <Text fontSize={{ base: "24px", "2xl": "40px" }} fontWeight={700}>
                {formatTokenBalance(
                  convertAndDivide(bachiClaimedAmount, chainDecimal)
                )}
              </Text>
            </Flex>
          </CommonButton>
          <CommonButton
            marginBottom={"42px"}
            padding={"37px 35px 34px 35px"}
            border="0.5px solid var(--color-main)"
            width={{ base: "100%", "2xl": "40%" }}
          >
            <Flex flexDirection={"column"}>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={{ base: "15px", "2xl": "30px" }}
              >
                <Text
                  fontSize={{ base: "24px", "2xl": "40px" }}
                  fontWeight={400}
                  fontFamily="var(--font-text-extra)"
                  color="var(--color-main)"
                >
                  TAIKO Balance
                </Text>
                <CommonButton
                  backgroundColor="var(--color-main)"
                  padding={"16px 30px 15px 30px"}
                >
                  <Text
                    fontSize={{ base: "18px", "2xl": "24px" }}
                    fontWeight={400}
                  >
                    Withdraw
                  </Text>
                </CommonButton>
              </Flex>
              <Text fontSize={{ base: "24px", "2xl": "40px" }} fontWeight={700}>
                {formatTokenBalance(
                  convertAndDivide(taikoClaimedAmount, chainDecimal)
                )}
              </Text>
            </Flex>
          </CommonButton>
          <Box
            border="0.5px solid #FCDDEC"
            width={{ base: "100%", "2xl": "40%" }}
            backgroundColor="var(--color-background-popup)"
            sx={{
              backdropFilter: "blur(10px) !important",
              clipPath:
                "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
              "::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "20px",
                height: "20px",
                backgroundColor: "#FCDDEC",
                clipPath: "polygon(0 100%, 100% 0, 0 0)",
              },
              "::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "20px",
                height: "20px",
                backgroundColor: "#FCDDEC",
                clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
              },
            }}
          >
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              padding={{
                base: "18px 21px 28px 19px",
                "2xl": "43px 41px 48px 41px",
              }}
            >
              <CommonButton
                display={"flex"}
                alignItems={"center"}
                width="100%"
                justifyContent={"space-around"}
                padding={"10px 12px 10px 12px"}
                backgroundColor={"#5D1D4C"}
              >
                <Box
                  cursor={"pointer"}
                  sx={{
                    backdropFilter: "blur(10px) !important",
                    clipPath:
                      "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                    "::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "20px",
                      height: "20px",
                      backgroundColor: "none",
                      clipPath: "polygon(0 100%, 100% 0, 0 0)",
                    },
                    "::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "20px",
                      height: "20px",
                      backgroundColor: "none",
                      clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                    },
                  }}
                  backgroundColor={tab == 0 ? "var(--color-main)" : ""}
                  padding={"10px 20px 10px 20px"}
                  onClick={() => setTab(0)}
                >
                  <Text
                    fontSize={{ base: "16px", "2xl": "24px" }}
                    fontWeight={400}
                  >
                    TAIKO Mining
                  </Text>
                </Box>
                <Box
                  cursor={"pointer"}
                  sx={{
                    backdropFilter: "blur(10px) !important",
                    clipPath:
                      "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                    "::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "20px",
                      height: "20px",
                      backgroundColor: "none",
                      clipPath: "polygon(0 100%, 100% 0, 0 0)",
                    },
                    "::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "20px",
                      height: "20px",
                      backgroundColor: "none",
                      clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                    },
                  }}
                  padding={"10px 20px 10px 20px"}
                  border="none"
                  backgroundColor={tab == 1 ? "var(--color-main)" : ""}
                  onClick={() => setTab(1)}
                >
                  <Text
                    color={"#000"}
                    fontSize={{ base: "16px", "2xl": "24px" }}
                    fontWeight={400}
                  >
                    BACHI Mining
                  </Text>
                </Box>
              </CommonButton>
              <Image src={earningNode} />
              <Text fontSize={{ base: "32px", "2xl": "40px" }} fontWeight={700}>
                {mining[tab].amount} {mining[tab].name}
              </Text>
              <Text
                fontSize={{ base: "16px", "2xl": "24px" }}
                fontWeight={500}
                color="var(--color-main)"
                marginBottom={"61px"}
              >
                Level {mining[tab].level}: {mining[tab].speed} GH/s
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={"10px"}
                width={"100%"}
              >
                <CommonButton
                  backgroundColor="#FFF"
                  width={"50%"}
                  display={"flex"}
                  justifyContent={"center"}
                  paddingTop={"10px"}
                  paddingBottom={"10px"}
                >
                  <Text
                    color={"#000"}
                    fontSize={{ base: "16px", "2xl": "24px" }}
                    fontWeight={500}
                  >
                    Upgrade miner
                  </Text>
                </CommonButton>
                <CommonButton
                  backgroundColor={disabled ? "#B51F66" : "var(--color-main)"}
                  width={"50%"}
                  display={"flex"}
                  justifyContent={"center"}
                  paddingTop={"10px"}
                  paddingBottom={"10px"}
                  onClick={address ? handleClaim : onOpenConnectWalletModal}
                  isDisabled={disabled}
                >
                  <Text
                    fontSize={{ base: "16px", "2xl": "24px" }}
                    fontWeight={500}
                  >
                    {address ? "Claim" : "CONNECT WALLET NOW"}
                  </Text>
                </CommonButton>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </SectionContainer>

      {/* Message */}
      <MessageBox
        isLoading={isLoading}
        status={status}
        message={message}
        handleCloseMessage={handleCloseMessage}
        txHash={txHash}
      />
    </>
  );
};

export default Earning;
