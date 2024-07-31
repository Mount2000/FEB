import {
  Box,
  Flex,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
//import component
import CustomButton from "../button";
import SectionContainer from "../container";
//import image
import appLogo from "../../assets/img/app-logo.png";

const BachiSwapFooter = () => {
  return (
    <>
      <SectionContainer>
        <Flex
          flexDirection={"column"}
          gap={{ base: "42px", "2xl": "102px" }}
          paddingBottom={{ base: "65px", xl: "132px" }}
        >
          <Flex
            justifyContent={"space-between"}
            marginTop={{ base: "61px", xl: "260px", "2xl": "187px" }}
            flexDirection={{ base: "column", xl: "row" }}
            gap={{ base: "49px", xl: "200px", "2xl": "350px" }}
          >
            <Flex
              flexDirection={"column"}
              gap={{ base: "41px", "2xl": "82px" }}
            >
              <Flex alignItems={"center"} gap={"24.14px"}>
                <Image src={appLogo} />
                <Text
                  fontSize={{ base: "32px", md: "64px" }}
                  fontFamily={`'Bruno Ace', sans-serif`}
                >
                  BachiSwap
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={{ base: "13px", md: "19px" }}>
                <CustomButton
                  backgroundColor="var(--color-main)"
                  width={{ base: "142px", md: "183px" }}
                  height={{ base: "46px", md: "70px" }}
                >
                  Get Started
                </CustomButton>
                <CustomButton
                  border={"0.5px solid #EB7FB3"}
                  backgroundColor={"transparent"}
                  width={{ base: "174px", md: "235px" }}
                  height={{ base: "46px", md: "70px" }}
                >
                  Become a partner
                </CustomButton>
              </Flex>
            </Flex>
            <Flex wrap={"wrap"} gap={{ base: "70px" }}>
              <Flex flexDirection={"column"} width={{ base: "40%" }}>
                <Text
                  fontSize={{ base: "24px", md: "32px" }}
                  fontFamily="var(--font-text-extra)"
                  color={"#E42493"}
                >
                  QUICKLINKS
                </Text>
                <Text
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={400}
                  fontFamily={"var(--font-text-main)"}
                >
                  Airdrop
                </Text>
              </Flex>
              <Flex flexDirection={"column"} width={{ base: "40%" }}>
                <Text
                  fontSize={{ base: "24px", md: "32px" }}
                  color={"#E42493"}
                  fontFamily="var(--font-text-extra)"
                >
                  RESOURCES
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={400}
                  fontFamily={"var(--font-text-main)"}
                >
                  <ListItem>Ecosystem</ListItem>
                  <ListItem>Docs</ListItem>
                  <ListItem>Blog</ListItem>
                </UnorderedList>
              </Flex>
              <Flex flexDirection={"column"} width={{ base: "40%" }}>
                <Text
                  fontSize={{ base: "24px", md: "32px" }}
                  color="var(--color-main)"
                  fontFamily="var(--font-text-extra)"
                >
                  COMMUNITY
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={400}
                  fontFamily="var( --font-text-main)"
                >
                  <ListItem>X</ListItem>
                  <ListItem>Discord</ListItem>
                  <ListItem>Youtube</ListItem>
                </UnorderedList>
              </Flex>
              <Flex flexDirection={"column"} width={{ base: "40%" }}>
                <Text
                  fontSize={{ base: "24px", md: "32px" }}
                  color={"#E42493"}
                  fontFamily="var(--font-text-extra)"
                >
                  SOLUTIONS
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={400}
                  fontFamily={"var(--font-text-main)"}
                >
                  <ListItem>Ai</ListItem>
                  <ListItem>Gaming</ListItem>
                </UnorderedList>
              </Flex>
              <Flex flexDirection={"column"} width={{ base: "40%" }}>
                <Text
                  fontSize={{ base: "24px", md: "32px" }}
                  color={"#E42493"}
                  fontFamily="var(--font-text-extra)"
                >
                  WEB3
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={400}
                  fontFamily={"var(--font-text-main)"}
                >
                  <ListItem>Checker Nodes</ListItem>
                  <ListItem>Staking</ListItem>
                </UnorderedList>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            gap={{ base: "0px", md: "145px" }}
            justifyContent={{ base: "space-between", md: "flex-start" }}
            fontSize={{ base: "16px", "2xl": "20px" }}
            fontWeight={500}
            color={"#757575"}
          >
            <Text>© 2024 BACHI</Text>
            <Text>Privacy policy</Text>
            <Text>Terms</Text>
          </Flex>
        </Flex>
      </SectionContainer>
    </>
  );
};

export default BachiSwapFooter;
