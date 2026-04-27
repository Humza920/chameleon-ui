import { MessageCircle, Star, Facebook, Database } from "lucide-react";

const ITEMS = [
  { id: "conversations", label: "Conversations", icon: MessageCircle },
  { id: "feedback", label: "Feedback", icon: Star },
  { id: "fbcomments", label: "FB Comments", icon: Facebook },
];

const Sidebar = ({ activeId, onSelect }) => {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary">
          <Database className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">SMIT Chatbot</p>
          <p className="text-[11px] text-sidebar-foreground/70">Admin Console</p>
        </div>
      </div>

      <div className="px-3 py-4">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
          Workspace
        </p>
        <nav className="flex flex-col gap-0.5">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`nav-item ${active ? "nav-item-active" : ""}`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-4 py-3 border-t border-sidebar-border">
        <p className="text-[11px] text-sidebar-foreground/60">v1.0.0 • Read-only</p>
      </div>
    </aside>
  );
};

export default Sidebar;
