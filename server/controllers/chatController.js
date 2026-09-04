const Stay = require("../models/Stay");

const {
  generateChatResponse,
} = require("../services/chatService");
const { consumeAiCredit } = require("../middleware/aiLimiter");

const chatWithAI = async (req, res) => {
  try {
    const { stayId, message } = req.body;

    if (!stayId || !message) {
      return res.status(400).json({
        message: "Stay ID and message are required",
      });
    }

    const stay = await Stay.findById(stayId);

    if (!stay) {
      return res.status(404).json({
        message: "Stay not found",
      });
    }

    const reply = await generateChatResponse(
      stay,
      message
    );

    await consumeAiCredit(req.user.id);

    res.json({
      reply,
    });

  } catch (error) {

    console.log("CHAT AI ERROR:", error);

    res.status(500).json({
      message: "Chat failed",
    });

  }
};

module.exports = {
  chatWithAI,
};