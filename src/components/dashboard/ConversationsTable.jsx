import { MoreHorizontal, ChevronDown } from "lucide-react";

const STATUS = {
  Resolved: "bg-accent-soft text-accent",
  Pending: "bg-warning-soft text-warning",
  Active: "bg-primary-soft text-primary",
  Hidden: "bg-muted text-muted-foreground",
};

const ROWS = [
  { user: "Hira Malik", channel: "Messenger", message: "Can you ship to Karachi by Friday?", status: "Active", time: "2m ago" },
  { user: "Daniyal R.", channel: "FB Comment", message: "Loved the new update — works perfectly.", status: "Resolved", time: "12m ago" },
  { user: "Sana A.", channel: "Web Chat", message: "Bot didn't understand my refund query.", status: "Pending", time: "27m ago" },
  { user: "Omar K.", channel: "Messenger", message: "Where do I find my invoice?", status: "Active", time: "1h ago" },
  { user: "Zara H.", channel: "FB Comment", message: "Spam — should be hidden.", status: "Hidden", time: "3h ago" },
  { user: "Bilal S.", channel: "Web Chat", message: "Pricing question for the team plan.", status: "Resolved", time: "5h ago" },
];

const initials = (name) => name.split(" ").map(n) => n[0]).join("").slice(0, 2).toUpperCase();

const ConversationsTable = () => {
  return (
    <section className="surface-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Recent Conversations</h3>
          <p className="text-xs text-muted-foreground">Latest interactions across all channels</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            All channels <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 transition-opacity">
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scroll-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Channel</th>
              <th className="px-5 py-3">Message</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Time</th>
              <th className="px-5 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ROWS.map(r, i) => (
              <tr key={i} className="group transition-colors hover:bg-muted/50">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
                      {initials(r.user)}
                    </div>
                    <span className="font-medium text-foreground">{r.user}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{r.channel}</td>
                <td className="px-5 py-3.5 max-w-md truncate text-foreground/90">{r.message}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right text-xs text-muted-foreground">{r.time}</td>
                <td className="px-5 py-3.5">
                  <button className="icon-btn opacity-0 transition-opacity group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ConversationsTable;
