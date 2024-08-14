import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
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
import toast from "react-hot-toast";
import MessageBox from "../../../components/message/messageBox";
import { FAIURE, PENDING } from "../../../utils/mesages";
import useScreenWidth from "../../../hooks/useScreenWidth";

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

  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [disabled, setDisabled] = useState(false);
  const handleCloseMessage = () => {
    setIsLoading(false);
    setStatus(null);
  };
  const completeTask = async (task_id, setStatustx) => {
    setDisabled(true);
    if (!address) {
      setMessage("You not connected wallet");
      setStatus("failure");
      setIsLoading(true);
      setDisabled(false);
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
      setMessage("Not enough balance");
      setStatus("failure");
      setIsLoading(true);
      setDisabled(false);
      return;
    }

    setMessage(PENDING.txAwait);
    setStatus(null);
    setIsLoading(true);
    try {
      const hash = await writeContract(config, {
        ...txObj,
      });
      if (hash) {
        console.log({ hash });
        setTxHash(hash);
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
          setMessage("Claim successful");
          setStatus("success");
          setIsLoading(true);
          setDisabled(false);
          await getStatusTask(task_id, setStatustx);
          // setStatus(task_id, "completed");
          return;
        } else {
          const status = await getTransactionStatus(config, hash);
          await clientAPI("post", "/api/transaction/update-transaction", {
            hash: hash,
            status: status,
          });
          setMessage(FAIURE.txFalure);
          setStatus("failure");
          setIsLoading(true);
          setDisabled(false);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      setMessage(FAIURE.txFalure);
      setStatus("failure");
      setIsLoading(true);
      setDisabled(false);
      return;
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
    if (!address) {
      toast.error("Please Connect wallet!");
      return;
    }
    window.location.href = `${process.env.REACT_APP_TWITTER_API}/auth/twitter?wallet=${address}&&task_id=2`;
  };
  const handleSuccessTask3 = async () => {
    if (!address) {
      toast.error("Please Connect wallet!");
      return;
    }
    window.location.href = `${process.env.REACT_APP_TWITTER_API}/auth/discord?wallet=${address}&&task_id=3`;
  };
  const handleSuccessTask4 = async (task_id, setStatus) => {
    if (!address) {
      toast.error("Please Connect wallet!");
      return;
    }
    try {
      const { data } = await clientAPI(
        "post",
        "/api/airdropTask/getAirdropTaskById",
        { task_id: task_id }
      );
      if (data) {
        const { data: user } = await clientAPI(
          "post",
          "/api/rewardAirdrop/getUserReward",
          { caller: address }
        );
        if (!user) {
          await clientAPI("post", "/api/rewardAirdrop/addUserReward", {
            wallet_address: address,
            point: data.reward_point,
          });
        } else {
          const point = Number(data.reward_point) + Number(user.point);
          await clientAPI("post", "/api/rewardAirdrop/updateUserReward", {
            wallet_address: address,
            point: point,
          });
        }
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
        await getStatusTask(task_id, setStatus);
        toast.success(`Complete the mission ${task_id}!`);
        // setStatus(task_id, "success");
      }
    } catch (error) {
      if (error.response) {
        // Extract response data in case of a 500 error
        console.error("Server Error:", error.response.data);
      } else {
        // Handle other errors
        console.error("Error:", error.message);
      }
      return;
    }
  };
  // https://discord.com/invite/bachiswap
  const handleSuccessTaskLike = async (task_id, setStatus) => {
    if (!address) {
      toast.error("Please Connect wallet!");
      return;
    }
    if (task_id === 6)
      window.open("https://discord.com/invite/bachiswap", "_blank");
    window.open("https://x.com/BachiSwap", "_blank");

    try {
      const { data } = await clientAPI(
        "post",
        "/api/airdropTask/getAirdropTaskById",
        { task_id: task_id }
      );
      if (data) {
        const { data: user } = await clientAPI(
          "post",
          "/api/rewardAirdrop/getUserReward",
          { caller: address }
        );
        if (!user) {
          await clientAPI("post", "/api/rewardAirdrop/addUserReward", {
            wallet_address: address,
            point: data.reward_point,
          });
        } else {
          const point = Number(data.reward_point) + Number(user.point);
          await clientAPI("post", "/api/rewardAirdrop/updateUserReward", {
            wallet_address: address,
            point: point,
          });
        }
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
        await getStatusTask(task_id, setStatus);
        toast.success(`Complete the mission ${task_id}!`);
        // setStatus(task_id, "success");
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

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
      rewardText: "Reward",
      rewardTotal: 0.005,
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
      rewardText: "Reward",
      rewardTotal: 0.005,
      buttonText: "Do Quest",
      onClick: () => console.log("Twitter Connect Clicked"),
      handleTask: handleSuccessTask3,
      completeTask: () => completeTask(3, setTask3Status),
      inputPlaceholder: null,
      task_id: 3,
      status: task3Status,
    },
    {
      title: "CLAIM YOUR DAILY REWARD",
      rewardText: "Reward",
      rewardTotal: 0.005,
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: () => handleSuccessTask4(4, setTask4Status),
      completeTask: () => completeTask(4, setTask4Status),
      inputPlaceholder: null,
      task_id: 4,
      status: task4Status,
    },
    {
      title: "FOLLOW @BachiSwap_io ON X",
      rewardText: "Reward",
      rewardTotal: 0.005,
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
      rewardTotal: 0.005,
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
      rewardTotal: 0.005,
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
      rewardTotal: 0.005,
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: () => handleSuccessTaskLike(8, setTask8Status),
      completeTask: () => completeTask(8, setTask8Status),
      inputPlaceholder: null,
      task_id: 8,
      status: task8Status,
    },
    {
      title: "LIKE THIS TWEET ON X",
      rewardText: "Reward",
      rewardTotal: 0.005,
      buttonText: "Do Quest",
      onClick: () => console.log("Daily Reward Clicked"),
      handleTask: () => handleSuccessTaskLike(9, setTask9Status),
      completeTask: () => completeTask(9, setTask9Status),
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

  const isMobile = useScreenWidth(768);
  const [currentPage, setCurrentPage] = useState(1);
  const questsPerPage = 3;

  const indexOfLastQuest = currentPage * questsPerPage;
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;
  const currentQuests = quests.slice(indexOfFirstQuest, indexOfLastQuest);
  const totalPages = Math.ceil(quests.length / questsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <SectionContainer py={{ base: "24px", lg: "50px", "3xl": "64px" }}>
        <SimpleGrid
          spacing={{ base: "17px" }}
          columns={{ base: 1, lg: 2, xl: 3 }}
        >
          {isMobile
            ? currentQuests.map((quest, index) => (
                <Box
                  key={index}
                  gridColumn={
                    quest.inputPlaceholder
                      ? { lg: "span 2", xl: "span 1" }
                      : "auto"
                  }
                >
                  <QuestBox
                    title={quest.title}
                    rewardText={quest.rewardText}
                    rewardTotal={quest.rewardTotal}
                    buttonText={quest.buttonText}
                    onClick={quest.onClick}
                    inputPlaceholder={quest.inputPlaceholder}
                    handleTask={quest.handleTask}
                    completeTask={quest.completeTask}
                    status={quest.status}
                    isDisabled={disabled}
                  />
                </Box>
              ))
            : quests.map((quest, index) => (
                <Box
                  key={index}
                  gridColumn={
                    quest.inputPlaceholder
                      ? { lg: "span 2", xl: "span 1" }
                      : "auto"
                  }
                >
                  <QuestBox
                    title={quest.title}
                    rewardText={quest.rewardText}
                    rewardTotal={quest.rewardTotal}
                    buttonText={quest.buttonText}
                    onClick={quest.onClick}
                    inputPlaceholder={quest.inputPlaceholder}
                    handleTask={quest.handleTask}
                    completeTask={quest.completeTask}
                    status={quest.status}
                    isDisabled={disabled}
                  />
                </Box>
              ))}
        </SimpleGrid>
        {isMobile && (
          <Flex justifyContent="center" mt="24px" alignItems="center" gap="8px">
            <Button
              color={"#FFF"}
              border={"0.5px solid #EB7FB3"}
              backgroundColor="var(--color-background)"
              width={"30px"}
              onClick={handlePrevPage}
              isDisabled={currentPage === 1}
              borderRadius="50%"
            >
              <Box boxSize="20px" paddingTop={"2px"}>
                <AiOutlineLeft />
              </Box>
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                border={"0.5px solid #EB7FB3"}
                borderRadius={"50%"}
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                bg={
                  currentPage === index + 1
                    ? "#EB7FB3"
                    : "var(--color-background)"
                }
                color={currentPage === index + 1 ? "black" : "white"}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              width={"30px"}
              color={"#FFF"}
              border={"0.5px solid #EB7FB3"}
              backgroundColor="var(--color-background)"
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages}
              borderRadius="50%"
            >
              <Box boxSize="20px" paddingTop={"2px"}>
                <AiOutlineRight />
              </Box>
            </Button>
          </Flex>
        )}
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
              p={{
                md: "16px 24px",
                lg: "16px 49px",
                xl: "32px 46px",
                "3xl": "47px 48px 65px 48px",
              }}
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
                  display={{ base: "none", md: "block" }}
                  backgroundColor={"rgba(27, 27, 27, 0.20)"}
                  boxShadow={"inset 0 0 10px var(--color-main)"}
                  border="0.5px solid var(--color-main)"
                  position="relative"
                  zIndex="10"
                >
                  <SimpleGrid
                    p={{ base: "20px 40px" }}
                    justifyContent={"space-between"}
                    display={{ base: "none", md: "flex" }}
                    spacing={{ base: "17px" }}
                    columns={{ base: 4 }}
                    fontSize={{ base: "16px", lg: "24px", xl: "32px" }}
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
                      "2xl": "32px",
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
      <MessageBox
        isLoading={isLoading}
        status={status}
        message={message}
        handleCloseMessage={handleCloseMessage}
        txHash={txHash}
      />
    </>
  );
};

export default SocialQuest;
