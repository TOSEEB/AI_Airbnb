const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const aiLimiter = require("../middleware/aiLimiter");

const {
  chatWithAI,
} = require("../controllers/chatController");

router.post(
  "/chat",
  auth,
  aiLimiter,
  chatWithAI
);

module.exports = router;