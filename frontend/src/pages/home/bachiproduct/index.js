import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import image
import appProduct from "../../../assets/img/app-product.png";
import appProductHome from "../../../assets/img/app-product-home.png";
const ProductHome = () => {
  return (
    <Box>
      <Flex marginTop={"197px"}>
        <Image src={appProduct} height={"100%"}  />
        <Flex flexDirection={"column"} marginTop={"11px"}>
          <Text
            fontSize={"40px"}
            color={"#E42493"}
            lineHeight={"normal"}
            marginBottom={"35px"}
            fontFamily="var(--font-text-extra)"
          >
            BACHI EARTH
          </Text>
          <Text
            fontSize={"70px"}
            lineHeight={"100px"}
            marginBottom={"45px"}
            fontFamily="var(--font-heading)"
          >
            Unlocking the potential of artificial intelligence
          </Text>
          <Text
            fontSize={"32px"}
            lineHeight={"normal"}
            fontFamily="var(--font-text-main)"
          >
            Earth leverages a innovative bare metal GPU cloud designed to
            provide raw GPU computing power, ensuring high performance without
            the overhead of virtualization. Ideal for compute-intensive tasks
            such as AI model training, fine-tuning, and inference.
          </Text>
        </Flex>
      </Flex>
      <Flex position={"relative"} marginTop={"406px"}>
        <Flex flexDirection={"column"} marginLeft={"214px"} width={"601px"}>
          <Text
            fontSize={"40px"}
            color={"#E42493"}
            lineHeight={"normal"}
            marginBottom={"36px"}
            fontFamily="var(--font-text-extra)"
          >
            BACHI ATMOSPHERE
          </Text>
          <Text fontSize={"70px"} lineHeight={"100px"} marginBottom={"43px"}>
            Leveling up the gaming industry
          </Text>
          <Text
            fontSize={"32px"}
            lineHeight={"normal"}
            fontFamily="var(--font-text-main)"
          >
            As a Taiko’s native DEX, BACHI allows users to easily trade tokens
            across the TAIKO network
          </Text>
        </Flex>
        <Image
          width={"873px"}
          position={"absolute"}
          right={"0px"}
          bottom={"-150px"}
          src={appProductHome}
          height={"800px"}
        />
      </Flex>
    </Box>
  );
};

export default ProductHome;
