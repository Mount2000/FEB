import React from "react";
import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import CustomButton from "../button";

const ReferralCodeForm = () => {
  return (
    <Box
      width="100%"
      border="1px solid #FCDDEC"
      padding="10px"
      position="relative"
    >
      <Text
        position="absolute"
        top="-20px"
        left="50px"
        backgroundColor="#231A2E"
        padding="0 5px"
        color="#FFFFFF"
        fontSize={"24px"}
        fontWeight={500}
      >
        Referrer's Code
      </Text>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding={"25px 28px 25px 34px"}
      >
        <Input
          placeholder="Input"
          border="none"
          bg="#231A2E"
          height="40px"
          color="#FFFFFF"
          flex="1"
          marginRight="8px"
          _focus={{ outline: "none", boxShadow: "none" }}
        />
        <CustomButton
          width={"15%"}
          bg="#EC4899"
          color="#FFFFFF"
          height="40px"
          borderRadius="0"
          border="none"
          _hover={{ bg: "#DB2777" }}
          _active={{ bg: "#BE185D" }}
        >
          Apply
        </CustomButton>
      </Flex>
    </Box>
  );
};

export default ReferralCodeForm;
