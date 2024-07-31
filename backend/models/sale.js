const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB successfully!");
  }).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
  
const saleSchema = new mongoose.Schema({
    nodeOwner: { type: String, required: true },
    nodeTierId: { type: Number, required: true },
    transactionHash: { type: String, required: true }
  });
  
  const Sale = mongoose.model('Sale', saleSchema);
  module.exports = {
    Sale,
  };