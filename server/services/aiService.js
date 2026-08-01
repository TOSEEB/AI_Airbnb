const getRecommendation = (prompt) => {
  const text = (prompt || "").toLowerCase();

  let response =
    "I'd recommend a stylish central stay with great reviews and local experiences.";

  if (text.includes("family")) {
    response =
      "A family-friendly loft with parks nearby and flexible check-in would be a great fit.";
  } else if (text.includes("luxury")) {
    response =
      "A premium penthouse with concierge service and spa access would match that vibe.";
  } else if (text.includes("beach")) {
    response =
      "A bright beachfront house with outdoor dining and easy beach access is a strong match.";
  } else if (
    text.includes("cabin") ||
    text.includes("mountain")
  ) {
    response =
      "A cozy chalet with a fireplace and mountain views would fit beautifully.";
  }

  return { reply: response };
};

module.exports = {
  getRecommendation,
};