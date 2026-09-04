const {
  createReview,
  getReviews,
  getReviewEligibility,
} = require("../services/reviewService");

const addReview = async (req, res) => {
  try {
    const review = await createReview(req.body, req.user.id);
    res.status(201).json(review);
  } catch (err) {
    if (
      err.message === "Stay is required" ||
      err.message === "Rating must be between 1 and 5" ||
      err.message === "Please write a slightly longer review" ||
      err.message === "You can only review a stay after a confirmed visit" ||
      err.message === "You have already reviewed this stay"
    ) {
      return res.status(400).json({
        message: err.message,
      });
    }

    if (err.message === "Stay not found") {
      return res.status(404).json({
        message: err.message,
      });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        message: "You have already reviewed this stay",
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
};

const getStayReviews = async (req, res) => {
  try {
    const reviews = await getReviews(req.params.stayId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getStayReviewEligibility = async (req, res) => {
  try {
    const eligibility = await getReviewEligibility(
      req.user.id,
      req.params.stayId
    );
    res.json(eligibility);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addReview,
  getStayReviews,
  getStayReviewEligibility,
};
