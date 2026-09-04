const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const {
  bookStay,
  getMyBookings,
  getBookingsForHost,
  cancelStayBooking,
} = require("../controllers/bookingController");

// Guest

router.post("/", auth, bookStay);

router.get("/", auth, getMyBookings);

router.get(
  "/host",
  auth,
  requireRole("host", "admin"),
  getBookingsForHost
);

router.post("/:id/cancel", auth, cancelStayBooking);

module.exports = router;