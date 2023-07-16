const multer = require("multer");
const path = require("path");
// import { fileURLToPath } from "url";

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/avif": "avif",
};

const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    const isValid = FILE_TYPE_MAP[files.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, path.join(__dirname, "../assets/uploads"));
    // cb(uploadError, "")
  },

  filename: function (req, files, cb) {
    const fileName = Date.now() + "_" + files.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
