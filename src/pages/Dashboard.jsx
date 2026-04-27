import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import ConversationsTable from "@/components/dashboard/ConversationsTable";
import FeedbackList, { EmptyState } from "@/components/dashboard/FeedbackList";
import { MessageSquare, MessagesSquare, Star, DollarSign, Activity } from "lucide-react";

const SECTION_META = {
  fb: { title: "FB Comments", subtitle: "Monitor and respond to Facebook page activity" },
  conversations: { title: "Conversations", subtitle: "Live chats and assistant transcripts" },
  feedback: { title: "Feedback", subtitle: "User ratings and reviews across channels" },
};

const Dashboard = () => {
  const [activeId, setActiveId] = useState("conversations");
  const [mobileOpen, setMobileOpen] = useState(false);
  const meta = SECTION_META[activeId];

  return (
    <div className="flex min-h-screen w-full bg-gradient-surface">
      <Sidebar
        activeId={activeId}
        onSelect={setActiveId}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onMenuClick={() => setMobileOpen(true)}
          title={meta.title}
          subtitle={meta.subtitle}
        />

        <main key={activeId} className="flex-1 px-4 md:px-8 py-6 md:py-8 animate-fade-in">
          {/* Greeting */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-primary">Welcome back, Ayesha 👋</p>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                {meta.title} Overview
              </h2>
              <p className="text-sm text-muted-foreground">
                Here's what's happening across your workspace today.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-soft-sm">
                Last 7 days
              </button>
              <button className="rounded-xl bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition-opacity">
                + New Report
              </button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={MessageSquare} label="FB Comments" value="1,284" delta="+12.4%" tint="primary" />
            <StatCard icon={MessagesSquare} label="Conversations" value="3,412" delta="+8.1%" tint="accent" />
            <StatCard icon={Star} label="Avg. Feedback" value="4.6 / 5" delta="+0.3" tint="warning" />
            <StatCard icon={DollarSign} label="Token Cost" value="$214.80" delta="-3.2%" trend="down" tint="muted" />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <ConversationsTable />

              {/* Activity placeholder */}
              <section className="surface-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">Engagement Activity</h3>
                    <p className="text-xs text-muted-foreground">Messages handled per hour</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                    <Activity className="h-3 w-3" /> Live
                  </div>
                </div>

                {/* Faux chart */}
                <div className="mt-5 flex h-40 items-end gap-1.5">
                  {[35, 52, 41, 68, 49, 73, 60, 84, 72, 90, 78, 95, 70, 88, 64, 80, 55, 92, 76, 100, 82, 70, 60, 75].map((h, i) => (
                    <div key={i} className="flex-1 group relative">
                      <div
                        className="w-full rounded-t-md bg-gradient-primary opacity-80 transition-all duration-300 group-hover:opacity-100"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-[10.5px] text-muted-foreground">
                  <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <FeedbackList />
              <EmptyState
                title="No flagged comments"
                subtitle="You're all caught up. New low-confidence FB comments will show here for review."
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
