const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const aiLimiter = require("../middleware/aiLimiter");

const {
  getPlannerRecommendation,
} = require("../controllers/plannerController");

router.post(
  "/planner",
  auth,
  aiLimiter,
  getPlannerRecommendation
);

module.exports = router;