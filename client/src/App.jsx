import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import StayDetails from "./pages/StayDetails";
import Dashboard from "./pages/Dashboard";
import HostDashboard from "./pages/HostDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import AddStay from "./pages/AddStay";
import EditStay from "./pages/EditStay";

import Favorites from "./pages/Favorites";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import AIRecommendation from "./pages/AIRecommendation";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import HostRoute from "./components/HostRoute";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>

        {/* ========================= */}
        {/* Public Routes */}
        {/* ========================= */}

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Signup />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/stay/:id"
          element={<StayDetails />}
        />

        <Route
          path="/ai"
          element={<AIRecommendation />}
        />

        {/* ========================= */}
        {/* Protected User Routes */}
        {/* ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* Host Routes */}
        {/* ========================= */}

        <Route
          path="/host"
          element={
            <HostRoute>
              <HostDashboard />
            </HostRoute>
          }
        />

        <Route
          path="/host/dashboard"
          element={
            <HostRoute>
              <HostDashboard />
            </HostRoute>
          }
        />

        <Route
          path="/host/stays/new"
          element={
            <HostRoute>
              <AddStay />
            </HostRoute>
          }
        />

        <Route
          path="/host/stays/edit/:id"
          element={
            <HostRoute>
              <EditStay />
            </HostRoute>
          }
        />

        {/* ========================= */}
        {/* Admin */}
        {/* ========================= */}

        <Route
          path="/admin"
          element={
            <HostRoute>
              <AdminDashboard />
            </HostRoute>
          }
        />

        {/* ========================= */}
        {/* 404 */}
        {/* ========================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;