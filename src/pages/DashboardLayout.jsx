import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import MessageModal from "@/components/admin/MessageModal";
import { getAdmin } from "@/helper";
import { useGetStatsQuery, useGetTokenStatsQuery } from "@/redux/servives/index";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [fullMessage, setFullMessage] = useState(null);

  // Map routes to active IDs
  const routeMap = {
    "/dashboard/chats": "conversations",
    "/dashboard/feedback": "feedback",
    "/dashboard/fb-comments": "fbcomments",
    "/dashboard/settings": "settings",
  };

  const activeId = routeMap[location.pathname] || "conversations";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleSelectTab = (tabId) => {
    const routeMap = {
      conversations: "/dashboard/chats",
      feedback: "/dashboard/feedback",
      fbcomments: "/dashboard/fb-comments",
      settings: "/dashboard/settings",
    };
    navigate(routeMap[tabId]);
  };

  const { data: apiStats } = useGetStatsQuery();
  const { data: tokenStats } = useGetTokenStatsQuery();

  const admin = getAdmin();
  const userString = localStorage.getItem("user");
  const userData = userString ? JSON.parse(userString) : { email: "admin@example.com" };
  const adminName = userData.email?.split("@")[0] || admin.name;

  const stats = [
    { label: "Sessions", value: apiStats?.total_sessions ?? "..." },
    { label: "Chats", value: apiStats?.total_messages ?? "..." },
    { label: "Feedback", value: apiStats?.total_feedback ?? "..." },
    { label: "Tokens", value: tokenStats?.total_tokens ?? "..." },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar activeId={activeId} onSelect={handleSelectTab} onLogout={() => {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }} />

      <div className="flex flex-1 min-w-0 flex-col">
        <Topbar
          stats={stats}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
          adminName={adminName}
        />

        <main className="flex-1 min-h-0 overflow-auto bg-background">
          <div className="h-full p-6">
            {children}
          </div>
        </main>
      </div>

      {fullMessage && (
        <MessageModal
          message={fullMessage}
          onClose={() => setFullMessage(null)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
