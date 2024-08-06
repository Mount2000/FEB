const BlockedIP = require("../models/BlockedIPModel");
const Transaction = require("../models/TransactionModel");

const createTransaction = (newTransaction) => {
  return new Promise(async (resolve, reject) => {
    const { hash, type, ipAddress } = newTransaction;
    try {
      const createTransaction = await Transaction.create({
        hash,
        type,
        ipAddress,
      });
      if (createTransaction) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createTransaction,
        });
      } else {
        resolve({
          status: "FAILED",
          message: "Transaction creation failed",
        });
      }
    } catch (e) {
      reject({
        status: "FAILED",
        message: "Error creating transaction",
        error: e.message,
      });
    }
  });
};

const checkIP = (ipAddress) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isBlocked = await BlockedIP.findOne({ ipAddress: ipAddress });
      if (isBlocked === null) {
        resolve({
          status: "OK",
          message: "The ip is not defined",
          blocked: false,
        });
      }

      resolve({
        status: "OK",
        message: "success",
        blocked: true,
      });
    } catch (e) {
      reject({
        status: "FAILED",
        message: "Error creating transaction",
        error: e.message,
      });
    }
  });
};

module.exports = {
  createTransaction,
  checkIP,
};
