import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";
import { locationToPath } from "../utils/authRedirect";

const HostRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: locationToPath(location) }}
      />
    );
  }

  if (user.role !== "host" && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default HostRoute;
