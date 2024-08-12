const TransactionRouter = require("./TransactionRoute");
const rewardAirdropRouter = require("./rewardAirdropRoute");
const airdropTaskRouter = require("./airdropTaskRoute");
const rewardAirdropHistoryRouter = require("./rewardAirdropHistoryRoute");
const twitterRoute = require("./twitterRoute");

const routes = (app) => {
  app.use("/api/transaction", TransactionRouter);
  app.use("/api/rewardAirdrop", rewardAirdropRouter);
  app.use("/api/airdropTask", airdropTaskRouter);
  app.use("/api/rewardAirdropHistory", rewardAirdropHistoryRouter);
  app.use("/auth", twitterRoute);
};
module.exports = routes;
