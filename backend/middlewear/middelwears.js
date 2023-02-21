const multer = require("multer");
const path = require("path");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "Production" ? err.stack : "null",
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "natid") {
      cb(null, "backend/uploads");
    } else if (file.fieldname === "profile") {
      cb(null, "backend/uploads");
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "profile") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === "natid") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  },
});

let fileFilter = function (req, file, cb) {
  var allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        success: false,
        message: "Invalid file type. Only jpg, png image files are allowed.",
      },
      false
    );
  }
};

const imageStorageMiddlewear = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
}).fields([
  {
    name: "profile",
    maxCount: 1,
  },
  {
    name: "natid",
    maxCount: 1,
  },
]);

module.exports = {
  errorHandler,
  imageStorageMiddlewear,
};
