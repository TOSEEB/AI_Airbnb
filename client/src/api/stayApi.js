import api from "./axios";

// ======================
// PUBLIC APIS
// ======================

// Get all stays
export const getAllStays = () => {
  return api.get("/stays");
};

// Get single stay
export const getStayById = (id) => {
  return api.get(`/stays/${id}`);
};

// ======================
// HOST APIS
// ======================

// Get logged-in host's stays
export const getHostStays = () => {
  return api.get("/stays/host");
};

// Create new stay
export const createStay = (stayData) => {
  return api.post("/stays", stayData);
};

// Update stay
export const updateStay = (id, stayData) => {
  return api.put(`/stays/${id}`, stayData);
};

// Delete stay
export const deleteStay = (id) => {
  return api.delete(`/stays/${id}`);
};