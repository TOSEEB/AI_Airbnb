import api from "./axios";

export const register = (userData) => {
  return api.post("/auth/signup", userData);
};

export const login = (userData) => {
  return api.post("/auth/login", userData);
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const getProfile = () => {
  return api.get("/auth/me");
};