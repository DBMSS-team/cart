const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var uuid = require("node-uuid");

dotenv.config();

const users = require("../db/models/cart");

const app = express();

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(function () {
    console.log("DB connection error");
  });

console.log("Connected to DB !!");

app.listen(5000, () => {
  console.log("Listening at port 5000");
});
