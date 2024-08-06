const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
require("./crons/Transaction_cronjob");
dotenv.config();
const app = express();
const port = process.env.PORT;

// trust proxy
// app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);
// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Apply the rate limiting middleware to all requests
// app.use(limiter);

//Route
routes(app);
//Connect database
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Conect database Success");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`BachiSwap app listening on port ${port}`);
});
