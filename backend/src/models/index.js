const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.blockedIps = require("./BlockedIPModel");
db.scannedBlocks = require("./scannedBlocks.model");
db.transactions = require("./TransactionModel");
db.referrals = require("./referrals.model");
db.users = require("./users.model");
db.tasks = require("./tasks.model");
db.rewardHistory = require("./rewardHistory.model");
db.bachiStakingHistory = require("./BachiStakingHistory")

module.exports = db;
