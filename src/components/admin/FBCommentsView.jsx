import { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, Send, Loader2, Bot, Trash, Check, X, ExternalLink, MoreVertical } from "lucide-react";
import { useGetFBCommentsQuery, useMarkFBCommentAsReadMutation, useDeleteFBCommentMutation } from "@/redux/servives/index";
import toast from "react-hot-toast";

const ConfBadge = ({ level }) => {
  const map = {
    low: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning-soft text-warning border-warning/30",
    high: "bg-accent-soft text-accent border-accent/30",
  };
  return <span className={`chip ${map[level]} capitalize`}>{level}</span>;
};

const Checkbox = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`h-5 w-5 rounded border-2 transition-all flex items-center justify-center shrink-0 ${checked
      ? "bg-accent border-accent"
      : "border-muted-foreground hover:border-accent"
      }`}
  >
    {checked && <span className="text-xs font-bold text-accent-foreground">✓</span>}
  </button>
);

const FBCommentsView = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [conf, setConf] = useState(null);
  const [readFilter, setReadFilter] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const [offset, setOffset] = useState(0);

  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Reset offset when any filter changes
  useEffect(() => {
    setOffset(0);
  }, [debouncedQuery, conf, readFilter, start, end]);

  const { data, isLoading, isFetching } = useGetFBCommentsQuery({
    limit: 50,
    offset: offset,
    confidenceBucket: conf || '',
    readStatus: readFilter || '',
    searchQuery: debouncedQuery || '',
    startDate: start || '',
    endDate: end || ''
  });

  const [markAsReadMutation] = useMarkFBCommentAsReadMutation();
  const [deleteCommentMutation] = useDeleteFBCommentMutation();

  const list = data?.comments || [];

  const totalCost = list.reduce((sum, c) => sum + (c.cost || 0), 0).toFixed(3);
  const lowCount = list.filter((c) => (c.confidence_score || 0) < 0.4).length;
  const unreadCount = list.filter((c) => !c.is_read).length;

  const toggleSelect = (id) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelected(newSelected);
  };

  const selectAll = () => setSelected(new Set(list.map((c) => c.comment_id)));

  const deleteSelected = async () => {
    const toastId = toast.loading("Deleting comments...");
    try {
      for (const id of Array.from(selected)) {
        await deleteCommentMutation({ commentId: id, deleteType: "both" }).unwrap();
      }
      toast.success("Comments deleted successfully", { id: toastId });
      setSelected(new Set());
    } catch (error) {
      toast.error("Failed to delete comments", { id: toastId });
    }
  };

  const markAsReadSelected = async () => {
    const toastId = toast.loading("Marking as read...");
    try {
      const unreadIds = Array.from(selected).filter(id => {
        const item = list.find(c => c.comment_id === id || c.id === id);
        return item && !item.is_read;
      });

      for (const id of unreadIds) {
        await markAsReadMutation(id).unwrap();
      }
      toast.success("Comments marked as read", { id: toastId });
      setSelected(new Set());
    } catch (error) {
      toast.error("Failed to mark as read", { id: toastId });
    }
  };

  const getConfidenceLevel = (score) => {
    if (score >= 0.8) return "high";
    if (score >= 0.4) return "medium";
    return "low";
  };

  return (
    <section className="surface-card flex flex-col h-full">
      <div className="px-4 md:px-5 py-4 border-b border-border flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Send className="h-4 w-4 text-primary" />
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
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border capitalize transition-colors ${conf === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
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
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${readFilter === "unread" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
                    }`}
                >
                  🔴 Unread
                </button>
                <button
                  onClick={() => setReadFilter("read")}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${readFilter === "read" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
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
              { label: "Total FB Comments", value: data?.total ?? list.length },
              { label: "Low Confidence", value: lowCount },
              { label: "Unread Comments", value: unreadCount },
              { label: "Total Cost", value: `$${totalCost}` },
            ].map((s) => (
              <div key={s.label} className="surface-card p-3">
                <p className="text-[10px] uppercase text-muted-foreground">{s.label}</p>
                <p className="text-base font-semibold mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto custom-scroll pr-1">
        <ul className="divide-y divide-border">
          {(isFetching && offset === 0) ? (
            <li className="p-10 flex flex-col items-center justify-center text-center">
              <Loader2 className="h-6 w-6 text-muted-foreground/40 animate-spin mb-2" />
              <p className="text-sm text-muted-foreground">Loading comments...</p>
            </li>
          ) : list.length === 0 ? (
            <li className="p-10 text-center text-sm text-muted-foreground">No Send comments yet</li>
          ) : (
            list.map((c) => {
              const confLevel = getConfidenceLevel(c.confidence_score || 0);
              return (
                <li key={c.comment_id || c.id} className="px-4 md:px-5 py-3.5 hover:bg-muted/40 transition-colors">
                  <div className="flex items-start justify-between gap-3">

                    {selectMode && (
                      <Checkbox checked={selected.has(c.comment_id)} onChange={() => toggleSelect(c.comment_id)} />
                    )}

                    {/* LEFT SIDE */}
                    <div className="flex items-start gap-3 flex-1">
                      <div className="relative mt-1.5 flex h-2 w-2 shrink-0">
                        {!c.is_read && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2 ${
                            c.is_read ? "bg-muted-foreground/30" : "bg-primary"
                          }`}
                        />
                      </div>

                      <div className="flex-1">

                        {/* USER INFO */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium">{c.commenter_name || "FB User"}</p>
                          <ConfBadge level={confLevel} />
                        </div>

                        {/* USER COMMENT */}
                        <p className="mt-1 text-sm text-foreground/80">{c.user_comment}</p>

                        {/* BOT REPLY (BELOW COMMENT) */}
                        {c.bot_reply && (
                          <div className="mt-3 ml-6 border-l-2 border-primary pl-3">
                            <p className="text-[11px] text-primary font-medium">🤖 Bot Reply</p>
                            <p className="text-sm text-foreground">{c.bot_reply}</p>
                          </div>
                        )}

                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col items-end justify-between shrink-0 min-h-[85px]">

                      {/* TOP RIGHT */}
                      <div className="text-right flex flex-col items-end gap-1">

                        <p className="text-xs font-medium text-muted-foreground">
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : ""}
                        </p>
                        {c.cost !== undefined && (
                          <p className="text-xs font-medium text-muted-foreground">
                            ${c.cost.toFixed(3)}
                          </p>
                        )}

                        <span className="text-[11px] px-2 py-0.5 rounded bg-muted border border-border capitalize">
                          Confidence {c.confidence_score}%
                        </span>

                        {/* ✅ GREEN READ TAG (if already read) */}
                        {c.is_read && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-600 border border-green-500/30">
                            Read
                          </span>
                        )}

                      </div>

                      {/* BOTTOM RIGHT BUTTONS (DROPDOWN) */}
                      <div className="mt-auto pt-2 relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === c.comment_id ? null : c.comment_id);
                          }}
                          className="btn-ghost !p-1 border border-border rounded"
                        >
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </button>

                        {openDropdownId === c.comment_id && (
                          <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border rounded-md shadow-lg z-50 py-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* View on FB */}
                            <a
                              href={`https://facebook.com/${c.comment_id.includes('_') ? c.comment_id : c.post_id ? c.post_id + '_' + c.comment_id : c.comment_id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors w-full text-left"
                            >
                              <ExternalLink className="h-3 w-3" /> View on FB
                            </a>

                            {/* Mark as Read */}
                            {!c.is_read && (
                              <button
                                onClick={async () => {
                                  setOpenDropdownId(null);
                                  const tid = toast.loading("Marking as read...");
                                  try {
                                    await markAsReadMutation(c.comment_id).unwrap();
                                    toast.success("Marked as read", { id: tid });
                                  } catch (e) {
                                    toast.error("Failed to mark as read", { id: tid });
                                  }
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs text-primary hover:bg-muted transition-colors w-full text-left"
                              >
                                <Check className="h-3 w-3" /> Mark as Read
                              </button>
                            )}

                            {/* Delete Reply */}
                            {c.bot_reply && (
                              <button
                                onClick={async () => {
                                  setOpenDropdownId(null);
                                  const tid = toast.loading("Deleting reply...");
                                  try {
                                    await deleteCommentMutation({ commentId: c.comment_id, deleteType: "reply_only" }).unwrap();
                                    toast.success("Reply deleted", { id: tid });
                                  } catch (e) {
                                    toast.error("Failed to delete reply", { id: tid });
                                  }
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs text-warning hover:bg-muted transition-colors w-full text-left"
                              >
                                <X className="h-3 w-3" /> Delete Reply
                              </button>
                            )}

                            {/* Delete Comment */}
                            <button
                              onClick={async () => {
                                setOpenDropdownId(null);
                                const tid = toast.loading("Deleting comment...");
                                try {
                                  await deleteCommentMutation({ commentId: c.comment_id, deleteType: "both" }).unwrap();
                                  toast.success("Comment deleted", { id: tid });
                                } catch (e) {
                                  toast.error("Failed to delete comment", { id: tid });
                                }
                              }}
                              className="flex items-center gap-2 px-3 py-1.5 text-xs text-destructive hover:bg-muted transition-colors w-full text-left"
                            >
                              <Trash className="h-3 w-3" /> Delete Comment
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </li>
              );
            })
          )}
          {isFetching && offset > 0 && (
            <li className="p-6 flex justify-center w-full">
              <Loader2 className="h-6 w-6 text-muted-foreground/50 animate-spin" />
            </li>
          )}
        </ul>
      </div>

      <div className="px-4 md:px-5 py-3 border-t border-border flex justify-between flex-wrap gap-2">
        {!selectMode ? (
          <button
            onClick={() => setSelectMode(true)}
            className="btn-secondary !py-1.5 text-xs"
          >
            Select
          </button>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={selectAll}
              className="btn-secondary !py-1.5 text-xs"
            >
              ✓ Select All
            </button>
            <button
              onClick={markAsReadSelected}
              disabled={selected.size === 0}
              className="btn-secondary !py-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✅ Mark as Read
            </button>
            <button
              onClick={deleteSelected}
              disabled={selected.size === 0}
              className="btn-secondary !py-1.5 text-xs text-destructive disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🗑️ Delete
            </button>
            <button
              onClick={() => {
                setSelectMode(false);
                setSelected(new Set());
              }}
              className="btn-ghost !py-1.5 text-xs"
            >
              Cancel
            </button>
          </div>
        )}

        <button
          onClick={() => setOffset(prev => prev + 50)}
          disabled={isFetching || !data?.hasMore}
          className="btn-secondary !py-1.5 text-xs disabled:opacity-50 flex items-center gap-2"
        >
          {isFetching && offset > 0 && <Loader2 className="h-3 w-3 animate-spin" />}
          {isFetching ? "Loading..." : data?.hasMore ? "Load More" : "No More Items"}
        </button>
      </div>
    </section>
  );
};

export default FBCommentsView;
