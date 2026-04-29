import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FBBotSettings from "./FBBotSettings";
import WebBotSettings from "./WebBotSettings";
import { useGetBotSettingsQuery, useUpdateBotSettingsMutation } from "@/redux/servives/index";
import toast from "react-hot-toast";

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("fb");

  const { data, isLoading } = useGetBotSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateBotSettingsMutation();

  const [fb, setFb] = useState(true);
  const [web, setWeb] = useState(true);
  const [fallback, setFallback] = useState("");

  useEffect(() => {
    if (data) {
      setFb(data.fb_bot_enabled ?? true);
      setWeb(data.web_bot_enabled ?? true);
      setFallback(data.web_fallback_message ?? "");
    }
  }, [data]);

  const save = async () => {
    const tid = toast.loading("Saving settings...");
    try {
      await updateSettings({
        fb_bot_enabled: fb,
        web_bot_enabled: web,
        web_fallback_message: fallback
      }).unwrap();
      toast.success("Settings saved successfully", { id: tid });
    } catch (e) {
      toast.error("Failed to save settings", { id: tid });
      console.error("Failed to save settings:", e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage bot controls and configuration for different platforms.</p>
      </div>

      <div className="surface-card">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold">🤖 Bot Configuration</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            FB Bot: <span className={fb ? "text-accent" : "text-destructive"}>{fb ? "ON" : "OFF"}</span> ·
            {" "}Web Bot: <span className={web ? "text-accent" : "text-destructive"}>{web ? "ON" : "OFF"}</span>
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-5 pt-4">
            <TabsList>
              <TabsTrigger value="fb">📱 Facebook Bot</TabsTrigger>
              <TabsTrigger value="web">💬 Web Chatbot</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-5">
            <TabsContent value="fb">
              <FBBotSettings fb={fb} setFb={setFb} />
            </TabsContent>

            <TabsContent value="web">
              <WebBotSettings web={web} setWeb={setWeb} fallback={fallback} setFallback={setFallback} />
            </TabsContent>
          </div>
        </Tabs>

        <div className="px-5 py-3 border-t border-border flex justify-end gap-2">
          <button onClick={save} disabled={isUpdating || isLoading} className="btn-primary">
            {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
            {isUpdating ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
