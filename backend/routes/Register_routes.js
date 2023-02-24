const express = require("express");
const routes = express.Router();
const RegisterController = require("../controllers/register_controllers");
const middlewear = require("../middlewear/middelwears");

routes.get("/", RegisterController.getUsers);
routes.post(
  "/",
  middlewear.imageStorageMiddlewear,
  RegisterController.postUsers
);

routes.get("/:Email", RegisterController.getUsersEmail);
module.exports = routes;
