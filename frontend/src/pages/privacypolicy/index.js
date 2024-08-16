import React from "react";
import SectionContainer from "../../components/container";
import { Box, Flex, Image, List, ListItem, Text } from "@chakra-ui/react";
import termsbackground from "../../assets/img/terms-background.png";
import termsbackgrounddown from "../../assets/img/terms-background-down.png";

const PrivacyPolicy = () => {
  const terms = [
    {
      title: "Introduction",
      info: "This Privacy Policy outlines how Bachiswap collects, uses, shares, and protects your personal information when you use our trading platform. We are committed to respecting your privacy and safeguarding your personal data.",
    },
    {
      title: "Information We Collect",
      info: "Bachiswap provides a trading platform that enables users to exchange cryptocurrencies. We do not guarantee the continuous or uninterrupted availability of the service.",
    },
    {
      title: "How We Use Your Information",
      info: "We do not share your personal information with any third parties, except as required by law or to protect our rights and property.",
    },
    {
      title: "Sharing of Information",
      info: "We do not share your personal information with any third parties, except as required by law or to protect our rights and property.",
    },
    {
      title: "Data Security",
      info: "We employ technical and organizational security measures to protect your personal information from loss, unauthorized access, disclosure, alteration, use, or destruction.",
    },
    {
      title: "Your Rights",
      info: "You have the right to access, modify, and delete your personal information. You also have the right to object to the processing of your personal information.",
    },
    {
      title: "Changes to This Privacy Policy",
      info: "We may update this Privacy Policy from time to time. We will notify you of any significant changes.  ",
    },
    {
      title: "Contact Us",
      info: "Bachiswap reserves the right to change these Terms of Service at any time. We will notify you of any material changes.",
    },
    {
      title: "Contact",
      info: "If you have any questions or concerns about this Privacy Policy, please contact us using the contact information provided on the Bachiswap website. Note This is a general template. Bachiswap may have a more detailed privacy policy with specific terms and conditions. Please refer to the official Bachiswap website for the most accurate information.",
    },
  ];

  const termservices = [
    {
      title:
        "Additionally, when drafting a privacy policy, consider the following:",
      services:
        "Compliance with Laws: Ensure your policy complies with current data protection regulations.",
      services1:
        "Transparency: Use clear and understandable language so users can easily comprehend how their information is handled.",
      services2:
        "Data Security: Implement robust security measures to protect personal information.",
      services3: "User Rights: Guarantee users have control over their data",
    },
  ];
  return (
    <>
      <SectionContainer
        padding={{
          base: "0px 47px 0px 47px",
          lg: "0px 112px 0px 112px",
          "3xl": "0px 188px 0px 188px",
        }}
        backgroundImage={`url(${termsbackground})`}
        backgroundSize={{ base: "100% 100%", "3xl": "100%" }}
        backgroundRepeat={"no-repeat"}
        height={{ base: "270px", lg: "340px", xl: "400px", "3xl": "900px" }}
      >
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Text
            textAlign={"center"}
            marginTop={{
              base: "70px",
              md: "80px",
              lg: "110px",
              xl: "130px",
              "3xl": "250px",
            }}
            fontSize={{ base: "32px", "3xl": "56px" }}
            lineHeight={{ base: "", "3xl": "64px" }}
            letterSpacing={"-1px"}
            fontFamily="var(--font-text-main)"
          >
            Privacy Policy
          </Text>
        </Flex>
      </SectionContainer>
      <SectionContainer
        padding={{
          base: "0px 47px 0px 47px",
          lg: "0px 112px 0px 112px",
          "3xl": "0px 188px 0px 188px",
        }}
      >
        <Flex
          flexDirection={"column"}
          gap={{ base: "40px", "3xl": "80px" }}
          paddingTop={"10px"}
        >
          {terms.map((item, index) => (
            <Flex key={index} flexDirection={"column"} gap={"16px"}>
              <Text
                fontSize={{
                  base: "20px",
                  lg: "24px",
                  xl: "28px",
                  "3xl": "32px",
                }}
                fontFamily="var(--font-text-main)"
                letterSpacing={"-1px"}
                lineHeight={{ "3xl": "40px" }}
              >
                {item.title}
              </Text>
              <Text
                fontSize={{ base: "16px", lg: "20px", "3xl": "24px" }}
                fontFamily="var(--font-text-main)"
                letterSpacing={"-1px"}
                lineHeight={{ base: "28px" }}
              >
                {item.info}
              </Text>
            </Flex>
          ))}
        </Flex>
      </SectionContainer>
      {/* <SectionContainer
        padding={{ base: "0px 47px 0px 47px", "3xl": "0px 188px 0px 188px" }}
        backgroundImage={`url(${termsbackgrounddown})`}
        backgroundSize={{ base: "100% 100%", "3xl": "100%" }}
        backgroundRepeat={"no-repeat"}
        height={{ base: "205px" }}
      ></SectionContainer> */}

      <SectionContainer
        padding={{
          base: "205px 47px 76px 47px",
          lg: "429px 112px 100px 112px",
          "3xl": "569px 188px 146px 188px ",
        }}
      >
        <Flex flexDirection={"column"} gap={{ base: "32px", "3xl": "40px" }}>
          <Text
            fontSize={{ base: "20px", "3xl": "24px" }}
            lineHeight={{ "3xl": "32px" }}
            letterSpacing={"-1px"}
            fontFamily="var(--font-text-main)"
          >
            Note: This is a general template. Bachiswap may have more detailed
            Terms of Service with specific terms and conditions. Please refer to
            the official Bachiswap website for the most accurate information.
          </Text>
          <Flex flexDirection={"column"} gap={{ base: "40px", "3xl": "80px" }}>
            {termservices.map((item, index) => (
              <Flex flexDirection={"column"} gap={"16px"} key={index}>
                <Text
                  fontSize={{
                    base: "20px",
                    lg: "24px",
                    xl: "28px",
                    "3xl": "32px",
                  }}
                  fontFamily="var(--font-text-main)"
                  lineHeight={{ "3xl": "40px" }}
                  letterSpacing={"-1px"}
                >
                  {item.title}
                </Text>
                <List spacing={2} styleType="disc">
                  {Object.values(item)
                    .slice(1)
                    .map((service, i) => (
                      <ListItem
                        key={i}
                        marginBottom={"16px"}
                        marginLeft={"30px"}
                      >
                        <Text
                          fontSize={{ base: "16px", lg: "20px", "3xl": "24px" }}
                          fontFamily="var(--font-text-main)"
                          lineHeight={{ "3xl": "32px" }}
                          letterSpacing={"-1px"}
                        >
                          {service}
                        </Text>
                      </ListItem>
                    ))}
                </List>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </SectionContainer>
    </>
  );
};

export default PrivacyPolicy;
