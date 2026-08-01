const StayModel = require("../models/Stay");
const BookingModel = require("../models/Booking");
const ReviewModel = require("../models/Review");
const { calculateHostSummary } = require("../utils/hostSummary");

const getAdminSummary = async (user) => {
    const isAdmin =
        user.role === "host" ||
        user.email.includes("admin") ||
        user.email.includes("host");

    if (!isAdmin) {
        throw new Error("Not authorized");
    }

    const hostPayload = {
        userId: user.id,
        stays: await StayModel.find({ owner: user.id }).lean(),
        bookings: await BookingModel.find({}).populate("stay"),
        reviews: await ReviewModel.find({}).populate("stay"),
    };

    const summary = calculateHostSummary(hostPayload);

    return {
        ...summary,
        recentStays: hostPayload.stays.slice(0, 4),
    };
};

module.exports = { getAdminSummary }; 


