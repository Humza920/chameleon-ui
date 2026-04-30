import { MessagesSquare, Star, Send, Bot, Settings, LogOut, ChevronLeft } from "lucide-react";
import { useState } from "react";

const ITEMS = [
  { id: "conversations", label: "Conversations", icon: MessagesSquare },
  { id: "feedback", label: "Feedback", icon: Star },
  { id: "fbcomments", label: "FB Comments", icon: Send },
];

const Sidebar = ({ activeId, onSelect, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`relative hidden md:flex shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${isCollapsed ? "w-16" : "w-60"}`}
    >
      {/* --- Professional Modern Toggle Button --- */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-6 -right-3 z-50 flex h-6 w-6 items-center justify-center 
                   rounded-md border border-sidebar-border bg-white dark:bg-zinc-950 
                   shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.5)]
                   transition-all duration-200 hover:ring-2 hover:ring-primary/20 group"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <ChevronLeft
          className={`h-3.5 w-3.5 text-zinc-500 transition-all duration-300 group-hover:text-primary ${
            isCollapsed ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`flex items-center h-14 border-b border-sidebar-border ${isCollapsed ? "justify-center px-0" : "px-4"}`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary">
            <Bot className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="leading-tight whitespace-nowrap">
              <p className="text-sm font-semibold text-sidebar-foreground">SMIT Chatbot</p>
              <p className="text-[11px] text-sidebar-foreground/70">Admin Console</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 py-4 flex-1 overflow-y-auto overflow-x-hidden">
        {!isCollapsed ? (
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Workspace
          </p>
        ) : (
          <div className="h-4 mb-2"></div>
        )}
        <nav className={`flex flex-col gap-2 ${isCollapsed ? "items-center" : ""}`}>
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`nav-item text-black dark:text-white ${active
                  ? "nav-item-active bg-primary-soft border-l-2 border-primary"
                  : "hover:bg-primary-soft"
                  } ${isCollapsed ? "!px-0 justify-center w-10 h-10 !border-l-0" : ""}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-3 py-3 border-t border-sidebar-border">
        {!isCollapsed ? (
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Account
          </p>
        ) : (
          <div className="h-4 mb-2"></div>
        )}
        <nav className={`flex flex-col gap-0.5 ${isCollapsed ? "items-center" : ""}`}>
          <button
            key="settings"
            onClick={() => onSelect("settings")}
            title={isCollapsed ? "Settings" : undefined}
            className={`nav-item text-black dark:text-white ${activeId === "settings"
              ? "nav-item-active bg-primary-soft border-l-2 border-primary"
              : "hover:bg-primary-soft"
              } ${isCollapsed ? "!px-0 justify-center w-10 h-10 !border-l-0" : ""}`}
          >
            <Settings className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Settings</span>}
          </button>
          <button
            onClick={onLogout}
            title={isCollapsed ? "Logout" : undefined}
            className={`nav-item hover:!text-destructive ${isCollapsed ? "!px-0 justify-center w-10 h-10" : ""}`}
          >
            <LogOut className={`h-4 w-4 shrink-0`} />
            {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </nav>
        {!isCollapsed && <p className="mt-3 px-3 text-[11px] text-sidebar-foreground/50 whitespace-nowrap">v1.0.0 • Read-only</p>}
      </div>
    </aside>
  );
};

export default Sidebar;