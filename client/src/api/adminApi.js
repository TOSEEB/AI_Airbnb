import api from "./axios";

export const getAdminSummary = () => {
  return api.get("/admin/summary");
};