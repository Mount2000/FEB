const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    wallet_address: { type: String, required: true },
    point: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;