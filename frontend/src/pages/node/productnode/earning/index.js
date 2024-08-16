import React, { useEffect, useState } from "react";
//import component
import { SpriteAnimator } from "react-sprite-animator";
import earninganimation from "../../../../assets/img/animation/test.png";
import animation from "../../../../assets/img/animation/image-animation.gif";
import SectionContainer from "../../../../components/container";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
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

import { clientAPI } from "../../../../api/client";
import productCoreI5 from "../../../../assets/img/node/product-corei5.png";
import productCoreI7 from "../../../../assets/img/node/product-corei7.png";
import productCoreI9 from "../../../../assets/img/node/product-corei9.png";
import iconPower from "../../../../assets/img/node/icon-node-power.png";
import { useDispatch } from "react-redux";
import {
  selectBillNode,
  setCaller,
  setMessage,
  setNodeId,
  setPrice,
  setQty,
} from "../../../../store/slices/billNodeSlice";
import { base } from "viem/chains";
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
  const [nodeTiersId, setNodeTiersId] = useState(1);
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
      if (nodeId) {
        const nodeTiersId = await readContract(config, {
          ...nodeManagerContract,
          functionName: "nodeIdNodeTiersIdLinks",
          args: [nodeId],
        });
        setNodeTiersId(Number(nodeTiersId));
      }

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
    args: [nodeTiersId],
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
        convertAndDivide(nodeData ? Number(nodeData[4]) : 0, chainDecimal),
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
          caller: address,
          chainId: chainId,
          hash: hash,
          type: "Claim reward",
          ipAddress: ipAddress,
          status: status,
        });
        const result = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        if (result?.status == "success") {
          const status = await getTransactionStatus(config, hash);
          await clientAPI("post", "/api/transaction/update-transaction", {
            hash: hash,
            status: status,
          });
          setMessage("Claim successful");
          setStatus("success");
          setIsLoading(true);
          setDisabled(false);
          await getClaimedAmount();
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
      return;
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
  /****Node free ******/
  const dispatch = useDispatch();
  const products = [
    {
      tierId: 0,
      nameproduct: "Free Mint",
      power: null,
    },
    {
      tierId: 1,
      nameproduct: "Core i5",
      image: productCoreI5,
      power: "10 GH/s",
      reward: "50.000",
    },
    {
      tierId: 2,
      nameproduct: "Core i7",
      image: productCoreI7,
      power: "100 GH/s",
      reward: "100.000",
    },
    {
      tierId: 3,
      nameproduct: "Core i9",
      image: productCoreI9,
      power: "1000 GH/s",
      reward: "150.000",
    },
  ];
  const [selectProduct, setselectProduct] = useState(products[0]);
  const handleProductSelect = (products) => {
    setselectProduct(products);
    dispatch(setNodeId(products.tierId));
  };
  return (
    <>
      <SectionContainer padding={"0px"}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          paddingTop={{ base: "28px", "2xl": "108px" }}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            w={"100%"}
            direction={{ base: "column", md: "row" }}
            gap={{ base: "16px", md: "16px" }}
            paddingBottom={{ base: "40px", md: "48px" }}
          >
            <Box
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
                  backgroundColor: "pink.500",
                  clipPath: "polygon(0 100%, 100% 0, 0 0)",
                },
                "::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "20px",
                  height: "20px",
                  backgroundColor: "pink.500",
                  clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                },
                "@media (max-width: 768px)": {
                  clipPath:
                    "polygon(0 30px, 30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                  "::before": {
                    width: "30px",
                    height: "30px",
                    backgroundColor: "pink.500",
                  },
                  "::after": {
                    width: "30px",
                    height: "30px",
                    backgroundColor: "pink.500",
                  },
                },
              }}
              padding={{
                base: "24px 24px 21.76px 24px",
                lg: "24px 28px 32px 32px",
                "3xl": "40px 40px 56px 68px",
              }}
              boxShadow={"inset 0 0 10px var(--color-main)"}
              border="0.5px solid var(--color-main)"
              // width={{
              //   base: "100%",
              //   sm: "100%",
              //   md: "50%",
              //   xl: "50%",
              //   "2xl": "50%",
              // }}
            >
              <Flex
                height={"100%"}
                flexDirection={"column"}
                gap={"24px"}
                justifyContent={"space-between"}
              >
                <Flex
                  alignItems={"start"}
                  justifyContent={"space-between"}
                  gap={{ base: "15px", md: "30px" }}
                >
                  <Text
                    fontWeight={400}
                    fontFamily="var(--font-text-extra)"
                    color="var(--color-main)"
                    fontSize={{ base: "24px", xl: "32px", "3xl": "50px" }}
                  >
                    BACHI Balance
                  </Text>
                  <MainButton
                    height={{ base: "44px", xl: "64px", "3xl": "80px" }}
                    backgroundColor="var(--color-main)"
                    padding={{
                      base: "16px 36px",
                      xl: "16px 36px 16px 36px",
                    }}
                    color="white"
                    borderRadius={"8px !important"}
                  >
                    <Text
                      fontSize={{ base: "18px", "2xl": "24px", "3xl": "32px" }}
                      fontWeight={400}
                      fontFamily={"var(--font-text-main)"}
                    >
                      Withdraw
                    </Text>
                  </MainButton>
                </Flex>
                <Text
                  lineHeight={{ base: "32px" }}
                  fontSize={{ base: "24px", lg: "32px", "3xl": "72px" }}
                  fontWeight={700}
                  fontFamily={"var(--font-text-main)"}
                >
                  {formatTokenBalance(
                    convertAndDivide(bachiClaimedAmount, chainDecimal)
                  )}
                </Text>
              </Flex>
            </Box>

            <Box
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
                  backgroundColor: "pink.500",
                  clipPath: "polygon(0 100%, 100% 0, 0 0)",
                },
                "::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "20px",
                  height: "20px",
                  backgroundColor: "pink.500",
                  clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                },
                "@media (max-width: 768px)": {
                  clipPath:
                    "polygon(0 30px, 30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                  "::before": {
                    width: "30px",
                    height: "30px",
                    backgroundColor: "pink.500",
                  },
                  "::after": {
                    width: "30px",
                    height: "30px",
                    backgroundColor: "pink.500",
                  },
                },
              }}
              padding={{
                base: "24px 24px 21.76px 24px",
                lg: "24px 28px 32px 32px",
                "3xl": "40px 40px 56px 68px",
              }}
              border="0.5px solid var(--color-main)"
              boxShadow={"inset 0 0 10px var(--color-main)"}
              // width={{
              //   base: "100%",
              //   sm: "100%",
              //   md: "50%",
              //   xl: "50%",
              //   "2xl": "50%",
              // }}
            >
              <Flex
                height={"100%"}
                flexDirection={"column"}
                gap={"24px"}
                justifyContent={"space-between"}
              >
                <Flex
                  alignItems={"start"}
                  justifyContent={"space-between"}
                  gap={{ base: "15px", "2xl": "30px" }}
                >
                  <Text
                    fontSize={{ base: "24px", xl: "32px", "3xl": "50px" }}
                    fontWeight={400}
                    fontFamily="var(--font-text-extra)"
                    color="var(--color-main)"
                  >
                    TAIKO Balance
                  </Text>
                  <MainButton
                    height={{ base: "44px", xl: "64px", "3xl": "80px" }}
                    backgroundColor="var(--color-main)"
                    padding={{
                      base: "16px 36px",
                      xl: "16px 36px 16px 36px",
                    }}
                    color="white"
                    borderRadius={"8px !important"}
                  >
                    <Text
                      fontSize={{ base: "18px", "2xl": "24px", "3xl": "32px" }}
                      fontWeight={400}
                      fontFamily={"var(--font-text-main)"}
                    >
                      Withdraw
                    </Text>
                  </MainButton>
                </Flex>
                <Text
                  lineHeight={{ base: "32px" }}
                  fontSize={{ base: "24px", lg: "32px", "3xl": "72px" }}
                  fontWeight={700}
                  fontFamily={"var(--font-text-main)"}
                >
                  {formatTokenBalance(
                    convertAndDivide(taikoClaimedAmount, chainDecimal)
                  )}
                </Text>
              </Flex>
            </Box>
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, md: 2, "2xl": 4 }}
            width={"100%"}
            gap={{ base: "16px" }}
            flexDirection={{ base: "column", md: "row" }}
            paddingBottom={{ base: "24px", xl: "48px", "3xl": "64px" }}
            alignItems={"stretch"}
          >
            {products.map((products) => (
              <Box
                flex={"1"}
                key={products.tierId}
                width={"100%"}
                onClick={() => handleProductSelect(products)}
                sx={{
                  backdropFilter: "blur(10px) !important",
                  backgroundColor:
                    selectProduct?.tierId === products.tierId
                      ? "var(--color-main)"
                      : "transparent",
                  clipPath:
                    "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                  "::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "20px",
                    height: "20px",
                    backgroundColor: "pink.500",
                    clipPath: "polygon(0 100%, 100% 0, 0 0)",
                  },
                  "::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "20px",
                    height: "20px",
                    backgroundColor: "pink.500",
                    clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                  },
                  "@media (max-width: 768px)": {
                    clipPath:
                      "polygon(0 30px, 30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                    "::before": {
                      width: "30px",
                      height: "30px",
                      backgroundColor: "pink.500",
                    },
                    "::after": {
                      width: "30px",
                      height: "30px",
                      backgroundColor: "pink.500",
                    },
                  },
                }}
              >
                <Box
                  height={"100%"}
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
                      backgroundColor: "pink.500",
                      clipPath: "polygon(0 100%, 100% 0, 0 0)",
                    },
                    "::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "20px",
                      height: "20px",
                      backgroundColor: "pink.500",
                      clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                    },
                    "@media (max-width: 768px)": {
                      clipPath:
                        "polygon(0 30px, 30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                      "::before": {
                        width: "30px",
                        height: "30px",
                        backgroundColor: "pink.500",
                      },
                      "::after": {
                        width: "30px",
                        height: "30px",
                        backgroundColor: "pink.500",
                      },
                    },
                  }}
                  backgroundColor={"rgba(27, 27, 27, 0.20)"}
                  boxShadow={"inset 0 0 10px var(--color-main)"}
                  border="0.5px solid var(--color-main)"
                  position="relative"
                  zIndex="10"
                >
                  <Flex
                    height={"100%"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    padding={{
                      base: "16px 36px",
                      "3xl": "24px 40px 32px 40px",
                    }}
                    justifyContent={"space-between"}
                    gap={{ base: "16px" }}
                  >
                    <Flex
                      width={"100%"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Flex
                        justifyContent={"space-around"}
                        height={"100%"}
                        width={"100%"}
                        flexDirection={"column"}
                        alignItems={{
                          base: "start",
                        }}
                        gap={{ base: "10px", "3xl": "24px" }}
                      >
                        <Text
                          fontSize={{
                            base: "32px",
                            "2xl": "30px",
                            "3xl": "48px",
                          }}
                          fontWeight={700}
                          fontFamily={{
                            base: "var(--font-text-main)",
                            md: "var(--font-heading)",
                          }}
                        >
                          {products.nameproduct}
                        </Text>
                        <Flex alignItems={"center"} gap={"16px"}>
                          <Text
                            letterSpacing={"-1px"}
                            fontSize={{
                              base: "24px",
                              "2xl": "18px",
                              "3xl": "30px",
                            }}
                            fontWeight={400}
                            fontFamily={{
                              base: "var(--font-text-main)",
                              md: "var(--font-heading)",
                            }}
                          >
                            {products.power}
                          </Text>
                          {products?.power && (
                            <Image
                              src={iconPower}
                              paddingTop={"5px"}
                              height={{ base: "25px" }}
                            />
                          )}
                        </Flex>
                      </Flex>
                      <Image
                        src={products.image}
                        height={{
                          base: "96px",
                          md: "100px",
                          lg: "96px",
                          xl: "120px",
                          "2xl": "88px",
                          "3xl": "128px",
                        }}
                      />
                    </Flex>
                    <MainButton
                      height={{ base: "", lg: "40px", "3xl": "56px" }}
                      width={"100%"}
                      backgroundColor="var(--color-main)"
                      color="#FFF"
                    >
                      <Text
                        fontFamily="var(--font-text-main)"
                        fontSize={{ base: "", lg: "16px" }}
                      >
                        Start Earning
                      </Text>
                    </MainButton>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
          <Box
            border="0.5px solid #FCDDEC"
            width={{
              base: "100%",
            }}
            backgroundColor="var(--color-background-footer)"
            sx={{
              backdropFilter: "blur(10px) !important",
              clipPath:
                "polygon(0 30px, 30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
              "::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "30px",
                height: "30px",
                backgroundColor: "#FCDDEC",
                clipPath: "polygon(0 100%, 100% 0, 0 0)",
              },
              "::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "30px",
                height: "30px",
                backgroundColor: "#FCDDEC",
                clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
              },
            }}
          >
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              padding={{
                base: "40px 24px 32px 24px",
                md: "64px 56px",
                "3xl": "88px 244px",
              }}
              gap={"16px"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                width="100%"
                justifyContent={"space-around"}
                gap={{ base: "8px", lg: "16px" }}
              >
                <MainButton
                  borderRadius={{ base: "8px" }}
                  width={"100%"}
                  backgroundColor={tab == 0 ? "var(--color-main)" : "#FCDDEC"}
                  color={tab == 0 ? "#FFF" : "#040926"}
                  padding={{
                    base: "16px 36px",
                  }}
                  onClick={() => setTab(0)}
                  height={{ base: "44px", md: "54px", "3xl": "88px" }}
                >
                  <Text
                    fontSize={{ base: "14px", lg: "24px", "3xl": "32px" }}
                    fontWeight={400}
                    textAlign={"center"}
                    fontFamily={"var(--font-text-main)"}
                  >
                    TAIKO Mining
                  </Text>
                </MainButton>
                <MainButton
                  borderRadius={{ base: "8px" }}
                  width={"100%"}
                  padding={{
                    base: "16px 36px",
                  }}
                  backgroundColor={tab == 1 ? "var(--color-main)" : "#FCDDEC"}
                  color={tab == 1 ? "#FFF" : "#040926"}
                  onClick={() => setTab(1)}
                  height={{ base: "44px", md: "54px", "3xl": "88px" }}
                >
                  <Text
                    fontSize={{ base: "14px", lg: "24px", "3xl": "32px" }}
                    fontWeight={400}
                    textAlign={"center"}
                    fontFamily={"var(--font-text-main)"}
                  >
                    BACHI Mining
                  </Text>
                </MainButton>
              </Box>
              {/* <SpriteAnimator
                sprite={earninganimation}
                width={300}
                height={300}
                fps={30}
                scale={1}
                // shouldAnimate={true}
              /> */}
              <Image src={animation} w={{ base: "224px", md: "596px" }} />
              <Text
                fontSize={{ base: "20px", md: "48px", "3xl": "72px" }}
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
                  height={{ base: "44px", lg: "54px", "3xl": "88px" }}
                >
                  <Flex alignItems={"center"}>
                    <Text
                      color={"#000"}
                      fontSize={{ base: "14px", md: "24px" }}
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
                  height={{ base: "44px", lg: "54px", "3xl": "88px" }}
                  onClick={address ? handleClaim : onOpenConnectWalletModal}
                  isDisabled={disabled}
                >
                  <Text
                    textAlign={"center"}
                    fontSize={{ base: "14px", md: "24px" }}
                    fontWeight={400}
                    color={"white"}
                    fontFamily={"var(--font-text-main)"}
                  >
                    {address ? "Claim" : "Connect wallet"}
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
