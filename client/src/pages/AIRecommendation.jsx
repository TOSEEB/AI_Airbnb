import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getPlannerRecommendation } from "../api/aiApi";
import { AuthContext } from "../context/AuthContext";

const AIRecommendation = () => {
  const { user } = useContext(AuthContext);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecommendation = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe your ideal vacation first.");
      return;
    }

    if (!user && !localStorage.getItem("token")) {
      toast.error("Please login to use the AI planner.");
      return;
    }

    try {
      setLoading(true);
      setResponse(null);

      const res = await getPlannerRecommendation({
        prompt,
      });

      setResponse(res.data);
    } catch (err) {
      let message = "Unable to get recommendation. Please try again.";

      if (err.response?.status === 401) {
        message = "Please login to use the AI planner.";
      } else if (err.response?.status === 429) {
        message = "AI daily limit reached. Please try again tomorrow.";
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message === "Network Error") {
        message =
          "Unable to connect to AI service. Please check your internet connection.";
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">
      <h2 className="text-3xl font-bold mb-3">🤖 AI Travel Planner</h2>

      <p className="text-gray-600 mb-6">
        Describe your ideal vacation and AI will recommend the best property
        from our Airbnb listings.
      </p>

      <textarea
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: I want to go for vacation with my family in Manali."
        className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
      />

      <button
        onClick={handleRecommendation}
        disabled={loading}
        className="mt-5 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
      >
        {loading ? "Finding Best Stay..." : "Get Recommendation"}
      </button>

      {response && !response.error && (
        <div className="mt-8 bg-gray-100 rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-4">🏡 {response.title}</h3>

          <div className="space-y-2">
            <p>
              📍 <strong>Location:</strong> {response.location}
            </p>
            <p>
              ⭐ <strong>Rating:</strong> {response.rating}
            </p>
            <p>
              💰 <strong>Price:</strong> ₹{response.price} / night
            </p>
          </div>

          <div className="mt-5">
            <h4 className="text-lg font-semibold mb-2">Why this stay?</h4>
            <p className="text-gray-700 leading-7">{response.reason}</p>
          </div>

          {response.stayId && (
            <Link
              to={`/stay/${response.stayId}`}
              className="inline-block mt-6 bg-rose-500 hover:bg-rose-600 text-white px-5 py-3 rounded-xl"
            >
              View this stay
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;
