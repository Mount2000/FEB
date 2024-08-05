const Transaction = require("../models/TransactionModel");

const createTransaction = async (req, res) => {
  try {
    const { hash, type, ipAddress } = req.body;

    // const ipAddress =
    //   req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!hash || !type) {
      return res.status(400).send("Missing required fields");
    }

    const newTransaction = new Transaction({
      hash,
      type,
      ip_address: ipAddress,
    });

    await newTransaction.save();
    res.status(201).send(newTransaction);
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};
module.exports = {
  createTransaction,
};
