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
      <SectionContainer
        marginLeft={"44px"}
        marginRight={"40px"}
        paddingLeft={"0px"}
        paddingRight={"0px"}
        position={"relative"}
      >
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Text
            fontSize={"64px"}
            fontWeight={400}
            fontFamily="var(--font-heading)"
            textAlign={"center"}
            marginTop={"135px"}
          >
            Farm
          </Text>
          <Flex
            justifyContent={"center"}
            gap={"50px"}
            borderBottom="1px solid #FCDDEC"
            width={"100%"}
            marginTop={"99px"}
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
                      ? "5px solid var(--color-main)"
                      : "none"
                  }
                  zIndex={"10"}
                >
                  <Text
                    fontSize={"36px"}
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
