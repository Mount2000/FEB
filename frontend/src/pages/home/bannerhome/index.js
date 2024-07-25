import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
//import component
import CustomButton from "../../../components/button";
import SectionContainer from "../../../components/container";
//import image
import appBanner from "../../../assets/img/homepage/app-banner.png";

const BannerHome = () => {
  return (
    <>
      <SectionContainer position={"relative"}>
        <Flex
          flexDirection={"column"}
          marginTop={{ base: "18px", md: "49px" }}
          width={{ base: "90%", md: "80%", xl: "60%" }}
          zIndex={"100"}
          position={"relative"}
        >
          <Text
            fontSize={{ base: "40px", md: "68px", "2xl": "88px" }}
            fontWeight={400}
            lineHeight={{ base: "50px", md: "70px", "2xl": "100px" }}
            marginBottom={{ base: "20px", md: "45px" }}
            fontFamily="var(--font-heading)"
          >
            Powerful GPU compute solutions on-demand
          </Text>
          <Text
            fontSize={{ base: "16px", md: "24px" }}
            fontWeight={400}
            marginBottom={{ base: "20px", md: "58px" }}
            fontFamily="var(--font-text-main)"
            lineHeight={"normal"}
          >
            Accelerate growth and get closer to the edge with Aethir's
            distributed cloud compute infrastructure. We provide secure,
            cost-effective access to enterprise grade GPUs around the world.
          </Text>
          <CustomButton
            width={{ base: "140px", md: "230px" }}
            height={{ base: "40px", md: "66px" }}
            backgroundColor="var(--color-main)"
          >
            <Text fontSize={{ base: "16px", md: "20px" }}>Launch App</Text>
          </CustomButton>
        </Flex>
        <Image
          src={appBanner}
          position={"absolute"}
          right={"0px"}
          top={"-70px"}
          width={"100%"}
        />
      </SectionContainer>
      <SectionContainer
        backgroundColor="var(--color-main)"
        marginTop={{ base: "42px", md: "50px" }}
        height={{ base: "669px", md: "400px" }}
        z-index={"10"}
        position={"relative"}
      >
        <Flex
          paddingTop={{ base: "55px", md: "30px" }}
          justifyContent={"space-between"}
          // flexWrap={wrap}
        >
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
    </>
  );
};

export default BannerHome;
