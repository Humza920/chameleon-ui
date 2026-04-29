import { useState } from "react";
import { Search, MessageCircle, User, Bot, Loader2 } from "lucide-react";
import { useGetUsersQuery, useGetChatMessagesQuery } from "@/redux/servives/index";

const ConversationsView = ({ onShowFull }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");

  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();
  const list = usersData || [];
  const filteredList = list.filter((c) => c.user_id?.toLowerCase().includes(query.toLowerCase()));

  const { data: chatData, isLoading: chatLoading } = useGetChatMessagesQuery(
    { userId: selectedId, limit: 100, offset: 0 },
    { skip: !selectedId }
  );

  const selectedMessages = chatData?.messages ? [...chatData.messages].reverse() : [];
  const selectedUser = list.find((c) => c.user_id === selectedId);

  const totalTokens = chatData?.messages?.reduce((sum, m) => sum + (m.total_tokens || 0), 0) || 0;
  const totalCost = chatData?.messages?.reduce((sum, m) => sum + (m.cost || 0), 0) || 0;

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
          {usersLoading ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Loader2 className="h-8 w-8 text-muted-foreground/40 mb-2 animate-spin" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <MessageCircle className="h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">No conversations found</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filteredList.map((c) => (
                <li key={c.user_id}>
                  <button
                    onClick={() => setSelectedId(c.user_id)}
                    className={`w-full text-left px-4 py-3 transition-colors hover:bg-muted/60 ${
                      selectedId === c.user_id ? "bg-primary-soft border-l-2 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">{c.user_id}</p>
                      <span className="text-[10px] text-muted-foreground">
                        {c.last_message_time ? new Date(c.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">{c.last_message}</p>
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
              {selectedUser ? selectedUser.user_id.slice(0, 2).toUpperCase() : "—"}
            </div>
            <div>
              <p className="text-sm font-semibold">{selectedUser ? selectedUser.user_id : "Select a conversation"}</p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full bg-accent`} />
                active
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>📊 Tokens: <span className="font-semibold text-foreground">{totalTokens}</span></span>
            <span>💰 Cost: <span className="font-semibold text-foreground">${totalCost.toFixed(4)}</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scroll-thin px-4 py-5 space-y-3 bg-muted/30">
          {chatLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Loader2 className="h-10 w-10 text-muted-foreground/40 mb-2 animate-spin" />
              <p className="text-sm text-muted-foreground">Loading messages...</p>
            </div>
          ) : !selectedId ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <MessageCircle className="h-10 w-10 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">Select a conversation to view messages</p>
            </div>
          ) : selectedMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <MessageCircle className="h-10 w-10 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">No messages in this conversation</p>
            </div>
          ) : (
            selectedMessages.map((m, i) => (
              <div key={m.id || i} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {(m.role === "bot" || m.role === "assistant") && (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <button
                  onClick={() => onShowFull(m.message || m.text)}
                  className={`max-w-[70%] text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  {m.message || m.text}
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
