const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: process.env.AI_BASE_URL,
});

const generateChatResponse = async (stay, userMessage) => {
  try {

    const prompt = `
You are an intelligent Airbnb travel assistant.

The user is viewing this property:

Property Name: ${stay.title}
Location: ${stay.location}
Description: ${stay.description || "No description"}
Price: ₹${stay.price}
Rating: ${stay.rating}
Bedrooms: ${stay.bedrooms}
Guests: ${stay.maxGuests}
Category: ${stay.category || stay.type || "Stay"}

Your job is to answer ONLY questions related to this property and the destination.

Examples:
- Is this good for families?
- Is it good for honeymoon?
- What can I do nearby?
- What should I pack?
- Best time to visit?
- Is this worth the price?
- Can I work remotely here?
- Suggest nearby restaurants.

If the user asks something unrelated to travel or this property, politely say that you only answer travel-related questions.

User Question:
"${userMessage}"

Respond naturally as a helpful travel assistant.

Return ONLY valid JSON:

{
  "reply":"Your answer here"
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
          content: prompt,
        },
      ],
    });

    const result = JSON.parse(
      response.choices[0].message.content
    );

    return result.reply;

  } catch (error) {

    console.log("CHAT SERVICE ERROR:", error);

    throw error;

  }
};

module.exports = {
  generateChatResponse,
};