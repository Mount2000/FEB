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
import { useReadContract, useWriteContract } from "wagmi";
import { config } from "../../../../components/wallets/config";
import { getBalance, getChainId, getChains } from "@wagmi/core";

const MintRune = () => {
  const navigate = useNavigate();

  const chains = getChains(config);
  const chainId = getChainId(config);
  const currentChain = chains.find((chain) => chain.id === chainId);
  const chainDecimal = currentChain?.nativeCurrency?.decimals;
  const [nodeId, setNodeId] = useState(1);
  const [count, setCount] = useState(0);
  const nodeManagerContract = {
    address: node_manager_contract.CONTRACT_ADDRESS,
    abi: node_manager_contract.CONTRACT_ABI,
  };
  const { data: nodeData, error: getNode1DataErr } = useReadContract({
    ...nodeManagerContract,
    functionName: "nodeTiers",
    args: [nodeId],
  });

  const products = [
    {
      tierId: 1,
      nameproduct: "Core i5",
      image: productCoreI5,
      power: "10 GH/s",
      reward: "50.000 ETH",
    },
    {
      tierId: 2,
      nameproduct: "Core i7",
      image: productCoreI7,
      power: "100 GH/s",
      reward: "100.000 ETH",
    },
    {
      tierId: 3,
      nameproduct: "Core i9",
      image: productCoreI9,
      power: "1000 GH/s",
      reward: "150.000 ETH",
    },
  ];
  const [selectProduct, setselectProduct] = useState(products[0]);
  const handleProductSelect = (products) => {
    setselectProduct(products);
    setNodeId(products.tierId);
  };
  // const handleUrl = (products) => {
  //   const tierUrl = `/node/node-tier-${products.tierId}`;

  //   navigate(tierUrl, { state: { selectedProduct: products } });
  // };
  function convertAndDivide(data, chainDecimal) {
    const value = data
      ? typeof data === "bigint"
        ? Number(data)
        : data
      : 0;
    return value / 10 ** chainDecimal;
  }

  return (
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
                  {nodeData ? convertAndDivide(nodeData[2], chainDecimal) : 0} ETH
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
                    ? convertAndDivide(nodeData[4], chainDecimal) * 86400 * 30
                    : 0}{" "}
                  ETH
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
                    ? convertAndDivide(nodeData[4], chainDecimal) * 86400
                    : 0}{" "}
                  ETH
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
                  {/* {nodeData ? convertAndDivide(nodeData[4], chainDecimal) : 0}{" "} */}
                  {selectProduct?.reward}
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
                  {nodeData ? convertAndDivide(nodeData[2], chainDecimal) * count : 0}{" "}
                  ETH
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            borderTop={"1px solid var(--color-main)"}
          >
            <Link to={"/node/node-tier-1"} state={{ products: selectProduct }}>
              <CommonButton
                width={"750px"}
                height={"100px"}
                backgroundColor="var(--color-main)"
                margin={"58px 0 52px 0"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                // onClick={() => handleUrl(products)}
              >
                <Text textAlign={"center"} fontSize={"32px"} fontWeight={500}>
                  PAY NOW
                </Text>
              </CommonButton>
            </Link>
          </Flex>
        </CommonButton>
      </Flex>
    </SectionContainer>
  );
};

export default MintRune;
