import api from "./axios";

// AI Stay Assistant
export const getAIRecommendation = (data) => {
  return api.post("/ai/recommendation", data, { timeout: 60000 });
};

export const getPlannerRecommendation = (data) => {
  return api.post("/ai/planner", data, { timeout: 60000 });
};

export const sendChatMessage = (data) => {
  return api.post("/ai/chat", data, { timeout: 60000 });
};