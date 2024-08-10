import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { clientAPI } from "../api/client";

const queryKey = "referralsHistory";

async function fetchReferralsHistory(caller, currentPage) {
  try {
    const options = {
      caller: caller,
      limit: 10,
      offset: 10 * (currentPage - 1),
      sort: -1,
    };

    let data = await clientAPI(
      "post",
      "/api/transaction/get-referrals",
      options
    );
    const totalpages = Math.ceil(data?.total / 10);
    return { data: data?.data, totalpages };
  } catch (error) {
    console.log("error", error);

    return { data: [], total: 0 };
  }
}

export function useReferralsHistory(caller) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: [queryKey, currentPage],
    queryFn: async () => fetchReferralsHistory(caller, currentPage),
    refetchOnWindowFocus: false,
  });

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return {
    referralsHistoryData: data?.data,
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
