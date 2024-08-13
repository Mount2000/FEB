import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import CommonButton from "../button/commonbutton";
import MainButton from "../button/MainButton";

const QuestBox = ({
  title,
  rewardText,
  rewardTotal,
  buttonText,
  onClick,
  inputPlaceholder,
}) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      alignItems="stretch"
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
          clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
        },
      }}
    >
      <CommonButton
        backgroundColor={"rgba(27, 27, 27, 0.20)"}
        boxShadow={"inset 0 0 10px var(--color-main)"}
        border="0.5px solid var(--color-main)"
        display="flex"
        flexDirection="column"
        flex="1"
        position="relative"
        zIndex="10"
      >
        <Flex
          flexDirection={"column"}
          padding={{
            base: "24px 32px",
            lg: "16px 20px 16px 20px",
            xl: "24px 36px 24px 36px",
            "3xl": "32px 40px 40px 40px",
          }}
          gap={{ base: "24px", lg: "32px", "2xl": "22px", "3xl": "25px" }}
          height="100%"
        >
          <Flex flexDirection={"column"} flex="1">
            <Text
              py={{ base: "15px", "3xl": "24px" }}
              fontSize={{
                base: "20px",
                "2xl": "36px",
                "3xl": "24px",
              }}
              fontFamily="var(--font-text-extra)"
            >
              {title}
            </Text>
            {rewardText && (
              <Flex alignItems={"center"} gap={{ base: "24px" }}>
                <Text fontSize={{ "3xl": "20px" }} color={"#646464"}>
                  {rewardText}
                </Text>
                <MainButton
                  backgroundColor={"transparent"}
                  border={"2px solid #23F600"}
                  borderRadius={"20px"}
                  width={{ base: "80px" }}
                  height={{ base: "40px" }}
                >
                  <Text color={"#23F600"}>{rewardTotal} XP</Text>
                </MainButton>
              </Flex>
            )}
          </Flex>
          {inputPlaceholder && (
            <Box
              width="100%"
              border="1px solid #FCDDEC"
              padding="10px"
              position="relative"
            >
              <Box
                position="absolute"
                top="-20px"
                left={{ base: "20px", xl: "50px" }}
                width="fit-content"
                padding="0 5px"
                zIndex={1} // Đặt z-index để phần text nằm đè lên
              >
                <Box
                  width="100%"
                  height="2px" // Chiều cao giống với chiều cao border
                  backgroundColor="transparent"
                  clipPath="polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                />
                <Text
                  color="#FFFFFF"
                  fontSize={{ base: "16px", md: "18px", xl: "20px" }}
                  fontWeight={500}
                  fontFamily="var(--font-text-main)"
                >
                  My Referral
                </Text>
              </Box>
              <Flex flexDirection={"column"}>
                <Flex
                  height={{ base: "24px" }}
                  width={"100%"}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Input
                    placeholder={inputPlaceholder}
                    border="none"
                    height={{ base: "24px" }}
                    color="#FFFFFF"
                    flex="1"
                    marginRight="8px"
                    _focus={{ outline: "none", boxShadow: "none" }}
                  />
                </Flex>
              </Flex>
            </Box>
          )}
          <MainButton
            backgroundColor="var(--color-main)"
            onClick={onClick}
            height={{ "3xl": "71px" }}
          >
            <Text
              color={"#FFF"}
              fontSize={"20px"}
              lineHeight={{ base: "24px" }}
              fontFamily="var(--font-text-main)"
            >
              {buttonText}
            </Text>
          </MainButton>
        </Flex>
      </CommonButton>
    </Box>
  );
};

export default QuestBox;
