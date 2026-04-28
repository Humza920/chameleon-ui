import { useEffect, useState } from "react";
import Login from "@/components/admin/Login";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate authentication
    setTimeout(() => {
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify({ role: "admin", id: 1 }));
      // Redirect to dashboard
      window.location.href = "/dashboard";
      setLoading(false);
    }, 1000);
  };

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;
