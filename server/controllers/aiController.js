const Stay = require("../models/Stay");

const {
  generateStayRecommendation,
} = require("../services/aiService");
const { getAreaContext } = require("../services/placesService");
const { consumeAiCredit } = require("../middleware/aiLimiter");

const getRecommendation = async (req, res) => {
  try {
    const { stayId } = req.body;

    const stay = await Stay.findById(stayId);

    if (!stay) {
      return res.status(404).json({
        message: "Stay not found",
      });
    }

    if (
      stay.aiRecommendation &&
      stay.aiRecommendation.summary &&
      stay.aiRecommendation.source === "area-ai"
    ) {
      return res.json(stay.aiRecommendation);
    }

    const areaContext = await getAreaContext(stay.location);
    const result = await generateStayRecommendation(stay, areaContext);

    result.source = "area-ai";
    stay.aiRecommendation = result;
    await stay.save();
    await consumeAiCredit(req.user.id);

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