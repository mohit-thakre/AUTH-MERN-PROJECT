const mongoose = require("mongoose");
require("dotenv").config();
const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected successfull");
  } catch (error) {
    console.log("error at db connection ", error);
  }
};
module.exports = dbconnect;
