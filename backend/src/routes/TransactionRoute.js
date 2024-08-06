const express = require("express");
const TransactionController = require("../controllers/TransactionController");
const route = express.Router();

route.post("/create-transaction", TransactionController.createTransaction);
route.get("/check-ip/:ip", TransactionController.checkIP);

module.exports = route;
