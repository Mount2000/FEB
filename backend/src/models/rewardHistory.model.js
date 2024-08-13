const mongoose = require("mongoose");

const RewardHistorySchema = new mongoose.Schema(
  {
    wallet_address: { type: String, required: true },
    task_code: { type: String, required: true },
    point: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const RewardHistory = mongoose.model("RewardHistory", RewardHistorySchema);
module.exports = RewardHistory;
