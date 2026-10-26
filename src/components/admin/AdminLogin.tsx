import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, KeyRound, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const { login } = useAuth();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin12345');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin12345');
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await login(username, password);
      if (res.success) {
        onSuccess();
      } else {
        setErrorMessage(res.error || 'Invalid credentials.');
      }
    } catch {
      setErrorMessage('An unexpected authentication error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl" onClick={onCancel} />

      <div className="relative bg-white dark:bg-[#0D0D11] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl w-full max-w-sm p-6 sm:p-8 shadow-2xl z-10 transition-colors">
        
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white text-white dark:text-black mx-auto flex items-center justify-center mb-3">
            <Shield className="w-5 h-5" />
          </div>

          <h2 className="text-xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">
            Admin Sign In
          </h2>

          <p className="text-xs text-[#86868B] mt-1">
            Access store management, orders and analytics.
          </p>
        </div>

        {/* Demo credentials hint pill with 1-click fill */}
        <div className="mb-4 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono text-[#86868B]">Default Credentials</div>
            <div className="font-mono text-[11px] text-[#1D1D1F] dark:text-white font-semibold">
              admin / admin12345
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-sans font-medium flex items-center gap-1 hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-3 h-3" />
            <span>Auto Fill</span>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <div className="relative">
              <User className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white text-xs font-sans"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
