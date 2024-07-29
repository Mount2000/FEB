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
        top={"380px"}
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
            // gap={"80px"}
            wrap={"wrap"}
            borderBottom="1px solid #FCDDEC"
            width={"100%"}
            marginTop={{ base: "47px", "2xl": "99px" }}
          >
            {productTab.map((e, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => setcurrentTab(index)}
                  cursor={"pointer"}
                  padding={"12px 0"}
                  borderBottom={
                    currentTab === index
                      ? {
                          base: "3px solid var(--color-main)",
                          "2xl": "5px solid var(--color-main)",
                        }
                      : "none"
                  }
                  zIndex={"10"}
                >
                  <Text
                    fontSize={{ base: "16px", "2xl": "32px", "3xl": "36px" }}
                    fontWeight={400}
                    lineHeight={"normal"}
                    fontFamily="var(--font-heading-main)"
                    color={currentTab == index ? "var(--color-main)" : "#FFF"}
                  >
                    {e?.title}
                  </Text>
                </Box>
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
