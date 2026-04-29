import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectRoute = ({ children }) => {
  const token = Cookies.get("access_token");
   const user = localStorage.getItem("user");

  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoute;
