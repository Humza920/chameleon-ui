import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, delta, trend = "up", tint = "primary" }) => {
  const tintMap = {
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent",
    warning: "bg-warning-soft text-warning",
    muted: "bg-muted text-muted-foreground",
  };
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend === "up" ? "text-accent" : "text-destructive";

  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tintMap[tint]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {delta && (
          <span className={`inline-flex items-center gap-0.5 rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold ${trendColor}`}>
            <TrendIcon className="h-3 w-3" />
            {delta}
          </span>
        )}
      </div>
      <p className="mt-5 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
    </div>
  );
};

export default StatCard;
