const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const {
  adminSummary,
  changeUserRole,
  takeDownStay,
} = require("../controllers/adminController");

router.use(auth, requireRole("admin"));

router.get("/summary", adminSummary);
router.patch("/users/:id/role", changeUserRole);
router.delete("/stays/:id", takeDownStay);

module.exports = router;
