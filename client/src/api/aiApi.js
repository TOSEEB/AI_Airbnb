import api from "./axios";

// AI Stay Assistant
export const getAIRecommendation = (data) => {
  return api.post("/ai/recommendation", data);
};

// AI Planner
export const getPlannerRecommendation = (data) => {
  return api.post("/ai/planner", data);
};

// AI Chat
export const sendChatMessage = (data) => {
  return api.post("/ai/chat", data);
};