const router = require("express").Router();
const upload = require("../controllers/upload-controller");
const fs = require("node:fs");

router.post("/", upload.single("user_image"), (req, res, next) => {
  const testFolder = "uploads/Voldemar-TTT";
  fs.readdir(testFolder, (err, files) => {
    const urlArray = files.map((file) => {
      return (`http://localhost:9000/uploads/${file}`);
    });
    console.log('test', urlArray);
  });
  const file = req.file;
  const { user_name } = req.body;
  res
    .status(200)
    .json(`http://localhost:9000/uploads/${user_name}/${file.filename}`);
});

module.exports = router;
