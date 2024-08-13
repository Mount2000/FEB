import React, { useRef } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import component
import SectionContainer from "../../components/container";
import CustomButton from "../../components/button";
//import image
import backgroundNode from "../../assets/img/node/background-node.png";
import { useTab } from "../../contexts/useTab";
import SocialQuest from "./socialQuest";
import NodeQuest from "./nodeQuest";

const AirDrop = () => {
  const { farmTab, setFarmTab } = useTab();

  const productTab = [
    {
      title: "SocialQuest",
      content: <SocialQuest />,
    },
    {
      title: "NodeQuest",
      content: <NodeQuest />,
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
        px={{ base: "25px", xl: "48px", "3xl": "68px" }}
        marginBottom={"24px"}
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
            BachiSwap Airdrop
          </Text>
          <Flex
            justifyContent={{ base: "center", xl: "flex-start" }}
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
                  onClick={() => setFarmTab(index)}
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
                        base: farmTab === index ? "3px" : "0",
                        "2xl": farmTab === index ? "5px" : "0",
                      },
                      backgroundColor: "var(--color-main)",
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
                    color={farmTab == index ? "var(--color-main)" : "#FFF"}
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
        <Box>{productTab[farmTab].content}</Box>
      </SectionContainer>
    </>
  );
};

export default AirDrop;
