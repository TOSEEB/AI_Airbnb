import api from "./axios";

export const getAIRecommendation = (data) => {
  return api.post("/ai/recommendation", data);
};