const mongoose = require("mongoose");
const { type } = require("os");

const transactionSchema = new mongoose.Schema(
  {
    hash: { type: String, required: true },
    type: {
      type: String,
      required: true,
    },
    ip_address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
