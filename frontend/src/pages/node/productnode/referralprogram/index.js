import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  Th,
  Box,
  Tbody,
  Tfoot,
  Text,
  HStack,
  Flex,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
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
import {
  useReferralsHistory,
  useReferralsHistoryInfinity,
} from "../../../../hooks/useReferralsHistory";
import { formatTableValue } from "./formatTable";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import useInterval from "../../../../hooks/useInterval";
import useScreenWidth from "../../../../hooks/useScreenWidth";
import { base } from "viem/chains";
import { AddressCopier } from "../../../../components/addressCopier";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import ReactPaginate from "react-paginate";

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
  const {
    referralsHistoryData,
    totalPages,
    isLoading: isLoadingReferralsHistoryData,
    refetch: refetchReferralsHistoryData,
    isRefetching: isRefetchingReferralsHistoryData,
    prevPage: handlePrev,
    nextPage: handleNext,
    setCurrentPage,
    currentPage,
  } = useReferralsHistory(address);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    refetchReferralsHistoryData();
  };
  console.log({ referralsHistoryData });

  const {
    referralsHistoryDataInfinity,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useReferralsHistoryInfinity(address);

  console.log({ referralsHistoryDataInfinity });

  /********get total************/
  const getTotal = async () => {
    const ReferralCode = await readContract(config, {
      ...nodeManagerContract,
      functionName: "userReferralIdLinks",
      args: [address],
    });

    const ReferralInformation = await readContract(config, {
      ...nodeManagerContract,
      functionName: "referrals",
      args: [ReferralCode],
    });
    setTotalEth(Number(ReferralInformation[1]) / 10 ** chainDecimal);
  };

  const { ref, inView } = useInView();

  useInterval(() => {
    refetch();
    refetchReferralsHistoryData();
  }, 3000);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  const isMobile = useScreenWidth(480);
  const isTablet = useScreenWidth(1024);
  const historyTableData = {
    headers: [
      {
        label: "Time",
        key: "timestamps",
      },
      {
        label: "User Wallet",
        key: "caller",
      },
      {
        label: "Amount",
        key: "amount",
      },
    ],
    headersMobile: [
      {
        label: "Time",
        key: "timestamps",
      },
      {
        label: "User Wallet",
        key: "caller",
      },
      {
        label: "Amount",
        key: "amount",
      },
    ],
    data: isMobile ? referralsHistoryData : referralsHistoryDataInfinity,
  };

  return (
    <>
      <Flex flexDirection={"column"} gap={"66px"}>
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
      </Flex>

      {isMobile ? (
        <CommonButton
          border="0.5px solid var(--color-main)"
          width={"100%"}
          height={"100%"}
          marginTop={"65px"}
          backgroundColor="var(--color-background-footer)"
          fontFamily={"var(--font-text-main)"}
          fontSize={{ base: "16px" }}
        >
          {historyTableData.data?.length > 0 ? (
            historyTableData.data?.map((record) => {
              return (
                <Box
                  padding={"32px"}
                  borderBottom={"0.5px solid var(--color-main)"}
                >
                  <Flex direction={"column"} w={"100%"}>
                    {historyTableData.headersMobile.map((item) => {
                      return (
                        <SimpleGrid columns={2} w={"100%"}>
                          <Box>
                            <Text>{item.label}</Text>
                          </Box>
                          <Box>
                            {item.key === "caller" ? (
                              <AddressCopier
                                address={record.caller}
                                digits={5}
                              />
                            ) : (
                              <Text>{record[item.key]}</Text>
                            )}
                          </Box>
                        </SimpleGrid>
                      );
                    })}
                  </Flex>
                </Box>
              );
            })
          ) : (
            <Box
              padding={"32px"}
              borderBottom={"0.5px solid var(--color-main)"}
            >
              <Text textAlign={"center"}>No record</Text>
            </Box>
          )}
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            py={"24px"}
          >
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              breakClassName={"ellipsis"}
              breakLabel={"..."}
              previousLabel={<MdOutlineArrowBackIosNew />}
              nextLabel={<MdOutlineArrowForwardIos />}
              renderOnZeroPageCount={null}
              initialPage={currentPage - 1}
            />
          </Box>
        </CommonButton>
      ) : (
        <CommonButton
          border="0.5px solid var(--color-main)"
          width={"100%"}
          height={"100%"}
          marginTop={"65px"}
          backgroundColor={
            !isTablet
              ? "var(--color-background-popup)"
              : "var(--color-background-footer)"
          }
          padding={"32px 24px"}
        >
          <TableContainer w={"100%"}>
            <Table w={"100%"} variant="unstyled" className="history-table">
              <Thead
                w={"100%"}
                h={"80px"}
                color="white"
                fontWeight="400"
                borderRadius="3px"
                backgroundColor="var(--color-main)"
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
                      "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                    "::before": {
                      width: "20px",
                      height: "20px",
                      backgroundColor: "pink.500",
                    },
                    "::after": {
                      width: "20px",
                      height: "20px",
                      backgroundColor: "pink.500",
                    },
                  },
                }}
              >
                <Tr className="transaction-history-table-header-container">
                  {historyTableData.headers.map((e, index) => {
                    let width = "auto";
                    if (e.key === "caller") {
                      width = "40%";
                    } else {
                      width = "20%";
                    }
                    return (
                      <Td
                        className="transaction-table-header-column"
                        border={"none"}
                        color={"white"}
                        fontFamily={"var(--font-text-main)"}
                        fontSize={{ base: "16px", xl: "24px" }}
                        w={width}
                      >
                        <Box ml={"24px"}>{e.label}</Box>
                      </Td>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody w={"100%"}>
                {historyTableData.data?.length > 0 ? (
                  historyTableData.data?.map((e, rowIndex) => {
                    const keyValues = Object.keys(e);
                    return (
                      <Tr>
                        {keyValues.map((keyvalue, index) => {
                          let width = "auto";
                          if (e.key === "caller") {
                            width = "40%";
                          } else {
                            width = "20%";
                          }
                          return (
                            <Td w={width}>
                              <Box
                                mt={"24px"}
                                ml={"24px"}
                                fontFamily={"var(--font-text-main)"}
                                fontSize={{ base: "16px", xl: "24px" }}
                              >
                                {formatTableValue(e[keyvalue], keyvalue)}
                              </Box>
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })
                ) : (
                  <Tr w={"100%"}>
                    <Td colSpan={4} w={"100%"}>
                      <Box textAlign={"center"}>No records found</Box>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
            {historyTableData.data?.length ? (
              <HStack pt="32px" pb="20px" justifyContent="center" w="full">
                <Text ref={ref} fontFamily={"var(--font-text-main)"}>
                  {isFetchingNextPage ? (
                    <BeatLoader color="#7ae7ff" size="10px" />
                  ) : hasNextPage ? (
                    ""
                  ) : (
                    "Nothing more to load"
                  )}
                </Text>
              </HStack>
            ) : (
              ""
            )}
          </TableContainer>
        </CommonButton>
      )}
    </>
  );
};

export default ReferralProgram;
