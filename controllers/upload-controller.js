const multer = require("multer");
const path = require("node:path");
const fs = require("node:fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { user_name } = req.body;
    const user_folder = `./uploads/${user_name}`;

    fs.stat(user_folder, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(user_folder, { recursive: true }, (err) =>
          cb(err, user_folder)
        );
      }
      cb(null, user_folder);
    });
  },
  filename: (req, file, cb) => {
    const { user_name } = req.body;
    cb(
      null,
      `userName-${user_name}-${Date.now()}${path.extname(
        file.originalname.toLowerCase()
      )}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const imagemageTypes = /png|webp|jpe?g|avif/;
    const extention = path.extname(file.originalname);
    if (imagemageTypes.test(extention)) {
      cb(null, true);
    } else {
      cb(new Error("Разрешены только: png|webp|jpe?g|avif"));
    }
  },
});

module.exports = upload;
