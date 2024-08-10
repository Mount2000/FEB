const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.blockedIps = require("./BlockedIPModel");
db.scannedBlocks = require("./scannedBlocks.model");
db.transactions = require("./TransactionModel");
db.referrals = require("./referrals.model");

module.exports = db;
