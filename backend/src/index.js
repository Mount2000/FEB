const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
require("./crons/Transaction_cronjob");
dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Route
routes(app);
//Connect database
const connectDb = () => {
  return mongoose.connect(`${process.env.MONGODB_URL}`);
};

const PORT = process.env.PORT || 3001;
connectDb().then(async () => {
  app.listen(PORT, () => {
    console.log(`BachiSwap app listening on port ${PORT}`);
  });
});
