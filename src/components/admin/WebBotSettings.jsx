import { Switch } from "@/components/ui/switch";

const WebBotSettings = ({ web, setWeb, fallback, setFallback }) => {
  return (
    <div className="space-y-5">
      <div className="surface-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>💬</span>
            <p className="text-sm font-semibold">Web Chatbot</p>
          </div>
          <Switch checked={web} onCheckedChange={setWeb} />
        </div>
      </div>

      <div className="surface-card p-4 space-y-3">
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
  );
};

export default WebBotSettings;
