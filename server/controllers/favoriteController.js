const {
  getFavorites,
  toggleFavorite,
} = require("../services/favoriteService");

const getMyFavorites = async (req, res) => {
  try {
    const data = await getFavorites(req.user.id);
    res.json(data);
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
};

const toggleMyFavorite = async (req, res) => {
  try {
    const data = await toggleFavorite(
      req.user.id,
      req.params.stayId
    );

    res.json(data);
  } catch (err) {
    if (err.message === "Stay not found" || err.message === "User not found") {
      return res.status(404).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getMyFavorites,
  toggleMyFavorite,
};
