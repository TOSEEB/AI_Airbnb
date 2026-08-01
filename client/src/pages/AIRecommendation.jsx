import { useState } from "react";
import { getAIRecommendation } from "../api/aiApi";

const AIRecommendation = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommendation = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const res = await getAIRecommendation({
        prompt,
      });

      setResponse(res.data.reply);
    } catch (err) {
      console.error(err);
      setResponse("Unable to get recommendation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">
        AI Travel Assistant
      </h2>

      <p className="text-gray-600 mb-4">
        Describe your ideal stay and let AI recommend one.
      </p>

      <textarea
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: I need a luxury beach villa for a family of four..."
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleRecommendation}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Thinking..." : "Get Recommendation"}
      </button>

      {response && (
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h3 className="font-semibold mb-2">
            AI Recommendation
          </h3>

          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;