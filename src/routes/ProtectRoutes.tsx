import { Navigate } from "react-router-dom";

interface ProtectRouteProps {
  children: React.ReactNode;
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {
  // Check if user is logged in from localStorage
  const user = localStorage.getItem("user");
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
