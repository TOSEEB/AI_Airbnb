const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const { adminSummary } = require("../controllers/adminController");

router.get("/summary", auth, adminSummary);

module.exports = router;

