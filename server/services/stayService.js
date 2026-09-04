const StayModel = require("../models/Stay");
const { getUnavailableStayIds } = require("./occupancyService");
const { escapeRegex, expandLocationTerms } = require("../utils/locationSearch");

const getAllStays = async (filters = {}) => {
  const search = filters.location || filters.search || "";
  const category = filters.category || "";
  const guests = Number(filters.guests || 0);
  const checkIn = filters.checkIn;
  const checkOut = filters.checkOut;

  const query = {};

  if (search) {
    query.$or = expandLocationTerms(search).flatMap((term) => [
      { location: { $regex: escapeRegex(term), $options: "i" } },
      { title: { $regex: escapeRegex(term), $options: "i" } },
    ]);
  }

  if (category) {
    query.category = new RegExp(`^${category}$`, "i");
  }

  if (guests > 0) {
    query.guests = { $gte: guests };
  }

  if (checkIn && checkOut) {
    const bookedStayIds = await getUnavailableStayIds(checkIn, checkOut);
    query._id = { $nin: bookedStayIds };
  }

  return StayModel.find(query).lean();
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

const getStayLocations = async () => {
  const locations = await StayModel.distinct("location");
  return locations.filter(Boolean).sort((a, b) => a.localeCompare(b));
};

module.exports = {
  getAllStays,
  createStay,
  getStayById,
  getHostStays,
  updateStay,
  deleteStay,
  getStayLocations,
};
