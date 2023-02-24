const express = require("express");
const Admin_auth = require("../controllers/admin_auth_controllers");

const routes = express.Router();

routes.post("/", Admin_auth.AdminLogin);
/* Calling the function `AddAdmin` from the `admin_auth_controllers.js` file. */
// routes.post("/", Admin_auth.AddAdmin);

module.exports = routes;
