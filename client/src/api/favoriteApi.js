import api from "./axios";

export const getFavorites = () => {
  return api.get("/favorites");
};

export const toggleFavorite = (stayId) => {
  return api.post(`/favorites/${stayId}`);
};