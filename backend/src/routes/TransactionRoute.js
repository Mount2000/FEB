const express = require("express");
const TransactionController = require("../controllers/TransactionController");
const route = express.Router();

route.post("/create-transaction", TransactionController.createTransaction);

module.exports = route;
