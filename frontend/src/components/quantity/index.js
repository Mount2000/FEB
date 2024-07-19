import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Quantity = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };
  const reduceCount = () => {
    setCount(count - 1);
  };
  return (
    <Flex alignItems={"center"}>
      <Flex
        width={"55px"}
        height={"54px"}
        backgroundColor={"#FFF"}
        borderTopLeftRadius={"7px"}
        borderBottomLeftRadius={"7px"}
        onClick={reduceCount}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text color={"#000"} fontSize={"30px"} cursor={"pointer"} >
          -
        </Text>
      </Flex>
      <Flex width={"77px"} alignItems={"center"} justifyContent={"center"}>
        <Text fontSize={"24px"} fontWeight={400}>
          {count}
        </Text>
      </Flex>
      <Flex
        width={"55px"}
        height={"54px"}
        backgroundColor={"#FFF"}
        borderTopRightRadius={"7px"}
        borderBottomRightRadius={"7px"}
        onClick={increaseCount}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text color={"#000"} fontSize={"30px"} cursor={"pointer"}>
          +
        </Text>
      </Flex>
    </Flex>
  );
};

export default Quantity;
