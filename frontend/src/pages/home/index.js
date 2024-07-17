import React from "react";
import "./style.css";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
//import component
import BannerHome from "./bannerhome";
import ProductHome from "./bachiproduct";
import BackgroundHome from "./backgroundhome";
//import image

const HomePage = () => {
  return (
    <>
      <section>
        <BannerHome />
      </section>
      <section>
        <ProductHome/>
      </section>
      <section>
        <BackgroundHome/>
      </section>
    </>
  );
};

export default HomePage;
