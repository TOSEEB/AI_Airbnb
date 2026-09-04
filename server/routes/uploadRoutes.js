const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const upload = require("../middleware/upload");
const {
  uploadImage,
} = require("../controllers/uploadController");

router.post(
  "/",
  auth,
  requireRole("host", "admin"),
  upload.single("image"),
  uploadImage
);

module.exports = router; 