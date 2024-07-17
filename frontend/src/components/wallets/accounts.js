import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { getBalance, getChainId, getChains } from "@wagmi/core";
import { config } from "./config";
import { formatBalacne } from "../../utils";
import { AddressCopier } from "../addressCopier";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address,
  });
  const chains = getChains(config);
  const chainId = getChainId(config);
  const currentChain = chains.find((chain) => chain.id === chainId);
  console.log({ currentChain });

  return (
    <Box color={"black"}>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <AddressCopier
          address={ensName ? `${ensName} (${address})` : address}
        />
      )}
      {address && !isLoading && (
        <div>{`${formatBalacne(balance?.formatted)} ${balance?.symbol}`}</div>
      )}
      {address && (
        <div>{`Chain: ${currentChain?.name}`}</div>
      )}
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </Box>
  );
}
