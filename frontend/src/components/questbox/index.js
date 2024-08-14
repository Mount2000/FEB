import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CommonButton from "../button/commonbutton";
import MainButton from "../button/MainButton";
import airDropComplete from "../../assets/img/airdrop/airdrop-complete.png";
import { readContract } from "@wagmi/core";
import { useAccount, useConfig } from "wagmi";

import { config } from "../../components/wallets/config";
import toast from "react-hot-toast";
import iconNodedetail from "../../assets/img/node/icon-node-detail.png";
import node_manager_contract from "../../utils/contracts/node_manager_contract";
import { base } from "viem/chains";
const QuestBox = ({
  title,
  rewardText,
  rewardTotal,
  buttonText,
  onClick,
  inputPlaceholder,
}) => {
  const { address } = useAccount();
  const [referralCode, setReferralCode] = useState("BACHISWAP_xxx_xxxx");
  const nodeManagerContract = {
    address: node_manager_contract.CONTRACT_ADDRESS,
    abi: node_manager_contract.CONTRACT_ABI,
  };
  useEffect(() => {
    if (address) {
      getReferral();
    }
  }, [address]);
  /***Get Referral*****/
  const getUserReferral = async () => {
    const refId = await readContract(config, {
      ...nodeManagerContract,
      functionName: "userReferralIdLinks",
      args: [address],
    });
    const referrals = await readContract(config, {
      ...nodeManagerContract,
      functionName: "referrals",
      args: [refId],
    });
    return referrals[0];
  };
  const getReferral = async () => {
    const code = await getUserReferral(address);
    setReferralCode(code);
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      alignItems="stretch"
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
        display="flex"
        flexDirection="column"
        flex="1"
        position="relative"
        zIndex="10"
      >
        <Flex
          flexDirection={"column"}
          padding={{
            base: "24px 32px",
            lg: "16px 20px 16px 20px",
            xl: "24px 36px 24px 36px",
            "3xl": "32px 40px 40px 40px",
          }}
          gap={{ base: "24px", lg: "32px", "2xl": "22px", "3xl": "25px" }}
          height="100%"
        >
          <Flex flexDirection={"column"} flex="1">
            <Text
              py={{ base: "15px", "3xl": "24px" }}
              fontSize={{
                base: "20px",
                "3xl": "24px",
              }}
              fontFamily="var(--font-text-extra)"
            >
              {title}
            </Text>
            {rewardText && (
              <Flex alignItems={"center"} gap={{ base: "24px" }}>
                <Text fontSize={{ "3xl": "20px" }} color={"#646464"}>
                  {rewardText}
                </Text>
                <MainButton
                  backgroundColor={"transparent"}
                  border={"2px solid #23F600"}
                  borderRadius={"20px"}
                  width={{ base: "80px" }}
                  height={{ base: "40px" }}
                >
                  <Text color={"#23F600"}>{rewardTotal} TAIKO</Text>
                </MainButton>
              </Flex>
            )}
          </Flex>
          <Flex
            flexDirection={{ base: "column", md: "row", xl: "column" }}
            gap={{ base: "24px" }}
          >
            {inputPlaceholder && (
              <Box
                width={{ base: "100%", md: "60%", xl: "100%" }}
                border="1px solid #FCDDEC"
                padding={{
                  base: "5px",
                  md: "5px 10px",
                  lg: "10px 20px",
                  xl: "16px 24px",
                  "3xl": "25px 18px 17px 32px",
                }}
                position="relative"
              >
                <Box
                  position="absolute"
                  top="-15px"
                  left={{ base: "20px", xl: "20px", "3xl": "50px" }}
                  width="fit-content"
                  padding="0 5px"
                  zIndex={1}
                >
                  <Text
                    backgroundColor="var(--color-background-popup)"
                    color="#FFFFFF"
                    fontSize={{ base: "16px", md: "16px", xl: "20px" }}
                    fontWeight={500}
                    fontFamily="var(--font-text-main)"
                  >
                    My Referral
                  </Text>
                </Box>
                <Flex flexDirection={"column"} width={"100%"}>
                  <ReferralCopier referralCode={referralCode} />
                </Flex>
              </Box>
            )}
            <MainButton
              width={"100%"}
              padding={{ base: "", "3xl": "16px 24px" }}
              backgroundColor="var(--color-main)"
              onClick={onClick}
              height={{ base: "44px", lg: "56px", "3xl": "71px" }}
            >
              <Text
                color={"#FFF"}
                fontSize={"20px"}
                lineHeight={{ base: "24px" }}
                fontFamily="var(--font-text-main)"
              >
                {buttonText}
              </Text>
            </MainButton>
          </Flex>
          <Flex alignItems={"center"} gap={"16px"} display={"none"}>
            <Text
              fontSize={{ base: "", lg: "", "3xl": "32px" }}
              fontWeight={400}
              lineHeight={{ base: "", "3xl": "40px" }}
              fontFamily="var(--font-text-main)"
              color="#23F600"
            >
              Complete
            </Text>
            <Image src={airDropComplete} />
          </Flex>
        </Flex>
      </CommonButton>
    </Box>
  );
};

export default QuestBox;

const ReferralCopier = ({ referralCode }) => {
  const handleCopy = (label, text) => {
    toast.success(`${label} copied!`);
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Flex
        onClick={() => handleCopy("referral", referralCode)}
        alignItems="center"
        maxWidth={{
          base: "290px",
          md: "450px",
          xl: "250px",
          "2xl": "340px",
          "3xl": "400px",
        }}
        overflow="hidden"
      >
        <Text
          fontSize={{ base: "14px", md: "20px" }}
          fontWeight={300}
          isTruncated
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {`http://bachi.swap.io/Bachi-Taiko-Swap?referral-code=${referralCode}`}
        </Text>
        <Image
          src={iconNodedetail}
          height={{ base: "20px", md: "25px" }}
          marginLeft="8px"
        />
      </Flex>
    </>
  );
};
