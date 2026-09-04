const User = require("../models/User");
const Stay = require("../models/Stay");

const getFavorites = async (userId) => {
  const user = await User.findById(userId).populate("favourites");

  if (!user) {
    throw new Error("User not found");
  }

  return user.favourites || [];
};

const toggleFavorite = async (userId, stayId) => {
  const stay = await Stay.findById(stayId).select("_id");

  if (!stay) {
    throw new Error("Stay not found");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const alreadySaved = user.favourites.some(
    (id) => String(id) === String(stayId)
  );

  if (alreadySaved) {
    user.favourites.pull(stayId);
  } else {
    user.favourites.addToSet(stayId);
  }

  await user.save();

  const favorites = await getFavorites(userId);

  return {
    favorites,
    isFavorite: !alreadySaved,
  };
};

module.exports = {
  getFavorites,
  toggleFavorite,
};
