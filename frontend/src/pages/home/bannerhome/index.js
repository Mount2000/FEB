import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
//import component
import CustomButton from "../../../components/button";
import SectionContainer from "../../../components/container";
//import image
import appBanner from "../../../assets/img/homepage/app-banner.png";
import appBannerTabnet from "../../../assets/img/homepage/banner-hometabnet.png";
import appBannerMobile from "../../../assets/img/homepage/banner-homemobile.png";
import MainButton from "../../../components/button/MainButton";
import { enumMenu } from "../../../utils/contants";
import { Link } from "react-router-dom";

import { useTab } from "../../../contexts/useTab";

const BannerHome = () => {
  const { setFarmTab, setMenuActive } = useTab();
  const conectLink = () => {
    setFarmTab(0);
    window.scrollTo(0, 0);
    setMenuActive(enumMenu[0].name);
  };
  return (
    <>
      <SectionContainer position={"relative"}>
        <Flex
          flexDirection={"column"}
          padding={{
            base: "28px 0px 28px 24px",
            md: "36px 0px 48px 36px",
            lg: "56px 100px 184px 64px",
            xl: "54.5px 100px 120px 100px",
            "3xl": "54.5px 120px 160px 120px",
          }}
          width={{
            base: "95%",
            sm: "97%",
            md: "80%",
            lg: "89%",
            xl: "68%",
            "2xl": "62%",
            "3xl": "59%",
          }}
          zIndex={"100"}
          position={"relative"}
        >
          <Text
            width={{
              base: "87%",
              sm: "86%",
              lg: "89%",
              xl: "100%",
              "2xl": "90%",
              "3xl": "100%",
            }}
            fontSize={{
              base: "36px",
              sm: "40px",
              md: "64px",
              lg: "96px",
              "2xl": "100px",
              "3xl": "130px",
            }}
            fontWeight={400}
            lineHeight={{
              base: "40px",
              sm: "48px",
              md: "64px",
              lg: "106px",
              "2xl": "120px",
              "3xl": "144.3px",
            }}
            marginBottom={{
              base: "10px",
              sm: "16px",
              md: "30px",
              lg: "40px",
              "3xl": "48px",
            }}
            fontFamily="var(--font-heading)"
            letterSpacing={"-1px"}
          >
            Swap everything on TAIKO
          </Text>
          <Text
            fontSize={{ base: "16px", md: "24px" }}
            fontWeight={400}
            marginBottom={{
              base: "10px",
              sm: "16px",
              md: "30px",
              lg: "40px",
              "3xl": "48px",
            }}
            fontFamily="var(--font-text-main)"
            lineHeight={{ base: "24px", md: "32px" }}
            width={{ lg: "95%", "2xl": "98%", "3xl": "85%" }}
          >
            Welcome to BachiSwap, the ultimate AMM DEX. Including Layer 1 and
            Layer 2 solutions, as well as both EVM and non-EVM environments.
            With BachiSwap, effortlessly swap any token and transfer your assets
            across different networks with ease
          </Text>
          <Link to={"/node"} onClick={conectLink}>
            <MainButton
              borderRadius={{ base: "8px", md: "12px" }}
              width={{ base: "163px", md: "193px", lg: "193px", xl: "230px" }}
              height={{ base: "44px", md: "54px", lg: "64px" }}
              backgroundColor="var(--color-main)"
            >
              <Text
                fontSize={{
                  base: "16px",
                  md: "20px",
                  lg: "20px",
                  "3xl": "24px",
                }}
                lineHeight={{ "3xl": "32px" }}
                color={"#FFF"}
                fontWeight={400}
                fontFamily={"var(--font-heading-main)"}
              >
                Launch App
              </Text>
            </MainButton>
          </Link>
        </Flex>
        <Image
          display={{ base: "none", xl: "block" }}
          src={appBanner}
          position={"absolute"}
          right={"0px"}
          top={{ base: "-90px", xl: "-130px", "3xl": "-180px" }}
          width={{ base: "1000px", "3xl": "1200px" }}
        />
        <Image
          src={appBannerTabnet}
          display={{ base: "none", md: "block", xl: "none" }}
          position={"absolute"}
          top={"-80px"}
          right={"0px"}
        />
        <Image
          display={{ base: "block", md: "none" }}
          src={appBannerMobile}
          position={"absolute"}
          top={"0px"}
          right={"0px"}
        />
      </SectionContainer>
      <SectionContainer
        padding={{
          base: "64px 40px 64px 40px",
          lg: "40px 64px 40px 64px",
          xl: "40px 86px 40px 86px",
          "2xl": "41px 100px 41px 100px",
          "3xl": "41px 162px 41px 162px",
        }}
        backgroundColor="var(--color-main)"
        height={"100%"}
        z-index={"10"}
        position={"relative"}
      >
        <Flex flexDirection={"column"} alignItems={"stretch"}>
          <Flex
            justifyContent={"space-between"}
            paddingBottom={{
              base: "0px",
              lg: "32px",
              xl: "42px",
            }}
            wrap={{ base: "wrap", lg: "nowrap" }}
            gap={{
              base: "64px",
              md: "10px",
              lg: "100px",
              xl: "170px",
              "2xl": "200px",
              "3xl": "227px",
            }}
          >
            <Flex
              justifyContent={"space-between"}
              flexDirection={"column"}
              alignItems={{ base: "center", md: "flex-start" }}
              width={{
                base: "100%",
                md: "49%",
                lg: "209px",
                xl: "240px",
                "3xl": "408px",
              }}
              gap={{ base: "16px", lg: "0px" }}
              // marginBottom={{ base: "0px", md: "60px", lg: "0px" }}
            >
              <Text
                width={{ lg: "209px", xl: "240px", "3xl": "408px" }}
                fontSize={{
                  base: "40px",
                  lg: "48px",
                  "2xl": "68px",
                  "3xl": "96px",
                }}
                fontWeight={"400"}
                lineHeight={{ base: "48px" }}
                fontFamily="var(--font-heading)"
                letterSpacing={"-1px"}
              >
                100+
              </Text>
              <Text
                display={{ base: "block", lg: "none" }}
                fontSize={{
                  base: "24px",
                  lg: "32px",
                  "3xl": "40px",
                }}
                fontWeight={"400"}
                lineHeight={{ base: "32px" }}
                fontFamily="var(--font-text-extra)"
                textAlign={{ base: "center", md: "start" }}
              >
                Supported Tokens Pair
              </Text>
              <Text
                display={{ base: "block", lg: "none" }}
                fontSize={{
                  base: "16px",
                  "2xl": "20px",
                  "3xl": "24px",
                }}
                fontWeight={"400"}
                lineHeight={{ base: "24px" }}
                fontFamily="var(--font-text-main)"
                textAlign={{ base: "center", md: "start" }}
              >
                Exchange everything with BachiSwap
              </Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              alignItems={{ base: "center", md: "flex-start" }}
              width={{
                base: "100%",
                md: "49%",
                lg: "245px",
                xl: "285px",
                "2xl": "400px",
                "3xl": "426px",
              }}
              gap={{ base: "16px", lg: "0px" }}
            >
              <Text
                textAlign={{ base: "start", lg: "center" }}
                width={{
                  lg: "245px",
                  xl: "285px",
                  "2xl": "400px",
                  "3xl": "426px",
                }}
                fontSize={{
                  base: "40px",
                  lg: "48px",
                  "2xl": "68px",
                  "3xl": "96px",
                }}
                lineHeight={{ base: "48px" }}
                letterSpacing={"-1px"}
                fontFamily="var(--font-heading)"
              >
                Easy
              </Text>
              <Text
                display={{ base: "block", lg: "none" }}
                fontSize={{
                  base: "24px",
                  lg: "32px",

                  "3xl": "40px",
                }}
                lineHeight={{ base: "32px" }}
                fontFamily="var(--font-text-extra)"
                textAlign={{ base: "center", md: "start" }}
              >
                To use BachiSwap on both EVM and non-EVM evviroments
              </Text>
              <Text
                display={{ base: "block", lg: "none" }}
                fontSize={{
                  base: "16px",
                  "2xl": "20px",
                  "3xl": "24px",
                }}
                fontWeight={"400"}
                lineHeight={{ base: "24px" }}
                fontFamily="var(--font-text-main)"
                textAlign={{ base: "center", md: "start" }}
              >
                Bringing you closer to the edge.
              </Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              alignItems={{ base: "center", md: "flex-start" }}
              width={{
                base: "100%",
                md: "49%",
                lg: "237px",

                "3xl": "307px",
              }}
              gap={{ base: "16px", lg: "0px" }}
            >
              <Text
                width={{ lg: "237px", "3xl": "307px" }}
                fontSize={{
                  base: "40px",
                  md: "40px",
                  "2xl": "68px",
                  "3xl": "96px",
                }}
                lineHeight={{ base: "48px" }}
                letterSpacing={"-1px"}
                fontFamily="var(--font-heading)"
              >
                Grow
              </Text>
              <Text
                display={{ base: "block", lg: "none" }}
                fontSize={{
                  base: "24px",
                  md: "24px",
                  lg: "32px",
                  "3xl": "40px",
                }}
                lineHeight={{ base: "32px" }}
                fontFamily="var(--font-text-extra)"
                letterSpacing={"-1px"}
                textAlign={{ base: "center", md: "start" }}
              >
                With Bachi Ecosystem
              </Text>
              <Text
                display={{ base: "block", lg: "none" }}
                fontSize={{
                  base: "16px",
                  md: "16px",
                  "2xl": "20px",
                  "3xl": "24px",
                }}
                lineHeight={{ base: "24px" }}
                fontFamily="var(--font-text-main)"
                textAlign={{ base: "center", md: "start" }}
              >
                Grow with us!
              </Text>
            </Flex>
          </Flex>
          <Flex
            display={{ base: "none", lg: "flex" }}
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingBottom={{
              base: "52px",
              md: "40px",
              xl: "42px",
            }}
            gap={{
              md: "5px",
              lg: "100px",
              xl: "170px",
              "2xl": "200px",
              "3xl": "227px",
            }}
          >
            <Flex
              flexDirection={"column"}
              alignItems={{ base: "center", md: "flex-start" }}
              width={{
                base: "100%",
                md: "49%",
                lg: "209px",
                xl: "240px",
                "3xl": "408px",
              }}
            >
              <Text
                width={{ lg: "209px", xl: "240px", "3xl": "408px" }}
                fontSize={{
                  base: "24px",
                  md: "28px",
                  xl: "32px",
                  "3xl": "40px",
                }}
                fontWeight={"400"}
                lineHeight={"normal"}
                fontFamily="var(--font-text-extra)"
              >
                Supported Tokens Pair
              </Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              alignItems={{ base: "center", md: "flex-start" }}
              width={{
                base: "100%",
                md: "49%",
                lg: "245px",
                xl: "285px",
                "2xl": "400px",
                "3xl": "426px",
              }}
            >
              <Text
                width={{
                  lg: "245px",
                  xl: "285px",
                  "2xl": "400px",
                  "3xl": "426px",
                }}
                fontSize={{
                  base: "24px",
                  md: "28px",
                  xl: "32px",
                  "3xl": "40px",
                }}
                lineHeight={"normal"}
                fontFamily="var(--font-text-extra)"
                textAlign={{ base: "center" }}
                letterSpacing={"-1px"}
              >
                To use BachiSwap on both EVM and non-EVM evviroments
              </Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              alignItems={{ base: "center", md: "flex-start" }}
              width={{ base: "100%", md: "49%", lg: "237px", "3xl": "307px" }}
            >
              <Text
                width={{ lg: "237px", "3xl": "307px" }}
                fontSize={{
                  base: "24px",
                  md: "28px",
                  xl: "32px",
                  "3xl": "40px",
                }}
                lineHeight={"normal"}
                fontFamily="var(--font-text-extra)"
                letterSpacing={"-1px"}
              >
                With Bachi Ecosystem
              </Text>
            </Flex>
          </Flex>
          <Flex
            flex={"1"}
            display={{ base: "none", lg: "flex" }}
            justifyContent={"space-between"}
            gap={{
              md: "5px",
              lg: "100px",
              xl: "170px",
              "2xl": "200px",
              "3xl": "227px",
            }}
          >
            <Flex
              flexDirection={"column"}
              alignItems={{ base: "center", md: "flex-start" }}
              width={{
                base: "100%",
                md: "49%",
                lg: "209px",
                xl: "240px",
                "3xl": "408px",
              }}
              // paddingBottom={{ base: "63px", xl: "0px" }}
            >
              <Text
                width={{ lg: "209px", xl: "240px", "3xl": "408px" }}
                fontSize={{
                  base: "16px",
                  md: "18px",
                  lg: "20px",
                  xl: "22px",
                  "3xl": "24px",
                }}
                fontWeight={"400"}
                lineHeight={"normal"}
                fontFamily="var(--font-text-main)"
                textAlign={{ base: "center", md: "start" }}
              >
                Exchange everything with BachiSwap
              </Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              alignItems={{ base: "center", md: "flex-start" }}
              width={{
                base: "100%",
                md: "49%",
                lg: "245px",
                xl: "285px",
                "2xl": "400px",
                "3xl": "426px",
              }}
              // paddingBottom={{ base: "63px", xl: "0px" }}
            >
              <Text
                width={{
                  lg: "245px",
                  xl: "285px",
                  "2xl": "400px",
                  "3xl": "426px",
                }}
                fontSize={{
                  base: "16px",
                  md: "18px",
                  lg: "20px",
                  xl: "22px",
                  "3xl": "24px",
                }}
                fontWeight={"400"}
                lineHeight={"normal"}
                fontFamily="var(--font-text-main)"
                textAlign={{ base: "center" }}
              >
                Bringing you closer to the edge.
              </Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              alignItems={{ base: "center", md: "flex-start" }}
              width={{ base: "100%", md: "49%", lg: "237px", "3xl": "307px" }}
            >
              <Text
                width={{ lg: "237px" }}
                fontSize={{
                  base: "16px",
                  md: "18px",
                  lg: "20px",
                  xl: "22px",
                  "3xl": "24px",
                }}
                lineHeight={"normal"}
                fontFamily="var(--font-text-main)"
                textAlign={{ base: "center", md: "start" }}
              >
                Grow with us!
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </SectionContainer>
    </>
  );
};

export default BannerHome;
