const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const colors = require("colors");
const Port = process.env.PORT;
const connectDb = require("./config/db");
const { errorHandler } = require("./middlewear/middelwears");
const app = express();
connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.static("public"));
app.use("/login", require("./routes/Admin_Auth"));
app.use("/", require("./routes/Register_routes"));

app.use(errorHandler);

app.listen(Port, () => {
  console.log(`Connection on Port ${Port}`);
});
