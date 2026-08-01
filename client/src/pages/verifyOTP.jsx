import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify", {
        email,
        otp,
      });

      toast.success("Email verified successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Invalid OTP"
      );
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/resend-otp", {
        email,
      });

      toast.success(
        res.data.message || "OTP resent successfully"
      );

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to resend OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">
        Verify OTP
      </h1>

      <p className="mb-4">
        OTP sent to:
        <br />
        <b>{email}</b>
      </p>

      <form
        onSubmit={handleVerify}
        className="space-y-4"
      >
        <input
          className="w-full border p-3 rounded text-center tracking-widest"
          placeholder="Enter 6 digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={loading}
          className="w-full mt-4 border border-blue-600 text-blue-600 py-3 rounded hover:bg-blue-50 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Resend OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;