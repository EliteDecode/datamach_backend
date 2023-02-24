const multer = require("multer");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const Register = require("../models/register_models");
const sendMail = require("../utils/email_utils");

const getUsers = asyncHandler(async (req, res) => {
  const data = await Register.find();

  if (data) {
    res.status(200);
    res.json(data);
  } else {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

const getUsersEmail = asyncHandler(async (req, res) => {
  const Email = req.params.Email;
  const data = await Register.find({ Email });

  if (data) {
    res.status(200);
    res.json(data);
  } else {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

const postUsers = asyncHandler(async (req, res) => {
  const profile = req.files.profile[0].filename;
  const natid = req.files.natid[0].filename;

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
  }

  const userExists = await Register.findOne({ Email });

  if (userExists) {
    res.status(400);
    throw new Error("User with this Email has registered for this programme");
  } else {
    const upload = await Register.create({
      Firstname,
      Lastname,
      Address,
      University,
      GPA,
      Email,
      Phone,
      ID: req.files.natid[0].filename,
      Profile: req.files.profile[0].filename,
    });

    if (upload) {
      await sendMail(
        Email,
        "Registration Success",
        `<p> Hi ${Lastname} <br /> Congratulations on registeration for the datamach skillup program. You will be contacted shortly </p>`
      )
        .then(() => {
          res.status(200);
          res.json({
            message: "success",
          });
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
  getUsersEmail,
};
