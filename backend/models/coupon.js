const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB successfully!");
  }).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
  
const CouponsSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    couponId: { type: Number, required: true },
    status: { type: Boolean, required: true },
    discountPercent: { type: Number, required: true },
    name: { type: String, required: true },
    commissionPercent: { type: Number, required: true },
    code: { type: String, required: true },
    transactionHash: { type: String, required: true }
  });
  
  const DiscountCoupon = mongoose.model('Coupons', CouponsSchema);

  module.exports = {
    DiscountCoupon
  };