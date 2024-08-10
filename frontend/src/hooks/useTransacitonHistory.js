import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { clientAPI } from "../api/client";

const queryKey = "transactionHistory";

async function fetchTransactionHistory(currentPage) {
  try {
    const options = {
      limit: 10,
      offset: 10 * (currentPage - 1),
      sort: -1,
    };

    let data = await clientAPI(
      "post",
      "/api/transaction/get-transaction",
      options
    );
    const totalpages = Math.ceil(data?.total / 10);
    const newData = data?.data?.map((item, index) => {
      return {
        num: index + 1,
        type: item.type,
        caller: item.caller,
        status: item.status,
      };
    });
    return { data: newData, totalpages };
  } catch (error) {
    console.log("error", error);

    return { data: [], total: 0 };
  }
}

export function useTransactionHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: [queryKey, currentPage],
    queryFn: async () => fetchTransactionHistory(currentPage),
    refetchOnWindowFocus: false,
  });

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return {
    transactionHistoryData: data?.data,
    totalPages: data?.totalpages,
    refetch,
    isLoading,
    isRefetching,
    prevPage,
    nextPage,
    setCurrentPage,
    currentPage,
  };
}
