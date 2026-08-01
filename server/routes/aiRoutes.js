const express = require("express");

const router = express.Router();

const {
  recommendStay,
} = require("../controllers/aiController");

router.post("/recommend", recommendStay);

module.exports = router; 

