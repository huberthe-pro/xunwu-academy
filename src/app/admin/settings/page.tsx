"use client";

import { useState, useEffect } from "react";
import { mockAdminSettings, AdminSettings, SystemLog } from "@/data/mock";
import { Settings, Save, LogOut, Clock, ShieldCheck, AlertCircle, Users, Plus, Trash2, X } from "lucide-react";
import { addLog } from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>(mockAdminSettings);
  const [admins, setAdmins] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"settings" | "admins" | "logs">("settings");
  
  // For adding new admin
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "", role: "执笔者" as any });

  useEffect(() => {
    // Initial fetch for logs
    const fetchLogs = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('system_logs').select('*').order('timestamp', { ascending: false }).limit(50);
      if (data) setLogs(data);
    };
    fetchLogs();

    // Listen to changes
    const logListener = () => fetchLogs();
    window.addEventListener("xunwuLogsUpdated", logListener);
    
    return () => window.removeEventListener("xunwuLogsUpdated", logListener);
  }, []);

  useEffect(() => {
    const fetchAdmins = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('admins').select('*').order('created_at', { ascending: true });
      if (data) setAdmins(data);
    };
    fetchAdmins();
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    addLog(`修改铭牌设定`, "成功");
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.password) return;
    
    const supabase = createClient();
    const { data, error } = await supabase.from('admins').insert({
      username: newAdmin.username,
      password: newAdmin.password,
      role: newAdmin.role
    }).select();
    
    if (error) {
      alert("添加失败: " + error.message);
      return;
    }
    
    if (data) setAdmins([...admins, data[0]]);
    await addLog(`新授印信：${newAdmin.username} (${newAdmin.role})`, "成功");
    setIsAddingAdmin(false);
    setNewAdmin({ username: "", password: "", role: "执笔者" });
  };

  const handleDeleteAdmin = async (id: string) => {
    if (admins.length <= 1) {
      alert("至少需要保留一位超级执笔者。");
      return;
    }
    const adminToDelete = admins.find(a => a.id === id);
    if (confirm("确定要褫夺此执笔者的权限吗？")) {
      const supabase = createClient();
      await supabase.from('admins').delete().eq('id', id);
      setAdmins(admins.filter(a => a.id !== id));
      if (adminToDelete) {
        await addLog(`褫夺印信：${adminToDelete.username}`, "成功");
      }
    }
  };

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  return (
    <div className="p-4 md:p-8 font-sans pb-32">
      <header className="mb-6 md:mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-ink-900)] tracking-[0.1em]">系统设置</h1>
          <p className="text-[var(--color-ink-600)] mt-2 font-light tracking-widest text-sm">执掌书院枢纽，审视过往行迹。</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-[var(--color-ink-600)] hover:text-[var(--color-ink-seal)] bg-white/60 border border-[var(--color-ink-200)] hover:border-[var(--color-ink-seal)] transition-colors text-sm tracking-widest">
          <LogOut className="w-4 h-4" />
          <span>隐退 (登出)</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-ink-200)]/60 mb-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab("settings")}
          className={`px-8 py-3 text-sm tracking-[0.2em] font-medium transition-colors relative whitespace-nowrap ${activeTab === 'settings' ? 'text-[var(--color-ink-900)]' : 'text-[var(--color-ink-400)] hover:text-[var(--color-ink-600)]'}`}
        >
          铭牌设定
          {activeTab === 'settings' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-ink-900)]"></span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab("admins")}
          className={`px-8 py-3 text-sm tracking-[0.2em] font-medium transition-colors relative whitespace-nowrap ${activeTab === 'admins' ? 'text-[var(--color-ink-900)]' : 'text-[var(--color-ink-400)] hover:text-[var(--color-ink-600)]'}`}
        >
          执笔者管理
          {activeTab === 'admins' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-ink-900)]"></span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab("logs")}
          className={`px-8 py-3 text-sm tracking-[0.2em] font-medium transition-colors relative whitespace-nowrap ${activeTab === 'logs' ? 'text-[var(--color-ink-900)]' : 'text-[var(--color-ink-400)] hover:text-[var(--color-ink-600)]'}`}
        >
          行迹微录
          {activeTab === 'logs' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-ink-900)]"></span>
          )}
        </button>
      </div>

      {activeTab === "settings" && (
        <div className="max-w-2xl bg-white/60 border border-[var(--color-ink-200)] p-8 relative animate-in fade-in duration-500">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-ink-50)]/50 rounded-bl-full -z-10"></div>
          <div className="flex items-center gap-3 mb-8 border-b border-[var(--color-ink-200)]/60 pb-4">
            <Settings className="w-5 h-5 text-[var(--color-ink-600)]" />
            <h2 className="text-lg font-medium text-[var(--color-ink-900)] tracking-widest">基础设定</h2>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">书院题额 (站点名称)</label>
              <input 
                type="text" 
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                required
                className="w-full px-4 py-3 bg-[var(--color-ink-50)]/30 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] tracking-widest text-sm"
              />
            </div>

            <div className="pt-6 border-t border-[var(--color-ink-200)]/60 flex items-center justify-between">
              <div>
                {isSaved && (
                  <span className="text-[var(--color-ink-seal)] text-sm tracking-widest animate-in fade-in flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    修笔已落定，铭牌已更新。
                  </span>
                )}
              </div>
              <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-[var(--color-ink-900)] hover:bg-[var(--color-ink-seal)] text-[var(--color-zh-bg)] text-sm tracking-[0.2em] transition-colors">
                <Save className="w-4 h-4" />
                <span>保存宗卷</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "admins" && (
        <div className="bg-white/60 border border-[var(--color-ink-200)] relative animate-in fade-in duration-500">
          <div className="p-6 border-b border-[var(--color-ink-200)]/60 flex items-center justify-between bg-[var(--color-ink-50)]/30">
            <h2 className="text-lg font-medium text-[var(--color-ink-900)] tracking-[0.1em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--color-ink-seal)]"></span>
              所有执笔者
            </h2>
            <button onClick={() => setIsAddingAdmin(true)} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-ink-seal)] text-white hover:bg-[var(--color-ink-900)] transition-colors text-sm tracking-widest">
              <Plus className="w-4 h-4" />
              <span>新授印信</span>
            </button>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-ink-200)] bg-[var(--color-ink-50)]/50 text-[var(--color-ink-600)] text-sm tracking-widest font-normal">
                <th className="p-5 font-medium">执笔者 (名讳)</th>
                <th className="p-5 font-medium w-32">权限阶位</th>
                <th className="p-5 font-medium w-40">授命之日</th>
                <th className="p-5 font-medium w-32 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-ink-200)]/60 text-[var(--color-ink-800)] text-sm font-light">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-[var(--color-ink-50)]/50 transition-colors">
                  <td className="p-5 font-medium text-[var(--color-ink-900)] tracking-widest flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-ink-200)] flex items-center justify-center text-[var(--color-ink-700)] text-xs font-serif border border-[var(--color-ink-300)]">
                      {admin.username.charAt(0).toUpperCase()}
                    </div>
                    {admin.username}
                  </td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 text-xs border tracking-widest ${admin.role === '超级执笔者' ? 'border-[var(--color-ink-seal)] text-[var(--color-ink-seal)]' : 'border-[var(--color-ink-200)] text-[var(--color-ink-600)]'}`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="p-5 text-[var(--color-ink-500)] font-mono text-xs">
                    {new Date(admin.created_at || "").toLocaleDateString("zh-CN")}
                  </td>
                  <td className="p-5 text-center">
                     <button onClick={() => handleDeleteAdmin(admin.id)} className="text-[var(--color-ink-400)] hover:text-[var(--color-ink-seal)] transition-colors" title="褫夺印信 (删除)">
                       <Trash2 className="w-4 h-4 mx-auto" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Admin Modal */}
      {isAddingAdmin && (
        <div className="fixed inset-0 bg-[var(--color-ink-900)]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--color-zh-bg)] border border-[var(--color-ink-200)] w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsAddingAdmin(false)} className="absolute top-6 right-6 text-[var(--color-ink-400)] hover:text-[var(--color-ink-900)] transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 border-b border-[var(--color-ink-200)]/60">
              <h2 className="text-xl font-bold tracking-[0.2em] text-[var(--color-ink-900)] relative">
                <span className="w-1 h-5 bg-[var(--color-ink-seal)] absolute -left-8 top-1/2 -translate-y-1/2"></span>
                新授印信 (添加管理员)
              </h2>
            </div>
            <form onSubmit={handleAddAdmin} className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">执笔者名讳</label>
                <input 
                  type="text" 
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] tracking-widest text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">印信秘钥 (登录密码)</label>
                <input 
                  type="password" 
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] tracking-widest text-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">权限阶位</label>
                <select 
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value as any})}
                  className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] tracking-widest text-sm appearance-none"
                >
                  <option value="执笔者">执笔者</option>
                  <option value="超级执笔者">超级执笔者</option>
                </select>
              </div>
              <div className="pt-6 flex items-center justify-end gap-4 mt-8">
                <button type="button" onClick={() => setIsAddingAdmin(false)} className="px-6 py-2.5 text-sm tracking-widest text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] transition-colors">
                  收起印匣
                </button>
                <button type="submit" className="px-8 py-2.5 bg-[var(--color-ink-900)] hover:bg-[var(--color-ink-seal)] text-[var(--color-zh-bg)] text-sm tracking-[0.2em] transition-colors border border-transparent">
                  授以重任
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <div className="bg-white/60 border border-[var(--color-ink-200)] relative animate-in fade-in duration-500">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-ink-200)] bg-[var(--color-ink-50)]/50 text-[var(--color-ink-600)] text-sm tracking-widest font-normal">
                <th className="p-5 font-medium w-48">之时 (时间)</th>
                <th className="p-5 font-medium">行迹 (操作记录)</th>
                <th className="p-5 font-medium w-32">抚卷者 (操作人)</th>
                <th className="p-5 font-medium w-32 text-center">果 (状态)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-ink-200)]/60 text-[var(--color-ink-800)] text-sm font-light">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[var(--color-ink-50)]/50 transition-colors">
                  <td className="p-5 text-[var(--color-ink-500)] font-mono text-xs flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 opacity-50" />
                    {log.timestamp}
                  </td>
                  <td className="p-5 text-[var(--color-ink-900)] tracking-widest">{log.action}</td>
                  <td className="p-5 text-[var(--color-ink-500)] tracking-widest">{log.operator}</td>
                  <td className="p-5">
                    <div className="flex justify-center">
                      <span className={`flex items-center gap-1.5 px-3 py-1 text-xs tracking-widest border ${log.status === '成功' ? 'text-[var(--color-ink-600)] border-[var(--color-ink-200)]' : 'text-[var(--color-ink-seal)] border-[var(--color-ink-seal)]/30 bg-[var(--color-ink-seal)]/5'}`}>
                        {log.status === '失败' && <AlertCircle className="w-3 h-3" />}
                        {log.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-[var(--color-ink-400)] tracking-widest">
                    风拂无痕，暂无行迹记录。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
