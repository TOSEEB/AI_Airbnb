const bcrypt = require("bcryptjs");
const crypto = require("crypto");


const generateOTP = require("../utils/generateOTP");

const {
  sendOTPEmail,
  sendResetPasswordEmail,
} = require("../services/emailService"); 


const {
  generateToken,
  getUserByEmail,
  createUser,
} = require("../services/authService");
const {
  validateSignupInput,
  validateLoginInput,
} = require("../utils/validators");


// ======================
// SIGNUP WITH OTP
// ======================

const signup = async (req, res) => {
  try {
    const { name, email, password, role: requestedRole } = req.body;

    const validation = validateSignupInput({
      name,
      email,
      password,
      role: requestedRole,
    });
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const existing = await getUserByEmail(email.trim().toLowerCase());

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }


    const normalizedEmail = email.trim().toLowerCase();
    const role = requestedRole === "host" ? "host" : "guest";


    // Generate OTP
    const otp = generateOTP();


    // Create user but not verified
    const user = await createUser({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,

      isVerified: false,

      otp,

      otpExpiry: Date.now() + 10 * 60 * 1000,
    });


    // Send OTP email
    await sendOTPEmail(normalizedEmail, otp);


    res.status(201).json({

      message: "OTP sent to your email",

      email: user.email,

    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// ======================
// LOGIN
// ======================

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const validation = validateLoginInput({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await getUserByEmail(normalizedEmail);


    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials",
      });

    }


    // Check email verification

    if (!user.isVerified) {

      return res.status(401).json({

        message: "Please verify your email first.",

      });

    }



    const valid = await bcrypt.compare(
      password,
      user.password
    );


    if (!valid) {

      return res.status(400).json({
        message: "Invalid credentials",
      });

    }



    const token = generateToken(user);


    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });



    res.json({

      user: {

        id: user.id || user._id,

        name: user.name,

        email: user.email,

        role: user.role || "guest",

      },

      token,

    });


  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }
};



// ======================
// LOGOUT
// ======================

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({ message: "Logged out successfully" });
};

// ======================
// GET CURRENT USER
// ======================

const User = require("../models/User");

// ======================
// GET CURRENT USER
// ======================

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    const dbDown =
      error.name === "MongoServerSelectionError" ||
      error.name === "MongoNetworkError" ||
      error.message?.includes("ENOTFOUND");

    res.status(dbDown ? 503 : 500).json({
      message: dbDown
        ? "Database is unavailable. Check MongoDB Atlas DNS and Network Access."
        : error.message,
    });
  }
};


// ======================
// RESEND OTP
// ======================

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    await sendOTPEmail(email, otp);

    res.json({
      message: "OTP resent successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ======================
// VERIFY OTP
// ======================

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      message: "Email verified successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ======================
// FORGOT PASSWORD
// ======================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendResetPasswordEmail(
      user.email,
      resetLink
    );

    res.status(200).json({
      message: "Password reset link sent to your email.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};






// ======================
// RESET PASSWORD
// ======================

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const User = require("../models/User");

    // Hash token from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




const becomeHost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      user.role = "host";
      await user.save();
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getMe,
  resendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
  becomeHost,
};