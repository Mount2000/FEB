// export default ReferralProgram;
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";

//import component
import CommonButton from "../../../../components/button/commonbutton";
//import image
import iconReferral from "../../../../assets/img/node/icon-referral-node.png";

const ReferralProgram = () => {
  return (
    <>
      <Flex flexDirection={"column"} gap={"66px"} marginBottom={"600px"}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingTop={"108px"}
          gap={"18px"}
        >
          {[
            "YOUR INVITEES",
            "TOTAL BACHI COMMISSION",
            "TOTAL ETH COMMISSION",
          ].map((title, index) => (
            <Box
              key={index}
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
              }}
            >
              <CommonButton
                backgroundColor={"rgba(27, 27, 27, 0.20)"}
                boxShadow={"inset 0 0 10px var(--color-main)"}
                border="0.5px solid var(--color-main)"
                position="relative"
                zIndex="10"
              >
                <Flex
                  flexDirection={"column"}
                  gap={"30px"}
                  paddingTop={"45px"}
                  paddingLeft={"50px"}
                  paddingBottom={"43px"}
                >
                  <Text
                    fontSize={"32px"}
                    fontWeight={400}
                    fontFamily="var(--font-text-extra)"
                    color="var(--color-main)"
                    lineHeight={"normal"}
                  >
                    {title}
                  </Text>
                  {index === 0 ? (
                    <Text
                      fontSize={"24px"}
                      fontWeight={600}
                      lineHeight={"normal"}
                    >
                      ...
                    </Text>
                  ) : (
                    <Flex alignItems="center">
                      {index === 2 && (
                        <Box
                          as="img"
                          src={iconReferral}
                          alt="ETH Icon"
                          mr={2}
                        />
                      )}
                      <Text
                        fontSize={"24px"}
                        fontWeight={600}
                        lineHeight={"normal"}
                      >
                        0 {index === 1 ? "BACHI" : "ETH"}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </CommonButton>
            </Box>
          ))}
        </Flex>
        <CommonButton
          border="0.5px solid var(--color-main)"
          backgroundColor="var(--color--background--extra)"
        >
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={6}
            alignItems="center"
            paddingTop={"26px"}
            paddingBottom={"25px"}
          >
            <Text paddingLeft={"50px"} fontSize={"24px"} fontWeight={500}>
              Time
            </Text>
            <Text paddingLeft={"50px"} fontSize={"24px"} fontWeight={500}>
              User Wallet
            </Text>
            <Text paddingLeft={"50px"} fontSize={"24px"} fontWeight={500}>
              Key Price
            </Text>
          </Grid>
        </CommonButton>
      </Flex>
    </>
  );
};

export default ReferralProgram;
