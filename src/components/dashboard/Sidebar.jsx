import { useState, useRef, useEffect } from "react";
import { NAV_ITEMS, FOOTER_ITEMS } from "./navConfig";
import SubSidebar from "./SubSidebar";
import { Sparkles } from "lucide-react";

/**
 * Sidebar with hover-triggered secondary panel (MongoDB-style).
 * - Primary rail stays compact and dark.
 * - Hovering an item opens a wider secondary panel that feels like an extension.
 * - A small grace timeout prevents flicker when moving cursor between rail and panel.
 */
const Sidebar = ({ activeId, onSelect, mobileOpen, onMobileClose }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const closeTimer = useRef(null);

  const openPanel = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredId(id);
  };

  const schedulePanelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHoveredId(null), 140);
  };

  useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), []);

  const hoveredItem = NAV_ITEMS.find((i) => i.id === hoveredId);

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm md:hidden animate-fade-in"
        />
      )}

      <aside
        onMouseLeave={schedulePanelClose}
        className={`fixed md:sticky top-0 left-0 z-40 flex h-screen shrink-0
          transition-transform duration-300 ease-smooth
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Primary rail */}
        <div className="flex h-full w-[78px] flex-col items-center justify-between bg-sidebar text-sidebar-foreground border-r border-sidebar-border py-5">
          {/* Logo */}
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex flex-1 flex-col items-center gap-1.5 pt-8">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              const isHover = hoveredId === item.id;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => openPanel(item.id)}
                  onFocus={() => openPanel(item.id)}
                  onClick={() => {
                    onSelect(item.id);
                    onMobileClose?.();
                  }}
                  className={`group relative flex h-12 w-12 items-center justify-center rounded-xl
                    transition-all duration-200 ease-smooth
                    ${isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                      : isHover
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
                  aria-label={item.label}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground ring-2 ring-sidebar">
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip when no panel for this item */}
                  <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-soft-md transition-opacity duration-150 group-hover:opacity-0">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer items */}
          <div className="flex flex-col items-center gap-1.5">
            {FOOTER_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onMouseEnter={schedulePanelClose}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  aria-label={item.label}
                >
                  <Icon className="h-4.5 w-4.5" />
                </button>
              );
            })}
            <div className="mt-2 h-9 w-9 rounded-full bg-gradient-accent ring-2 ring-sidebar-border" />
          </div>
        </div>

        {/* Secondary slide-out panel */}
        <SubSidebar
          item={hoveredItem}
          onMouseEnter={() => openPanel(hoveredItem?.id)}
          onMouseLeave={schedulePanelClose}
        />
      </aside>
    </>
  );
};

export default Sidebar;
