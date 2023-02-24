const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
