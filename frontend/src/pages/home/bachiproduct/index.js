import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import image
import appProduct from "../../../assets/img/homepage/app-product.png";
import appProductHome from "../../../assets/img/homepage/app-product-home.png";
import SectionContainer from "../../../components/container";
import { base } from "viem/chains";

const ProductHome = () => {
  return (
    <Flex
      flexDirection={{ base: "column", lg: "column-reverse", xl: "column" }}
      gap={{ base: "24px", lg: "166px", "3xl": "256px" }}
      padding={{
        base: "64px 24px 64px 24px",
        lg: "104px 64px 104px 64px",
        xl: "104px 86px 104px 86px",
        "2xl": "104px 120px 104px 120px",
        "3xl": "128px 144px 144px 128px",
      }}
    >
      <Flex
        // paddingTop={{ base: "27px", md: "50px", lg: "70px", "3xl": "197px" }}
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ md: "center" }}
        gap={{ base: "16px" }}
      >
        <Image
          src={appProduct}
          // height={"100%"}
          // paddingRight={{ base: "18px" }}
          // paddingLeft={{ base: "18px" }}
          // paddingBottom={{ base: "6px" }}
          width={{ base: "100%", md: "80%", lg: "50%" }}
        />
        <SectionContainer
          gap={{ base: "24px", "3xl": "48px" }}
          display={"flex"}
          flexDirection={"column"}
          width={{ lg: "50%" }}
        >
          <Text
            letterSpacing={"-1px"}
            fontSize={{ base: "24px", lg: "32px", "3xl": "40px" }}
            color="var(--color-main)"
            lineHeight={{ base: "32px", "3xl": "48px" }}
            // paddingBottom={"35px"}
            fontFamily="var(--font-text-extra)"
          >
            BACHI Product
          </Text>
          <Text
            letterSpacing={"-1px"}
            fontSize={{
              base: "40px",
              xl: "48px",
              "2xl": "55px",
              "3xl": "72px",
            }}
            lineHeight={{ base: "48px", "2xl": "70px", "3xl": "80px" }}
            // paddingBottom={{ base: "28px", "2xl": "36px", "3xl": "45px" }}
            fontFamily="var(--font-heading)"
          >
            Unlocking the potential of artificial intelligence
          </Text>
          <Text
            letterSpacing={"-1px"}
            fontSize={{
              base: "16px",
              lg: "20px",
              xl: "24px",
              "2xl": "26px",
              "3xl": "32px",
            }}
            lineHeight={{ base: "24px", lg: "28px", "3xl": "40px" }}
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
        // paddingTop={{ base: "30px", "3xl": "200px" }}
        flexDirection={{ base: "column-reverse" }}
        alignItems={{ base: "center", lg: "normal" }}
      >
        <SectionContainer
          display={"flex"}
          flexDirection={"column"}
          // paddingLeft={{
          //   base: "24px",
          //   md: "57px",
          //   lg: "10%",
          //   xl: "12%",
          //   "2xl": "10%",
          //   "3xl": "214px",
          // }}
          width={{ base: "100%", lg: "50%", "3xl": "52%" }}
          paddingTop={{ lg: "72px", "3xl": "150px" }}
          paddingBottom={{ lg: "72px" }}
        >
          <Text
            letterSpacing={"-1px"}
            fontSize={{ base: "24px", lg: "32px", "3xl": "40px" }}
            color={"#E42493"}
            lineHeight={{ "3xl": "48px" }}
            paddingBottom={{
              base: "20px",
              lg: "24px",
              "2xl": "32px",
              "3xl": "48px",
            }}
            fontFamily="var(--font-text-extra)"
          >
            BACHI Swap
          </Text>
          <Text
            letterSpacing={"-1px"}
            fontSize={{
              base: "40px",
              xl: "48px",
              "2xl": "55px",
              "3xl": "72px",
            }}
            lineHeight={{ base: "50px", "2xl": "70px", "3xl": "80px" }}
            fontFamily="var(--font-heading)"
          >
            Swap everything in
          </Text>
          <Text
            letterSpacing={"-1px"}
            fontSize={{
              base: "40px",
              xl: "48px",
              "2xl": "55px",
              "3xl": "72px",
            }}
            lineHeight={{ base: "50px", "2xl": "70px", "3xl": "80px" }}
            paddingBottom={{
              base: "28px",
              lg: "24px",
              "2xl": "36px",
              "3xl": "48px",
            }}
            fontFamily="var(--font-heading)"
          >
            ONE click
          </Text>
          <Text
            width={{ "3xl": "90%" }}
            letterSpacing={"-1px"}
            fontSize={{
              base: "16px",
              lg: "20px",
              xl: "24px",
              "2xl": "26px",
              "3xl": "32px",
            }}
            lineHeight={{ "3xl": "40px" }}
            fontFamily="var(--font-text-main)"
          >
            As a Taiko’s native DEX, BACHI allows users to easily trade tokens
            across the TAIKO network
          </Text>
        </SectionContainer>
        <Image
          height={{ base: "unset", lg: "432px", xl: "530px", "3xl": "800px" }}
          width={{ md: "70%", lg: "50%", "3xl": "872px" }}
          position={{ base: "relative", lg: "absolute" }}
          right={{ lg: "0px" }}
          top={{ lg: "15px", xl: "-30px", "2xl": "-10px", "3xl": "-30px" }}
          // right={"0px"}
          // bottom={"-150px"}
          src={appProductHome}
        />
      </Flex>
    </Flex>
  );
};

export default ProductHome;
