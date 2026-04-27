import { useState } from "react";
import { Loader2 } from "lucide-react";

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-accent" : "bg-muted"}`}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-5" : "translate-x-0.5"
      }`}
    />
  </button>
);

const SettingsView = () => {
  const [fb, setFb] = useState(true);
  const [web, setWeb] = useState(true);
  const [fallback, setFallback] = useState("");
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 700);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage bot controls and fallback behavior.</p>
      </div>

      <div className="surface-card">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold">🤖 Bot Control Settings</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            FB Bot: <span className={fb ? "text-accent" : "text-destructive"}>{fb ? "ON" : "OFF"}</span> ·
            {" "}Web Bot: <span className={web ? "text-accent" : "text-destructive"}>{web ? "ON" : "OFF"}</span>
          </p>
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
          <button onClick={save} disabled={saving} className="btn-primary">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
