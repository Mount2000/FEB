const express = require("express");
const TransactionController = require("../controllers/TransactionController");
const route = express.Router();

route.post("/create-transaction", TransactionController.createTransaction);
route.post("/update-transaction", TransactionController.updateTransaction);
route.post("/get-transaction", TransactionController.getTransaction);
route.post("/get-referrals", TransactionController.getReferrals);
route.get("/check-ip", TransactionController.checkIP);

module.exports = route;
