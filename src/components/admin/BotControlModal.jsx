import { useState } from "react";
import { X, Loader2 } from "lucide-react";

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-accent" : "bg-muted"}`}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft-sm transition-transform ${
        checked ? "translate-x-5" : "translate-x-0.5"
      }`}
    />
  </button>
);

const BotControlModal = ({ open, onClose }) => {
  const [fb, setFb] = useState(true);
  const [web, setWeb] = useState(true);
  const [fallback, setFallback] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const save = () => {
    setSaving(true);
    setTimeout() => {
      setSaving(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg surface-card animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold">🤖 Bot Control Settings</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              FB Bot: <span className={fb ? "text-accent" : "text-destructive"}>{fb ? "ON" : "OFF"}</span> ·
              {" "}Web Bot: <span className={web ? "text-accent" : "text-destructive"}>{web ? "ON" : "OFF"}</span>
            </p>
          </div>
          <button onClick={onClose} className="icon-btn"><X className="h-4 w-4" /></button>
        </div>

        <div className="p-5 space-y-5">
          <div className="surface-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>📱</span>
                <p className="text-sm font-semibold">Facebook Bot</p>
              </div>
              <Toggle checked={fb} onChange={setFb} />
            </div>
          </div>

          <div className="surface-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>💬</span>
                <p className="text-sm font-semibold">Web Chatbot</p>
              </div>
              <Toggle checked={web} onChange={setWeb} />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5">Fallback Message (when bot is OFF)</label>
              <textarea
                maxLength={500}
                value={fallback}
                onChange={(e) => setFallback(e.target.value)}
                rows={3}
                placeholder="We're temporarily unavailable. Please try again later."
                className="input-base resize-none"
              />
              <p className="mt-1 text-[10.5px] text-muted-foreground text-right">{fallback.length}/500</p>
            </div>
          </div>

          <div className="text-[11px] text-muted-foreground flex justify-between">
            <span>Last updated: Never</span>
            <span>Updated by: —</span>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-border flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={save} disabled={saving} className="btn-primary">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotControlModal;
