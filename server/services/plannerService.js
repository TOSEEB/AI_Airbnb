const OpenAI = require("openai");

const client = process.env.AI_API_KEY
  ? new OpenAI({
      apiKey: process.env.AI_API_KEY,
      baseURL: process.env.AI_BASE_URL,
    })
  : null;

const toStayPayload = (stay) => ({
  stayId: String(stay._id),
  title: stay.title,
  location: stay.location,
  price: stay.price,
  rating: stay.rating,
  guests: stay.guests,
  category: stay.category,
  description: (stay.description || "").slice(0, 280),
});

const generatePlannerRecommendation = async (prompt, stays) => {
  if (!stays.length) {
    throw new Error("No matching stays found");
  }

  const stayList = stays.map(toStayPayload);

  const aiPrompt = `
You are an AI travel planner for a vacation rental app.

A user says:
"${prompt}"

Choose exactly ONE stay from this inventory. Use the stayId values as-is.
Do not invent properties that are not in the list.

Inventory:
${JSON.stringify(stayList, null, 2)}

Return ONLY valid JSON:
{
  "stayId": "the _id of the chosen stay",
  "reason": "3-4 sentences explaining why this inventory stay fits the request"
}
`;

  if (!client) {
    throw new Error("AI service is not configured. Please set AI_API_KEY.");
  }

  const response = await client.chat.completions.create({
    model: "openai/gpt-4o-mini",
    response_format: {
      type: "json_object",
    },
    max_tokens: 280,
    messages: [
      {
        role: "user",
        content: aiPrompt,
      },
    ],
  });

  const parsed = JSON.parse(response.choices[0].message.content);
  const chosen =
    stays.find((stay) => String(stay._id) === String(parsed.stayId)) ||
    stays[0];

  return {
    stayId: String(chosen._id),
    title: chosen.title,
    location: chosen.location,
    price: chosen.price,
    rating: chosen.rating,
    images: chosen.images || [],
    reason: parsed.reason || "This stay is the closest match in our listings.",
  };
};

module.exports = {
  generatePlannerRecommendation,
};
