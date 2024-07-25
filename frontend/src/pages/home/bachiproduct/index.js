import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import image
import appProduct from "../../../assets/img/homepage/app-product.png";
import appProductHome from "../../../assets/img/homepage/app-product-home.png";
const ProductHome = () => {
  return (
    <Box>
      <Flex marginTop={"197px"}>
        <Image src={appProduct} height={"100%"} />
        <Flex flexDirection={"column"} marginTop={"11px"} marginRight={"40px"}>
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
        <Flex flexDirection={"column"} marginLeft={"214px"} width={"40%"}>
          <Text
            fontSize={"40px"}
            color={"#E42493"}
            lineHeight={"normal"}
            marginBottom={"36px"}
            fontFamily="var(--font-text-extra)"
          >
            BACHI ATMOSPHERE
          </Text>
          <Text
            fontSize={"70px"}
            lineHeight={"100px"}
            marginBottom={"43px"}
            fontFamily="var(--font-heading)"
          >
            Leveling up the gaming industry
          </Text>
          <Text
            fontSize={"32px"}
            lineHeight={"normal"}
            fontFamily="var(--font-text-main)"
          >
            Atmosphere utilizes a highly performant network of low-latency GPUs
            to enable real-time, high-quality gaming experiences in the cloud.
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
