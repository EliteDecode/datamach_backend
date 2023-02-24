const Admin = require("../models/admin_models");
const asyncHandler = require("express-async-handler");

const AdminLogin = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  const adminExists = await Admin.findOne({ Email });

  if (adminExists) {
    if (adminExists.Password === Password) {
      res.status(200);
      res.json(adminExists);
    } else {
      res.status(400);
      throw new Error("Incorrect Password");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Admin Details");
  }
});

// const AddAdmin = asyncHandler(async (req, res) => {
//   const { Email, Password } = req.body;

//   if (!Email || !Password) {
//     res.status(400);
//     throw new Error("All Fields are Required");
//   }

//   const admin = await Admin.create({
//     Email,
//     Password,
//   });

//   if (admin) {
//     res.status(200);
//     res.json(admin);
//   }
// });

module.exports = {
  AdminLogin,
};
