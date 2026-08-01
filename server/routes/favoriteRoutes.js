const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getMyFavorites,
  toggleMyFavorite,
} = require("../controllers/favoriteController");

router.get("/", auth, getMyFavorites);

router.post("/:stayId", auth, toggleMyFavorite);

module.exports = router;