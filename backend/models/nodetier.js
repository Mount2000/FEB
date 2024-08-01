const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB successfully!");
  }).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
const nodeTierSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    nodeTierId: { type: Number, required: true },
    status: { type: Boolean, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    hashrate: { type: Number, required: true },
    farmSpeedBachi: { type: Number, required: true },
    farmSpeedTaiko: { type: Number, required: true },
    referralRate: { type: Number, required: true },
    transactionHash: { type: String, required: true }
  });
  
  const NodeTier = mongoose.model('NodeTier', nodeTierSchema);

  module.exports = {
    NodeTier,
  };