const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const Url = "mongodb://localhost:27017/MovieMania";
const PORT = 8989;
const User = require("./Models/userModel");

const {
  Signup,
  Login,
} = require("./User_Authentication/AuthController/AuthController");

const {
  userVerification,
} = require("./User_Authentication/AuthMiddleware/AuthMiddleware");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

mongoose
  .connect(Url)
  .then(() => console.log("Conneted"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.use(cookieParser());


app.post("/signup", Signup);
app.post("/login", Login);
app.post("/", userVerification);

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
