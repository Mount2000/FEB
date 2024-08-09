const BlockedIP = require("../models/BlockedIPModel");
const Transaction = require("../models/TransactionModel");

const createTransaction = (newTransaction) => {
  return new Promise(async (resolve, reject) => {
    const { chainId, hash, type, ipAddress, status } = newTransaction;
    try {
      const existingTransaction = await Transaction.findOne({
        hash: hash,
      });
      if (!existingTransaction) {
        const createTransaction = await Transaction.create({
          chainId,
          hash,
          type,
          ipAddress,
          status,
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
      } else
        resolve({
          status: "FAILED",
          message: "Transaction is exist",
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

const updateTransaction = (newTransaction) => {
  return new Promise(async (resolve, reject) => {
    const { hash, status } = newTransaction;
    try {
      const existingTransaction = await Transaction.findOne({
        hash: hash,
      });
      if (existingTransaction) {
        const updateTransaction = await Transaction.findOneAndUpdate(
          { hash },
          { status }
        );
        if (updateTransaction) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: updateTransaction,
          });
        } else {
          resolve({
            status: "FAILED",
            message: "Transaction creation failed",
          });
        }
      } else
        resolve({
          status: "FAILED",
          message: "Transaction not exist",
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

const checkIP = (ipAddress) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isBlocked = await BlockedIP.findOne({ ipAddress: ipAddress });
      if (!isBlocked) {
        resolve({
          status: "OK",
          message: "The ip is not defined",
          ret: {
            blocked: false,
          },
        });
      }

      resolve({
        status: "OK",
        message: "success",
        ret: {
          blocked: true,
        },
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
  updateTransaction,
  checkIP,
};
