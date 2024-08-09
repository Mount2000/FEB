// export default ReferralProgram;
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
//import component
import CommonButton from "../../../../components/button/commonbutton";
//import image
import iconReferral from "../../../../assets/img/node/icon-referral-node.png";

import { useAccount } from "wagmi";
import { config } from "../../../../components/wallets/config";
import node_manager_contract from "../../../../utils/contracts/node_manager_contract";
import { useClient } from "wagmi";
import { base } from "viem/chains";

const ReferralProgram = () => {
  const { address } = useAccount();
  const client = useClient();
  const chainDecimal = client.chain.nativeCurrency.decimals;
  const nodeManagerContract = {
    address: node_manager_contract.CONTRACT_ADDRESS,
    abi: node_manager_contract.CONTRACT_ABI,
  };

  const [totalEth, setTotalEth] = useState(0);

  useEffect(() => {
    if (address) {
      getTotal();
    }
  }, [address]);

  const getTotal = async () => {
    const ReferralCode = await readContract(config, {
      ...nodeManagerContract,
      functionName: "userReferralIdLinks",
      args: [address],
    });
    console.log({ ReferralCode });

    const ReferralInformation = await readContract(config, {
      ...nodeManagerContract,
      functionName: "referrals",
      args: [ReferralCode],
    });
    console.log({ ReferralInformation });
    setTotalEth(Number(ReferralInformation[1]) / 10 ** chainDecimal);
  };
  console.log(totalEth);

  return (
    <>
      <Flex flexDirection={"column"} gap={"66px"} marginBottom={"600px"}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"stretch"}
          justifyContent={"space-between"}
          marginTop={{ base: "60px", xl: "108px" }}
          gap={"18px"}
          height={"100%"}
        >
          {[
            "YOUR INVITEES",
            "TOTAL BACHI COMMISSION",
            "TOTAL ETH COMMISSION",
          ].map((title, index) => (
            <Box
              key={index}
              width={"100%"}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
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
                "@media (max-width: 992px)": {
                  clipPath:
                    "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                  "::before": {
                    width: "10px",
                    height: "10px",
                    backgroundColor: "pink.500",
                  },
                  "::after": {
                    width: "10px",
                    height: "10px",
                    backgroundColor: "pink.500",
                  },
                },
              }}
            >
              <CommonButton
                backgroundColor={"rgba(27, 27, 27, 0.20)"}
                boxShadow={"inset 0 0 10px var(--color-main)"}
                border="0.5px solid var(--color-main)"
                position="relative"
                zIndex="10"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
              >
                <Flex
                  flexDirection={"column"}
                  gap={{ base: "15px", xl: "30px" }}
                  justifyContent={"space-between"}
                  paddingTop={{ base: "25px", md: "45px" }}
                  paddingLeft={{ base: "30px", md: "25px", xl: "50px" }}
                  paddingBottom={{ base: "23px", md: "43px" }}
                  paddingRight={{ base: "20px" }}
                  height="100%"
                >
                  <Text
                    fontSize={{ base: "24px", xl: "32px" }}
                    fontWeight={400}
                    fontFamily="var(--font-text-extra)"
                    color="var(--color-main)"
                    lineHeight={"normal"}
                  >
                    {title}
                  </Text>
                  {index === 0 ? (
                    <Text
                      fontSize={{ base: "18px", xl: "24px" }}
                      fontWeight={600}
                      lineHeight={"normal"}
                    >
                      ...
                    </Text>
                  ) : (
                    <Flex alignItems="center">
                      {index === 2 && (
                        <Image
                          as="img"
                          src={iconReferral}
                          alt="ETH Icon"
                          mr={2}
                          height={{ base: "24px", xl: "32px " }}
                        />
                      )}
                      <Text
                        fontSize={{ base: "18px", xl: "24px" }}
                        fontWeight={600}
                        lineHeight={"normal"}
                      >
                        {index === 1 ? "BACHI" : `${totalEth} ETH`}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </CommonButton>
            </Box>
          ))}
        </Flex>

        <CommonButton
          border="0.5px solid var(--color-main)"
          backgroundColor="var(--color-background-popup)"
        >
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={{ base: 0, sm: 6 }}
            alignItems="center"
            paddingTop={"26px"}
            paddingBottom={"25px"}
          >
            <Text
              paddingLeft={{ base: "0px", md: "25px", xl: "50px" }}
              fontSize={{ base: "18px", md: "24px" }}
              fontWeight={500}
              textAlign={{ base: "center", md: "start" }}
            >
              Time
            </Text>
            <Text
              paddingLeft={{ base: "0px", md: "25px", xl: "50px" }}
              fontSize={{ base: "18px", md: "24px" }}
              fontWeight={500}
              textAlign={{ base: "center", md: "start" }}
            >
              User Wallet
            </Text>
            <Text
              paddingLeft={{ base: "0px", md: "25px", xl: "50px" }}
              fontSize={{ base: "18px", md: "24px" }}
              fontWeight={500}
              textAlign={{ base: "center", md: "start" }}
            >
              Key Price
            </Text>
          </Grid>
        </CommonButton>
      </Flex>
    </>
  );
};

export default ReferralProgram;
