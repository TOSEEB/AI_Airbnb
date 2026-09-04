const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id || user._id,
      email: user.email,
      role: user.role || "guest",
    },
    process.env.JWT_SECRET || "dev-secret",
    {
      expiresIn: "7d",
      issuer: "ai-airbnb",
    }
  );
};

const getUserByEmail = async (email) => {
  return UserModel.findOne({
    email: email.toLowerCase(),
  });
};

const createUser = async ({
  name,
  email,
  password,
  role = "guest",
  isVerified = false,
  otp = null,
  otpExpiry = null,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return UserModel.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    isVerified,
    otp,
    otpExpiry,
  });
};

module.exports = {
  generateToken,
  getUserByEmail,
  createUser,
};
