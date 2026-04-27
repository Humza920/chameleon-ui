import { useState } from "react";
import { Search, MessageCircle, User, Bot } from "lucide-react";

const MOCK = [
  { id: "c1", name: "Session #4821", preview: "How do I reset my password?", time: "2m", status: "active",
    tokens: 1284, cost: 0.018,
    messages: [
      { role: "user", text: "How do I reset my password?" },
      { role: "bot", text: "You can reset it from the Settings → Security page." },
      { role: "user", text: "Thanks, found it." },
    ] },
  { id: "c2", name: "Session #4820", preview: "Need help with billing", time: "14m", status: "offline", tokens: 642, cost: 0.009, messages: [] },
  { id: "c3", name: "Session #4819", preview: "Course enrollment question", time: "1h", status: "offline", tokens: 980, cost: 0.012, messages: [] },
];

const ConversationsView = ({ onShowFull }) => {
  const [selectedId, setSelectedId] = useState("c1");
  const [query, setQuery] = useState("");
  const list = MOCK.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  const selected = MOCK.find((c) => c.id === selectedId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 h-full">
      {/* Left: list */}
      <section className="surface-card flex flex-col min-h-[60vh]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold">Conversations</h2>
            <p className="text-[11px] text-muted-foreground">{list.length} sessions</p>
          </div>
          <span className="chip text-accent border-accent/30 bg-accent-soft">Active</span>
        </div>

        <div className="px-3 py-2.5 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conversations…"
              className="input-base !pl-8 !py-1.5 text-xs"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scroll-thin">
          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <MessageCircle className="h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">No conversations yet</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {list.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setSelectedId(c.id)}
                    className={`w-full text-left px-4 py-3 transition-colors hover:bg-muted/60 ${
                      selectedId === c.id ? "bg-primary-soft border-l-2 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                      <span className="text-[10px] text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">{c.preview}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Right: chat panel */}
      <section className="surface-card flex flex-col min-h-[60vh]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-foreground">
              {selected ? selected.name.slice(-2) : "—"}
            </div>
            <div>
              <p className="text-sm font-semibold">{selected ? selected.name : "Select a conversation"}</p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${selected?.status === "active" ? "bg-accent" : "bg-muted-foreground/40"}`} />
                {selected?.status || "offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>📊 Tokens: <span className="font-semibold text-foreground">{selected?.tokens ?? 0}</span></span>
            <span>💰 Cost: <span className="font-semibold text-foreground">${(selected?.cost ?? 0).toFixed(3)}</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scroll-thin px-4 py-5 space-y-3 bg-muted/30">
          {!selected || selected.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <MessageCircle className="h-10 w-10 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">Select a conversation to view messages</p>
            </div>
          ) : (
            selected.messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <button
                  onClick={() => onShowFull(m.text)}
                  className={`max-w-[70%] text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  {m.text}
                </button>
                {m.role === "user" && (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-3 border-t border-border flex items-center justify-between">
          <button className="btn-secondary !py-1.5 !px-3 text-xs">Load More Messages</button>
          <p className="text-[11px] text-muted-foreground">Read-only admin view • No message sending</p>
        </div>
      </section>
    </div>
  );
};

export default ConversationsView;
