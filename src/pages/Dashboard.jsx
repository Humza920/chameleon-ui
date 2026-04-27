import { useEffect, useState } from "react";
import Login from "@/components/admin/Login";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import ConversationsView from "@/components/admin/ConversationsView";
import FeedbackView from "@/components/admin/FeedbackView";
import FBCommentsView from "@/components/admin/FBCommentsView";
import SettingsView from "@/components/admin/SettingsView";
import MessageModal from "@/components/admin/MessageModal";
import { MessageCircle, Star, Facebook, Settings as SettingsIcon } from "lucide-react";

const MOBILE_NAV = [
  { id: "conversations", label: "Chats", icon: MessageCircle },
  { id: "feedback", label: "Feedback", icon: Star },
  { id: "fbcomments", label: "FB", icon: Facebook },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const Dashboard = () => {
  const [authed, setAuthed] = useState(false);
  const [active, setActive] = useState("conversations");
  const [dark, setDark] = useState(false);
  const [fullMessage, setFullMessage] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const stats = [
    { label: "Sessions", value: "0" },
    { label: "Chats", value: "0" },
    { label: "Feedback", value: "0" },
    { label: "Tokens", value: "0" },
    { label: "Cost", value: "$0.00" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar activeId={active} onSelect={setActive} onLogout={() => setAuthed(false)} />

      <div className="flex flex-1 min-w-0 flex-col">
        <Topbar
          stats={stats}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
          adminName="Ayesha Khan"
        />

        {/* Mobile nav tabs */}
        <div className="md:hidden flex border-b border-border bg-card">
          {MOBILE_NAV.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                  isActive ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {n.label}
              </button>
            );
          })}
        </div>

        <main className="flex-1 overflow-y-auto scroll-thin px-4 md:px-6 py-5 animate-fade-in">
          {active === "conversations" && <ConversationsView onShowFull={setFullMessage} />}
          {active === "feedback" && <FeedbackView />}
          {active === "fbcomments" && <FBCommentsView />}
          {active === "settings" && <SettingsView />}
        </main>
      </div>

      <MessageModal message={fullMessage} onClose={() => setFullMessage(null)} />
    </div>
  );
};

export default Dashboard;
