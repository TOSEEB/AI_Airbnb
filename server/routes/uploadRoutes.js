const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  uploadImage,
} = require("../controllers/uploadController");

router.post(
  "/",
  auth,
  upload.single("image"),
  uploadImage
);

module.exports = router; 