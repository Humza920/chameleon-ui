import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../pages/DashboardLayout";
import ChatsPage from "../pages/ChatsPage";
import FeedbackPage from "../pages/FeedbackPage";
import FBCommentsPage from "../pages/FBCommentsPage";
import SettingsPage from "../pages/SettingsPage";
import NotFound from "../pages/NotFound";
import ProtectRoute from "./ProtectRoutes";

const RoutesPage = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />

      {/* ================= PROTECTED DASHBOARD ROUTES ================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectRoute>
            <DashboardLayout>
              <ChatsPage />
            </DashboardLayout>
          </ProtectRoute>
        }
      />

      <Route
        path="/dashboard/chats"
        element={
          <ProtectRoute>
            <DashboardLayout>
              <ChatsPage />
            </DashboardLayout>
          </ProtectRoute>
        }
      />

      <Route
        path="/dashboard/feedback"
        element={
          <ProtectRoute>
            <DashboardLayout>
              <FeedbackPage />
            </DashboardLayout>
          </ProtectRoute>
        }
      />

      <Route
        path="/dashboard/fb-comments"
        element={
          <ProtectRoute>
            <DashboardLayout>
              <FBCommentsPage />
            </DashboardLayout>
          </ProtectRoute>
        }
      />

      <Route
        path="/dashboard/settings"
        element={
          <ProtectRoute>
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          </ProtectRoute>
        }
      />

      {/* ================= 404 NOT FOUND ================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesPage;