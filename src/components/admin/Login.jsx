import { useState } from "react";
import { Bot, Loader2 } from "lucide-react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-surface px-4">
      <div className="w-full max-w-md surface-card p-8 animate-fade-in">
        <div className="flex flex-col items-center text-center mb-7">
          <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-3">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">SMIT RAG Chatbot Management System</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="input-base"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-base"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full !py-2.5">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground mt-7">
          Protected admin area • SMIT Chatbot System
        </p>
      </div>

      <p className="absolute bottom-5 left-0 right-0 text-center text-[11px] text-muted-foreground">
        Created by <span className="font-semibold text-foreground">Zuhair Khan</span>
      </p>
    </div>
  );
};

export default Login;
      </div>
    </div>
  );
};

export default Login;
