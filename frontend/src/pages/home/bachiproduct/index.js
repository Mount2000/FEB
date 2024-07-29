import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import image
import appProduct from "../../../assets/img/homepage/app-product.png";
import appProductHome from "../../../assets/img/homepage/app-product-home.png";
import SectionContainer from "../../../components/container";
import { base } from "viem/chains";
const ProductHome = () => {
  return (
    <Box marginBottom={{ xl: "100px", "2xl": "197px" }}>
      <Flex
        paddingTop={{ base: "27px", md: "50px", lg: "70px", "3xl": "197px" }}
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ lg: "center" }}
      >
        <Image
          src={appProduct}
          height={"100%"}
          paddingRight={{ base: "18px" }}
          paddingLeft={{ base: "18px" }}
          paddingBottom={{ base: "6px" }}
          width={{ lg: "50%" }}
        />
        <SectionContainer
          display={"flex"}
          flexDirection={"column"}
          width={{ lg: "50%" }}
        >
          <Text
            fontSize={{ base: "24px", "2xl": "32px", "3xl": "40px" }}
            color="var(--color-main)"
            lineHeight={"normal"}
            paddingBottom={"35px"}
            fontFamily="var(--font-text-extra)"
          >
            BACHI Product
          </Text>
          <Text
            fontSize={{
              base: "40px",
              xl: "48px",
              "2xl": "55px",
              "3xl": "86px",
            }}
            lineHeight={{ base: "50px", "2xl": "70px", "3xl": "100px" }}
            paddingBottom={{ base: "28px", "2xl": "36px", "3xl": "45px" }}
            fontFamily="var(--font-heading)"
          >
            Unlocking the potential of artificial intelligence
          </Text>
          <Text
            fontSize={{
              base: "16px",
              xl: "24px",
              "2xl": "26px",
              "3xl": "32px",
            }}
            lineHeight={"normal"}
            fontFamily="var(--font-text-main)"
          >
            BACHI provides innovative products that empower users to engage in
            trading. Swap tokens and contribute liquidity to various protocols
            seamlessly. But that's not all! Users can earn rewards for providing
            liquidity and actively participate in the BACHI DAO
          </Text>
        </SectionContainer>
      </Flex>
      <Flex
        position={"relative"}
        paddingTop={{ base: "30px", "3xl": "200px" }}
        flexDirection={{ base: "column-reverse" }}
      >
        <SectionContainer
          display={"flex"}
          flexDirection={"column"}
          paddingLeft={{
            base: "24px",
            lg: "10%",
            xl: "12%",
            "2xl": "10%",
            "3xl": "214px",
          }}
          width={{ base: "100%", lg: "50%", "3xl": "59%" }}
          paddingTop={{ lg: "100px", "3xl": "150px" }}
        >
          <Text
            fontSize={{ base: "24px", "3xl": "40px" }}
            color={"#E42493"}
            lineHeight={"normal"}
            paddingBottom={{ base: "20px", "2xl": "32px", "3xl": "36px" }}
            fontFamily="var(--font-text-extra)"
          >
            BACHI Swap
          </Text>
          <Text
            fontSize={{
              base: "40px",
              xl: "48px",
              "2xl": "55px",
              "3xl": "70px",
            }}
            lineHeight={{ base: "50px", "2xl": "70px", "3xl": "100px" }}
            paddingBottom={{ base: "28px", "2xl": "36px", "3xl": "43px" }}
            fontFamily="var(--font-heading)"
          >
            Swap everything in ONE click
          </Text>
          <Text
            fontSize={{
              base: "16px",
              xl: "24px",
              "2xl": "26px",
              "3xl": "32px",
            }}
            lineHeight={"normal"}
            fontFamily="var(--font-text-main)"
          >
            As a Taiko’s native DEX, BACHI allows users to easily trade tokens
            across the TAIKO network
          </Text>
        </SectionContainer>
        <Image
          height={{ base: "100%", lg: "130%", "3xl": "800px" }}
          width={{ lg: "600px", xl: "700px ", "2xl": "780px", "3xl": "872px" }}
          position={{ base: "relative", lg: "absolute" }}
          right={{ lg: "0px" }}
          top={{ lg: "30px", xl: "0px", "3xl": "200px" }}
          // right={"0px"}
          // bottom={"-150px"}
          src={appProductHome}
        />
      </Flex>
    </Box>
  );
};

export default ProductHome;
