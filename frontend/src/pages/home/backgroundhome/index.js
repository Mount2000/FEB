import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
//import component
import CommonButton from "../../../components/button/commonbutton";
//import image
import appLogo from "../../../assets/img/app-logo.png";
import backgroundHome from "../../../assets/img/homepage/background-home.png";
//import icon
import { HiArrowSmRight } from "react-icons/hi";

const BackgroundHome = () => {
  return (
    <Box
      backgroundImage={`url(${backgroundHome})`}
      backgroundSize="cover"
      // height={"1159.688px"}
      marginTop={"197px"}
      paddingTop={"225px"}
      paddingBottom={"264px"}
      zIndex={"1"}
      position={"relative"}
    >
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        paddingLeft={"173px"}
        paddingRight={"185px"}
        zIndex={"1"}
      >
        <Image
          width={"235px"}
          height={"100px"}
          src={appLogo}
          // marginTop={"225px"}
          marginBottom={"36px"}
        />
        <Text
          fontSize={"86px"}
          lineHeight={"normal"}
          fontFamily="var(--font-heading)"
          textAlign={"center"}
          marginBottom={"112px"}
        >
          Our distributed cloud brings compute closer to the edge.
        </Text>
        <Flex alignItems={"center"} gap={"48px"}>
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
            backgroundColor={"rgba(27, 27, 27, 0.20)"}
          >
            <CommonButton
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
                  <Text fontSize={"40px"} fontFamily="var(--font-text-extra)">
                    DOCUMENTATION
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
                <Text fontSize={"36px"} fontFamily="var(--font-heading-main)">
                  Learn about cost effective edge gaming
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
                  <Text fontSize={"40px"} fontFamily="var(--font-text-extra)">
                    DOCUMENTATION
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
                <Text fontSize={"36px"} fontFamily="var(--font-heading-main)">
                  Learn about cost effective edge gaming
                </Text>
              </Flex>
            </CommonButton>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BackgroundHome;
