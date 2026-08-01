const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getStays,
  addStay,
  getStay,
  getMyStays,
  editStay,
  removeStay,
} = require("../controllers/stayController");


// ======================
// PUBLIC ROUTES
// ======================

// Get all stays
router.get("/", getStays);

// Get logged-in host's stays
// IMPORTANT: This must come BEFORE "/:id"
router.get("/host", auth, getMyStays);

// Get single stay
router.get("/:id", getStay);


// ======================
// HOST ROUTES
// ======================

// Create stay
router.post("/", auth, addStay);

// Update own stay
router.put("/:id", auth, editStay);

// Delete own stay
router.delete("/:id", auth, removeStay);

module.exports = router;