const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();

const dbconnect = require("./config/db");
const api = require("./routes/user");

app.use("/api/v1", api);

const port = process.env.PORT || 4000;
app.listen(port, (req, res) => {
  console.log(`server started at port ${port}`);
});
dbconnect();
