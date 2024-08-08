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

import { Link } from "react-router-dom";
import MainButton from "../button/MainButton";

const BachiSwapFooter = () => {
  return (
    <>
      <SectionContainer backgroundColor="var(--color-background-footer)">
        <Flex
          flexDirection={"column"}
          gap={{ base: "42px", "2xl": "102px" }}
          paddingBottom={{ base: "48px" }}
        >
          <Flex
            justifyContent={"space-between"}
            marginTop={{ base: "48px", xl: "260px", "2xl": "80px" }}
            flexDirection={{ base: "column", xl: "row" }}
            gap={{ base: "49px", xl: "150px" }}
          >
            <Flex
              flexDirection={"column"}
              gap={{ base: "41px", "2xl": "82px" }}
            >
              <Flex alignItems={"center"} gap={"24.14px"}>
                <Image src={appLogo} />
                <Text
                  fontSize={{ base: "32px", md: "64px" }}
                  fontFamily="var(--font-heading)"
                >
                  BachiSwap
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={{ base: "13px", md: "19px" }}>
                <MainButton
                  backgroundColor="var(--color-main)"
                  width={{ base: "131px", md: "172px" }}
                  height={{ base: "44px", md: "60px" }}
                >
                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    color={"#FFF"}
                    fontFamily="var(--font-text-main)"
                  >
                    Get Started
                  </Text>
                </MainButton>
                <MainButton
                  border={"0.5px solid #EB7FB3"}
                  backgroundColor={"transparent"}
                  width={{ base: "186px", md: "229px" }}
                  height={{ base: "44px", md: "60px" }}
                >
                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    color={"#FFF"}
                    fontFamily="var(--font-text-main)"
                  >
                    Become a partner
                  </Text>
                </MainButton>
              </Flex>
            </Flex>
            <Flex
              wrap={"wrap"}
              gap={{ base: "80px" }}
              justifyContent={"space-between"}
            >
              <Flex flexDirection={"column"}>
                <Text
                  fontSize={{ base: "24px", md: "32px" }}
                  fontFamily="var(--font-text-extra)"
                  color={"#E42493"}
                >
                  QUICKLINKS
                </Text>
                <Link to={""}>
                  <Text
                    fontSize={{ base: "16px", md: "24px" }}
                    fontWeight={400}
                    fontFamily={"var(--font-text-main)"}
                  >
                    Airdrop
                  </Text>
                </Link>
              </Flex>
              <Flex flexDirection={"column"}>
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
                  <Link to={""}>
                    <ListItem>Ecosystem</ListItem>
                  </Link>
                  <Link to={""}>
                    <ListItem>Docs</ListItem>
                  </Link>
                  <Link to={""}>
                    <ListItem>Blog</ListItem>
                  </Link>
                </UnorderedList>
              </Flex>
              <Flex flexDirection={"column"}>
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
                  <Link to="">
                    <ListItem>X</ListItem>
                  </Link>
                  <Link to="">
                    <ListItem>Discord</ListItem>
                  </Link>
                  <Link to="">
                    <ListItem>Youtube</ListItem>
                  </Link>
                </UnorderedList>
              </Flex>
              {/* <Flex flexDirection={"column"}>
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
                  <Link to="">
                    <ListItem>Ai</ListItem>
                  </Link>
                  <Link to="">
                    <ListItem>Gaming</ListItem>
                  </Link>
                </UnorderedList>
              </Flex> */}
              <Flex flexDirection={"column"}>
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
                  <Link to="">
                    <ListItem>Checker Nodes</ListItem>
                  </Link>
                  <Link to="">
                    <ListItem>Staking</ListItem>
                  </Link>
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
