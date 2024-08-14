import React, { useState } from "react";
import SectionContainer from "../../../components/container";
import { Box, Button, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import CommonButton from "../../../components/button/commonbutton";
import MainButton from "../../../components/button/MainButton";
import QuestBox from "../../../components/questbox";
import useScreenWidth from "../../../hooks/useScreenWidth";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
const NodeQuest = () => {
  const quests = [
    {
      task_id: 1,
      title: "INVITE YOUR FRIEND",
      rewardText: null,
      buttonText: "Claim Quest",
      onClick: () => console.log("Invite Friend Quest Clicked"),
      inputPlaceholder: "Input",
    },
    {
      title: "PURCHASE YOUR FIRST BOOSTER",
      rewardText: "Reward",
      rewardTotal: "0.005",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "FOLLOW @TAIKOXYZ ON X",
      rewardText: "Reward",
      rewardTotal: "0.005",
      buttonText: "Claim Quest",
      onClick: () => console.log("Twitter Connect Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "SAY HELLO TO THE DISCORD SERVER!",
      rewardText: "Reward",
      rewardTotal: "0.005",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "REACHED LEVEL 10 ON DISCORD SERVER",
      rewardText: "Reward",
      rewardTotal: "0.005",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "REACHED LEVEL 20 ON DISCORD SERVER",
      rewardText: "Reward",
      rewardTotal: "0.005",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "REACHED LEVEL 50 ON DISCORD SERVER",
      rewardText: "Reward",
      rewardTotal: "0.005",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "PURCHASED 3 BOOSTERS",
      rewardText: "Reward",
      rewardTotal: "0.005",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
    {
      title: "PURCHASED 5 BOOSTERS",
      rewardText: "Reward",
      rewardTotal: "0.005",
      buttonText: "Claim Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      inputPlaceholder: null,
    },
  ];
  const isMobile = useScreenWidth(768);
  const [currentPage, setCurrentPage] = useState(1);
  const questsPerPage = 3;

  const indexOfLastQuest = currentPage * questsPerPage;
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;
  const currentQuests = quests.slice(indexOfFirstQuest, indexOfLastQuest);
  const totalPages = Math.ceil(quests.length / questsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <SectionContainer py={{ base: "24px", lg: "50px", "3xl": "64px" }}>
      <SimpleGrid
        spacing={{ base: "17px" }}
        columns={{ base: 1, lg: 2, xl: 3 }}
      >
        {isMobile
          ? currentQuests.map((quest, index) => (
              <Box
                key={index}
                gridColumn={
                  quest.inputPlaceholder
                    ? { lg: "span 2", xl: "span 1" }
                    : "auto"
                }
              >
                <QuestBox
                  title={quest.title}
                  rewardText={quest.rewardText}
                  rewardTotal={quest.rewardTotal}
                  buttonText={quest.buttonText}
                  onClick={quest.onClick}
                  inputPlaceholder={quest.inputPlaceholder}
                />
              </Box>
            ))
          : quests.map((quest, index) => (
              <Box
                key={index}
                gridColumn={
                  quest.inputPlaceholder
                    ? { lg: "span 2", xl: "span 1" }
                    : "auto"
                }
              >
                <QuestBox
                  title={quest.title}
                  rewardText={quest.rewardText}
                  rewardTotal={quest.rewardTotal}
                  buttonText={quest.buttonText}
                  onClick={quest.onClick}
                  inputPlaceholder={quest.inputPlaceholder}
                />
              </Box>
            ))}
      </SimpleGrid>
      {isMobile && (
        <Flex justifyContent="center" mt="24px" alignItems="center" gap="8px">
          <Button
            color={"#FFF"}
            border={"0.5px solid #EB7FB3"}
            backgroundColor="var(--color-background)"
            width={"30px"}
            onClick={handlePrevPage}
            isDisabled={currentPage === 1}
            borderRadius="50%"
          >
            <Box boxSize="20px" paddingTop={"2px"}>
              <AiOutlineLeft />
            </Box>
          </Button>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              border={"0.5px solid #EB7FB3"}
              borderRadius={"50%"}
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              bg={
                currentPage === index + 1
                  ? "#EB7FB3"
                  : "var(--color-background)"
              }
              color={currentPage === index + 1 ? "black" : "white"}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            width={"30px"}
            color={"#FFF"}
            border={"0.5px solid #EB7FB3"}
            backgroundColor="var(--color-background)"
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages}
            borderRadius="50%"
          >
            <Box boxSize="20px" paddingTop={"2px"}>
              <AiOutlineRight />
            </Box>
          </Button>
        </Flex>
      )}
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
            p={{
              md: "16px 24px",
              lg: "16px 49px",
              xl: "32px 46px",
              "3xl": "47px 48px 65px 48px",
            }}
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
                display={{ base: "none", md: "block" }}
                backgroundColor={"rgba(27, 27, 27, 0.20)"}
                boxShadow={"inset 0 0 10px var(--color-main)"}
                border="0.5px solid var(--color-main)"
                position="relative"
                zIndex="10"
              >
                <SimpleGrid
                  p={{ base: "20px 40px" }}
                  justifyContent={"space-between"}
                  display={{ base: "none", md: "flex" }}
                  spacing={{ base: "17px" }}
                  columns={{ base: 4 }}
                  fontSize={{ base: "16px", lg: "24px", xl: "32px" }}
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
                    "2xl": "32px",
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
