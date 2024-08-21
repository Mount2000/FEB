const { ethers } = require("ethers");
const mongoose = require("mongoose");
require("dotenv").config();

const db = require("../models/index.js");
const { bachi_staking_contract } = require("../contracts/bachi_staking_contract.js");
const contants = require("../utils/contants.js");

const ScannedBlocks = db.scannedBlocks;
const BachiStakingHistory = db.bachiStakingHistory

const CONNECTION_STRING = `${process.env.MONGODB_URL}`;
const connectDb = () => {
  return mongoose.connect(CONNECTION_STRING);
};

var global_vars = {};
var bachiStakingContract = null;
var provider = null;

const scanBlocks = async (blocknumber) => {
  if (global_vars.isScanning) {
    // Ensure always processing the latest block
    console.log("Process latest block", blocknumber);
    const block = await provider.getBlock(blocknumber);
    console.log({ block });
    processBlock(block);
    return;
  }
  global_vars.isScanning = true;

  try {
    // Check database to see the last checked blockNumber
    let lastBlock_db = await ScannedBlocks.findOne({
      lastScanned: true,
    });
    let last_scanned_blocknumber = 0;
    if (lastBlock_db) {
      last_scanned_blocknumber = lastBlock_db.blockNumber;
    } else {
      await ScannedBlocks.create({
        lastScanned: true,
        blockNumber: 0,
      });
    }
    if (last_scanned_blocknumber == 0) last_scanned_blocknumber = blocknumber;
    console.log(
      "last_scanned_blocknumber",
      last_scanned_blocknumber,
      "blocknumber",
      blocknumber
    );
    for (
      var to_scan = last_scanned_blocknumber;
      to_scan <= blocknumber;
      to_scan++
    ) {
      console.log("Scanning block", to_scan);
      const block = await provider.getBlock(to_scan);
      processBlock(block);

      await ScannedBlocks.updateOne(
        { lastScanned: true },
        { blockNumber: to_scan }
      );
    }
  } catch (e) {
    console.log(e.message);
  }

  global_vars.isScanning = false;
};

const processBlock = async (block) => {
  for (let txHash of block.transactions) {
    const receipt = await provider.getTransactionReceipt(txHash);
    if (receipt.to == bachi_staking_contract.CONTRACT_ADDRESS) {
      if (receipt?.logs)
        for (let log of receipt.logs) {
          try {
            const parsedLog = bachiStakingContract.interface.parseLog(log);

            if (parsedLog) {
              const { name: eventName, args: eventValues } = parsedLog;
              await processEvent(eventName, eventValues);
            } else {
              console.log("Log could not be parsed for tx:", txHash);
            }
          } catch (e) {
            console.log("Log parsing error:", e);
          }
        }
    }
  }
};

const processEvent = async (eventName, eventValues) => {
    console.log({ eventName, eventValues });
    let obj = {
      caller: eventValues[0],
      amount: eventValues[1]?eventValues[1] / 10**18 : 0,
      timestamps: Number(eventValues[2]),
      status: eventName
    };
    let found = await BachiStakingHistory.findOne(obj);

    if (!found) {
      await BachiStakingHistory.create(obj);
      console.log(`Added to BachiStakingHistory: ${eventName}`, obj);
    }
};

connectDb().then(async () => {
  provider = new ethers.JsonRpcProvider(CHAINS[process.env.NODE_ENV].rpcUrls);

  bachiStakingContract = new ethers.Contract(
    bachi_staking_contract.CONTRACT_ADDRESS,
    bachi_staking_contract.CONTRACT_ABI,
    provider
  );

  console.log("Connected to RPC and contract");

  await provider.on("block", (blockNumber) => {
    console.log(`New block detected: #${blockNumber}`);
    scanBlocks(blockNumber);
  });
});
