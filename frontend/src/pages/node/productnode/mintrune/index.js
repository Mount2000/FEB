import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import component
import SectionContainer from "../../../../components/container";
import CommonButton from "../../../../components/button/commonbutton";
import PayNow from "../../../../components/paynow";
//import image
import productCoreI5 from "../../../../assets/img/node/product-corei5.png";
import productCoreI7 from "../../../../assets/img/node/product-corei7.png";
import productCoreI9 from "../../../../assets/img/node/product-corei9.png";

const MintRune = () => {
  return (
    <SectionContainer width={"100%"} paddingLeft={"0px"} paddingRight={"0px"}>
      <Flex flexDirection={"column"} marginTop={"87px"}>
        <Flex gap={"48px"}>
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
                alignItems={"center"}
                gap={"41px"}
                marginTop={"51px"}
                marginBottom={"60px"}
              >
                <Text
                  fontSize={"48px"}
                  fontWeight={700}
                  fontFamily="var(--font-text-main)"
                >
                  Core i5
                </Text>
                <Image src={productCoreI5} />
                <Text fontSize={"32px"} fontWeight={400}>
                  10 GH/s
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
                alignItems={"center"}
                gap={"41px"}
                marginTop={"51px"}
                marginBottom={"60px"}
              >
                <Text
                  fontSize={"48px"}
                  fontWeight={700}
                  fontFamily="var(--font-text-main)"
                >
                  Core i7
                </Text>
                <Image src={productCoreI7} />
                <Text fontSize={"32px"} fontWeight={400}>
                  100 GH/s
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
                alignItems={"center"}
                gap={"41px"}
                marginTop={"51px"}
                marginBottom={"60px"}
              >
                <Text
                  fontSize={"48px"}
                  fontWeight={700}
                  fontFamily="var(--font-text-main)"
                >
                  Core i9
                </Text>
                <Image src={productCoreI9} />
                <Text fontSize={"32px"} fontWeight={400}>
                  1000 GH/s
                </Text>
              </Flex>
            </CommonButton>
          </Box>
        </Flex>
        <PayNow />
      </Flex>
    </SectionContainer>
  );
};

export default MintRune;
