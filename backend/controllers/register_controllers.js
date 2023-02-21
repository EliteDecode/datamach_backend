const multer = require("multer");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const Register = require("../models/register_models");
const sendMail = require("../utils/email_utils");

const getUsers = (req, res) => {
  res.json({ message: "we are live to begin" });
};

const postUsers = asyncHandler(async (req, res) => {
  const profile = req.files.profile[0].path;
  const natid = req.files.natid[0].path;

  const { Firstname, Lastname, Address, University, GPA, Email, Phone } =
    req.body;

  if (
    !Firstname ||
    !Lastname ||
    !Address ||
    !University ||
    !GPA ||
    !Email ||
    !Phone
  ) {
    res.status(400);
    throw new Error("All fields must be provided");
  } else {
    const upload = await Register.create({
      Firstname,
      Lastname,
      Address,
      University,
      GPA,
      Email,
      Phone,
      ID: req.files.natid[0].path,
      Profile: req.files.profile[0].path,
    });

    if (upload) {
      await sendMail(
        Email,
        "Registration Success",
        `<p> Hi ${Lastname} <br /> Congratulations on registeration for the datamach skillup program. You will be contacted shortly </p>`
      )
        .then(() => {
          res.status(200);
          res.json({ message: "Registration email sent successfully" });
        })
        .catch((error) => {
          res.status(400);
          throw new Error(error);
        });
    } else {
      res.status(401);
      throw new Error("Something went wrong, please try again");
    }
  }
});

module.exports = {
  getUsers,
  postUsers,
};
