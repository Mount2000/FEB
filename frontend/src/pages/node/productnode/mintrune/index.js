import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//import component
import SectionContainer from "../../../../components/container";
import CommonButton from "../../../../components/button/commonbutton";
import Quantity from "../../../../components/quantity";
import { clientAPI } from "../../../../api/client";
//import image
import productCoreI5 from "../../../../assets/img/node/product-corei5.png";
import productCoreI7 from "../../../../assets/img/node/product-corei7.png";
import productCoreI9 from "../../../../assets/img/node/product-corei9.png";
import iconNode from "../../../../assets/img/node/icon-node.png";
import iconPower from "../../../../assets/img/node/icon-node-power.png";
import node_manager_contract from "../../../../utils/contracts/node_manager_contract";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { config } from "../../../../components/wallets/config";
import {
  getBalance,
  getChainId,
  getChains,
  writeContract,
  waitForTransactionReceipt,
  readContract,
  getGasPrice,
  getTransaction,
  getTransactionReceipt,
} from "@wagmi/core";
import {
  convertAndDivide,
  formatBachiCode,
  formatNumDynDecimal,
  isReferralCode,
  isDiscountCode,
  isDefaultAddress,
  formatTokenBalance,
  getUserIpAddress,
} from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBillNode,
  setCaller,
  setMessage,
  setNodeId,
  setPrice,
  setQty,
} from "../../../../store/slices/billNodeSlice";
import Message from "../../../../components/message";
import iconFrame from "../../../../assets/img/node/icon-node-Frame.png";
import iconNodedetail from "../../../../assets/img/node/icon-node-detail.png";
import iconSuccess from "../../../../assets/img/node/icon-message-success.png";
import iconError from "../../../../assets/img/node/icon-message-error.png";
import { ERROR, FAIURE, PENDING, SUCCESS } from "../../../../utils/mesages";
import ReferralCodeForm from "../../../../components/referralform";
import { useModal } from "../../../../contexts/useModal";
import { taikoHeklaClient } from "../../../../components/wallets/viemConfig";
import { parseGwei, parseEther, parseUnits } from "viem";
import toast from "react-hot-toast";

const chain_env = process.env.REACT_APP_ENV;

