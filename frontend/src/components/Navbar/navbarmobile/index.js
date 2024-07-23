import React from "react";
//import component
import SectionContainer from "../../container";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import CustomButton from "../../button";
import appLogo from "../../../assets/img/app-logo.png";
import iconClose from "../../../assets/img/icon-close-menu.png";
import { useModal } from "../../../contexts/useModal";
import { truncateStr } from "../../../utils";
import { useAccount } from "wagmi";
const NavbarMobile = ({ zIndex, handleShowNav }) => {
  const { setConnectWalletModalVisible } = useModal();
  const onOpenConnectWalletModal = () => setConnectWalletModalVisible(true);
  const { address } = useAccount();
  return (
    <Box
      padding={"0px"}
      position={"absolute"}
      right={"0px"}
      top={"0px"}
      zIndex={zIndex}
      width={{ base: "100%", md: "60%" }}
      backgroundColor="var(--color-background-popup)"
    >
      <Flex flexDirection={"column"} paddingBottom={"40.49px"}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"20px"}
          paddingTop={"20px"}
          paddingBottom={"20px"}
          borderBottom={"0.5px solid  var(--color-border-bottom)"}
          paddingLeft={"25px"}
          paddingRight={"24.64px"}
        >
          <Link to="/">
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

          <Image src={iconClose} onClick={handleShowNav} />
        </Flex>
        <Flex flexDirection={"column"}>
          <Box
            paddingBottom={"31px"}
            paddingTop={"27px"}
            paddingLeft={"25px"}
            borderBottom={"0.25px solid #5B5B5B"}
          >
            <Link to="">
              <Text>Swap</Text>
            </Link>
          </Box>
          <Box
            paddingBottom={"31px"}
            paddingTop={"27px"}
            paddingLeft={"25px"}
            borderBottom={"0.25px solid #5B5B5B"}
          >
            <Link to="">
              <Text>Staking</Text>
            </Link>
          </Box>
          <Box
            paddingBottom={"31px"}
            paddingTop={"27px"}
            paddingLeft={"25px"}
            borderBottom={"0.25px solid #5B5B5B"}
          >
            <Link to="">
              <Text>Mine TAIKO</Text>
            </Link>
          </Box>
          <Box
            paddingBottom={"31px"}
            paddingTop={"27px"}
            paddingLeft={"25px"}
            borderBottom={"0.25px solid #5B5B5B"}
          >
            <Link to="">
              <Text>Airdrop</Text>
            </Link>
          </Box>
        </Flex>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          paddingTop={"170px"}
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
      </Flex>
    </Box>
  );
};

export default NavbarMobile;
