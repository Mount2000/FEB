const mongoose = require("mongoose");

const BachiStakingHistorySchema = new mongoose.Schema({
  caller: {
    type: String,
  },
  amount: {
    type: Number,
  },
  currentTime: {
    type: Number,
  },
  status: {
    type: String,
  },
});

const BachiStakingHistory = mongoose.model("BachiStakingHistory", BachiStakingHistorySchema);

module.exports = BachiStakingHistory;