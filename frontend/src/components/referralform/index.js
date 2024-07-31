import React from "react";
import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import CustomButton from "../button";
import { base } from "viem/chains";

const ReferralCodeForm = ({ title, value, onChange, onClick, error }) => {
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
        left={{ base: "20px", xl: "50px" }}
        backgroundColor="#231A2E"
        padding="0 5px"
        color="#FFFFFF"
        fontSize={{ base: "16px", md: "18px", xl: "24px" }}
        fontWeight={500}
      >
        {title}
      </Text>
      <Flex
        padding={{ base: "0px", xl: "25px 28px 25px 34px" }}
        flexDirection={"column"}
      >
        <Flex
          height={"70px"}
          width={"100%"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Input
            placeholder="Input"
            border="none"
            bg="#231A2E"
            height="70px"
            color="#FFFFFF"
            flex="1"
            marginRight="8px"
            _focus={{ outline: "none", boxShadow: "none" }}
            value={value}
            onChange={onChange}
          />
          <CustomButton
            height={{ base: "40px", md: "50px", xl: "70px" }}
            width={{ base: "30%", md: "40%", lg: "30%" }}
            bg="#EC4899"
            color="#FFFFFF"
            borderRadius="0"
            border="none"
            _hover={{ bg: "#DB2777" }}
            _active={{ bg: "#BE185D" }}
            onClick={onClick}
          >
            Apply
          </CustomButton>
        </Flex>
        {error && (
          <Text color="red.500" mt="4">
            {error}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default ReferralCodeForm;
