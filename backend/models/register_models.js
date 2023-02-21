const mongoose = require("mongoose");

const Register_Schema = mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  University: {
    type: String,
    required: true,
  },
  GPA: {
    type: Number,
    required: true,
  },
  ID: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Profile: {
    type: String,
  },
});

module.exports = mongoose.model("Register", Register_Schema);