const MintRune = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const billNode = useSelector(selectBillNode);

  const chains = getChains(config);
  const chainId = getChainId(config);
  const currentChain = chains.find((chain) => chain.id === chainId);
  const { address } = useAccount();
  const chainDecimal = currentChain?.nativeCurrency?.decimals;
  const chainSymbol = currentChain?.nativeCurrency?.symbol;
  // const [nodeId, setNodeId] = useState(1);
  const [count, setCount] = useState(1);
  const nodeManagerContract = {
    address: node_manager_contract.CONTRACT_ADDRESS,
    abi: node_manager_contract.CONTRACT_ABI,
  };
  const { data: nodeData } = useReadContract({
    ...nodeManagerContract,
    functionName: "nodeTiers",
    args: [billNode?.nodeId],
  });

  const [referralCode, setReferralCode] = useState("BACHISWAP_xxx_xxxx");
  const [referralCodeValue, setReferralCodeValue] = useState("");
  const [discountCodeValue, setDiscountCodeValue] = useState("");
  const [referralId, setReferralId] = useState(0);
  const [discountCouponIdId, setDiscountCouponIdId] = useState(0);
  const [referralCodeError, setReferralCodeError] = useState("");
  const [discountCodeError, setDiscountCodeError] = useState("");

  const handleReferralChange = (e) => {
    setReferralCodeValue(e.target.value);
  };
  const handleDiscountChange = (e) => {
    setDiscountCodeValue(e.target.value);
  };

  const handleReferralCodeApply = async () => {
    if (!isReferralCode(referralCodeValue)) {
      setReferralCodeError("Invalid referral code");
      return;
    }
    const referalId = Number(formatBachiCode(referralCodeValue));

    const owner = await readContract(config, {
      ...nodeManagerContract,
      functionName: "referralIdUserLinks",
      args: [referalId],
    });

    console.log(owner);

    if (isDefaultAddress(owner)) {
      setReferralCodeError("Referral code not exist");
      return;
    }
    setReferralCodeError("");
    setReferralId(referalId);
  };

  const handleDiscountCodeApply = async () => {
    if (!isDiscountCode(discountCodeValue)) {
      setDiscountCodeError("Invalid discount code");
      return;
    }
    const discountId = Number(formatBachiCode(discountCodeValue));

    const owner = await readContract(config, {
      ...nodeManagerContract,
      functionName: "discountCouponsIdUserLinks",
      args: [discountId],
    });
    console.log(owner);

    if (isDefaultAddress(owner)) {
      setDiscountCodeError("Discount code not exist");
      return;
    }

    setReferralCodeError("");
    setDiscountCouponIdId(discountId);
  };

  const products = [
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
  useEffect(() => {
    dispatch(setQty(count));
    if (nodeData)
      dispatch(setPrice(convertAndDivide(nodeData[2], chainDecimal) * count));
    if (address) dispatch(setCaller(address));
  }, [selectProduct, count, address]);

  useEffect(() => {
    if (nodeData)
      dispatch(setPrice(convertAndDivide(nodeData[2], chainDecimal) * count));
  }, [billNode?.nodeId, nodeData]);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { setConnectWalletModalVisible } = useModal();
  const onOpenConnectWalletModal = () => setConnectWalletModalVisible(true);
  const [txHash, setTxHash] = useState("");

  const handleCloseMessage = () => {
    setIsLoading(false);
    setPaymentStatus(null);
  };

  const getUserReferral = async (address) => {
    const refId = await readContract(config, {
      ...nodeManagerContract,
      functionName: "userReferralIdLinks",
      args: [address],
    });
    const referrals = await readContract(config, {
      ...nodeManagerContract,
      functionName: "referrals",
      args: [refId],
    });
    return referrals[0];
  };

  /***********PayNode*************/
  const handlePayNow = async () => {
    setDisabled(true);
    let price = billNode?.price;
    if (!address) {
      dispatch(setMessage("You not connected wallet"));
      setPaymentStatus("failure");
      setIsLoading(true);
      setDisabled(false);
      return;
    }
    if (count === 0) {
      dispatch(setMessage("Invalid quantity"));
      setPaymentStatus("failure");
      setIsLoading(true);
      setDisabled(false);
      return;
    }
    if (billNode?.price === 0) {
      dispatch(setMessage("Invalid price"));
      setPaymentStatus("failure");
      setIsLoading(true);
      setDisabled(false);
      return;
    }

    const [discountinfo, ownerDiscount] = await Promise.all([
      readContract(config, {
        ...nodeManagerContract,
        functionName: "discountCoupons",
        args: [discountCouponIdId],
      }),
      readContract(config, {
        ...nodeManagerContract,
        functionName: "discountCouponsIdUserLinks",
        args: [discountCouponIdId],
      }),
    ]);

    const discountPercent = discountinfo[1];
    if (discountPercent > 0 && ownerDiscount !== address) {
      price = price - (price * discountPercent) / 100;
    }
    const balance = await getBalance(config, {
      address: address,
    });

    const priceValue = parseUnits(String(price), chainDecimal);

    /***Get IP user ***/
    const ipAddress = await getUserIpAddress();
    const IPBlocked = await clientAPI(
      "get",
      `/api/transaction/check-ip?ip=${ipAddress}`
    );
    const isBlocked = IPBlocked?.blocked;

    const txObj = {
      ...nodeManagerContract,
      functionName: "multiBuyNode",
      args: [
        billNode?.nodeId,
        referralId,
        "metadata",
        discountCouponIdId,
        billNode?.qty,
      ],
      value: priceValue,
    };

    const [gasPrice, gasLimit] = await Promise.all([
      getGasPrice(config),
      taikoHeklaClient.estimateContractGas({
        ...txObj,
        account: address,
      }),
    ]);

    const gasFeeToEther = Number(gasLimit * gasPrice) / 10 ** chainDecimal;

    if (Number(balance.formatted) < price + gasFeeToEther) {
      dispatch(setMessage(ERROR.notBalance));
      setPaymentStatus("failure");
      setIsLoading(true);
      setDisabled(false);
      return;
    }
    dispatch(setMessage(PENDING.txAwait));
    setIsLoading(true);
    setPaymentStatus(null);

    if (isBlocked) {
      dispatch(setMessage(FAIURE.txFalure));
      setPaymentStatus("failure");
      setIsLoading(true);
      setDisabled(false);
      return;
    }
    try {
      const hash = await writeContract(config, {
        ...txObj,
      });

      if (hash) {
        setTxHash(hash);
        console.log({ hash });
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
          const status = await getTransactionStatus(config, hash);
          await clientAPI("post", "/api/transaction/update-transaction", {
            hash: hash,
            status: status,
          });
          const code = await getUserReferral(address);
          setReferralCode(code);
          dispatch(setMessage(SUCCESS.txBuySuccess));
          setPaymentStatus("success");
          setIsLoading(true);
          setDisabled(false);
          return;
        } else {
          const status = await getTransactionStatus(config, hash);
          await clientAPI("post", "/api/transaction/update-transaction", {
            hash: hash,
            status: status,
          });
          dispatch(setMessage(FAIURE.txFalure));
          setPaymentStatus("failure");
          setIsLoading(true);
          setDisabled(false);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      dispatch(setMessage(FAIURE.txFalure));
      setPaymentStatus("failure");
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
  return (
    <>
      <SectionContainer width={"100%"} paddingLeft={"0px"} paddingRight={"0px"}>
        <Flex
          flexDirection={"column"}
          paddingTop={{ base: "48px", xl: "87px" }}
        >
          <Flex gap={"48px"} flexDirection={{ base: "column", md: "row" }}>
            {products.map((products) => (
              <Box
                key={products.tierId}
                width={"100%"}
                height={"100%"}
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
                  "@media (max-width: 992px)": {
                    clipPath:
                      "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                    "::before": {
                      width: "10px",
                      height: "10px",
                      backgroundColor: "pink.500",
                    },
                    "::after": {
                      width: "10px",
                      height: "10px",
                      backgroundColor: "pink.500",
                    },
                  },
                }}
              >
                <CommonButton
                  backgroundColor={"rgba(27, 27, 27, 0.20)"}
                  boxShadow={"inset 0 0 10px var(--color-main)"}
                  border="0.5px solid var(--color-main)"
                  position="relative"
                  zIndex="10"
                >
                  <Flex
                    alignItems={"center"}
                    padding={{ base: "27px 42px 24px 32px" }}
                    justifyContent={"space-between"}
                  >
                    <Flex
                      width={"100%"}
                      flexDirection={"column"}
                      alignItems={{ base: "normal", md: "center" }}
                      gap={{ base: "10px", md: "41px" }}
                      // marginTop={"51px"}
                      // marginBottom={"60px"}
                    >
                      <Text
                        fontSize={{ base: "24px", xl: "48px" }}
                        fontWeight={700}
                        fontFamily="var(--font-text-main)"
                      >
                        {products.nameproduct}
                      </Text>
                      <Image
                        src={products.image}
                        display={{ base: "none", md: "block" }}
                      />
                      <Flex alignItems={"center"} gap={"16px"}>
                        <Text
                          fontSize={{ base: "20px", xl: "32px" }}
                          fontWeight={400}
                        >
                          {products.power}
                        </Text>
                        <Image
                          src={iconPower}
                          paddingTop={"5px"}
                          height={{ base: "25px" }}
                        />
                      </Flex>
                    </Flex>
                    <Image
                      src={products.image}
                      display={{ base: "block", md: "none" }}
                      width={"80px"}
                    />
                  </Flex>
                </CommonButton>
              </Box>
            ))}
          </Flex>
          {/* <PayNow /> */}
          <CommonButton
            border="0.5px solid var(--color-main)"
            width={"100%"}
            height={"100%"}
            marginTop={"65px"}
            backgroundColor="var(--color-background-popup)"
          >
            <Box
              margin={{
                base: "31px 32px 27px 31px",
                xl: "58px 58px 44px 59px",
              }}
            >
              <Flex
                flexDirection={"column"}
                gap={{ base: "16px", md: "24px", xl: "32px" }}
                fontFamily="var(--font-text-main)"
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#B2B2B2"}
                  >
                    Minting Power
                  </Text>
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#FFF"}
                    fontFamily={"var(--font-heading)"}
                  >
                    {nodeData ? Number(nodeData[3]) : 0} GH/s
                  </Text>
                </Flex>
                {/* <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#B2B2B2"}
                  >
                    Rent Period
                  </Text>
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#FFF"}
                  >
                    30 days
                  </Text>
                </Flex> */}
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#B2B2B2"}
                  >
                    Rent Price
                  </Text>
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#FFF"}
                    fontFamily={"var(--font-heading)"}
                  >
                    {nodeData
                      ? formatTokenBalance(
                          convertAndDivide(nodeData[2], chainDecimal),
                          6
                        )
                      : 0}{" "}
                    {chainSymbol}
                  </Text>
                </Flex>
                {/* <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Flex
                    alignItems={"center"}
                    gap={{ base: "5px", md: "10px", xl: "32px" }}
                  >
                    <Text
                      fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                      fontWeight={400}
                      color="var(--color-main)"
                    >
                      30 Days Profit
                    </Text>
                    <Image src={iconNode} height={{ base: "24px" }} />
                  </Flex>
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#FFF"}
                  >
                    {nodeData
                      ? formatTokenBalance(
                          convertAndDivide(nodeData[5], chainDecimal) *
                            86400 *
                            30
                        )
                      : 0}{" "}
                    {chainSymbol}
                  </Text>
                </Flex> */}
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Flex
                    alignItems={"center"}
                    gap={{ base: "5px", md: "10px", xl: "32px" }}
                  >
                    <Text
                      fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                      fontWeight={400}
                      color="var(--color-main)"
                    >
                      Daily
                    </Text>
                    <Image src={iconNode} height={{ base: "24px" }} />
                  </Flex>
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#FFF"}
                    fontFamily={"var(--font-heading)"}
                  >
                    {nodeData
                      ? formatTokenBalance(
                          convertAndDivide(nodeData[5], chainDecimal) * 86400
                        )
                      : 0}{" "}
                    {chainSymbol}
                  </Text>
                </Flex>
                {/* <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#B2B2B2"}
                  >
                    BACHI Reward
                  </Text>
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#FFF"}
                  >
                    {nodeData
                      ? formatTokenBalance(
                          convertAndDivide(nodeData[4], chainDecimal) * 86400
                        )
                      : 0}{" "}
                    Bachi
                  </Text>
                </Flex> */}
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#B2B2B2"}
                  >
                    Quantity
                  </Text>
                  <Quantity count={count} setCount={setCount} />
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#FFF"}
                  >
                    Total Renting Price
                  </Text>
                  <Text
                    fontSize={{ base: "16px", md: "24px", xl: "36px" }}
                    fontWeight={400}
                    color={"#FFF"}
                    fontFamily={"var(--font-heading)"}
                  >
                    {nodeData
                      ? formatTokenBalance(
                          convertAndDivide(nodeData[2], chainDecimal) * count,
                          6
                        )
                      : 0}{" "}
                    {chainSymbol}
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              alignItems={"center"}
              gap={"20px"}
              padding={{
                base: "25px 18px 25px 18px",
                xl: "47px 58px 55px 58px",
              }}
              border={"0.5px solid var(--color-main)"}
            >
              <ReferralCodeForm
                value={referralCodeValue}
                title={"Referrer’s Code"}
                onChange={handleReferralChange}
                onClick={handleReferralCodeApply}
                error={referralCodeError}
              />
              <ReferralCodeForm
                value={discountCodeValue}
                title={"Discount Code"}
                onChange={handleDiscountChange}
                onClick={handleDiscountCodeApply}
                error={discountCodeError}
              />
            </Flex>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              borderTop={"1px solid var(--color-main)"}
            >
              <CommonButton
                width={{ base: "320px", md: "750px" }}
                height={{ base: "40px", md: "70px" }}
                backgroundColor={disabled ? "#B51F66" : "var(--color-main)"}
                margin={{
                  base: "30px 10px 30px 10px",
                  md: "38px 20px 32px 20px",
                  lg: "58px 0 52px 0",
                }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                onClick={address ? handlePayNow : onOpenConnectWalletModal}
                cursor={"pointer"}
                isDisabled={disabled}
              >
                <Text
                  textAlign={"center"}
                  fontSize={{ base: "16px", md: "24px", xl: "32px" }}
                  fontWeight={500}
                >
                  {address ? "PAY NOW" : "CONNECT WALLET NOW"}
                </Text>
              </CommonButton>
            </Flex>
          </CommonButton>
        </Flex>
      </SectionContainer>
      <Box className="msg-box">
        <Message
          isVisible={isLoading && paymentStatus === null}
          onClose={handleCloseMessage}
          width={{ base: "80%" }}
        >
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Image
              src={iconFrame}
              width={{ base: "200px", md: "250px" }}
              className="spin-animation"
            />
            <Text
              fontSize={{ base: "20px", md: "24px" }}
              fontWeight={400}
              fontFamily="var(--font-text-main)"
              marginTop={"50px"}
            >
              {billNode?.message}
            </Text>
          </Flex>
        </Message>

        <Message
          isVisible={isLoading && paymentStatus === "success"}
          onClose={handleCloseMessage}
        >
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            gap={{ base: "10px", md: "30px" }}
          >
            <Image
              src={iconSuccess}
              width={{ base: "88px", md: "100px", xl: "120px", "3xl": "200px" }}
            />
            <Text
              fontSize={{ base: "20px", md: "28px" }}
              fontWeight={400}
              fontFamily="var(--font-text-main)"
            >
              {billNode?.message}
            </Text>
            <ReferralCopier referralCode={referralCode} />
            <Flex
              alignItems={"center"}
              width={"100%"}
              gap={{ base: "10px", md: "30px" }}
              justifyContent={"space-between"}
              flexDirection={{ base: "column", md: "row" }}
            >
              <CommonButton
                backgroundColor="var(--color-main)"
                width={{ base: "100%", md: "50%" }}
                padding="10px"
                display="flex"
                justifyContent="center"
              >
                <Text fontSize={"20px"} fontWeight={500}>
                  Pay more and enjoy a moment
                </Text>
              </CommonButton>
              <CommonButton
                backgroundColor="#FFF"
                width={{ base: "100%", md: "50%" }}
                padding="10px"
                display="flex"
                justifyContent="center"
              >
                <Text color={"#000"} fontSize={"20px"} fontWeight={500}>
                  History Let’s Goooo
                </Text>
              </CommonButton>
            </Flex>
            <Link
              target="_blank"
              href={
                chain_env == "testnet"
                  ? `https://hekla.taikoscan.io/tx/${txHash}`
                  : `https://taikoscan.io/tx/${txHash}`
              }
            >
              <Text
                fontSize="20px"
                color="var(--color-main)"
                fontWeight={500}
                textDecoration={"underline"}
              >
                View on Taiko
              </Text>
            </Link>
          </Flex>
        </Message>

        <Message
          isVisible={isLoading && paymentStatus === "failure"}
          onClose={handleCloseMessage}
        >
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            gap={"60px"}
            w={"100%"}
          >
            <Image
              src={iconError}
              width={{ base: "88px", md: "100px", xl: "120px", "3xl": "200px" }}
            />
            <Text
              mt={{ base: "46px", "3xl": "120px" }}
              marginBottom={{ base: "46px", "3xl": "63px" }}
              fontSize={{ base: "20px", md: "24px" }}
              fontFamily="var(--font-text-main)"
              fontWeight={400}
            >
              {billNode?.message}
            </Text>
            <CommonButton
              backgroundColor="#FFF"
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              padding={"10px"}
              onClick={handlePayNow}
            >
              <Text color={"#000"} fontSize={"20px"} fontWeight={600}>
                Try again
              </Text>
            </CommonButton>
          </Flex>
        </Message>
        {isLoading && (
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex="999"
          />
        )}
      </Box>
    </>
  );
};

const ReferralCopier = ({ referralCode }) => {
  const handleCopy = (label, text) => {
    toast.success(`${label} copied!`);
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        gap={"14px"}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"flex-start"}
      >
        <Text
          fontSize={{ base: "16px", md: "28px" }}
          fontWeight={400}
          fontFamily="var(--font-text-main)"
        >
          Link Referral:
        </Text>
        <Flex
          alignItems={"center"}
          gap={"10px"}
          padding={"10px"}
          border={"1px solid #FCDDEC"}
          onClick={() => handleCopy("referral", referralCode)}
          cursor={"pointer"}
        >
          <Text fontSize={{ base: "14px", md: "24px" }} fontWeight={300}>
            {`http://bachi.swap.io/Bachi-Taiko-Swap?referral-code=${referralCode}`}
          </Text>
          <Image src={iconNodedetail} height={{ base: "20px", md: "25px" }} />
        </Flex>
      </Flex>
    </>
  );
};

export default MintRune;
