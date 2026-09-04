const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  addReview,
  getStayReviews,
  getStayReviewEligibility,
} = require("../controllers/reviewController");

router.post("/", auth, addReview);
router.get("/eligibility/:stayId", auth, getStayReviewEligibility);
router.get("/:stayId", getStayReviews);

module.exports = router;
