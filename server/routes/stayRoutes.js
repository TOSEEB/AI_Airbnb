const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const {
  getStays,
  addStay,
  getStay,
  getMyStays,
  editStay,
  removeStay,
  listLocations,
} = require("../controllers/stayController");


// ======================
// PUBLIC ROUTES
// ======================

// Get all stays
router.get("/", getStays);

router.get("/locations", listLocations);

// Get logged-in host's stays
// IMPORTANT: This must come BEFORE "/:id"
router.get("/host", auth, requireRole("host", "admin"), getMyStays);

// Get single stay
router.get("/:id", getStay);


// ======================
// HOST ROUTES
// ======================

// Create stay
router.post("/", auth, requireRole("host", "admin"), addStay);

// Update own stay
router.put("/:id", auth, requireRole("host", "admin"), editStay);

// Delete own stay
router.delete("/:id", auth, requireRole("host", "admin"), removeStay);

module.exports = router;