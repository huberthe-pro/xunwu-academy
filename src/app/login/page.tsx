"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import { addLog } from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    
    const { data: validAdmins, error: dbError } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .limit(1);

    const validAdmin = validAdmins && validAdmins.length > 0 ? validAdmins[0] : null;
    
    if (validAdmin) {
      document.cookie = "admin_token=true; path=/";
      document.cookie = `admin_role=${encodeURIComponent(validAdmin.role)}; path=/`;
      // We pass the username temporarily to the logger by storing it
      localStorage.setItem("xunwu_current_user", validAdmin.username);
      await addLog("登堂入室 (登录系统)", "成功");
      window.location.href = "/admin";
    } else {
      await addLog(`尝试登堂 (${username})`, "失败");
      setError("名讳或印信秘钥有误，请重新研墨");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-zh-bg)] relative overflow-hidden font-sans">
      {/* Decorative background elements matching the ink wash theme */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-ink-100)] rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--color-ink-100)] rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-md px-6 md:px-0 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-[var(--color-ink-900)] text-[var(--color-zh-bg)] font-serif text-2xl flex items-center justify-center relative">
              寻
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[var(--color-ink-seal)] z-10 border-2 border-[var(--color-zh-bg)]"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-[0.3em] text-[var(--color-ink-900)] mb-3">寻吾书院后台</h1>
          <p className="text-[var(--color-ink-400)] tracking-widest text-sm">修撰典籍，明理悟道</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-[var(--color-ink-200)] p-8 relative">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-ink-400)]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-ink-400)]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-ink-400)]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-ink-400)]"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-[var(--color-ink-seal)]/10 border border-[var(--color-ink-seal)]/30 text-[var(--color-ink-seal)] text-sm tracking-widest text-center animate-in fade-in duration-300">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs text-[var(--color-ink-500)] tracking-widest">执笔者</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-400)]" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--color-ink-50)]/30 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-900)] outline-none text-[var(--color-ink-900)] transition-colors tracking-widest text-sm"
                  placeholder="请输入您的名讳"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-[var(--color-ink-500)] tracking-widest">印信秘钥</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-400)]" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--color-ink-50)]/30 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-900)] outline-none text-[var(--color-ink-900)] transition-colors tracking-widest text-sm"
                  placeholder="请输入印信密码 (admin)"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 bg-[var(--color-ink-900)] text-[var(--color-zh-bg)] hover:bg-[var(--color-ink-seal)] transition-colors tracking-[0.3em] text-sm mt-8 border border-transparent">
              研墨登堂
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
