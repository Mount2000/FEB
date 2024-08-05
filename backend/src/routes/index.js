const TransactionRouter = require("./TransactionRoute");

const routes = (app) => {
  app.use("/api/transaction", TransactionRouter);
};
module.exports = routes;