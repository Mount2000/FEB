import React from "react";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import Message from "./index";
import iconFrame from "../../assets/img/node/icon-node-Frame.png";
import iconNodedetail from "../../assets/img/node/icon-node-detail.png";
import iconSuccess from "../../assets/img/node/icon-message-success.png";
import iconError from "../../assets/img/node/icon-message-error.png";
import CommonButton from "../button/commonbutton";

const chain_env = process.env.REACT_APP_ENV;
const MessageBox = ({
  isLoading,
  status,
  message,
  handleCloseMessage,
  txHash,
}) => {
  return (
    <Box className="msg-box">
      <Message
        isVisible={isLoading && status === null}
        onClose={handleCloseMessage}
      >
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Image src={iconFrame} width={"250px"} className="spin-animation" />
          <Text
            fontSize={"24px"}
            fontWeight={400}
            fontFamily="var(--font-text-main)"
            marginTop={"50px"}
          >
            {message}
          </Text>
        </Flex>
      </Message>

      <Message
        isVisible={isLoading && status === "success"}
        onClose={handleCloseMessage}
      >
        <Flex flexDirection={"column"} alignItems={"center"} gap={"30px"}>
          <Image src={iconSuccess} />
          <Text
            fontSize={"28px"}
            fontWeight={400}
            fontFamily="var(--font-text-main)"
          >
            {message}
          </Text>
          <Link
            target="_blank"
            href={
              chain_env == "testnet"
                ? `https://hekla.taikoscan.io/tx/${txHash}`
                : `https://taikoscan.io/tx/${txHash}`
            }
          >
            <Text
              fontSize="20px"
              color="var(--color-main)"
              fontWeight={500}
              textDecoration={"underline"}
            >
              View on Taiko
            </Text>
          </Link>
        </Flex>
      </Message>

      <Message
        isVisible={isLoading && status === "failure"}
        onClose={handleCloseMessage}
      >
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          gap={"60px"}
          w={"100%"}
        >
          <Image src={iconError} />
          <Text
            mt={"120px"}
            fontSize={"24px"}
            fontFamily="var(--font-text-main)"
            fontWeight={400}
          >
            {message}
          </Text>
          <CommonButton
            backgroundColor="#FFF"
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            padding={"10px"}
          >
            <Text color={"#000"} fontSize={"20px"} fontWeight={600}>
              Try again
            </Text>
          </CommonButton>
        </Flex>
      </Message>
      {isLoading && (
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
    </Box>
  );
};

export default MessageBox;
