import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";
import { getReturnPath } from "../utils/authRedirect";

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to={getReturnPath(location.state?.from)} replace />;
  }

  return children;
}

export default PublicRoute;
