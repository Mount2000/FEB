import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import component
import CommonButton from "../button/commonbutton";
//import image
import iconNode from "../../assets/img/node/icon-node.png";
import Quantity from "../quantity";
import { Link } from "react-router-dom";
const PayNow = () => {
  return (
    <CommonButton
      border="0.5px solid var(--color-main)"
      width={"100%"}
      height={"100%"}
      marginTop={"65px"}
    >
      <Box margin={"58px 58px 44px 59px"}>
        <Flex
          flexDirection={"column"}
          gap={"32px"}
          fontFamily="var(--font-text-main)"
        >
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
              Minting Power
            </Text>
            <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
              100 GH/s
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
              Rent Period
            </Text>
            <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
              30 days
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
              Rent Price
            </Text>
            <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
              14.2 ETH
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Flex alignItems={"center"} gap={"32px"}>
              <Text
                fontSize={"36px"}
                fontWeight={400}
                color="var(--color-main)"
              >
                30 Days Profit
              </Text>
              <Image src={iconNode} />
            </Flex>
            <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
              20.736 ETH
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Flex alignItems={"center"} gap={"32px"}>
              <Text
                fontSize={"36px"}
                fontWeight={400}
                color="var(--color-main)"
              >
                Daily
              </Text>
              <Image src={iconNode} />
              <Image />
            </Flex>
            <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
              0.6912 ETH
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
              BACHI Reward
            </Text>
            <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
              50.000 ETH
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Text fontSize={"36px"} fontWeight={400} color={"#B2B2B2"}>
              Quantity
            </Text>
            <Quantity />
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
              Total Renting Price
            </Text>
            <Text fontSize={"36px"} fontWeight={400} color={"#FFF"}>
              14.2 ETH
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        borderTop={"1px solid var(--color-main)"}
      >
        <Link to="/node/node-tier-1">
          <CommonButton
            width={"750px"}
            height={"100px"}
            backgroundColor="var(--color-main)"
            margin={"58px 0 52px 0"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text textAlign={"center"} fontSize={"32px"} fontWeight={500}>
              PAY NOW
            </Text>
          </CommonButton>
        </Link>
      </Flex>
    </CommonButton>
  );
};

export default PayNow;
