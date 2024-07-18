import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

//import component
import CommonButton from "../../../components/button/commonbutton";
import SectionContainer from "../../../components/container";
import CustomButton from "../../../components/button";
//import icon
import { HiArrowSmRight } from "react-icons/hi";
//import image
import resourcesHome from "../../../assets/img/resources-home.png";
import backgroundResources from "../../../assets/img/background-resources-home.png";
const ResourcesHome = () => {
  return (
    <>
      <SectionContainer
        position={"relative"}
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <Image
          src={resourcesHome}
          position={"absolute"}
          left={"0"}
          top={"-159.69px"}
        />
        <Flex
          flexDirection={"column"}
          width={"50%"}
          paddingTop={"311.31px"}
          position={"relative"}
          marginBottom={"180px"}
        >
          <Text
            fontSize={"86px"}
            lineHeight={"normal"}
            fontFamily="var(--font-heading)"
            marginBottom={"48px"}
          >
            resources
          </Text>
          <Flex flexDirection={"column"} gap={"40px"}>
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
                  margin={"33px 47px 37px 32px"}
                  gap={"22px"}
                >
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Text
                      fontSize={"36px"}
                      fontFamily="var(--font-heading-main)"
                      lineHeight={"normal"}
                    >
                      Ecosystem
                    </Text>
                    <CommonButton
                      width={"61px"}
                      height={"61px"}
                      backgroundColor="var(--color-main)"
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box sx={{ transform: "rotate(-45deg)" }}>
                        <HiArrowSmRight fontSize={"40px"} color="#000" />
                      </Box>
                    </CommonButton>
                  </Flex>
                  <Text fontSize={"24px"} fontFamily="var(--font-text-main)">
                    Be a part of the growing Bachi community.
                  </Text>
                </Flex>
              </CommonButton>
            </Box>
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
              }}
            >
              <CommonButton
                backgroundColor={"rgba(27, 27, 27, 0.20)"}
                border="0.5px solid var(--color-main)"
                boxShadow={"inset 0 0 10px var(--color-main)"}
                position="relative"
                zIndex="10"
              >
                <Flex
                  flexDirection={"column"}
                  margin={"33px 47px 37px 32px"}
                  gap={"22px"}
                >
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Text
                      fontSize={"36px"}
                      fontFamily="var(--font-heading-main)"
                      lineHeight={"normal"}
                    >
                      Docs
                    </Text>
                    <CommonButton
                      width={"61px"}
                      height={"61px"}
                      backgroundColor="var(--color-main)"
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box sx={{ transform: "rotate(-45deg)" }}>
                        <HiArrowSmRight fontSize={"40px"} color="#000" />
                      </Box>
                    </CommonButton>
                  </Flex>
                  <Text
                    fontSize={"24px"}
                    fontFamily="var(--font-text-main)"
                    width={"70%"}
                  >
                    Learn more about our architecture, technology and
                    tokenomics.
                  </Text>
                </Flex>
              </CommonButton>
            </Box>
          </Flex>
        </Flex>
      </SectionContainer>
      <SectionContainer
        position={"relative"}
        backgroundColor="var(--color-main)"
        backgroundImage={`url(${backgroundResources})`}
        height={"680px"}
      >
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          paddingTop={"160px"}
          gap={"100px"}
        >
          <Text
            fontSize={"86px"}
            textAlign={"center"}
            fontFamily="var(--font-heading)"
          >
            The next evolution of cloud compute
          </Text>
          <CommonButton
            width={"230px"}
            height={"70px"}
            backgroundColor="var(--color-background)"
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Text
              textAlign={"center"}
              fontSize={"20px"}
              color={"#FCDDEC"}
              fontWeight={500}
            >
              Let Do It
            </Text>
          </CommonButton>
        </Flex>
      </SectionContainer>
    </>
  );
};

export default ResourcesHome;
