import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

//import component

//import image
import iconFrame from "../../assets/img/node/icon-node-Frame.png";
import CloseButton from "../button/CloseButton";

const Message = () => {
  return (
    <Box
      display={"none"}
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      border="1px solid #FCDDEC"
      width={"30%"}
      sx={{
        backdropFilter: "blur(10px) !important",
        clipPath:
          "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "20px",
          height: "20px",
          backgroundColor: "#FCDDEC !important",
          clipPath: "polygon(0 100%, 100% 0, 0 0)",
        },
        "::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "20px",
          height: "20px",
          backgroundColor: "#FCDDEC !important",
          clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
        },
      }}
    >
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        padding={"27px 27px 27px 27px"}
        backgroundColor="var(--color-background-popup)"
      >
        <Box width={"100%"} marginBottom={"31px"}>
          <Flex justifyContent={"flex-end"}>
            <CloseButton>x</CloseButton>
          </Flex>
        </Box>
        <Image src={iconFrame} width={"250px"} />
        <Text
          fontSize={"24px"}
          fontWeight={400}
          fontFamily="var(--font-text-main)"
          marginTop={"50px"}
        >
          Transaction is underway...{" "}
        </Text>
      </Flex>
    </Box>
  );
};

export default Message;
