import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import "./style.css";

//import component
import SectionContainer from "../container";
import CustomButton from "../button";
//import image
import appLogo from "../../assets/img/app-logo.png";
import iconMenu from "../../assets/img/icon-menu.png";
// import navIcon from "../../assets/img/nav-icon.png";
import { useModal } from "../../contexts/useModal";
import { useAccount } from "wagmi";
import { truncateStr } from "../../utils";
import { Link } from "react-router-dom";
import NavbarMobile from "./navbarmobile";

const Navbar = () => {
  const [shownav, setShowNav] = useState(false);
  const { setConnectWalletModalVisible } = useModal();
  const onOpenConnectWalletModal = () => setConnectWalletModalVisible(true);
  const { address } = useAccount();

  const handleShowNav = () => {
    setShowNav(!shownav);
  };
  return (
    <>
      <SectionContainer
        backgroundColor={"rgba(27, 27, 27, 0.20)"}
        borderBottom="0.5px solid var(--color-border-bottom)"
        position="relative"
        sx={{ backdropFilter: "blur(10px)" }}
        zIndex="10"
      >
        <Grid
          templateColumns="repeat(10, 1fr)"
          gap={0}
          alignItems="center"
          paddingTop={"20px"}
          paddingBottom={"20px"}
        >
          <Link to="/" style={{ gridColumn: "span 3" }}>
            <Flex gap={{ base: "4.64px", md: "14.45px" }} alignItems={"center"}>
              <Image src={appLogo} height={{ base: "24px", md: "52px" }} />
              <Text
                fontSize={{ base: "16px", md: "40px" }}
                lineHeight={{ base: "19.3px", md: "48.24px" }}
                fontFamily="var(--font-heading-main)"
                fontWeight={400}
              >
                BachiSwap
              </Text>
            </Flex>
          </Link>
          <Flex
            style={{ gridColumn: "span 5" }}
            gap={"40px"}
            alignItems={"center"}
            fontFamily="var(--font-text-main)"
            display={{ base: "none", xl: "flex" }}
            justifyContent={"center"}
          >
            <Flex alignItems={"center"} gap={"10px"}>
              <Link to="/">
                <Text
                  fontSize={{ base: "20px", md: "24px" }}
                  fontWeight={400}
                  fontFamily="var(--font-text-main)"
                >
                  Mine TAIKO
                </Text>
              </Link>
            </Flex>
            <Flex alignItems={"center"} gap={"10px"}>
              <Link to="/node">
                <Text
                  fontSize={{ base: "20px", md: "24px" }}
                  fontFamily="var(--font-text-main)"
                >
                  Airdrop
                </Text>
              </Link>
            </Flex>
            <Link to="/airdrop">
              <Flex>
                <Text
                  fontSize={{ base: "20px", md: "24px" }}
                  fontFamily="var(--font-text-main)"
                >
                  Swap
                </Text>
              </Flex>
            </Link>
            <Flex alignItems={"center"} gap={"10px"}>
              <Text
                fontSize={{ base: "20px", md: "24px" }}
                fontFamily="var(--font-text-main)"
              >
                Staking
              </Text>
            </Flex>
          </Flex>
          <Flex
            style={{ gridColumn: "span 2" }}
            justifyContent={"flex-end"}
            display={{ base: "none", xl: "flex" }}
          >
            <CustomButton
              width="200px"
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
          <Flex
            cursor={"pointer"}
            display={{ base: "flex", xl: "none" }}
            style={{ gridColumn: "span 7" }}
            justifyContent={"flex-end"}
            onClick={handleShowNav}
          >
            <Image
              src={iconMenu}
              width={{ base: "18px", md: "26px" }}
              height={"100%"}
            />
          </Flex>
        </Grid>
      </SectionContainer>

      {shownav && <NavbarMobile zIndex="10000" handleShowNav={handleShowNav} />}
      {shownav && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          zIndex="999"
        />
      )}
    </>
  );
};

export default Navbar;
