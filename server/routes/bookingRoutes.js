const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  bookStay,
  getMyBookings,
  getBookingsForHost,
} = require("../controllers/bookingController");

// Guest

router.post("/", auth, bookStay);

router.get("/", auth, getMyBookings);

// Host

router.get(
  "/host",
  auth,
  getBookingsForHost
);

module.exports = router;