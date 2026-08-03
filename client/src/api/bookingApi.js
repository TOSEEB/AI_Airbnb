import api from "./axios";

export const createBooking = (bookingData) => {
  return api.post("/bookings", bookingData);
};

export const getBookings = () => {
  return api.get("/bookings");
};

// Create Razorpay Order
export const createPaymentOrder = (data) => {
  return api.post("/payments/create-order", data);
};

// Verify Razorpay Payment
export const verifyPayment = (data) => {
  return api.post("/payments/verify", data);
};