import api from "./axios";

export const getAdminSummary = () => {
  return api.get("/admin/summary");
};

export const updateUserRole = (userId, role) => {
  return api.patch(`/admin/users/${userId}/role`, { role });
};

export const adminDeleteStay = (stayId) => {
  return api.delete(`/admin/stays/${stayId}`);
};
