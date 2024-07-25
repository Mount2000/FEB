import React, { useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
//import component
import SectionContainer from "../../components/container";
import CustomButton from "../../components/button";
//import image
import backgroundMain from "../../assets/img/node/backgroundmain-node.png";
import CommonButton from "../../components/button/commonbutton";

const AirDrop = () => {
  return (
    <SectionContainer
      marginLeft={"44px"}
      marginRight={"40px"}
      paddingLeft={"0px"}
      paddingRight={"0px"}
    >
      <Box height="800px">
        <CustomButton
          width="100%"
          height="100% "
          backgroundImage={`url(${backgroundMain})`}
          backgroundSize="cover"
          backgroundColor="transparent"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          boder="none"
          _hover={{
            backgroundColor: "var(--color-background)",
          }}
        >
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Text
              fontSize={"64px"}
              fontWeight={400}
              fontFamily="var(--font-heading-main)"
              lineHeight={"50px"}
            >
              Bachi Swap
            </Text>
            <Text
              fontSize={"36px"}
              fontWeight={400}
              fontFamily="var(--font-text-main)"
              lineHeight={"50px"}
            >
              Power the future of AI and Gaming, achieve ATH
            </Text>
          </Flex>
        </CustomButton>
      </Box>

      <CommonButton
        border="0.5px solid var(--color-main)"
        width="100%"
        height="100%"
        marginTop={"89px"}
      >
        <Flex
          alignItems={"center"}
          padding={"64px 59px 65px 83px"}
          gap={"30px"}
        >
          <Flex flexDirection={"column"} gap={"18px"}>
            <Flex flexDirection={"column"} gap={"10px"}>
              <Text
                fontSize={"32px"}
                fontWeight={400}
                fontFamily="var(--font-heading-main)"
              >
                223,762,017.076 veATH TVL
              </Text>
              <Text
                fontSize={"24px"}
                fontWeight={400}
                fontFamily="var(--font-heading-main)"
              >
                Stake to Gaming Ecosystem
              </Text>
              <Text
                fontSize={"24px"}
                fontWeight={400}
                fontFamily="var(--font-text-main)"
              >
                Empower the next generation of blockchain-based games. By
                staking Bachi in the Gaming Pool, you will be able to earn
                rewards from our gaming partners, alongside ATH rewards. All
                stakers will be able to participate in BachiDAO’s governance
                system upon BachiDAO launch.
              </Text>
            </Flex>
            <CommonButton
              backgroundColor="var(--color-main)"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center "}
              height={"100px"}
            >
              <Text fontSize={"24px"} fontWeight={500}>
                Explorer
              </Text>
            </CommonButton>
          </Flex>
          <CommonButton
            padding={"56px 55px 60px 55px"}
            backgroundColor="var(--color-main)"
          >
            <Flex flexDirection={"column"} gap={"18px"}>
              <Flex flexDirection={"column"} gap={"10px"}>
                <Text
                  fontSize={"32px"}
                  fontWeight={400}
                  fontFamily="var(--font-heading-main)"
                >
                  223,762,017.076 veATH TVL
                </Text>
                <Text
                  fontSize={"24px"}
                  fontWeight={400}
                  fontFamily="var(--font-heading-main)"
                >
                  Stake to Gaming Ecosystem
                </Text>
                <Text
                  fontSize={"24px"}
                  fontWeight={400}
                  fontFamily="var(--font-text-main)"
                >
                  Empower the next generation of blockchain-based games. By
                  staking Bachi in the Gaming Pool, you will be able to earn
                  rewards from our gaming partners, alongside ATH rewards. All
                  stakers will be able to participate in BachiDAO’s governance
                  system upon BachiDAO launch.
                </Text>
              </Flex>
              <CommonButton
                backgroundColor="var(--color-background)"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center "}
                height={"100px"}
              >
                <Text fontSize={"24px"} fontWeight={500}>
                  Explorer
                </Text>
              </CommonButton>
            </Flex>
          </CommonButton>
        </Flex>
      </CommonButton>
    </SectionContainer>
  );
};

export default AirDrop;
