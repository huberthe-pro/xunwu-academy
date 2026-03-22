"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { addLog } from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";

export default function AdminChannels() {
  const [channels, setChannels] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChannel, setEditingChannel] = useState<any | null>(null);
  
  const [formData, setFormData] = useState({ name: "", description: "" });

  const fetchChannels = async () => {
    const supabase = createClient();
    const { data } = await supabase.from('channels').select('*').order('name');
    if (data) setChannels(data);
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleOpenAdd = () => {
    setEditingChannel(null);
    setFormData({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (channel: any) => {
    setEditingChannel(channel);
    setFormData({ name: channel.name, description: channel.description });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("确定要删除此频道吗？相关的文章可能会受到影响。")) {
      const channelToDelete = channels.find(c => c.id === id);
      const supabase = createClient();
      await supabase.from('channels').delete().eq('id', id);
      setChannels(channels.filter(c => c.id !== id));
      if (channelToDelete) {
        await addLog(`撤回频道「${channelToDelete.name}」`, "成功");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) return;

    const supabase = createClient();

    if (editingChannel) {
      const { data } = await supabase.from('channels').update({
        name: formData.name,
        description: formData.description
      }).eq('id', editingChannel.id).select();
      
      if (data) setChannels(channels.map(c => c.id === editingChannel.id ? data[0] : c));
      await addLog(`修撰频道「${formData.name}」`, "成功");
    } else {
      const { data } = await supabase.from('channels').insert({
        name: formData.name,
        description: formData.description
      }).select();
      
      if (data) setChannels([...channels, data[0]]);
      await addLog(`新启频道「${formData.name}」`, "成功");
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 font-sans pb-32">
      <header className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-ink-900)] tracking-[0.1em]">频道管理</h1>
          <p className="text-[var(--color-ink-600)] mt-2 font-light tracking-widest text-sm">在这里配置前台展示的核心板块与分类。</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-ink-seal)] text-white hover:bg-[var(--color-ink-900)] transition-colors duration-300 text-sm tracking-widest outline-none">
          <Plus className="w-4 h-4" />
          <span>新建频道</span>
        </button>
      </header>

      <div className="bg-white/60 border border-[var(--color-ink-200)] relative overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[var(--color-ink-200)] bg-[var(--color-ink-50)]/50 text-[var(--color-ink-600)] text-sm tracking-widest font-normal">
              <th className="p-5 font-medium">频道名称</th>
              <th className="p-5 font-medium w-1/2">描述</th>
              <th className="p-5 font-medium text-center">关联文章</th>
              <th className="p-5 font-medium text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-ink-200)]/60 text-[var(--color-ink-800)] text-sm font-light">
            {channels.map((channel) => (
              <tr key={channel.id} className="hover:bg-[var(--color-ink-50)]/50 transition-colors">
                <td className="p-5 font-medium text-[var(--color-ink-900)] tracking-widest">
                  <span className="w-1.5 h-1.5 inline-block bg-[var(--color-ink-seal)]/50 rounded-full mr-3 align-middle"></span>
                  {channel.name}
                </td>
                <td className="p-5 text-[var(--color-ink-600)] tracking-widest">{channel.description}</td>
                <td className="p-5 text-center">
                  <span className="px-3 py-1 bg-[var(--color-ink-50)] border border-[var(--color-ink-200)] font-mono text-xs">
                    {channel.article_count || 0}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex items-center justify-center gap-4 text-[var(--color-ink-400)]">
                    <button onClick={() => handleOpenEdit(channel)} className="hover:text-[var(--color-ink-900)] transition-colors" title="编辑">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(channel.id)} className="hover:text-[var(--color-ink-seal)] transition-colors" title="删除">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {channels.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-[var(--color-ink-400)] tracking-widest">
                  暂无频道，请点击上方按钮新建。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[var(--color-ink-900)]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--color-zh-bg)] border border-[var(--color-ink-200)] w-[95%] md:w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-[var(--color-ink-400)] hover:text-[var(--color-ink-900)] transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 border-b border-[var(--color-ink-200)]/60">
              <h2 className="text-xl font-bold tracking-[0.2em] text-[var(--color-ink-900)] relative">
                <span className="w-1 h-5 bg-[var(--color-ink-seal)] absolute -left-8 top-1/2 -translate-y-1/2"></span>
                {editingChannel ? "编辑频道" : "新建频道"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="space-y-3">
                <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">频道名称 (如: 雅集)</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-200)] tracking-widest text-sm"
                  placeholder="请输入四个字以内的名称"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">频道描述</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-200)] tracking-widest text-sm resize-none"
                  placeholder="简短描述该频道的收录内容"
                />
              </div>
              <div className="pt-6 flex items-center justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm tracking-widest text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] transition-colors">
                  取消
                </button>
                <button type="submit" className="px-8 py-2.5 bg-[var(--color-ink-900)] hover:bg-[var(--color-ink-seal)] text-[var(--color-zh-bg)] text-sm tracking-[0.2em] transition-colors border border-transparent">
                  保存修撰
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
