import React, { useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import component
import SectionContainer from "../../../components/container";
import Earning from "./earning";
import MintRune from "./mintrune";
import RuneExplorer from "./runeexplorer";
import Rank from "./rank";
import ReferralProgram from "./referralprogram";
//import image
import backgroundNode from "../../../assets/img/node/background-node.png";
import backgroundReferral from "../../../assets/img/node/background-referral.png";
import { base } from "viem/chains";
const ProductNode = () => {
  const [currentTab, setcurrentTab] = useState(0);

  const productTab = [
    {
      title: "Earning",
      content: <Earning />,
    },
    {
      title: "Mint Rune",
      content: <MintRune />,
    },
    {
      title: "Rune Explorer",
      content: <RuneExplorer />,
    },
    {
      title: "Referral Program",
      content: <ReferralProgram />,
    },
    {
      title: "Rank",
      content: <Rank />,
    },
  ];

  return (
    <>
      <Image
        src={backgroundNode}
        position={"absolute"}
        right={"0px"}
        top={"70px"}
      />
      <Image
        src={backgroundReferral}
        position={"absolute"}
        right={"0"}
        top={{ base: "280px", md: "380px" }}
      />
      <SectionContainer
        paddingLeft={{ base: "25px", "2xl": "44px" }}
        paddingRight={{ base: "25px", "2xl": "40px" }}
        position={"relative"}
      >
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Text
            fontSize={{ base: "24px", "2xl": "64px" }}
            fontWeight={400}
            fontFamily="var(--font-heading)"
            textAlign={"center"}
            paddingTop={{ base: "50px", "2xl": "135px" }}
          >
            Farm
          </Text>
          <Flex
            justifyContent={"space-around"}
            // gap={"20px"}
            wrap={"wrap"}
            width={"100%"}
            marginTop={{ base: "47px", "2xl": "99px" }}
          >
            {productTab.map((e, index) => {
              return (
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  key={index}
                  onClick={() => setcurrentTab(index)}
                  cursor={"pointer"}
                  padding={"12px 5px 0px 5px"}
                  zIndex={"10"}
                  borderBottom="1px solid #FCDDEC"
                  flex={"1 1 0"}
                >
                  <Text
                    position={"relative"}
                    paddingBottom={"12px"}
                    _before={{
                      content: '""',
                      position: "absolute",
                      bottom: "-1px",
                      left: 0,
                      width: "100%",
                      height: {
                        base: currentTab === index ? "3px" : "0",
                        "2xl": currentTab === index ? "5px" : "0",
                      },
                      backgroundColor: "var(--color-main)",
                      // transition: "height 0.3s ease",
                    }}
                    fontSize={{
                      base: "16px",
                      md: "24px",
                      "2xl": "32px",
                      "3xl": "36px",
                    }}
                    fontWeight={400}
                    lineHeight={"normal"}
                    fontFamily="var(--font-heading-main)"
                    color={currentTab == index ? "var(--color-main)" : "#FFF"}
                    textAlign={"center"}
                    whiteSpace="nowrap"
                  >
                    {e?.title}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
        <Box>{productTab[currentTab].content}</Box>
      </SectionContainer>
    </>
  );
};

export default ProductNode;
