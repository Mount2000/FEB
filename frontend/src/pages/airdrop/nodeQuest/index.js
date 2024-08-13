import React from "react";
import SectionContainer from "../../../components/container";
import { Box, Button, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import CommonButton from "../../../components/button/commonbutton";
import MainButton from "../../../components/button/MainButton";
import QuestBox from "../../../components/questbox";

const NodeQuest = () => {
  const quests = [
    {
      title: "INVITE YOUR FRIEND",
      rewardText: null,
      buttonText: "Claim Quest",
      onClick: () => console.log("Invite Friend Quest Clicked"),
      inputPlaceholder: "Input",
    },
    {
      title: "CONNECT YOUR TIWTTER ACCOUNT",
      rewardText: null,
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "CONNECT YOUR DISCORD ACCOUNT",
      rewardText: null,
      buttonText: "Claim Quest",
      onClick: () => console.log("Twitter Connect Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "CLAIM YOUR DAILY REWARD",
      rewardText: "Reward",
      rewardTotal: "10",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "FOLLOW @BachiSwap_io ON X",
      rewardText: "Reward",
      rewardTotal: "30",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "JOIN SERVER DISCORD",
      rewardText: "Reward",
      rewardTotal: "100",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "LIKE THIS TWEET ON X",
      rewardText: "Reward",
      rewardTotal: "30",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "LIKE THIS TWEET ON X",
      rewardText: "Reward",
      rewardTotal: "30",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "LIKE THIS TWEET ON X",
      rewardText: "Reward",
      rewardTotal: "100",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
  ];
  return (
    <SectionContainer py={{ base: "24px", lg: "50px", "3xl": "64px" }}>
      <SimpleGrid
        spacing={{ base: "17px" }}
        columns={{ base: 1, lg: 2, xl: 3 }}
      >
        {quests.map((quest, index) => (
          <QuestBox
            key={index}
            title={quest.title}
            rewardText={quest.rewardText}
            rewardTotal={quest.rewardTotal}
            buttonText={quest.buttonText}
            onClick={quest.onClick}
            inputPlaceholder={quest.inputPlaceholder}
          />
        ))}
      </SimpleGrid>
      <Flex flexDirection={"column"} gap={{ base: "24px" }}>
        <Text
          fontSize={{ base: "24px", "2xl": "64px" }}
          fontWeight={400}
          fontFamily="var(--font-heading)"
          textAlign={"center"}
          paddingTop={{ base: "50px", "2xl": "135px" }}
        >
          Airdrop history
        </Text>
        <Box
          width={"100%"}
          height={"100%"}
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
            "@media (max-width: 992px)": {
              clipPath:
                "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
              "::before": {
                width: "20px",
                height: "20px",
                backgroundColor: "pink.500",
              },
              "::after": {
                width: "20px",
                height: "20px",
                backgroundColor: "pink.500",
              },
            },
          }}
        >
          <CommonButton
            backgroundColor={"rgba(27, 27, 27, 0.20)"}
            boxShadow={"inset 0 0 10px var(--color-main)"}
            border="0.5px solid var(--color-main)"
            position="relative"
            zIndex="10"
            p={{ "3xl": "47px 48px 65px 48px" }}
          >
            <Box
              width={"100%"}
              height={"100%"}
              backgroundColor="var(--color-main)"
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
                "@media (max-width: 992px)": {
                  clipPath:
                    "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                  "::before": {
                    width: "20px",
                    height: "20px",
                    backgroundColor: "pink.500",
                  },
                  "::after": {
                    width: "20px",
                    height: "20px",
                    backgroundColor: "pink.500",
                  },
                },
              }}
            >
              <CommonButton
                backgroundColor={"rgba(27, 27, 27, 0.20)"}
                boxShadow={"inset 0 0 10px var(--color-main)"}
                border="0.5px solid var(--color-main)"
                position="relative"
                zIndex="10"
              >
                <SimpleGrid
                  p={{ base: "20px 40px" }}
                  justifyContent={"space-between"}
                  display={"flex"}
                  spacing={{ base: "17px" }}
                  columns={{ base: 4 }}
                  fontSize={"32px"}
                  fontFamily="var(--font-text-main)"
                >
                  <Text>#</Text>
                  <Text>Wallet</Text>
                  <Text>XP</Text>
                  <Text>Date</Text>
                </SimpleGrid>
              </CommonButton>
            </Box>
            <Flex
              flexDirection={"column"}
              padding={{
                base: "24px 32px",
                lg: "16px 20px 16px 20px",
                xl: "24px 36px 24px 36px",
                "3xl": "32px 32px 50px 40px",
              }}
              gap={{ base: "24px", lg: "32px", "2xl": "22px", "3xl": "25px" }}
            >
              <Flex flexDirection={"column"}>
                <Text
                  py={{ base: "15px" }}
                  fontSize={{
                    base: "20px",
                    "2xl": "36px",
                    "3xl": "40px",
                  }}
                  fontFamily="var(--font-text-extra)"
                >
                  Invite Your Friend and come to AirDrop History
                </Text>
              </Flex>
            </Flex>
          </CommonButton>
        </Box>
      </Flex>
    </SectionContainer>
  );
};

export default NodeQuest;
