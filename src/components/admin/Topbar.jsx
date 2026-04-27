import { Moon, Sun, Settings, LogOut, Bot } from "lucide-react";

const Topbar = ({ stats, dark, onToggleDark, onOpenBotControl, onLogout }) => {
  return (
    <header className="sticky top-0 z-20 bg-card border-b border-border">
      <div className="flex items-center justify-between gap-4 px-4 md:px-6 h-14">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold tracking-tight">SMIT Chatbot</span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5 px-3 py-1 rounded-md bg-muted/60">
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</span>
              <span className="text-sm font-semibold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={onToggleDark} className="icon-btn" aria-label="Toggle theme">
            {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <button onClick={onOpenBotControl} className="btn-secondary !py-1.5 !px-3">
            <Settings className="h-4 w-4" /> Bot Control
          </button>
          <button onClick={onLogout} className="btn-ghost text-destructive hover:text-destructive">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      {/* Mobile stats strip */}
      <div className="lg:hidden flex gap-2 overflow-x-auto px-4 pb-3 scroll-thin">
        {stats.map((s) => (
          <div key={s.label} className="shrink-0 flex items-baseline gap-1.5 px-3 py-1 rounded-md bg-muted/60">
            <span className="text-[10px] uppercase text-muted-foreground">{s.label}</span>
            <span className="text-xs font-semibold">{s.value}</span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Topbar;
