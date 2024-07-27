import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
//import component
import CustomButton from "../../../components/button";
import SectionContainer from "../../../components/container";
//import image
import appBanner from "../../../assets/img/homepage/app-banner.png";
import appBannerMobile from "../../../assets/img/homepage/banner-homemobile.png";
import { base } from "viem/chains";
const BannerHome = () => {
  return (
    <>
      <SectionContainer position={"relative"}>
        <Flex
          flexDirection={"column"}
          marginTop={{ base: "18px", md: "24px", "2xl": "49px" }}
          width={{ base: "95%", sm: "97%", md: "70%", xl: "62%", "3xl": "59%" }}
          zIndex={"100"}
          position={"relative"}
        >
          <Text
            width={{ base: "87%", sm: "93%", xl: "100%" }}
            fontSize={{
              base: "36px",
              sm: "40px",
              md: "48px",
              xl: "88px",
              "3xl": "128px",
            }}
            fontWeight={400}
            lineHeight={{
              base: "40px",
              sm: "50px",
              md: "60px",
              xl: "100px",
              "2xl": "120px",
            }}
            marginBottom={{ base: "10px", sm: "20px", md: "30px", xl: "40px" }}
            fontFamily="var(--font-heading)"
          >
            Powerful GPU compute solutions on-demand
          </Text>
          <Text
            fontSize={{ base: "16px", md: "24px" }}
            fontWeight={400}
            marginBottom={{ base: "20px", md: "45px" }}
            fontFamily="var(--font-text-main)"
            lineHeight={"normal"}
            width={{ "3xl": "90%" }}
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
          display={{ base: "none", md: "block" }}
          src={appBanner}
          position={"absolute"}
          right={"0px"}
          top={{ base: "-90px", xl: "-130px" }}
          width={{ base: "1000px", "3xl": "1200px" }}
        />
        <Image
          display={{ base: "block", md: "none" }}
          src={appBannerMobile}
          position={"absolute"}
          top={"-80px"}
          right={"0px"}
        />
      </SectionContainer>
      <SectionContainer
        backgroundColor="var(--color-main)"
        marginTop={{ base: "42px", md: "50px" }}
        height={"100%"}
        z-index={"10"}
        position={"relative"}
      >
        <Flex
          paddingTop={{ base: "55px", md: "30px" }}
          justifyContent={"space-between"}
          paddingBottom={{
            base: "52px",
            md: "40px",
            "2xl": "50px",
            "3xl": "65px",
          }}
          wrap={{ base: "wrap", xl: "nowrap" }}
          gap={{ md: "5px", xl: "10px", "3xl": "160px" }}
        >
          <Flex
            flexDirection={"column"}
            alignItems={{ base: "center", md: "flex-start" }}
            width={{ base: "100%", md: "49%" }}
            paddingBottom={{ base: "63px", xl: "0px" }}
          >
            <Text
              fontSize={{
                base: "40px",
                md: "48px",
                "2xl": "68px",
                "3xl": "96px",
              }}
              fontWeight={"400"}
              lineHeight={"normal"}
              fontFamily="var(--font-heading)"
              marginBottom={{ base: "27px", "3xl": "41px" }}
            >
              43,000+
            </Text>
            <Text
              fontSize={{
                base: "24px",
                md: "28px",
                "2xl": "32px",
                "3xl": "40px",
              }}
              fontWeight={"400"}
              lineHeight={"normal"}
              fontFamily="var(--font-text-extra)"
              marginBottom={{ base: "21px", "3xl": "32px" }}
              textAlign={{ base: "center", md: "start" }}
            >
              Enterprise grade GPUs on-demand
            </Text>
            <Text
              fontSize={{
                base: "16px",
                md: "18px",
                "2xl": "20px",
                "3xl": "24px",
              }}
              fontWeight={"400"}
              lineHeight={"normal"}
              fontFamily="var(--font-text-main)"
              textAlign={{ base: "center", md: "start" }}
            >
              Over $400m worth of compute capacity.
            </Text>
          </Flex>
          <Flex
            flexDirection={"column"}
            alignItems={{ base: "center", md: "flex-start" }}
            width={{ base: "100%", md: "49%" }}
            paddingBottom={{ base: "63px", xl: "0px" }}
          >
            <Text
              fontSize={{
                base: "40px",
                md: "48px",
                "2xl": "68px",
                "3xl": "96px",
              }}
              lineHeight={"normal"}
              fontFamily="var(--font-heading)"
              marginBottom={{ base: "27px", "3xl": "41px" }}
            >
              23+
            </Text>
            <Text
              fontSize={{
                base: "24px",
                md: "28px",
                "2xl": "32px",
                "3xl": "40px",
              }}
              lineHeight={"normal"}
              fontFamily="var(--font-text-extra)"
              marginBottom={{ base: "21px", "3xl": "32px" }}
              textAlign={{ base: "center", md: "start" }}
            >
              Countries supported around the World
            </Text>
            <Text
              fontSize={{
                base: "16px",
                md: "18px",
                "2xl": "20px",
                "3xl": "24px",
              }}
              fontWeight={"400"}
              lineHeight={"normal"}
              fontFamily="var(--font-text-main)"
              textAlign={{ base: "center", md: "start" }}
            >
              Bringing you closer to the edge.
            </Text>
          </Flex>
          <Flex
            flexDirection={"column"}
            alignItems={{ base: "center", md: "flex-start" }}
            width={{ base: "100%", md: "49%" }}
          >
            <Text
              fontSize={{
                base: "40px",
                md: "48px",
                "2xl": "68px",
                "3xl": "96px",
              }}
              lineHeight={"normal"}
              fontFamily="var(--font-heading)"
              marginBottom={{ base: "27px", "3xl": "41px" }}
            >
              99.99+
            </Text>
            <Text
              fontSize={{
                base: "24px",
                md: "28px",
                "2xl": "32px",
                "3xl": "40px",
              }}
              lineHeight={"normal"}
              marginBottom={{ base: "21px", "3xl": "58px" }}
              fontFamily="var(--font-text-extra)"
            >
              Uptime
            </Text>
            <Text
              fontSize={{
                base: "16px",
                md: "18px",
                "2xl": "20px",
                "3xl": "24px",
              }}
              lineHeight={"normal"}
              fontFamily="var(--font-text-main)"
              textAlign={{ base: "center", md: "start" }}
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
