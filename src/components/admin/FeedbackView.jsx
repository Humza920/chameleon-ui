import { useState } from "react";
import { Star } from "lucide-react";

const MOCK = [
  { id: 1, user: "Ali Raza", rating: 5, text: "Very helpful and quick responses!", time: "2h ago" },
  { id: 2, user: "Sara Ahmed", rating: 4, text: "Good overall, but could be faster.", time: "5h ago" },
  { id: 3, user: "Bilal Khan", rating: 3, text: "Average. Some answers were not relevant.", time: "1d ago" },
  { id: 4, user: "Hira Malik", rating: 5, text: "Excellent — solved my issue immediately.", time: "1d ago" },
  { id: 5, user: "Usman Tariq", rating: 2, text: "Got stuck in a loop on billing.", time: "2d ago" },
];

const Stars = ({ n }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i <= n ? "fill-warning text-warning" : "text-muted-foreground/30"}`} />
    ))}
  </div>
);

const FeedbackView = () => {
  const [filter, setFilter] = useState(null);
  const list = filter ? MOCK.filter((f) => f.rating === filter) : MOCK;
  const avg = (MOCK.reduce((s, f) => s + f.rating, 0) / MOCK.length).toFixed(1);

  return (
    <section className="surface-card">
      <div className="px-4 md:px-5 py-4 border-b border-border flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">User Feedback</h2>
          <p className="text-[11px] text-muted-foreground">Reviews and ratings from chatbot users</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase text-muted-foreground">Avg Rating</p>
            <p className="text-base font-semibold">{avg} ★</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase text-muted-foreground">Total</p>
            <p className="text-base font-semibold">{MOCK.length}</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-5 py-3 border-b border-border flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Filter by rating:</span>
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              filter === r
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:bg-muted"
            }`}
          >
            {r}★
          </button>
        ))}
        <button onClick={() => setFilter(null)} className="btn-ghost !px-2 !py-1 text-xs">
          Clear
        </button>
      </div>

      <ul className="divide-y divide-border">
        {list.length === 0 ? (
          <li className="p-10 text-center text-sm text-muted-foreground">No feedback yet</li>
        ) : (
          list.map((f) => (
            <li key={f.id} className="px-4 md:px-5 py-3.5 hover:bg-muted/40 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                    {f.user.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{f.user}</p>
                    <Stars n={f.rating} />
                    <p className="mt-1 text-sm text-foreground/80">{f.text}</p>
                  </div>
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">{f.time}</span>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="px-4 md:px-5 py-3 border-t border-border flex justify-center">
        <button className="btn-secondary !py-1.5 text-xs">Load More</button>
      </div>
    </section>
  );
};

export default FeedbackView;
