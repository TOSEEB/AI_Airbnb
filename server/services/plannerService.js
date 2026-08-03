const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: process.env.AI_BASE_URL,
});

const generatePlannerRecommendation = async (prompt, stays) => {
  try {

    const stayList = stays.map((stay) => ({
      title: stay.title,
      location: stay.location,
      price: stay.price,
      rating: stay.rating,
      guests: stay.maxGuests,
      type: stay.type,
      description: stay.description,
    }));


    const aiPrompt = `
You are an AI travel planner for an Airbnb application.

A user says:

"${prompt}"

Below is a list of available Airbnb stays:

${JSON.stringify(stayList, null, 2)}

Choose ONLY ONE stay that best matches the user's request.

Return ONLY valid JSON in this format:

{
  "title": "Property Name",
  "location": "Location",
  "price": 6500,
  "rating": 4.8,
  "reason": "Explain why this stay is the best choice in 3-4 sentences."
}
`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",

      response_format: {
        type: "json_object",
      },

      max_tokens: 250,

      messages: [
        {
          role: "user",
          content: aiPrompt,
        },
      ],
    });

    return JSON.parse(
      response.choices[0].message.content
    );

  } catch (error) {

    console.log("PLANNER AI ERROR:", error);

    throw error;

  }
};

module.exports = {
  generatePlannerRecommendation,
};