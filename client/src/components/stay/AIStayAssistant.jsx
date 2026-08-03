import { useState } from "react";
import { toast } from "react-toastify";

import { getAIRecommendation } from "../../api/aiApi";

const AIStayAssistant = ({ stay }) => {

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const generateAIPlan = async () => {

    try {

      setLoading(true);

      const res = await getAIRecommendation({
        stayId: stay._id,
      });

      setRecommendation(res.data);

    } catch (err) {

      console.log("AI ERROR:", err);

      if (err.response?.status === 429) {

        toast.error(err.response.data.message);

      } else {

        toast.error("Unable to generate AI recommendations.");

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="mt-10 border rounded-2xl p-6 shadow bg-white">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          ✨ AI Stay Assistant
        </h2>

        <button
          onClick={generateAIPlan}
          disabled={loading}
          className="bg-rose-500 text-white px-5 py-3 rounded-xl hover:bg-rose-600 disabled:opacity-50"
        >

          {loading ? "Generating..." : "Generate Plan"}

        </button>

      </div>

      {!recommendation && !loading && (

        <p className="text-gray-500 mt-5">
          Get AI-powered travel suggestions for this stay.
        </p>

      )}

      {recommendation && (

        <div className="mt-8 space-y-8">

          {/* Summary */}

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">

            <h3 className="text-xl font-semibold mb-3">
              ✨ AI Summary
            </h3>

            <p className="text-gray-700 leading-7">
              {recommendation.summary}
            </p>

          </div>

          {/* Attractions */}

          <div>

            <h3 className="text-xl font-semibold mb-3">
              🌄 Nearby Attractions
            </h3>

            <ul className="list-disc ml-6 text-gray-700 space-y-2">

              {recommendation.attractions?.map((item, index) => (

                <li key={index}>{item}</li>

              ))}

            </ul>

          </div>

          {/* Food */}

          <div>

            <h3 className="text-xl font-semibold mb-3">
              🍛 Food Recommendations
            </h3>

            <ul className="list-disc ml-6 text-gray-700 space-y-2">

              {recommendation.food?.map((item, index) => (

                <li key={index}>{item}</li>

              ))}

            </ul>

          </div>

          {/* Activities */}

          <div>

            <h3 className="text-xl font-semibold mb-3">
              🎯 Activities
            </h3>

            <ul className="list-disc ml-6 text-gray-700 space-y-2">

              {recommendation.activities?.map((item, index) => (

                <li key={index}>{item}</li>

              ))}

            </ul>

          </div>

          {/* Itinerary */}

          <div>

            <h3 className="text-xl font-semibold mb-3">
              🗓 3-Day Itinerary
            </h3>

            <div className="space-y-3">

              {recommendation.itinerary?.map((day, index) => (

                <div
                  key={index}
                  className="bg-gray-100 rounded-xl p-4 text-gray-700"
                >
                  {day}
                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default AIStayAssistant;