import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
//import component
import CommonButton from "../../../components/button/commonbutton";
//import image
import appLogo from "../../../assets/img/app-logo.png";
import backgroundHome from "../../../assets/img/homepage/background-home.png";
//import icon
import { HiArrowSmRight } from "react-icons/hi";
import { base } from "viem/chains";

const BackgroundHome = () => {
  return (
    <Box
      backgroundImage={`url(${backgroundHome})`}
      backgroundSize={{ base: "cover", lg: "100% 105%" }}
      backgroundPosition={{ base: "bottom", lg: "bottom" }}
      backgroundRepeat={"no-repeat"}
      // height={"300px"}
      padding={{ base: "40px 24px 40px 24px", lg: "38px 92px 38px 92px" }}
      zIndex={"1"}
      position={"relative"}
    >
      <Flex flexDirection={"column"} alignItems={"center"} zIndex={"1"}>
        <Image
          width={{ base: "140.897px", "3xl": "235px" }}
          height={{ base: "60px", "3xl": "100px" }}
          src={appLogo}
          // marginTop={"225px"}
          marginBottom={{ base: "32px", lg: "48px", "3xl": "36px" }}
        />
        <Text
          letterSpacing={"-1px"}
          fontSize={{ base: "40px", lg: "40px", "2xl": "64px", "3xl": "86px" }}
          lineHeight={{ base: "48px" }}
          fontFamily="var(--font-heading)"
          textAlign={"center"}
          marginBottom={{ base: "40px", lg: "48px", "2xl": "112px" }}
        >
          Earn $TAIKO and $BACHI by using BachiSwap today
        </Text>
        <Flex
          alignItems={"center"}
          gap={{ base: "24px", lg: "48px", "2xl": "48px" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box
            width={"100%"}
            height={"100%"}
            sx={{
              backdropFilter: "blur(10px) !important",
              clipPath:
                "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
              "::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "20px",
                height: "20px",
                backgroundColor: "pink.500",
                clipPath: "polygon(0 100%, 100% 0, 0 0)",
              },
              "::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "20px",
                height: "20px",
                backgroundColor: "pink.500",
                clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
              },
              "@media (max-width: 992px)": {
                clipPath:
                  "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                "::before": {
                  width: "20px",
                  height: "20px",
                  backgroundColor: "pink.500",
                },
                "::after": {
                  width: "20px",
                  height: "20px",
                  backgroundColor: "pink.500",
                },
              },
            }}
            backgroundColor={"rgba(27, 27, 27, 0.20)"}
          >
            <CommonButton
              border="0.5px solid var(--color-main)"
              boxShadow={"inset 0 0 10px var(--color-main)"}
              position="relative"
              zIndex="10"
            >
              <Flex
                flexDirection={"column"}
                padding={{
                  base: "24px 21px 20px 24px",
                  lg: "16px 20px 16px 20px",
                }}
                gap={{ base: "16px", lg: "32px", "2xl": "22px" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Text
                    lineHeight={"32px"}
                    letterSpacing={"-1px"}
                    fontSize={{
                      base: "24px",

                      "2xl": "36px",
                      "3xl": "40px",
                    }}
                    fontFamily="var(--font-text-extra)"
                    color="var(--color-main)"
                  >
                    CLICK TO EARN!
                  </Text>
                  <Button
                    sx={{
                      backdropFilter: "blur(10px) !important",
                      clipPath:
                        "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%) ",
                      "::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "10px",
                        height: "10px",
                        backgroundColor: "pink.500",
                        clipPath: "polygon(0 100%, 100% 0, 0 0)",
                      },
                      "::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: "10px",
                        height: "10px",
                        backgroundColor: "pink.500",
                        clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                      },
                    }}
                    width={{ base: "40px", lg: "40px", "3xl": "61px" }}
                    height={{ base: "40px", lg: "40px", "3xl": "61px" }}
                    backgroundColor="var(--color-main)"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Box sx={{ transform: "rotate(-45deg)" }}>
                      <HiArrowSmRight fontSize={"30px"} color="#000" />
                    </Box>
                  </Button>
                </Flex>
                <Text
                  letterSpacing={"-1px"}
                  lineHeight={{ base: "28px" }}
                  width={{ base: "80%", lg: "100%" }}
                  fontSize={{ base: "20px", "2xl": "24px", "3xl": "36px" }}
                  fontFamily="var(--font-heading-main)"
                >
                  Setup your gears and earn $TAIKO and $BACHI today
                </Text>
              </Flex>
            </CommonButton>
          </Box>
          <Box
            width={"100%"}
            height={"100%"}
            sx={{
              backdropFilter: "blur(10px) !important",
              clipPath:
                "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
              "::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "20px",
                height: "20px",
                backgroundColor: "pink.500",
                clipPath: "polygon(0 100%, 100% 0, 0 0)",
              },
              "::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "20px",
                height: "20px",
                backgroundColor: "pink.500",
                clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
              },
              "@media (max-width: 992px)": {
                clipPath:
                  "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                "::before": {
                  width: "20px",
                  height: "20px",
                  backgroundColor: "pink.500",
                },
                "::after": {
                  width: "20px",
                  height: "20px",
                  backgroundColor: "pink.500",
                },
              },
            }}
          >
            <CommonButton
              backgroundColor={"rgba(27, 27, 27, 0.20)"}
              boxShadow={"inset 0 0 10px var(--color-main)"}
              border="0.5px solid var(--color-main)"
              position="relative"
              zIndex="10"
            >
              <Flex
                flexDirection={"column"}
                padding={{
                  base: "24px 21px 20px 24px",
                  lg: "16px 20px 16px 20px",
                }}
                gap={{ base: "16px", lg: "32px", "2xl": "22px" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Text
                    fontSize={{
                      base: "24px",

                      "2xl": "36px",
                      "3xl": "40px",
                    }}
                    fontFamily="var(--font-text-extra)"
                    color="var(--color-main)"
                  >
                    AIRDROP SEASON I
                  </Text>
                  <Button
                    sx={{
                      backdropFilter: "blur(10px) !important",
                      clipPath:
                        "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%) ",
                      "::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "10px",
                        height: "10px",
                        backgroundColor: "pink.500",
                        clipPath: "polygon(0 100%, 100% 0, 0 0)",
                      },
                      "::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: "10px",
                        height: "10px",
                        backgroundColor: "pink.500",
                        clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                      },
                    }}
                    width={{ base: "40px", lg: "40px", "3xl": "61px" }}
                    height={{ base: "40px", lg: "40px", "3xl": "61px" }}
                    backgroundColor="var(--color-main)"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Box sx={{ transform: "rotate(-45deg)" }}>
                      <HiArrowSmRight fontSize={"30px"} color="#000" />
                    </Box>
                  </Button>
                </Flex>
                <Text
                  letterSpacing={"-1px"}
                  lineHeight={{ base: "28px" }}
                  width={{ base: "80%", lg: "100%" }}
                  fontSize={{ base: "20px", "2xl": "24px", "3xl": "36px" }}
                  fontFamily="var(--font-heading-main)"
                >
                  Join the Bachi communities and win our Airdrop!
                </Text>
              </Flex>
            </CommonButton>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BackgroundHome;
