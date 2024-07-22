import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import "./style.css";

//import component
import SectionContainer from "../container";
import CustomButton from "../button";
//import image
import appLogo from "../../assets/img/app-logo.png";
// import navIcon from "../../assets/img/nav-icon.png";
import { useModal } from "../../contexts/useModal";
import { useAccount } from "wagmi";
import { truncateStr } from "../../utils";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setConnectWalletModalVisible } = useModal();
  const onOpenConnectWalletModal = () => setConnectWalletModalVisible(true);
  const { address } = useAccount();
  return (
    <SectionContainer
      backgroundColor={"rgba(27, 27, 27, 0.20)"}
      borderBottom="0.5px solid var(--color-border-bottom)"
      position="relative"
      sx={{ backdropFilter: "blur(10px)" }}
      zIndex="10"
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"100px"}
      >
        <Flex
          alignItems={"center"}
          justifyContent={{ md: "space-between", xl: "normal" }}
        >
          <Link to="/">
            <Flex
              gap={{ base: "4.64px", md: "14.45px" }}
              alignItems={"center"}
              marginRight={{ base: "0px", "2xl": "177px" }}
            >
              <Image src={appLogo} />
              <Text
                fontSize={{ base: "16px", md: "40px" }}
                lineHeight={{ base: "19.3px", md: "48.24px" }}
                fontFamily="var(--font-heading-main)"
              >
                BachiSwap
              </Text>
            </Flex>
          </Link>
          <Flex
            gap={"40px"}
            alignItems={"center"}
            fontFamily="var(--font-text-main)"
          >
            <Flex alignItems={"center"} gap={"10px"}>
              <Text
                fontSize={{ base: "20px", md: "24px" }}
                fontWeight={400}
                fontFamily="var(--font-text-main)"
              >
                Swap
              </Text>
              {/* <Image
                marginTop={"6px"}
                width={"14px"}
                height={"8.414px"}
                src={navIcon}
              /> */}
            </Flex>
            <Flex alignItems={"center"} gap={"10px"}>
              <Link to="/node">
                <Text
                  fontSize={{ base: "20px", md: "24px" }}
                  fontFamily="var(--font-text-main)"
                >
                  Staking
                </Text>
              </Link>
              {/* <Image
                marginTop={"6px"}
                width={"14px"}
                height={"8.414px"}
                src={navIcon}
              /> */}
            </Flex>
            <Link to="/airdrop">
              <Flex>
                <Text
                  fontSize={{ base: "20px", md: "24px" }}
                  fontFamily="var(--font-text-main)"
                >
                  Mine TAIKO
                </Text>
              </Flex>
            </Link>
            <Flex alignItems={"center"} gap={"10px"}>
              <Text
                fontSize={{ base: "20px", md: "24px" }}
                fontFamily="var(--font-text-main)"
              >
                Airdrop
              </Text>
              {/* <Image
                marginTop={"6px"}
                width={"14px"}
                height={"8.414px"}
                src={navIcon}
              /> */}
            </Flex>
          </Flex>
        </Flex>

        <CustomButton
          height="60px"
          _hover={{
            backgroundColor: "var(--color-main)",
          }}
          onClick={onOpenConnectWalletModal}
          backgroundColor="var(--color-main)"
        >
          {address ? truncateStr(address) : "Connect Wallet"}
        </CustomButton>
      </Flex>
      {/* <Grid templateColumns="repeat(12, 1fr)" gap={0} height={"100px"}>
        <GridItem colSpan={3} w="100%" height={"100%"}>
          <Flex
            gap={{ base: "4.64px", md: "14.45px" }}
            alignItems={"center"}
            marginRight={{ base: "0px", xl: "177px" }}
          >
            <Image src={appLogo} />
            <Text
              fontSize={{ base: "16px", md: "40px" }}
              lineHeight={{ base: "19.3px", md: "48.24px" }}
              fontFamily="var(--font-heading-main)"
            >
              BachiSwap
            </Text>
          </Flex>
        </GridItem>
        <GridItem colSpan={6} w="100%" h="10">
          <Flex
            gap={"40px"}
            alignItems={"center"}
            fontFamily="var(--font-text-main)"
            justifyContent={"space-around"}
          >
            <Flex alignItems={"center"} gap={"10px"}>
              <Text fontSize={{ base: "20px", md: "24px" }} fontWeight={400}>
                Ecosystem
              </Text>
              <Image
                marginTop={"6px"}
                width={"14px"}
                height={"8.414px"}
                src={navIcon}
              />
            </Flex>
            <Flex alignItems={"center"} gap={"10px"}>
              <Text fontSize={{ base: "20px", md: "24px" }}>Governance</Text>
              <Image
                marginTop={"6px"}
                width={"14px"}
                height={"8.414px"}
                src={navIcon}
              />
            </Flex>
            <Flex>
              <Text fontSize={{ base: "20px", md: "24px" }}>Airdrop</Text>
            </Flex>
            <Flex alignItems={"center"} gap={"10px"}>
              <Text fontSize={{ base: "20px", md: "24px" }}>Web3 Service</Text>
              <Image
                marginTop={"6px"}
                width={"14px"}
                height={"8.414px"}
                src={navIcon}
              />
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={3} w="100%" h="10">
          <Flex justifyContent={"flex-end"}>
            <CustomButton
              onClick={onOpenConnectWalletModal}
              backgroundColor="var(--color-main)"
            >
              {address ? truncateStr(address) : "Connect Wallet"}
            </CustomButton>
          </Flex>
        </GridItem>
      </Grid> */}
    </SectionContainer>
  );
};

export default Navbar;
