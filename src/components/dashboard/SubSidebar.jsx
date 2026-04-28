import { Search, ChevronRight } from "lucide-react";

/**
 * Secondary panel that slides in next to the primary rail.
 * Visually feels like an extension of the sidebar (slightly lighter background).
 */
const SubSidebar = ({ item, onMouseEnter, onMouseLeave }) => {
  const isOpen = Boolean(item);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`hidden md:flex h-full flex-col overflow-hidden border-r border-subsidebar-border bg-subsidebar text-subsidebar-foreground
        transition-[width,opacity] duration-300 ease-smooth
        ${isOpen ? "w-72 opacity-100" : "w-0 opacity-0"}`}
    >
      {item && (
        <div key={item.id} className="flex h-full w-72 flex-col animate-slide-in-left">
          {/* Header */}
          <div className="px-5 pt-6 pb-4 border-b border-subsidebar-border">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subsidebar-muted">
              Module
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">{item.label}</h2>
            <p className="mt-1 text-xs leading-relaxed text-subsidebar-muted">
              {item.description}
            </p>
          </div>

          {/* Search */}
          <div className="px-4 pt-4">
            <div className="flex items-center gap-2 rounded-lg bg-sidebar/60 border border-subsidebar-border px-3 py-2 focus-within:border-primary/60 transition-colors">
              <Search className="h-3.5 w-3.5 text-subsidebar-muted" />
              <input
                placeholder={`Search in ${item.label.toLowerCase()}…`}
                className="w-full bg-transparent text-xs text-white placeholder:text-subsidebar-muted focus:outline-none"
              />
            </div>
          </div>

          {/* Sections */}
          <div className="flex-1 overflow-y-auto scroll-thin px-2 py-4 space-y-5">
            {item.sections.map(section) => (
              <div key={section.title}>
                <p className="px-3 mb-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-subsidebar-muted">
                  {section.title}
                </p>
                <ul className="space-y-0.5">
                  {section.items.map(sub) => (
                    <li key={sub.label}>
                      <button className="group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-subsidebar-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-white">
                        <span className="flex items-center gap-2 truncate">
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${
                              sub.accent ? "bg-accent" : "bg-subsidebar-muted/50 group-hover:bg-primary"
                            }`}
                          />
                          <span className="truncate">{sub.label}</span>
                        </span>
                        {sub.count !== undefined ? (
                          <span className="text-[11px] font-medium text-subsidebar-muted group-hover:text-white/80">
                            {sub.count}
                          </span>
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="border-t border-subsidebar-border px-5 py-3">
            <p className="text-[11px] text-subsidebar-muted">
              Tip: hover another item to switch panels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubSidebar;
