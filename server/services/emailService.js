const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================
// SEND VERIFICATION OTP
// ======================

const sendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Airbnb Account Verification OTP",

      html: `
        <h2>Welcome to Airbnb</h2>

        <p>Your verification OTP is:</p>

        <h1 style="letter-spacing:5px;">${otp}</h1>

        <p>This OTP expires in <b>10 minutes</b>.</p>
      `,
    });

    console.log("Verification OTP email sent.");

  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

// ======================
// SEND RESET PASSWORD LINK
// ======================

const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Airbnb Password",

      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2>Reset Your Password</h2>

          <p>We received a request to reset your password.</p>

          <p>
            Click the button below to create a new password.
          </p>

          <a
            href="${resetLink}"
            style="
              display:inline-block;
              padding:12px 24px;
              background:#ff5a5f;
              color:white;
              text-decoration:none;
              border-radius:6px;
              font-weight:bold;
            "
          >
            Reset Password
          </a>

          <p style="margin-top:20px;">
            Or copy and paste this link into your browser:
          </p>

          <p>${resetLink}</p>

          <p>
            This link expires in <b>15 minutes</b>.
          </p>

          <p>
            If you didn't request a password reset, you can safely ignore this email.
          </p>

          <br>

          <p>Team Airbnb</p>
        </div>
      `,
    });

    console.log("Reset password email sent.");

  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

module.exports = {
  sendOTPEmail,
  sendResetPasswordEmail,
};