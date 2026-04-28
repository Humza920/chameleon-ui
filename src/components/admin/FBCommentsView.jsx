import { useState } from "react";
import { Search, ChevronDown, ChevronUp, Facebook } from "lucide-react";
import { getFBComments, getTotalFBCommentsCost, getUnreadFBCommentsCount, getLowConfidenceFBCommentsCount } from "@/helper";

const ConfBadge = ({ level }) => {
  const map = {
    low: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning-soft text-warning border-warning/30",
    high: "bg-accent-soft text-accent border-accent/30",
  };
  return <span className={`chip ${map[level]} capitalize`}>{level}</span>;
};

const FBCommentsView = () => {
  const MOCK = getFBComments();
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [conf, setConf] = useState(null);
  const [readFilter, setReadFilter] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const list = MOCK.filter((c) => {
    if (query && !c.text.toLowerCase().includes(query.toLowerCase())) return false;
    if (conf && c.confidence !== conf) return false;
    if (readFilter === "unread" && c.read) return false;
    if (readFilter === "read" && !c.read) return false;
    if (start && c.date < start) return false;
    if (end && c.date > end) return false;
    return true;
  });

  const totalCost = getTotalFBCommentsCost();
  const lowCount = getLowConfidenceFBCommentsCount();
  const unreadCount = getUnreadFBCommentsCount();

  return (
    <section className="surface-card">
      <div className="px-4 md:px-5 py-4 border-b border-border flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Facebook className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">Facebook Comments</h2>
        </div>
        <button onClick={() => setOpen(!open)} className="btn-ghost !text-xs">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          Filters & Statistics
        </button>
      </div>

      {open && (
        <div className="px-4 md:px-5 py-4 border-b border-border space-y-4 bg-muted/30">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search comments…"
              className="input-base !pl-8 !py-1.5 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase text-muted-foreground mb-1.5">Confidence</p>
              <div className="flex flex-wrap gap-1.5">
                {["low", "medium", "high"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setConf(c)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border capitalize transition-colors ${
                      conf === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
                <button onClick={() => setConf(null)} className="btn-ghost !px-2 !py-1 text-xs">Clear</button>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase text-muted-foreground mb-1.5">Read Status</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setReadFilter("unread")}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                    readFilter === "unread" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
                  }`}
                >
                  🔴 Unread
                </button>
                <button
                  onClick={() => setReadFilter("read")}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                    readFilter === "read" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
                  }`}
                >
                  ✅ Read
                </button>
                <button onClick={() => setReadFilter(null)} className="btn-ghost !px-2 !py-1 text-xs">Clear</button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase text-muted-foreground mb-1.5">Date Range</p>
            <div className="flex items-center gap-2 flex-wrap">
              <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="input-base !py-1.5 text-xs max-w-[170px]" />
              <span className="text-muted-foreground">—</span>
              <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="input-base !py-1.5 text-xs max-w-[170px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: "Total FB Comments", value: MOCK.length },
              { label: "Low Confidence", value: lowCount },
              { label: "Unread Comments", value: unreadCount },
              { label: "💰 Total Cost", value: `$${totalCost}` },
            ].map((s) => (
              <div key={s.label} className="surface-card p-3">
                <p className="text-[10px] uppercase text-muted-foreground">{s.label}</p>
                <p className="text-base font-semibold mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ul className="divide-y divide-border">
        {list.length === 0 ? (
          <li className="p-10 text-center text-sm text-muted-foreground">No Facebook comments yet</li>
        ) : (
          list.map((c) => (
            <li key={c.id} className="px-4 md:px-5 py-3.5 hover:bg-muted/40 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${c.read ? "bg-muted-foreground/30" : "bg-destructive"}`} />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium">{c.user}</p>
                      <ConfBadge level={c.confidence} />
                    </div>
                    <p className="mt-1 text-sm text-foreground/80">{c.text}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] text-muted-foreground">{c.date}</p>
                  <p className="text-[11px] text-muted-foreground">${c.cost.toFixed(3)}</p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="px-4 md:px-5 py-3 border-t border-border flex justify-between flex-wrap gap-2">
        <button className="btn-secondary !py-1.5 text-xs">✅ Mark All as Read</button>
        <button className="btn-secondary !py-1.5 text-xs">Load More</button>
      </div>
    </section>
  );
};

export default FBCommentsView;
