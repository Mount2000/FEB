import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import image
import appProduct from "../../../assets/img/app-product.png";
import appProductHome from "../../../assets/img/app-product-home.png";
const ProductHome = () => {
  return (
    <Box>
      <Flex>
        <Image src={appProduct} marginTop={"200px"} height={"100%"} />
        <Flex flexDirection={"column"} marginTop={"208px"}>
          <Text
            fontSize={"40px"}
            color={"#E42493"}
            lineHeight={"normal"}
            marginBottom={"35px"}
          >
            BACHI Product
          </Text>
          <Text fontSize={"86px"} lineHeight={"100px"} marginBottom={"45px"}>
            Unlocking the potential of artificial intelligence
          </Text>
          <Text fontSize={"32px"} lineHeight={"normal"}>
            BACHI provides innovative products that empower users to engage in
            trading. Swap tokens and contribute liquidity to various protocols
            seamlessly. But that's not all! Users can earn rewards for providing
            liquidity and actively participate in the BACHI DAO
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Flex flexDirection={"column"} marginLeft={"214px"} marginTop={"500px"}>
          <Text
            fontSize={"40px"}
            color={"#E42493"}
            lineHeight={"normal"}
            marginBottom={"36px"}
          >
            BACHI SWAP
          </Text>
          <Text fontSize={"86px"} lineHeight={"100px"} marginBottom={"43px"}>
            Swap everything in ONE click
          </Text>
          <Text fontSize={"32px"} lineHeight={"normal"}>
            As a Taiko’s native DEX, BACHI allows users to easily trade tokens
            across the TAIKO network
          </Text>
        </Flex>
        <Image src={appProductHome} marginTop={"250px"} height={"100%"} />
      </Flex>
    </Box>
  );
};

export default ProductHome;
