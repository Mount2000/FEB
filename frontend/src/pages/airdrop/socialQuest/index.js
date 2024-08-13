import React, { useEffect, useState } from "react";
import SectionContainer from "../../../components/container";
import { Box, Button, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import CommonButton from "../../../components/button/commonbutton";
import MainButton from "../../../components/button/MainButton";
import QuestBox from "../../../components/questbox";
import { clientAPI } from "../../../api/client";
import { useAccount, useClient } from "wagmi";
import quest_manager_contract from "../../../utils/contracts/quest_manager_contract";
import {
  getBalance,
  writeContract,
  waitForTransactionReceipt,
  getChainId,
  getChains,
  readContract,
  getGasPrice,
  getTransaction,
  getTransactionReceipt,
} from "@wagmi/core";
import { config } from "../../../components/wallets/config";
import { taikoHeklaClient } from "../../../components/wallets/viemConfig";
import { getUserIpAddress } from "../../../utils";

const TWITTER_API = process.env.REACT_APP_TWITTER_API;

const SocialQuest = () => {
  const client = useClient();
  const chainId = getChainId(config);
  const chainDecimal = client.chain.nativeCurrency.decimals;
  const questManagerContract = {
    address: quest_manager_contract.CONTRACT_ADDRESS,
    abi: quest_manager_contract.CONTRACT_ABI,
  };
  const { address } = useAccount();
  const [task1Status, setTask1Status] = useState("pending");
  const [task2Status, setTask2Status] = useState("pending");
  const [task3Status, setTask3Status] = useState("pending");
  const [task4Status, setTask4Status] = useState("pending");
  const [task5Status, setTask5Status] = useState("pending");
  const [task6Status, setTask6Status] = useState("pending");
  const [task7Status, setTask7Status] = useState("pending");
  const [task8Status, setTask8Status] = useState("pending");
  const [task9Status, setTask9Status] = useState("pending");

  const getStatusTask = async (task_id, setStatus) => {
    const options = {
      wallet_address: address,
      task_id: task_id,
    };
    const isSuccess = await clientAPI(
      "post",
      "/api/rewardAirdropHistory/getRewardHistoryByTaskId",
      options
    );
    const isComplete = await readContract(config, {
      ...questManagerContract,
      functionName: "isTaskCompletedByUser",
      args: [address, task_id],
    });

    if (isSuccess?.data) setStatus("success");
    if (isComplete) setStatus("completed");
  };
  const completeTask = async (task_id, setStatus) => {
    if (!address) {
      return;
    }

    const balance = await getBalance(config, {
      address: address,
    });

    const ipAddress = await getUserIpAddress();
    const txObj = {
      ...questManagerContract,
      functionName: "completeTask",
      args: [task_id],
    };

    const [gasPrice, gasLimit] = await Promise.all([
      getGasPrice(config),
      taikoHeklaClient.estimateContractGas({
        ...txObj,
        account: address,
      }),
    ]);

    const gasFeeToEther = Number(gasLimit * gasPrice) / 10 ** chainDecimal;

    if (Number(balance.formatted) < gasFeeToEther) {
      return;
    }

    try {
      const hash = await writeContract(config, {
        ...txObj,
      });
      if (hash) {
        console.log({ hash });
        const status = await getTransactionStatus(config, hash);
        await clientAPI("post", "/api/transaction/create-transaction", {
          caller: address,
          chainId: chainId,
          hash: hash,
          type: `Complete Task ${task_id}`,
          ipAddress: ipAddress,
          status: status,
        });
        const result = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        if (result?.status == "success") {
          const status = await getTransactionStatus(config, hash);
          await clientAPI("post", "/api/transaction/update-transaction", {
            hash: hash,
            status: status,
          });
          setStatus(task_id, "completed");
          return;
        } else {
          const status = await getTransactionStatus(config, hash);
          await clientAPI("post", "/api/transaction/update-transaction", {
            hash: hash,
            status: status,
          });
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (address) {
      getStatusTask(1, setTask1Status);
      getStatusTask(2, setTask2Status);
      getStatusTask(3, setTask3Status);
      getStatusTask(4, setTask4Status);
      getStatusTask(5, setTask5Status);
      getStatusTask(6, setTask6Status);
      getStatusTask(7, setTask7Status);
      getStatusTask(8, setTask8Status);
      getStatusTask(9, setTask9Status);
    }
  }, [address]);
  const handleSuccessTask2 = async () => {
    window.location.href = `${process.env.REACT_APP_TWITTER_API}/auth/twitter?wallet=${address}&&task_id=2`;
  };
  const handleSuccessTaskLike = async (task_id, setStatus) => {
    window.open("https://x.com/BachiSwap", "_blank");

    try {
      const { data } = await clientAPI(
        "post",
        "/api/airdropTask/getAirdropTaskById",
        { task_id: task_id }
      );
      if (data) {
        console.log(data);
        const options = {
          wallet_address: address,
          task_id: task_id,
          point: data.reward_point,
        };
        const result = await clientAPI(
          "post",
          "/api/rewardAirdropHistory/addRewardHistory",
          options
        );

        if (result) {
          setStatus(task_id, "success");
        }
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

  console.log({task1Status})
  const quests = [
    {
      title: "INVITE YOUR FRIEND",
      rewardText: null,
      buttonText: "Do Quest",
      onClick: () => console.log("Invite Friend Quest Clicked"),
      inputPlaceholder: "Input",
      handleTask: () => handleSuccessTaskLike(1, setTask1Status),
      completeTask: () => completeTask(1, setTask1Status),
      task_id: 1,
      status: task1Status,
    },
    {
      title: "CONNECT YOUR TIWTTER ACCOUNT",
      rewardText: null,
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: handleSuccessTask2,
      completeTask: () => completeTask(2, setTask2Status),
      inputPlaceholder: null,
      task_id: 2,
      status: task2Status,
    },
    {
      title: "CONNECT YOUR DISCORD ACCOUNT",
      rewardText: null,
      buttonText: "Do Quest",
      onClick: () => console.log("Twitter Connect Clicked"),
      handleTask: () => handleSuccessTaskLike(3, setTask3Status),
      completeTask: () => completeTask(3, setTask3Status),
      inputPlaceholder: null,
      task_id: 3,
      status: task3Status,
    },
    {
      title: "CLAIM YOUR DAILY REWARD",
      rewardText: "Reward",
      rewardTotal: "10",
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: () => handleSuccessTaskLike(4, setTask4Status),
      completeTask: () => completeTask(4, setTask4Status),
      inputPlaceholder: null,
      task_id: 4,
      status: task4Status,
    },
    {
      title: "FOLLOW @BachiSwap_io ON X",
      rewardText: "Reward",
      rewardTotal: "30",
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: () => handleSuccessTaskLike(5, setTask5Status),
      completeTask: () => completeTask(5, setTask5Status),
      inputPlaceholder: null,
      task_id: 5,
      status: task5Status,
    },
    {
      title: "JOIN SERVER DISCORD",
      rewardText: "Reward",
      rewardTotal: "100",
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: () => handleSuccessTaskLike(6, setTask6Status),
      completeTask: () => completeTask(6, setTask6Status),
      inputPlaceholder: null,
      task_id: 6,
      status: task6Status,
    },
    {
      title: "LIKE THIS TWEET ON X",
      rewardText: "Reward",
      rewardTotal: "30",
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: () => handleSuccessTaskLike(7, setTask7Status),
      completeTask: () => completeTask(7, setTask7Status),
      inputPlaceholder: null,
      task_id: 7,
      status: task7Status,
    },
    {
      title: "LIKE THIS TWEET ON X",
      rewardText: "Reward",
      rewardTotal: "30",
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: () => handleSuccessTaskLike(8, setTask5Status),
      completeTask: () => completeTask(8, setTask5Status),
      inputPlaceholder: null,
      task_id: 8,
      status: task8Status,
    },
    {
      title: "LIKE THIS TWEET ON X",
      rewardText: "Reward",
      rewardTotal: "100",
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: () => handleSuccessTaskLike(9, setTask5Status),
      completeTask: () => completeTask(9, setTask5Status),
      inputPlaceholder: null,
      task_id: 9,
      status: task9Status,
    },
  ];

  const getTransactionStatus = async (config, hash) => {
    let status;
    const transaction = await getTransaction(config, {
      hash: hash,
    });
    if (transaction.blockNumber === null) {
      status = "pending";
    } else {
      const receipt = await getTransactionReceipt(config, {
        hash: hash,
      });
      status = receipt.status;
    }
    return status;
  };
  return (
    <SectionContainer py={{ base: "24px", lg: "50px", "3xl": "64px" }}>
      <SimpleGrid
        spacing={{ base: "17px" }}
        columns={{ base: 1, lg: 2, xl: 3 }}
      >
        {quests.map((quest, index) => (
          <QuestBox
            key={index}
            title={quest.title}
            rewardText={quest.rewardText}
            rewardTotal={quest.rewardTotal}
            buttonText={quest.buttonText}
            onClick={quest.onClick}
            inputPlaceholder={quest.inputPlaceholder}
            handleTask={quest.handleTask}
            completeTask={quest.completeTask}
            status={quest.status}
          />
        ))}
      </SimpleGrid>
      <Flex flexDirection={"column"} gap={{ base: "24px" }}>
        <Text
          fontSize={{ base: "24px", "2xl": "64px" }}
          fontWeight={400}
          fontFamily="var(--font-heading)"
          textAlign={"center"}
          paddingTop={{ base: "50px", "2xl": "135px" }}
        >
          Airdrop history
        </Text>
        <Box
          width={"100%"}
          height={"100%"}
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
          <CommonButton
            backgroundColor={"rgba(27, 27, 27, 0.20)"}
            boxShadow={"inset 0 0 10px var(--color-main)"}
            border="0.5px solid var(--color-main)"
            position="relative"
            zIndex="10"
            p={{ "3xl": "47px 48px 65px 48px" }}
          >
            <Box
              width={"100%"}
              height={"100%"}
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
              <CommonButton
                backgroundColor={"rgba(27, 27, 27, 0.20)"}
                boxShadow={"inset 0 0 10px var(--color-main)"}
                border="0.5px solid var(--color-main)"
                position="relative"
                zIndex="10"
              >
                <SimpleGrid
                  p={{ base: "20px 40px" }}
                  justifyContent={"space-between"}
                  display={"flex"}
                  spacing={{ base: "17px" }}
                  columns={{ base: 4 }}
                  fontSize={"32px"}
                  fontFamily="var(--font-text-main)"
                >
                  <Text>#</Text>
                  <Text>Wallet</Text>
                  <Text>XP</Text>
                  <Text>Date</Text>
                </SimpleGrid>
              </CommonButton>
            </Box>
            <Flex
              flexDirection={"column"}
              padding={{
                base: "24px 32px",
                lg: "16px 20px 16px 20px",
                xl: "24px 36px 24px 36px",
                "3xl": "32px 32px 50px 40px",
              }}
              gap={{ base: "24px", lg: "32px", "2xl": "22px", "3xl": "25px" }}
            >
              <Flex flexDirection={"column"}>
                <Text
                  py={{ base: "15px" }}
                  fontSize={{
                    base: "20px",
                    "2xl": "36px",
                    "3xl": "40px",
                  }}
                  fontFamily="var(--font-text-extra)"
                >
                  Invite Your Friend and come to AirDrop History
                </Text>
              </Flex>
            </Flex>
          </CommonButton>
        </Box>
      </Flex>
    </SectionContainer>
  );
};

export default SocialQuest;
