import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import component
import CustomButton from "../../../components/button";
import SectionContainer from "../../../components/container";
//import image
import appBanner from "../../../assets/img/app-banner.png";

const BannerHome = () => {
  return (
    <div>
      <SectionContainer position={"relative"}>
        <Flex flexDirection={"column"} marginTop={{ base: "18px", md: "49px" }}>
          <Text
            fontSize={{ md: "109px", "2xl": "109px" }}
            fontWeight={400}
            lineHeight={"120px"}
            width={"900px"}
            marginBottom={"45px"}
          >
            Swap everything on TAIKO
          </Text>
          <Text
            fontSize={"24px"}
            fontWeight={400}
            width={"700px"}
            marginBottom={"58px"}
            fontFamily="var(--font-text-main)"
            lineHeight={"normal"}
          >
            Welcome to BachiSwap, the ultimate AMM DEX. Including Layer 1 and
            Layer 2 solutions, as well as both EVM and non-EVM environments.
            With BachiSwap, effortlessly swap any token and transfer your assets
            across different networks with ease
          </Text>
          <CustomButton
            width={{ base: "140px", md: "230px" }}
            height={{ base: "40px", md: "66px" }}
          >
            Launch App
          </CustomButton>
        </Flex>
        <Image
          src={appBanner}
          position={"absolute"}
          right={"0px"}
          top={"-130px"}
          width={"1000px"}
        />
      </SectionContainer>
      <SectionContainer
        backgroundColor="var(--color-main)"
        marginTop={{ base: "42px", md: "50px" }}
        height={{ base: "669px", md: "400px" }}
        z-index={"10"}
        position={"relative"}
      >
        <Flex paddingTop={{ base: "55px", md: "30px" }} gap={"15px"}>
          <Flex
            flexDirection={"column"}
            width={"497px"}
            // marginRight={{ base: "0px", md: "153px" }}
          >
            <Text
              fontSize={{ base: "40px", md: "96px" }}
              fontWeight={"400"}
              lineHeight={"normal"}
              fontFamily="var(--font-heading)"
            >
              43,000+
            </Text>
            <Text
              fontSize={{ base: "24px", md: "40px" }}
              fontWeight={"400"}
              lineHeight={"normal"}
              fontFamily="var(--font-text-extra)"
              marginTop={"41px"}
            >
              Enterprise grade GPUs on-demand
            </Text>
            <Text
              fontSize={{ base: "16px", md: "24px" }}
              fontWeight={"400"}
              lineHeight={"normal"}
              fontFamily="var(--font-text-main)"
              marginTop={"32px"}
            >
              Over $400m worth of compute capacity.
            </Text>
          </Flex>
          <Flex
            flexDirection={"column"}
            // marginRight={{ base: "0px", md: "238px" }}

            width={"472px"}
          >
            <Text
              fontSize={{ base: "40px", md: "96px" }}
              lineHeight={"normal"}
              fontFamily="var(--font-heading)"
            >
              23+
            </Text>
            <Text
              fontSize={{ base: "24px", md: "40px" }}
              lineHeight={"normal"}
              fontFamily="var(--font-text-extra)"
              marginTop={"41px"}
            >
              Countries supported around the World
            </Text>
            <Text
              fontSize={{ base: "16px", md: "24px" }}
              fontWeight={"400"}
              lineHeight={"normal"}
              fontFamily="var(--font-text-main)"
              marginTop={"32px"}
            >
              Bringing you closer to the edge.
            </Text>
          </Flex>
          <Flex flexDirection={"column"} width={"472px"}>
            <Text
              fontSize={{ base: "40px", md: "96px" }}
              lineHeight={"normal"}
              fontFamily="var(--font-heading)"
            >
              99.99+
            </Text>
            <Text
              fontSize={{ base: "24px", md: "40px" }}
              lineHeight={"normal"}
              marginTop={"41px"}
              fontFamily="var(--font-text-extra)"
            >
              Uptime
            </Text>
            <Text
              fontSize={{ base: "16px", md: "24px" }}
              lineHeight={"normal"}
              marginTop={"58px"}
              fontFamily="var(--font-text-main)"
            >
              Exceptional architecture for superior reliability.
            </Text>
          </Flex>
        </Flex>
      </SectionContainer>
    </div>
  );
};

export default BannerHome;
