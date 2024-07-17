import React from "react";
import { Account } from "./accounts";
import { WalletOptions } from "./walletOption";
import { useAccount } from "wagmi";
import {
  Flex,
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
          py={"12px"}
          sx={{
            clipPath:
              "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "20px",
              height: "20px",
              backgroundColor: "pink.500",
              clipPath: "polygon(0 100%, 100% 0, 0 0)",
            },
            "::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "20px",
              height: "20px",
              backgroundColor: "pink.500",
              clipPath: "polygon(100% 100%, 100% 0, 0 100%)", // Điều chỉnh clip-path cho góc dưới
            },
          }}
        >
          <ModalBody>
            <Flex w={"100%"} justifyContent={"end"} py={"12px"}>
              <CloseButton onClick={onCloseWalletModal}>
                <IoCloseSharp color="black" size={"40px"} />
              </CloseButton>
            </Flex>
            <ConnectWallet />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
