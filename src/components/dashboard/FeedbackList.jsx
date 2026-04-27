import { Inbox } from "lucide-react";

const FEEDBACK = [
  { name: "Maria L.", rating: 5, note: "The bot answered instantly and was super helpful.", time: "Today" },
  { name: "Junaid F.", rating: 4, note: "Great experience overall, minor wording issues.", time: "Today" },
  { name: "Ahmed N.", rating: 3, note: "Good but had to repeat my question twice.", time: "Yesterday" },
];

const Star = ({ filled }) => (
  <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${filled ? "fill-warning" : "fill-muted"}`}>
    <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L10 14.9 4.7 17.7l1.1-5.9L1.5 7.7l5.9-.8L10 1.5z" />
  </svg>
);

const FeedbackList = () => (
  <section className="surface-card flex h-full flex-col">
    <div className="flex items-center justify-between border-b border-border px-5 py-4">
      <div>
        <h3 className="text-base font-semibold tracking-tight">Recent Feedback</h3>
        <p className="text-xs text-muted-foreground">Latest user ratings</p>
      </div>
      <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary">
        4.6 avg
      </span>
    </div>
    <ul className="divide-y divide-border">
      {FEEDBACK.map((f, i) => (
        <li
          key={i}
          className="px-5 py-4 transition-colors hover:bg-muted/40 animate-fade-in"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">{f.name}</p>
            <span className="text-[11px] text-muted-foreground">{f.time}</span>
          </div>
          <div className="mt-1 flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} filled={s <= f.rating} />
            ))}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.note}</p>
        </li>
      ))}
    </ul>

    <div className="mt-auto border-t border-border px-5 py-4">
      <button className="w-full rounded-lg border border-border bg-card py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors">
        View all feedback
      </button>
    </div>
  </section>
);

export const EmptyState = ({ title = "Nothing here yet", subtitle = "When data arrives, it will appear here." }) => (
  <div className="surface-card flex flex-col items-center justify-center px-6 py-12 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
      <Inbox className="h-6 w-6" />
    </div>
    <p className="mt-3 text-sm font-semibold text-foreground">{title}</p>
    <p className="mt-1 text-xs text-muted-foreground max-w-xs">{subtitle}</p>
  </div>
);

export default FeedbackList;
