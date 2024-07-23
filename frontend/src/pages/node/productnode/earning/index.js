import React, { useState } from "react";
//import component
import SectionContainer from "../../../../components/container";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CommonButton from "../../../../components/button/commonbutton";
//import image
import earningNode from "../../../../assets/img/node/earning-node.png";
const Earning = () => {
  const [tab, setTab] = useState(0);
  const [taikoAmount, setTaikoAmount] = useState(0);
  const [bachiAmount, setBachiAmount] = useState(1);
  const mining = [
    {
      name: "Taiko",
      speed: "1.0",
      level: "2",
      amount: taikoAmount,
    },
    {
      name: "Bachi",
      speed: "2.0",
      level: "4",
      amount: bachiAmount,
    },
  ];

  return (
    <SectionContainer>
      <Flex flexDirection={"column"} alignItems={"center"} paddingTop={"108px"}>
        <CommonButton
          marginBottom={"34px"}
          padding={"37px 35px 34px 35px"}
          border="0.5px solid var(--color-main) !important"
          width={"40%"}
        >
          <Flex flexDirection={"column"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"30px"}
            >
              <Text
                fontSize={"40px"}
                fontWeight={400}
                fontFamily="var(--font-text-extra)"
                color="var(--color-main)"
              >
                BACHI Balance
              </Text>
              <CommonButton
                backgroundColor="var(--color-main)"
                padding={"16px 30px 15px 30px"}
              >
                <Text fontSize={"24px"} fontWeight={400}>
                  Withdraw
                </Text>
              </CommonButton>
            </Flex>
            <Text fontSize={"40px"} fontWeight={700}>
              12.3213364
            </Text>
          </Flex>
        </CommonButton>
        <CommonButton
          marginBottom={"42px"}
          padding={"37px 35px 34px 35px"}
          border="0.5px solid var(--color-main)"
          width={"40%"}
        >
          <Flex flexDirection={"column"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"30px"}
            >
              <Text
                fontSize={"40px"}
                fontWeight={400}
                fontFamily="var(--font-text-extra)"
                color="var(--color-main)"
              >
                TAIKO Balance
              </Text>
              <CommonButton
                backgroundColor="var(--color-main)"
                padding={"16px 30px 15px 30px"}
              >
                <Text fontSize={"24px"} fontWeight={400}>
                  Withdraw
                </Text>
              </CommonButton>
            </Flex>
            <Text fontSize={"40px"} fontWeight={700}>
              12.3213364
            </Text>
          </Flex>
        </CommonButton>
        <Box
          border="0.5px solid #FCDDEC"
          width={"40%"}
          backgroundColor="var(--color-background-popup)"
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
              backgroundColor: "#FCDDEC",
              clipPath: "polygon(0 100%, 100% 0, 0 0)",
            },
            "::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "20px",
              height: "20px",
              backgroundColor: "#FCDDEC",
              clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
            },
          }}
        >
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            padding={"43px 41px 48px 41px"}
          >
            <CommonButton
              display={"flex"}
              alignItems={"center"}
              width="100%"
              justifyContent={"space-around"}
              padding={"10px 12px 10px 12px"}
              backgroundColor={"#5D1D4C"}
            >
              <Box
                cursor={"pointer"}
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
                    backgroundColor: "none",
                    clipPath: "polygon(0 100%, 100% 0, 0 0)",
                  },
                  "::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "20px",
                    height: "20px",
                    backgroundColor: "none",
                    clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                  },
                }}
                backgroundColor={tab == 0 ? "var(--color-main)" : ""}
                padding={"10px 20px 10px 20px"}
                onClick={() => setTab(0)}
              >
                <Text fontSize={"24px"} fontWeight={400}>
                  TAIKO Mining
                </Text>
              </Box>
              <Box
                cursor={"pointer"}
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
                    backgroundColor: "none",
                    clipPath: "polygon(0 100%, 100% 0, 0 0)",
                  },
                  "::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "20px",
                    height: "20px",
                    backgroundColor: "none",
                    clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                  },
                }}
                padding={"10px 20px 10px 20px"}
                border="none"
                backgroundColor={tab == 1 ? "var(--color-main)" : ""}
                onClick={() => setTab(1)}
              >
                <Text color={"#000"} fontSize={"24px"} fontWeight={400}>
                  BACHI Mining
                </Text>
              </Box>
            </CommonButton>
            <Image src={earningNode} />
            <Text fontSize={"40px"} fontWeight={700}>
              {mining[tab].amount} {mining[tab].name}
            </Text>
            <Text
              fontSize={"24px"}
              fontWeight={500}
              color="var(--color-main)"
              marginBottom={"61px"}
            >
              Level {mining[tab].level}: {mining[tab].speed} GH/s
            </Text>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={"10px"}
              width={"100%"}
            >
              <CommonButton
                backgroundColor="#FFF"
                width={"50%"}
                display={"flex"}
                justifyContent={"center"}
                paddingTop={"10px"}
                paddingBottom={"10px"}
              >
                <Text color={"#000"} fontSize={"24px"} fontWeight={500}>
                  Upgrade miner
                </Text>
              </CommonButton>
              <CommonButton
                backgroundColor="var(--color-main)"
                width={"50%"}
                display={"flex"}
                justifyContent={"center"}
                paddingTop={"10px"}
                paddingBottom={"10px"}
              >
                <Text fontSize={"24px"} fontWeight={500}>
                  Claim
                </Text>
              </CommonButton>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </SectionContainer>
  );
};

export default Earning;
