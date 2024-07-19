import React from "react";
import { Account } from "./accounts";
import { WalletOptions } from "./walletOption";
import { useAccount } from "wagmi";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useModal } from "../../contexts/useModal";
import CloseButton from "../button/CloseButton";
import { IoCloseSharp } from "react-icons/io5";
import EllipseIcon from "../../assets/img/node/ellipse-2.png";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function ConnectWalletModal() {
  const { connectWalletModalVisible, setConnectWalletModalVisible } =
    useModal();
  const onCloseWalletModal = () => setConnectWalletModalVisible(false);

  return (
    <>
      <Modal
        isOpen={connectWalletModalVisible}
        onClose={onCloseWalletModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={"0px"}
          backgroundColor={"var(--color-background-popup)"}
          pt={"28px"}
          pb={"48px"}
          border={"1px solid #FCDDEC"}
          sx={{
            clipPath:
              "polygon(0 36px, 36px 0, 100% 0, 100% calc(100% - 36px), calc(100% - 36px) 100%, 0 100%)",
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "36px",
              height: "36px",
              backgroundColor: "#FCDDEC",
              clipPath: "polygon(0 100%, 100% 0, 0 0)",
            },
            "::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "36px",
              height: "36px",
              backgroundColor: "#FCDDEC",
              clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
            },
          }}
        >
          <ModalBody py={"0px"}>
            <Flex w={"100%"} justifyContent={"end"}>
              <CloseButton onClick={onCloseWalletModal}>
                <IoCloseSharp color="black" size={"40px"} />
              </CloseButton>
            </Flex>
            <Box w={"100%"} h={"100px"} mx={"auto"} position={"relative"}>
              <Box position={"absolute"} top={"-24px"} left={"50%"} transform={"translateX(-50%)"}>
                <Image src={EllipseIcon} alt="" />
              </Box>
            </Box>
            <ConnectWallet />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
