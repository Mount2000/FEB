import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
//import image
import appProduct from "../../../assets/img/app-product.png";

const ProductHome = () => {
  return (
    <Flex>
      <Image src={appProduct} />
      <Flex>
        <Text>BACHI Product</Text>
        <Text>Unlocking the potential of artificial intelligence</Text>
        <Text>
          BACHI provides innovative products that empower users to engage in
          trading. Swap tokens and contribute liquidity to various protocols
          seamlessly. But that's not all! Users can earn rewards for providing
          liquidity and actively participate in the BACHI DAO
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProductHome;
