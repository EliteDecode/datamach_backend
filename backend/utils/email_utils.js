/* The above code is creating a function that will send an email to the user. */
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendMail = async function (email, subject, text) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your cPanel email address
      pass: process.env.EMAIL_PASSWORD, // your cPanel email password
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject,
    html: text,
  });
};

module.exports = sendMail;
