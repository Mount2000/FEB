import { Box, Button, Flex, Image, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { getBalance, getChainId, getChains, switchChain } from "@wagmi/core";
import { config } from "./config";
import { formatBalacne } from "../../utils";
import { AddressCopier } from "../addressCopier";
import ActionButton from "../button/ActionButton";
import IconEth from "../../assets/img/node/icon-eth.png";
import { IoArrowForwardSharp } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
// for example call contract
import bachi_node_contract from "../../utils/contracts/bachi_node_contract";
import { useReadContract, useWriteContract } from "wagmi";

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
  console.log({ currentChain, chains });

  /** Example  */
  /** Example tx func */
  const { data: hash, writeContract, error: setErr } = useWriteContract();
  const setNodeManagerAddress = async () => {
    const nodeManagerAddress = "0x654Af47D0Bbef73d9Da23fACbea6e1c191Cb8dD9";
    writeContract({
      address: bachi_node_contract.CONTRACT_ADDRESS,
      abi: bachi_node_contract.CONTRACT_ABI,
      functionName: "setNodeManagerAddress",
      args: [nodeManagerAddress],
    });
    if (setErr) console.log({ setErr });
    if (hash) console.log({ hash });
  };

  /*******************/

  const handleSwitchChange = async (event) => {
    const { value } = event?.target;
    await switchChain(config, { chainId: Number(value) });
  };
  return (
    <Flex
      w={"100%"}
      textAlign={"center"}
      flexDirection={"column"}
      gap={"20px"}
      alignItems={"center"}
    >
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <Box>
          <AddressCopier
            address={ensName ? `${ensName} (${address})` : address}
            fontSize={"28px"}
            fontWeight={"600"}
          />
        </Box>
      )}
      {address && !isLoading && (
        <Text
          fontSize={"20px"}
          color={"var(--color-main)"}
        >{`${formatBalacne(balance?.formatted)} ${balance?.symbol}`}</Text>
      )}
      <ActionButton
        my="12px"
        w="250px"
        bgColor={"#FCDDEC"}
        onClick={() => {
          window.open(currentChain?.blockExplorers?.default?.url, "_blank");
        }}
      >
        <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
          <Text color={"black"} fontSize={"24px"} fontWeight={"500"}>
            Block Explorer
          </Text>
          <Box w={"36px"} sx={{ transform: "rotate(-45deg)" }}>
            <IoArrowForwardSharp fontSize={"36px"} color="black" />
          </Box>
        </Flex>
      </ActionButton>
      <Select borderRadius={"0px"} size={"lg"} defaultValue={currentChain?.id} onChange={handleSwitchChange}>
        {chains?.map((chain) => (
          <option value={chain?.id}>{chain?.name}</option>
        ))}
      </Select>
      <ActionButton w={"100%"} onClick={setNodeManagerAddress}>
        <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"24px"} fontWeight={"500"}>
            Buy Crypto
          </Text>
          <Box w={"36px"}>
            <IoArrowForwardSharp fontSize={"36px"} color="black" />
          </Box>
        </Flex>
      </ActionButton>
      <ActionButton w={"100%"}>
        <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"24px"} fontWeight={"500"}>
            Activity
          </Text>
          <Box w={"36px"}>
            <IoArrowForwardSharp fontSize={"36px"} color="black" />
          </Box>
        </Flex>
      </ActionButton>
      <ActionButton w={"100%"} onClick={() => disconnect()}>
        <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"24px"} fontWeight={"500"}>
            Disconnect
          </Text>
          <Box w={"36px"}>
            <RxExit fontSize={"28px"} color="black" />
          </Box>
        </Flex>
      </ActionButton>
    </Flex>
  );
}
