const Stay = require("../models/Stay");
const { parsePlannerIntent } = require("../utils/plannerIntent");
const { generatePlannerRecommendation } = require("../services/plannerService");
const { consumeAiCredit } = require("../middleware/aiLimiter");

const getPlannerRecommendation = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const { query } = parsePlannerIntent(prompt);

    let stays = await Stay.find(query)
      .select("title location price rating guests category description images")
      .limit(12)
      .lean();

    if (!stays.length) {
      stays = await Stay.find()
        .select("title location price rating guests category description images")
        .limit(12)
        .lean();
    }

    const result = await generatePlannerRecommendation(prompt, stays);
    await consumeAiCredit(req.user.id);

    res.json(result);
  } catch (error) {
    console.log("PLANNER ERROR:", error);

    res.status(500).json({
      message: error.message || "Planner failed",
    });
  }
};

module.exports = {
  getPlannerRecommendation,
};
