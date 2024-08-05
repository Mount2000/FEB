const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000", // Địa chỉ nguồn mà bạn muốn cho phép
  })
);

app.use(bodyParser.json());
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
