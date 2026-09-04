const OpenAI = require("openai");

const client = process.env.AI_API_KEY
  ? new OpenAI({
      apiKey: process.env.AI_API_KEY,
      baseURL: process.env.AI_BASE_URL,
    })
  : null;



const generateStayRecommendation = async (stay, areaContext = {}) => {
  try {
    const area = areaContext.area || stay.location;
    const wikiNote = areaContext.extract
      ? `Background on this area (${areaContext.wikiTitle || area}):\n${areaContext.extract}`
      : "No extra area article was found. Still recommend well-known places in this region.";

    const prompt = `
You are a travel assistant in a vacation-rental app. This is an AI integration demo.

The guest is staying in this AREA / city / region (not a GPS pin):
${area}

Stay details (for tone and budget only):
Name: ${stay.title}
Description: ${stay.description || "No description available"}
Price: ₹${stay.price}
Rating: ${stay.rating}

${wikiNote}

Write recommendations for the AREA above (example: if location is Manali, talk about Manali and nearby Himachal highlights).
Use well-known public places and food styles for that region. Do not claim exact coordinates.

Return ONLY valid JSON:
{
  "summary": "2-3 sentences about staying here and the area",
  "attractions": ["three well-known area attractions"],
  "food": ["three well-known area food spots or local dishes/places"],
  "activities": ["three area activities"],
  "itinerary": ["Day 1: ...", "Day 2: ...", "Day 3: ..."]
}
`;



    if (!client) {
      throw new Error("AI service is not configured. Please set AI_API_KEY.");
    }

    const response =
      await client.chat.completions.create({

        model: "openai/gpt-4o-mini",


        response_format: {
          type: "json_object",
        },

        max_tokens: 500,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

      });



    return {
      ...JSON.parse(response.choices[0].message.content),
      source: "area-ai",
      area,
    };



  } catch (error) {


    console.error(
      "\n========== AI SERVICE ERROR =========="
    );


    console.error(
      "Message:",
      error.message
    );


    console.error(
      "Status:",
      error.status
    );



    // ==========================
    // AI Daily Limit / Rate Limit
    // ==========================

    if (
      error.status === 429 ||
      error.code === "rate_limit_exceeded" ||
      error.message?.includes("rate limit")
    ) {


      const limitError = new Error(
        "AI daily limit reached. Please try again tomorrow."
      );


      limitError.status = 429;


      throw limitError;

    }



    // ==========================
    // Invalid API Key
    // ==========================

    if (
      error.status === 401
    ) {


      const authError = new Error(
        "AI service authentication failed."
      );


      authError.status = 401;


      throw authError;

    }



    // ==========================
    // Server / Provider Error
    // ==========================

    if (
      error.status >= 500
    ) {


      const serverError = new Error(
        "AI service is temporarily unavailable. Please try again later."
      );


      serverError.status = 503;


      throw serverError;

    }



    console.error(
      "Full Error:"
    );

    console.dir(
      error,
      {
        depth: null
      }
    );



    throw error;

  }

};



module.exports = {
  generateStayRecommendation,
};