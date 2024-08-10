import React, { useEffect } from "react";
import {
  useTransactionHistory,
  useTransactionHistoryInfinity,
} from "../../../../hooks/useTransacitonHistory";
import { useAccount } from "wagmi";
import CommonButton from "../../../../components/button/commonbutton";
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
} from "@chakra-ui/react";
import { formatTableValue } from "./formatTable";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import useInterval from "../../../../hooks/useInterval";

const RuneExplorer = () => {
  const {
    transactionHistoryData,
    totalPages,
    isLoading: isLoadingTransactionHistoryData,
    refetch: refetchTransactionHistoryData,
    isRefetching: isRefetchingTransactionHistoryData,
    prevPage: handlePrev,
    nextPage: handleNext,
    setCurrentPage,
    currentPage,
  } = useTransactionHistory();

  const {
    transactionHistoryDataInfinity,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useTransactionHistoryInfinity();

  const { ref, inView } = useInView();

  useInterval(() => {
    refetch();
    refetchTransactionHistoryData();
  }, 3000);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  const historyTableData = {
    headers: [
      {
        label: "No.",
        key: "num",
      },
      {
        label: "Type",
        key: "type",
      },
      {
        label: "Wallet",
        key: "caller",
      },
      {
        label: "Process",
        key: "Status",
      },
    ],
    data: transactionHistoryDataInfinity,
  };

  return (
    <>
      <CommonButton
        border="0.5px solid var(--color-main)"
        width={"100%"}
        height={"100%"}
        marginTop={"65px"}
        backgroundColor="var(--color-background-popup)"
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
                      fontSize={{base: "16px", xl: "24px"}}
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
                              fontSize={{base: "16px", xl: "24px"}}
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
    </>
  );
};

export default RuneExplorer;
