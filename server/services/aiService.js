const OpenAI = require("openai");


const client = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: process.env.AI_BASE_URL,
});



const generateStayRecommendation = async (stay) => {

  try {


    const prompt = `

You are an intelligent travel assistant for an Airbnb application.

A user is viewing the following Airbnb stay.

Property Name: ${stay.title}

Location: ${stay.location}

Description: ${stay.description || "No description available"}

Price: ₹${stay.price}

Rating: ${stay.rating}


Generate helpful travel recommendations for this stay.


Return ONLY valid JSON in exactly this format:


{
  "summary": "2-3 sentence personalized recommendation",

  "attractions": [
    "Attraction 1",
    "Attraction 2",
    "Attraction 3"
  ],

  "food": [
    "Food Place 1",
    "Food Place 2",
    "Food Place 3"
  ],

  "activities": [
    "Activity 1",
    "Activity 2",
    "Activity 3"
  ],

  "itinerary": [
    "Day 1: Detailed itinerary",
    "Day 2: Detailed itinerary",
    "Day 3: Detailed itinerary"
  ]
}

`;



    const response =
      await client.chat.completions.create({

        model: "openai/gpt-4o-mini",


        response_format: {
          type: "json_object",
        },


        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

      });



    return JSON.parse(
      response.choices[0].message.content
    );



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