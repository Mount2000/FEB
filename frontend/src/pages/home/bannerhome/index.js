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
            fontSize={"128px"}
            fontWeight={400}
            lineHeight={"120px"}
            width={"800px"}
            marginBottom={"45px"}
          >
            Swap everything on TAIKO
          </Text>
          <Text
            fontSize={"24px"}
            fontWeight={400}
            width={"700px"}
            marginBottom={"58px"}
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
        backgroundColor={"#E42493"}
        marginTop={{ base: "42px", md: "50px" }}
        height={{ base: "669px", md: "400px" }}
        z-index={"10"}
        position={"relative"}
      >
        <Flex paddingTop={{ base: "55px", md: "30px" }} gap={"15px"}>
          <Flex
            flexDirection={"column"}
            gap={"15px"}
            width={"472px"}
            // marginRight={{ base: "0px", md: "153px" }}
          >
            <Text
              fontSize={{ base: "40px", md: "96px" }}
              fontWeight={"400"}
              lineHeight={"normal"}
            >
              100+
            </Text>
            <Text
              fontSize={{ base: "24px", md: "58px" }}
              fontWeight={"400"}
              lineHeight={"normal"}
              fontFamily={"'Ubuntu Condensed', sans-serif"}
            >
              Supported Tokens Pair
            </Text>
            <Text
              fontSize={{ base: "16px", md: "24px" }}
              fontWeight={"400"}
              lineHeight={"normal"}
            >
              Exchange everything with BachiSwap
            </Text>
          </Flex>
          <Flex
            flexDirection={"column"}
            // marginRight={{ base: "0px", md: "238px" }}
            gap={"41px"}
            width={"472px"}
          >
            <Text fontSize={{ base: "40px", md: "96px" }} lineHeight={"normal"}>
              Easy
            </Text>
            <Text
              fontSize={{ base: "24px", md: "40px" }}
              lineHeight={"normal"}
              fontFamily={"'Ubuntu Condensed', sans-serif"}
            >
              To use BachiSwap on both EVM and non-EVM evviroments
            </Text>
          </Flex>
          <Flex flexDirection={"column"} width={"472px"}>
            <Text fontSize={{ base: "40px", md: "96px" }} lineHeight={"normal"}>
              Grow
            </Text>
            <Text
              fontSize={{ base: "24px", md: "40px" }}
              lineHeight={"normal"}
              marginTop={"41px"}
              fontFamily={"'Ubuntu Condensed', sans-serif"}
            >
              With Bachi Ecosystem
            </Text>
            <Text
              fontSize={{ base: "16px", md: "24px" }}
              lineHeight={"normal"}
              marginTop={"58px"}
            >
              Grow with us!
            </Text>
          </Flex>
        </Flex>
      </SectionContainer>
    </div>
  );
};

export default BannerHome;
