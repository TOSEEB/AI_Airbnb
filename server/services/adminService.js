const StayModel = require("../models/Stay");
const BookingModel = require("../models/Booking");
const UserModel = require("../models/User");
const ReviewModel = require("../models/Review");
const OccupancyNight = require("../models/OccupancyNight");

const PUBLIC_ROLES = ["guest", "host", "admin"];

const getAdminSummary = async () => {
  const [
    users,
    stays,
    bookings,
    reviews,
    confirmedBookings,
    pendingBookings,
    recentBookings,
    userList,
    stayList,
  ] = await Promise.all([
    UserModel.countDocuments(),
    StayModel.countDocuments(),
    BookingModel.countDocuments(),
    ReviewModel.countDocuments(),
    BookingModel.countDocuments({ status: "confirmed" }),
    BookingModel.countDocuments({ status: "pending" }),
    BookingModel.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("stay", "title location")
      .populate("user", "name email")
      .lean(),
    UserModel.find()
      .select("name email role isVerified createdAt")
      .sort({ createdAt: -1 })
      .limit(50)
      .lean(),
    StayModel.find()
      .select("title location price owner createdAt")
      .populate("owner", "name email")
      .sort({ createdAt: -1 })
      .limit(50)
      .lean(),
  ]);

  return {
    users,
    stays,
    bookings,
    reviews,
    confirmedBookings,
    pendingBookings,
    recentBookings,
    userList,
    stayList,
  };
};

const updateUserRole = async (targetUserId, role, actorId) => {
  if (!PUBLIC_ROLES.includes(role)) {
    throw new Error("Role must be guest, host, or admin");
  }

  const user = await UserModel.findById(targetUserId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === "admin" && role !== "admin") {
    const adminCount = await UserModel.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      throw new Error("Cannot demote the last admin");
    }
  }

  if (String(user._id) === String(actorId) && role !== "admin") {
    const adminCount = await UserModel.countDocuments({ role: "admin" });
    if (user.role === "admin" && adminCount <= 1) {
      throw new Error("Cannot demote the last admin");
    }
  }

  user.role = role;
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const removeStayAsAdmin = async (stayId) => {
  const stay = await StayModel.findByIdAndDelete(stayId);

  if (!stay) {
    throw new Error("Stay not found");
  }

  await OccupancyNight.deleteMany({ stay: stayId });

  return stay;
};

module.exports = {
  getAdminSummary,
  updateUserRole,
  removeStayAsAdmin,
};
