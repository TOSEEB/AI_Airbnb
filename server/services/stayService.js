const StayModel = require("../models/Stay");

// ======================
// GET ALL STAYS
// ======================

const getAllStays = async (filters = {}) => {
  const search = filters.search || "";
  const category = filters.category || "";
  const minPrice = Number(filters.minPrice || 0);
  const maxPrice = Number(filters.maxPrice || Number.MAX_SAFE_INTEGER);

  const stays = await StayModel.find().lean();

  return stays.filter((stay) => {
    const locationMatch =
      !search ||
      `${stay.title} ${stay.location}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const categoryMatch =
      !category ||
      stay.category?.toLowerCase() === category.toLowerCase();

    const price = Number(stay.price || 0);

    return (
      locationMatch &&
      categoryMatch &&
      price >= minPrice &&
      price <= maxPrice
    );
  });
};

// ======================
// CREATE STAY
// ======================

const createStay = async (data, ownerId) => {
  return await StayModel.create({
    ...data,
    owner: ownerId,
  });
};

// ======================
// GET SINGLE STAY
// ======================

const getStayById = async (id) => {
  return await StayModel.findById(id).lean();
};

// ======================
// GET HOST STAYS
// ======================

const getHostStays = async (ownerId) => {
  return await StayModel.find({
    owner: ownerId,
  }).lean();
};

// ======================
// UPDATE STAY
// ======================

const updateStay = async (
  stayId,
  data,
  ownerId
) => {
  return await StayModel.findOneAndUpdate(
    {
      _id: stayId,
      owner: ownerId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// ======================
// DELETE STAY
// ======================

const deleteStay = async (
  stayId,
  ownerId
) => {
  return await StayModel.findOneAndDelete({
    _id: stayId,
    owner: ownerId,
  });
};

module.exports = {
  getAllStays,
  createStay,
  getStayById,
  getHostStays,
  updateStay,
  deleteStay,
};