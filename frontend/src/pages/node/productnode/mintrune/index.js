import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
//import component
import SectionContainer from "../../../../components/container";
import CommonButton from "../../../../components/button/commonbutton";
import Quantity from "../../../../components/quantity";

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
} from "@wagmi/core";
import {
  convertAndDivide,
  formatBachiCode,
  formatNumDynDecimal,
  isReferralCode,
  isDiscountCode,
  isDefaultAddress,
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

import { fromBlobs } from "viem";

const MintRune = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const billNode = useSelector(selectBillNode);
  console.log({ billNode });
  const chains = getChains(config);
  const chainId = getChainId(config);
  const currentChain = chains.find((chain) => chain.id === chainId);
  const { address } = useAccount();
  const chainDecimal = currentChain?.nativeCurrency?.decimals;
  const chainSymbol = currentChain?.nativeCurrency?.symbol;
  // const [nodeId, setNodeId] = useState(1);
  const [count, setCount] = useState(0);
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
      console.log("InvalidReferralCode");
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
      console.log("Referral code not exist");
      return;
    }

    setReferralId(referalId);
  };

  const handleDiscountCodeApply = async () => {
    if (!isDiscountCode(discountCodeValue)) {
      console.log("InvaliDiscountCode");
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
      console.log("Discount code not exist");
      return;
    }

    setDiscountCouponIdId(discountId);
  };
  console.log(discountCouponIdId);
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
  }, [selectProduct, count]);

  console.log({ nodeData });
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

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

  const handlePayNow = async () => {
    let price = billNode?.price * 10 ** chainDecimal;
    console.log({ price });

    const discountinfo = await readContract(config, {
      ...nodeManagerContract,
      functionName: "discountCoupons",
      args: [discountCouponIdId],
    });

    const discountPercent = discountinfo[1];
    console.log({ discountPercent });
    if (discountPercent > 0) {
      price = price - (price * discountPercent) / 100;
    }
    console.log({ price, referralId, discountCouponIdId });
    const balance = await getBalance(config, {
      address: address,
    });
    if (Number(balance.formatted) < billNode?.price || billNode?.price === 0) {
      dispatch(setMessage(ERROR.notBalance));
      setPaymentStatus("failure");
      setIsLoading(true);
      return;
    }
    dispatch(setMessage(PENDING.txAwait));
    setIsLoading(true);
    setPaymentStatus(null);
    try {
      const hash = await writeContract(config, {
        ...nodeManagerContract,
        functionName: "multiBuyNode",
        args: [
          billNode?.nodeId,
          referralId,
          "metadata",
          discountCouponIdId,
          billNode?.qty,
        ],
        value: price,
      });
      if (hash) {
        console.log({ hash });
        const result = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        if (result?.status == "success") {
          const code = await getUserReferral(address);
          setReferralCode(code);
          dispatch(setMessage(SUCCESS.txBuySuccess));
          setPaymentStatus("success");
          setIsLoading(true);
          return;
        } else {
          dispatch(setMessage(FAIURE.txFalure));
          setPaymentStatus("failure");
          setIsLoading(true);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      dispatch(setMessage(FAIURE.txFalure));
      setPaymentStatus("failure");
      setIsLoading(true);
      return;
    }
  };

  return (
    <>
      <SectionContainer width={"100%"} paddingLeft={"0px"} paddingRight={"0px"}>
        <Flex flexDirection={"column"} marginTop={"87px"}>
          <Flex gap={"48px"}>
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
                    flexDirection={"column"}
                    alignItems={"center"}
                    gap={"41px"}
                    marginTop={"51px"}
                    marginBottom={"60px"}
                  >
                    <Text
                      fontSize={"48px"}
                      fontWeight={700}
                      fontFamily="var(--font-text-main)"
                    >
                      {products.nameproduct}
                    </Text>
                    <Image src={products.image} />
                    <Flex alignItems={"center"} gap={"16px"}>
                      <Text fontSize={"32px"} fontWeight={400}>
                        {products.power}
                      </Text>
                      <Image src={iconPower} paddingTop={"5px"} />
                    </Flex>
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
            <Box margin={"58px 58px 44px 59px"}>
              <Flex
                flexDirection={"column"}
                gap={"32px"}
                fontFamily="var(--font-text-main)"
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
                    Minting Power
                  </Text>
                  <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
                    {nodeData ? nodeData[3] : 0} GH/s
                  </Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
                    Rent Period
                  </Text>
                  <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
                    30 days
                  </Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
                    Rent Price
                  </Text>
                  <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
                    {nodeData
                      ? formatNumDynDecimal(
                          convertAndDivide(nodeData[2], chainDecimal)
                        )
                      : 0}{" "}
                    {chainSymbol}
                  </Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Flex alignItems={"center"} gap={"32px"}>
                    <Text
                      fontSize={"36px"}
                      fontWeight={400}
                      color="var(--color-main)"
                    >
                      30 Days Profit
                    </Text>
                    <Image src={iconNode} />
                  </Flex>
                  <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
                    {nodeData
                      ? formatNumDynDecimal(
                          convertAndDivide(nodeData[5], chainDecimal) *
                            86400 *
                            30
                        )
                      : 0}{" "}
                    {chainSymbol}
                  </Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Flex alignItems={"center"} gap={"32px"}>
                    <Text
                      fontSize={"36px"}
                      fontWeight={400}
                      color="var(--color-main)"
                    >
                      Daily
                    </Text>
                    <Image src={iconNode} />
                    <Image />
                  </Flex>
                  <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
                    {nodeData
                      ? formatNumDynDecimal(
                          convertAndDivide(nodeData[5], chainDecimal) * 86400
                        )
                      : 0}{" "}
                    {chainSymbol}
                  </Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
                    BACHI Reward
                  </Text>
                  <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
                    {nodeData
                      ? formatNumDynDecimal(
                          convertAndDivide(nodeData[4], chainDecimal) * 86400
                        )
                      : 0}{" "}
                    Bachi
                  </Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
                    Quantity
                  </Text>
                  <Quantity count={count} setCount={setCount} />
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
                    Total Renting Price
                  </Text>
                  <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
                    {nodeData
                      ? formatNumDynDecimal(
                          convertAndDivide(nodeData[2], chainDecimal) * count
                        )
                      : 0}{" "}
                    {chainSymbol}
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Flex
              alignItems={"center"}
              gap={"20px"}
              padding={"47px 58px 55px 58px"}
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
                width={"750px"}
                height={"100px"}
                backgroundColor="var(--color-main)"
                margin={"58px 0 52px 0"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                onClick={handlePayNow}
                cursor={"pointer"}
              >
                <Text textAlign={"center"} fontSize={"32px"} fontWeight={500}>
                  PAY NOW
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
        >
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Image src={iconFrame} width={"250px"} className="spin-animation" />
            <Text
              fontSize={"24px"}
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
          <Flex flexDirection={"column"} alignItems={"center"} gap={"30px"}>
            <Image src={iconSuccess} />
            <Text
              fontSize={"28px"}
              fontWeight={400}
              fontFamily="var(--font-text-main)"
            >
              {billNode?.message}
            </Text>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"14px"}
            >
              <Text
                fontSize={"28px"}
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
              >
                <Text fontSize={"24px"} fontWeight={300}>
                  {`http://bachi.swap.io/Bachi-Taiko-Swap?referral-code=${referralCode}`}
                </Text>
                <Image src={iconNodedetail} />
              </Flex>
            </Flex>
            <Flex
              alignItems={"center"}
              width={"100%"}
              gap={"30px"}
              justifyContent={"space-between"}
            >
              <CommonButton
                backgroundColor="var(--color-main)"
                width="50%"
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
                width="50%"
                padding="10px"
                display="flex"
                justifyContent="center"
              >
                <Text color={"#000"} fontSize={"20px"} fontWeight={500}>
                  History Let’s Goooo
                </Text>
              </CommonButton>
            </Flex>
            <Link>
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
            <Image src={iconError} />
            <Text
              mt={"120px"}
              fontSize={"24px"}
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

export default MintRune;
