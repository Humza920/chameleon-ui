import { X } from "lucide-react";

const MessageModal = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg surface-card animate-scale-in">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <h3 className="text-sm font-semibold">Full Message</h3>
          <button onClick={onClose} className="icon-btn"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5">
          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{message}</p>
        </div>
        <div className="px-5 py-3 border-t border-border flex justify-end">
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
