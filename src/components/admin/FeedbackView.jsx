import { useState, useEffect } from "react";
import { Star, Loader2 } from "lucide-react";
import { useGetFeedbackQuery } from "@/redux/servives/index";

const Stars = ({ n }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i <= n ? "fill-warning text-warning" : "text-muted-foreground/30"}`} />
    ))}
  </div>
);

const FeedbackView = () => {
  const [filter, setFilter] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
  }, [filter]);

  const { data, isLoading, isFetching } = useGetFeedbackQuery({ limit: 100, offset, ratings: filter ? filter.toString() : '' });

  const list = data?.feedback || [];
  const total = data?.total || 0;

  const avg = list.length > 0
    ? (list.reduce((sum, f) => sum + f.rating, 0) / list.length).toFixed(1)
    : "0.0";

  return (
    <section className="surface-card flex flex-col h-full">
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
            <p className="text-base font-semibold">{total}</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-5 py-3 border-b border-border flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Filter by rating:</span>
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${filter === r
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

      <div className="flex-1 min-h-0 overflow-y-auto custom-scroll pr-1">
        <ul className="divide-y divide-border">
          {(isFetching && offset === 0) ? (
            <li className="p-10 flex flex-col items-center justify-center text-center">
              <Loader2 className="h-6 w-6 text-muted-foreground/40 animate-spin mb-2" />
              <p className="text-sm text-muted-foreground">Loading feedback...</p>
            </li>
          ) : list.length === 0 ? (
            <li className="p-10 text-center text-sm text-muted-foreground">No feedback yet</li>
          ) : (
            list.map((f) => (
              <li key={f.id} className="px-4 md:px-5 py-3.5 hover:bg-muted/40 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                      {f.user_id ? f.user_id.slice(0, 2).toUpperCase() : "?"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{f.user_id || "Unknown User"}</p>
                      <Stars n={f.rating} />
                      <p className="mt-1 text-sm text-foreground/80">{f.feedback || f.text}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0">
                    {f.created_at ? new Date(f.created_at).toLocaleDateString() : f.time}
                  </span>
                </div>
              </li>
            ))
          )}
          {isFetching && offset > 0 && (
            <li className="p-6 flex justify-center w-full">
              <Loader2 className="h-6 w-6 text-muted-foreground/50 animate-spin" />
            </li>
          )}
        </ul>
      </div>

      <div className="px-4 md:px-5 py-3 border-t border-border flex justify-center">
        <button 
          onClick={() => setOffset(prev => prev + 100)}
          disabled={isFetching || !data?.hasMore}
          className="btn-secondary !py-1.5 text-xs disabled:opacity-50 flex items-center gap-2"
        >
          {isFetching && offset > 0 && <Loader2 className="h-3 w-3 animate-spin" />}
          {isFetching ? "Loading..." : data?.hasMore ? "Load More" : "No More Feedback"}
        </button>
      </div>
    </section>
  );
};

export default FeedbackView;
