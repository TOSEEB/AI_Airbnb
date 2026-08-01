const favorites = [];

const getFavorites = async (userId) => {
  return favorites.filter(f => f.userId === userId);
};

const toggleFavorite = async (userId, stayId) => {
  const existing = favorites.find(
    f => f.userId === userId && f.stayId === stayId
  );

  if (existing) {
    const index = favorites.indexOf(existing);
    favorites.splice(index, 1);
  } else {
    favorites.push({
      userId,
      stayId,
    });
  }

  return favorites.filter(f => f.userId === userId);
};

module.exports = {
  getFavorites,
  toggleFavorite,
};