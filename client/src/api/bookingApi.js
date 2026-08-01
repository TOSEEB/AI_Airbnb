import api from "./axios";

export const createBooking = (bookingData) => {
  return api.post("/bookings", bookingData);
};

export const getBookings = () => {
  return api.get("/bookings");
};