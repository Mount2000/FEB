import { Flex, Image, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
//import component
import CustomButton from "../button";
//import image
import appLogo from "../../assets/img/app-logo.png";

const BachiSwapFooter = () => {
  return (
    <>
      <Flex flexDirection={"column"} gap={"102px"}>
        <Flex justifyContent={"space-around"} marginTop={"187px"}>
          <Flex flexDirection={"column"} gap={"82px"}>
            <Flex alignItems={"center"} gap={"24.14px"}>
              <Image src={appLogo} />
              <Text
                fontSize={{ base: "32px", md: "64px" }}
                fontFamily={`'Bruno Ace', sans-serif`}
              >
                BachiSwap
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={"19px"}>
              <CustomButton>Get Started</CustomButton>
              <CustomButton>Become a partner</CustomButton>
            </Flex>
          </Flex>
          <Flex flexDirection={"column"}>
            <Flex>
              <Flex flexDirection={"column"} marginRight={"164px"}>
                <Text fontSize={{ base: "24px", md: "32px" }} color={"#E42493"}>
                  QUICKLINKS
                </Text>
                <Text fontSize={{ base: "16px", md: "24px" }} fontWeight={400}>
                  Airdrop
                </Text>
              </Flex>
              <Flex flexDirection={"column"} marginRight={"140px"}>
                <Text fontSize={{ base: "24px", md: "32px" }} color={"#E42493"}>
                  RESOURCES
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={400}
                >
                  <ListItem>Ecosystem</ListItem>
                  <ListItem>Docs</ListItem>
                  <ListItem>Blog</ListItem>
                </UnorderedList>
              </Flex>
              <Flex flexDirection={"column"}>
                <Text fontSize={{ base: "24px", md: "32px" }} color={"#E42493"}>
                  COMMUNITY
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={400}
                >
                  <ListItem>Linkedln</ListItem>
                  <ListItem>X</ListItem>
                  <ListItem>Discord</ListItem>
                  <ListItem>Ecosystem X</ListItem>
                  <ListItem>Telegram</ListItem>
                  <ListItem>Reddit</ListItem>
                  <ListItem>Youtube</ListItem>
                </UnorderedList>
              </Flex>
            </Flex>
            <Flex>
              <Flex flexDirection={"column"} marginRight={"180px"}>
                <Text fontSize={{ base: "24px", md: "32px" }} color={"#E42493"}>
                  SOLUTIONS
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={400}
                >
                  <ListItem>Ai</ListItem>
                  <ListItem>Gaming</ListItem>
                </UnorderedList>
              </Flex>
              <Flex flexDirection={"column"}>
                <Text fontSize={{ base: "24px", md: "32px" }} color={"#E42493"}>
                  WEB3
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={400}
                >
                  <ListItem>Checker Nodes</ListItem>
                  <ListItem>Staking</ListItem>
                </UnorderedList>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          gap={{ base: "0px", md: "145px" }}
          marginLeft={"60px"}
          fontSize={"20px"}
          fontWeight={500}
          color={"#757575"}
        >
          <Text marginRight={{ base: "58px", md: "0px" }}>© 2024 BACHI</Text>
          <Text marginRight={{ base: "50px", md: "0px" }}>Privacy policy</Text>
          <Text>Terms</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default BachiSwapFooter;
