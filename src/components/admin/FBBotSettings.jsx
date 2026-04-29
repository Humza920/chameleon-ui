import { Switch } from "@/components/ui/switch";

const FBBotSettings = ({ fb, setFb }) => {
  return (
    <div className="space-y-5">
      <div className="surface-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>📱</span>
            <p className="text-sm font-semibold">Facebook Bot</p>
          </div>
          <Switch checked={fb} onCheckedChange={setFb} />
        </div>
      </div>

      <div className="text-[11px] text-muted-foreground flex justify-between">
        <span>Last updated: Never</span>
        <span>Updated by: —</span>
      </div>
    </div>
  );
};

export default FBBotSettings;
