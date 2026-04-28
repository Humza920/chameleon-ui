import { Navigate } from "react-router-dom";



const ProtectRoute = ({ children }) => {
  // Check if user is logged in from localStorage
  const user = localStorage.getItem("user");
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectRoute;