import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectRoute = ({ children }) => {
  const token = Cookies.get("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoute;
