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
  getTransaction,
  getTransactionReceipt,
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
import { getUserIpAddress } from "../../../../utils";
import { useModal } from "../../../../contexts/useModal";
import { taikoHeklaClient } from "../../../../components/wallets/viemConfig";
import { parseGwei, parseEther, parseUnits } from "viem";
import MainButton from "../../../../components/button/MainButton";
import { base } from "viem/chains";
import { clientAPI } from "../../../../api/client";

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
  }, 2000);

  const mining = [
    {
      name: "Taiko",
      speed: nodeData ? Number(nodeData[3]) : 0,
      level: "1",
      amount: formatTokenBalance(
        convertAndDivide(taikoAmount, chainDecimal),
        7
      ),
      farmSpeed: formatTokenBalance(
        convertAndDivide(nodeData ? Number(nodeData[5]) : 0, chainDecimal),
        12
      ),
    },
    {
      name: "Bachi",
      speed: nodeData ? Number(nodeData[3]) : 0,
      level: "1",
      amount: formatTokenBalance(
        convertAndDivide(bachiAmount, chainDecimal),
        7
      ),
      farmSpeed: formatTokenBalance(
        convertAndDivide(nodeData ? Number(nodeData[5]) : 0, chainDecimal),
        12
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
    const ipAddress = await getUserIpAddress();
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
        const status = await getTransactionStatus(config, hash);
        await clientAPI("post", "/api/transaction/create-transaction", {
          chainId: chainId,
          hash: hash,
          type: txObj.functionName,
          ipAddress: ipAddress,
          status: status,
        });
        const result = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        if (result?.status == "success") {
          getClaimedAmount();
          const status = await getTransactionStatus(config, hash);
          await clientAPI("post", "/api/transaction/update-transaction", {
            hash: hash,
            status: status,
          });
          setMessage("Claim successful");
          setStatus("success");
          setIsLoading(true);
          setDisabled(false);
          return;
        } else {
          const status = await getTransactionStatus(config, hash);
          await clientAPI("post", "/api/transaction/update-transaction", {
            hash: hash,
            status: status,
          });
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

  const getTransactionStatus = async (config, hash) => {
    let status;
    const transaction = await getTransaction(config, {
      hash: hash,
    });
    if (transaction.blockNumber === null) {
      status = "pending";
    } else {
      const receipt = await getTransactionReceipt(config, {
        hash: hash,
      });
      status = receipt.status;
    }
    return status;
  };
  return (
    <>
      <SectionContainer padding={"0px"}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          paddingTop={{ base: "60px", "2xl": "108px" }}
        >
          <Flex
            w={"100%"}
            direction={{ base: "column", md: "row" }}
            gap={{ base: "36px", md: "24px" }}
            paddingBottom={{ base: "40px", md: "48px" }}
          >
            <CommonButton
              padding={"37px 35px 34px 35px"}
              boxShadow={"inset 0 0 10px var(--color-main)"}
              border="0.5px solid var(--color-main)"
              width={{
                base: "100%",
                sm: "100%",
                md: "70%",
                xl: "50%",
                "2xl": "40%",
              }}
            >
              <Flex flexDirection={"column"} gap={"24px"}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={{ base: "15px", md: "30px" }}
                >
                  <Text
                    fontWeight={400}
                    fontFamily="var(--font-text-extra)"
                    color="var(--color-main)"
                    fontSize={{ base: "24px", sm: "48px" }}
                  >
                    BACHI Balance
                  </Text>
                  <MainButton
                    backgroundColor="var(--color-main)"
                    padding={{
                      base: "16px 36px",
                      xl: "16px 30px 15px 30px",
                    }}
                    color="white"
                    borderRadius={"8px !important"}
                  >
                    <Text
                      fontSize={{ base: "18px", "2xl": "24px" }}
                      fontWeight={400}
                      fontFamily={"var(--font-text-main)"}
                    >
                      Withdraw
                    </Text>
                  </MainButton>
                </Flex>
                <Text
                  fontSize={{ base: "24px", sm: "48px" }}
                  fontWeight={700}
                  fontFamily={"var(--font-heading)"}
                >
                  {formatTokenBalance(
                    convertAndDivide(bachiClaimedAmount, chainDecimal)
                  )}
                </Text>
              </Flex>
            </CommonButton>
            <CommonButton
              padding={"37px 35px 34px 35px"}
              border="0.5px solid var(--color-main)"
              boxShadow={"inset 0 0 10px var(--color-main)"}
              width={{
                base: "100%",
                sm: "100%",
                md: "70%",
                xl: "50%",
                "2xl": "40%",
              }}
            >
              <Flex flexDirection={"column"} gap={"24px"}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={{ base: "15px", "2xl": "30px" }}
                >
                  <Text
                    fontSize={{ base: "24px", sm: "48px" }}
                    fontWeight={400}
                    fontFamily="var(--font-text-extra)"
                    color="var(--color-main)"
                  >
                    TAIKO Balance
                  </Text>
                  <MainButton
                    backgroundColor="var(--color-main)"
                    padding={{
                      base: "16px 36px",
                      xl: "16px 30px 15px 30px",
                    }}
                    color="white"
                    borderRadius={"8px !important"}
                  >
                    <Text
                      fontSize={{ base: "18px", "2xl": "24px" }}
                      fontWeight={400}
                      fontFamily={"var(--font-text-main)"}
                    >
                      Withdraw
                    </Text>
                  </MainButton>
                </Flex>
                <Text
                  fontSize={{ base: "24px", sm: "48px" }}
                  fontWeight={700}
                  fontFamily={"var(--font-heading)"}
                >
                  {formatTokenBalance(
                    convertAndDivide(taikoClaimedAmount, chainDecimal)
                  )}
                </Text>
              </Flex>
            </CommonButton>
          </Flex>
          <Box
            border="0.5px solid #FCDDEC"
            width={{
              base: "100%",
            }}
            backgroundColor="var(--color-background-footer)"
            sx={{
              backdropFilter: "blur(10px) !important",
              clipPath:
                "polygon(0 50px, 50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%)",
              "::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "50px",
                height: "50px",
                backgroundColor: "#FCDDEC",
                clipPath: "polygon(0 100%, 100% 0, 0 0)",
              },
              "::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "50px",
                height: "50px",
                backgroundColor: "#FCDDEC",
                clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
              },
            }}
          >
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              padding={{
                base: "40px 24px",
                md: "64px 48px",
              }}
              gap={"16px"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                width="100%"
                justifyContent={"space-around"}
                gap={"16px"}
              >
                <MainButton
                  width={"100%"}
                  backgroundColor={tab == 0 ? "var(--color-main)" : "#FCDDEC"}
                  color={tab == 0 ? "#FFF" : "#040926"}
                  padding={{
                    base: "36px 16px",
                  }}
                  onClick={() => setTab(0)}
                  height={{ base: "44px", md: "54px" }}
                >
                  <Text
                    fontSize={{ base: "20px !important", sm: "24px" }}
                    fontWeight={400}
                    textAlign={"center"}
                    fontFamily={"var(--font-text-main)"}
                  >
                    TAIKO Mining
                  </Text>
                </MainButton>
                <MainButton
                  width={"100%"}
                  padding={{
                    base: "36px 16px",
                  }}
                  backgroundColor={tab == 1 ? "var(--color-main)" : "#FCDDEC"}
                  color={tab == 1 ? "#FFF" : "#040926"}
                  onClick={() => setTab(1)}
                  height={{ base: "44px", md: "54px" }}
                >
                  <Text
                    fontSize={{ base: "20px !important", sm: "24px" }}
                    fontWeight={400}
                    textAlign={"center"}
                    fontFamily={"var(--font-text-main)"}
                  >
                    BACHI Mining
                  </Text>
                </MainButton>
              </Box>
              <Image src={earningNode} w={{ base: "224px", md: "596px" }} />
              <Text
                fontSize={{ base: "20px", md: "48px" }}
                fontWeight={700}
                fontFamily={"var(--font-heading)"}
                color="var(--color-main)"
              >
                {mining[tab].amount} {mining[tab].name}
              </Text>
              <Text
                fontSize={{ base: "16px", md: "32px" }}
                fontWeight={500}
                fontFamily={"var(--font-text-main)"}
              >
                Level {mining[tab].level}: {mining[tab].speed} GH/s
              </Text>
              <Text
                fontSize={{ base: "16px", md: "32px" }}
                fontWeight={500}
                fontFamily={"var(--font-text-main)"}
              >
                Speed: {mining[tab].farmSpeed}
              </Text>
              <Flex
                mt={"48px"}
                alignItems={"stretch"}
                justifyContent={"space-between"}
                gap={"10px"}
                width={"100%"}
              >
                <MainButton
                  backgroundColor="#FCDDEC"
                  width={"50%"}
                  display={"flex"}
                  justifyContent={"center"}
                  padding="16px 36px"
                  height={{ base: "54px", md: "88px" }}
                >
                  <Flex alignItems={"center"}>
                    <Text
                      color={"#000"}
                      fontSize={{ base: "24px" }}
                      fontWeight={500}
                      fontFamily={"var(--font-text-main)"}
                    >
                      Upgrade miner
                    </Text>
                  </Flex>
                </MainButton>
                <MainButton
                  backgroundColor={disabled ? "#B51F66" : "var(--color-main)"}
                  width={"50%"}
                  display={"flex"}
                  justifyContent={"center"}
                  padding="16px 36px"
                  height={{ base: "54px", md: "88px" }}
                  onClick={address ? handleClaim : onOpenConnectWalletModal}
                  isDisabled={disabled}
                >
                  <Text
                    textAlign={"center"}
                    fontSize={{ base: "24px" }}
                    fontWeight={400}
                    color={"white"}
                    fontFamily={"var(--font-text-main)"}
                  >
                    {address ? "Claim" : "CONNECT WALLET NOW"}
                  </Text>
                </MainButton>
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
