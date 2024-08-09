import React from "react";
import { useTransactionHistory } from "../../../../hooks/useTransacitonHistory";
import { useAccount } from "wagmi";

const RuneExplorer = () => {
  const { address } = useAccount();
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
  } = useTransactionHistory(address);
  console.log({ transactionHistoryData });
  return <div>RuneExplorer</div>;
};

export default RuneExplorer;
