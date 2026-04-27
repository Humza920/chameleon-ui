import { Search, Bell, HelpCircle, Menu } from "lucide-react";

const Topbar = ({ onMenuClick, title, subtitle }) => {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 backdrop-blur-md px-4 md:px-8 py-3.5">
      <button
        onClick={onMenuClick}
        className="icon-btn md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden md:block">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <div className="hidden md:flex items-center gap-2 w-72 rounded-xl border border-border bg-card px-3 py-2 shadow-soft-sm focus-within:ring-2 focus-within:ring-primary/30 transition">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search comments, conversations…"
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        <button className="icon-btn" aria-label="Help">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button className="icon-btn relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
        </button>
        <div className="ml-1 flex items-center gap-2.5 rounded-xl border border-border bg-card px-2 py-1 shadow-soft-sm">
          <div className="h-7 w-7 rounded-lg bg-gradient-primary" />
          <div className="hidden sm:block pr-2">
            <p className="text-xs font-semibold leading-tight">Ayesha Khan</p>
            <p className="text-[10.5px] text-muted-foreground leading-tight">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
