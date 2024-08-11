import {
  Box,
  Flex,
  Image,
  ListItem,
  SimpleGrid,
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
          gap={{ base: "32px", "2xl": "84px" }}
          padding={{
            base: "48px 24px 48px 24px",
            lg: "24px 24px 24px 24px",
            xl: "48px 48px 48px 48px",
            "3xl": "80px 80px 48px 80px",
          }}
        >
          <Flex
            justifyContent={"space-between"}
            flexDirection={{ base: "column", lg: "row" }}
            gap={{
              base: "32px",
              md: "120px",
              xl: "200px",
              xl: "280px",
              "2xl": "120px",
            }}
            alignItems={{ base: "center", sm: "flex-start" }}
          >
            <Flex
              flexDirection={"column"}
              gap={{ base: "24px", "2xl": "72px" }}
            >
              <Flex
                justifyContent={{ base: "center", md: "unset" }}
                alignItems={"center"}
                gap={"8px"}
              >
                <Image src={appLogo} w={{ base: "100px", md: "unset" }} />
                <Text
                  fontSize={{ base: "28px", md: "40px" }}
                  fontFamily="var(--font-heading)"
                  lineHeight={{ base: "40px" }}
                >
                  BachiSwap
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={{ base: "8px", lg: "8px" }}>
                <MainButton
                  backgroundColor="var(--color-main)"
                  height={{ base: "44px", md: "60px" }}
                  padding={{ base: "8px 16px", md: "16px 32px" }}
                >
                  <Text
                    fontSize={{ base: "12px", md: "16px" }}
                    color={"#FFF"}
                    fontFamily="var(--font-text-main)"
                  >
                    Get Started
                  </Text>
                </MainButton>
                <MainButton
                  border={"0.5px solid #EB7FB3"}
                  backgroundColor={"transparent"}
                  height={{ base: "44px", md: "60px" }}
                  padding={{ base: "8px 16px", md: "16px 32px" }}
                >
                  <Text
                    fontSize={{ base: "12px", md: "16px" }}
                    color={"#FFF"}
                    fontFamily="var(--font-text-main)"
                  >
                    Become a partner
                  </Text>
                </MainButton>
              </Flex>
            </Flex>
            <SimpleGrid
              w={"100%"}
              // wrap={"wrap"}
              spacing={{ base: "36px", xl: "72px", "2xl": "136px" }}
              columns={{ base: 2, "2xl": 4 }}
              // justifyContent={{ base: "space-around", md: "space-between" }}
              padding={{
                base: "32px 16px",
                lg: "0px",
                xl: "0px",
              }}
            >
              <Flex flexDirection={"column"} gap={{ base: "16px" }}>
                <Text
                  fontSize={{ base: "16px", md: "24px" }}
                  fontFamily="var(--font-text-extra)"
                  color={"#E42493"}
                >
                  QUICKLINKS
                </Text>
                <Link to={""}>
                  <Text
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight={400}
                    fontFamily={"var(--font-text-main)"}
                  >
                    Airdrop
                  </Text>
                </Link>
              </Flex>
              <Flex flexDirection={"column"} gap={{ base: "16px" }}>
                <Text
                  fontSize={{ base: "16px", md: "24px" }}
                  color={"#E42493"}
                  fontFamily="var(--font-text-extra)"
                >
                  RESOURCES
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "14px", md: "18px" }}
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
              <Flex flexDirection={"column"} gap={{ base: "16px" }}>
                <Text
                  fontSize={{ base: "16px", md: "24px" }}
                  color="var(--color-main)"
                  fontFamily="var(--font-text-extra)"
                >
                  COMMUNITY
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "14px", md: "18px" }}
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
              <Flex flexDirection={"column"} gap={{ base: "16px" }}>
                <Text
                  fontSize={{ base: "16px", md: "24px" }}
                  color={"#E42493"}
                  fontFamily="var(--font-text-extra)"
                >
                  WEB3
                </Text>
                <UnorderedList
                  listStyleType="none"
                  marginLeft={"0px"}
                  fontSize={{ base: "14px", md: "18px" }}
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
            </SimpleGrid>
          </Flex>
          <Flex
            gap={{ base: "0px", md: "145px", lg: "48px" }}
            justifyContent={{ base: "space-around", md: "flex-start" }}
            fontSize={{ base: "12px", "md": "20px" }}
            fontWeight={500}
            color={"#757575"}
            fontFamily={"var(--font-heading-main)"}
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
