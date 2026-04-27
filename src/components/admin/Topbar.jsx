import { Moon, Sun, Bot } from "lucide-react";

const Topbar = ({ stats, dark, onToggleDark, adminName = "Admin" }) => {
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

        <div className="flex items-center gap-2">
          <button onClick={onToggleDark} className="icon-btn" aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-xs font-semibold text-foreground">{adminName}</p>
              <p className="text-[10px] text-muted-foreground">Administrator</p>
            </div>
          </div>
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
