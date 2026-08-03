import { useState } from "react";
import { toast } from "react-toastify";

import { sendChatMessage } from "../../api/aiApi";

const AIChatAssistant = ({ stay }) => {

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your AI travel assistant. Ask me anything about this stay.",
    },
  ]);

  const handleSend = async () => {

    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");

    setLoading(true);

    try {

      const res = await sendChatMessage({

        stayId: stay._id,

        message: userMessage,

      });

      setMessages((prev) => [

        ...prev,

        {
          role: "assistant",
          content: res.data.reply,
        },

      ]);

    } catch (err) {

      console.log(err);

      if (err.response?.status === 429) {

        toast.error(err.response.data.message);

      } else {

        toast.error("Unable to contact AI.");

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="mt-10 border rounded-2xl shadow bg-white">

      <div className="bg-rose-500 text-white rounded-t-2xl px-6 py-4">

        <h2 className="text-2xl font-bold">
          🤖 Ask AI About This Stay
        </h2>

      </div>

      <div className="h-[420px] overflow-y-auto p-6 bg-gray-50">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex mb-4 ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-rose-500 text-white"
                  : "bg-white border"
              }`}
            >

              {msg.content}

            </div>

          </div>

        ))}

        {loading && (

          <div className="text-gray-500 animate-pulse">

            AI is typing...

          </div>

        )}

      </div>

      <div className="border-t p-4 flex gap-3">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything about this stay..."
          className="flex-1 border rounded-xl px-4 py-3 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 rounded-xl disabled:opacity-50"
        >

          Send

        </button>

      </div>

    </div>

  );

};

export default AIChatAssistant;