const Stay = require("../models/Stay");

const {
  generateStayRecommendation,
} = require("../services/aiService");

const getRecommendation = async (req, res) => {
  try {
    const { stayId } = req.body;

    const stay = await Stay.findById(stayId);

    if (!stay) {
      return res.status(404).json({
        message: "Stay not found",
      });
    }

    // Return cached AI recommendation if available
    if (
      stay.aiRecommendation &&
      stay.aiRecommendation.summary
    ) {
      return res.json(stay.aiRecommendation);
    }

    // Generate new AI recommendation
    const result = await generateStayRecommendation(stay);

    // Save to database
    stay.aiRecommendation = result;
    await stay.save();

    return res.json(result);

  } catch (error) {

    console.error("========== AI CONTROLLER ERROR ==========");
    console.error(error);

    return res.status(error.status || 500).json({
      message:
        error.message || "AI generation failed",
    });
  }
};

module.exports = {
  getRecommendation,
};