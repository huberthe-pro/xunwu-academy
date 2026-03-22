"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Search, Filter } from "lucide-react";
import { addLog } from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import RichTextEditor from "@/components/RichTextEditor";

export default function AdminContent() {
  const [articles, setArticles] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);

  const fetchData = async () => {
    const supabase = createClient();
    const [artsResponse, chansResponse] = await Promise.all([
      supabase.from('articles').select('*').order('publish_date', { ascending: false }),
      supabase.from('channels').select('*').order('name')
    ]);
    if (artsResponse.data) setArticles(artsResponse.data);
    if (chansResponse.data) setChannels(chansResponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const [formData, setFormData] = useState<any>({
    title: "",
    category: "文化",
    summary: "",
    content: "",
    author: "寻吾书院",
    views: 0,
    status: "草稿"
  });

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      category: "文化",
      summary: "",
      content: "",
      author: "寻吾书院",
      views: 0,
      status: "草稿"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: any) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      summary: article.summary,
      content: article.content || "",
      author: article.author,
      views: article.views || 0,
      status: article.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("确定要删除此文章吗？此操作不可知归（不可撤销）。")) {
      const articleToDelete = articles.find(a => a.id === id);
      const supabase = createClient();
      await supabase.from('articles').delete().eq('id', id);
      setArticles(articles.filter(a => a.id !== id));
      if (articleToDelete) {
        await addLog(`撤回卷帙《${articleToDelete.title}》`, "成功");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.summary?.trim()) return;

    const supabase = createClient();

    if (editingArticle) {
      const { data } = await supabase.from('articles').update({
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        content: formData.content,
        author: formData.author,
        views: Number(formData.views),
        status: formData.status
      }).eq('id', editingArticle.id).select();
      
      if (data) setArticles(articles.map(a => a.id === editingArticle.id ? data[0] : a));
      await addLog(`修撰卷帙《${formData.title}》`, "成功");
    } else {
      const { data } = await supabase.from('articles').insert({
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        content: formData.content,
        author: formData.author,
        views: Number(formData.views),
        status: formData.status
      }).select();
      
      if (data) setArticles([data[0], ...articles]);
      await addLog(`新起卷帙《${formData.title}》`, "成功");
    }
    
    setIsModalOpen(false);
  };

  const filteredArticles = articles.filter(a => 
    a.title.includes(searchQuery) || a.summary.includes(searchQuery)
  );

  return (
    <div className="p-8 font-sans pb-32">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-ink-900)] tracking-[0.1em]">内容管理</h1>
          <p className="text-[var(--color-ink-600)] mt-2 font-light tracking-widest text-sm">修撰与发布书院的文章、活动与服务资讯。</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-ink-seal)] text-white hover:bg-[var(--color-ink-900)] transition-colors duration-300 text-sm tracking-widest outline-none">
          <Plus className="w-4 h-4" />
          <span>提笔行文</span>
        </button>
      </header>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-400)]" />
          <input 
            type="text"
            placeholder="探寻文章标题或引言..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/60 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-300)] tracking-widest text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[var(--color-ink-200)] bg-white/60 text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] hover:border-[var(--color-ink-400)] transition-colors text-sm tracking-widest">
          <Filter className="w-4 h-4" />
          <span>筛选分类</span>
        </button>
      </div>

      <div className="bg-white/60 border border-[var(--color-ink-200)] relative overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[var(--color-ink-200)] bg-[var(--color-ink-50)]/50 text-[var(--color-ink-600)] text-sm tracking-widest font-normal">
              <th className="p-5 font-medium">标题</th>
              <th className="p-5 font-medium w-24">分类</th>
              <th className="p-5 font-medium w-24">作者</th>
              <th className="p-5 font-medium w-32">发布日期</th>
              <th className="p-5 font-medium w-24">状态</th>
              <th className="p-5 font-medium w-24 text-center">阅读量</th>
              <th className="p-5 font-medium w-32 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-ink-200)]/60 text-[var(--color-ink-800)] text-sm font-light">
            {filteredArticles.map((article) => (
              <tr key={article.id} className="hover:bg-[var(--color-ink-50)]/50 transition-colors">
                <td className="p-5 font-medium text-[var(--color-ink-900)] tracking-widest">
                  <div className="line-clamp-1">{article.title}</div>
                  <div className="text-xs text-[var(--color-ink-400)] font-light mt-1 line-clamp-1">{article.summary}</div>
                </td>
                <td className="p-5">
                  <span className="px-2.5 py-1 text-xs border border-[var(--color-ink-200)] text-[var(--color-ink-600)] tracking-widest">
                    {article.category}
                  </span>
                </td>
                <td className="p-5 text-[var(--color-ink-600)] tracking-widest">{article.author}</td>
                <td className="p-5 text-[var(--color-ink-400)] font-mono text-xs">{article.publish_date}</td>
                <td className="p-5">
                  <span className={`flex items-center gap-1.5 ${article.status === '已发布' ? 'text-[var(--color-ink-seal)]' : 'text-[var(--color-ink-400)]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${article.status === '已发布' ? 'bg-[var(--color-ink-seal)]' : 'bg-[var(--color-ink-400)]'}`}></span>
                    <span className="tracking-widest">{article.status}</span>
                  </span>
                </td>
                <td className="p-5 text-center font-mono text-xs text-[var(--color-ink-500)]">
                  {article.views.toLocaleString()}
                </td>
                <td className="p-5">
                  <div className="flex items-center justify-center gap-4 text-[var(--color-ink-400)]">
                    <button onClick={() => handleOpenEdit(article)} className="hover:text-[var(--color-ink-900)] transition-colors" title="修撰">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="hover:text-[var(--color-ink-seal)] transition-colors" title="撤回">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredArticles.length === 0 && (
              <tr>
                <td colSpan={7} className="p-12 text-center text-[var(--color-ink-400)] tracking-widest">
                  墨迹未干，空无一物。请尝试其他探索或新建行文。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[var(--color-ink-900)]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--color-zh-bg)] border border-[var(--color-ink-200)] w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-[var(--color-ink-400)] hover:text-[var(--color-ink-900)] transition-colors z-10">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 border-b border-[var(--color-ink-200)]/60 sticky top-0 bg-[var(--color-zh-bg)]/90 backdrop-blur z-0">
              <h2 className="text-xl font-bold tracking-[0.2em] text-[var(--color-ink-900)] relative">
                <span className="w-1 h-5 bg-[var(--color-ink-seal)] absolute -left-8 top-1/2 -translate-y-1/2"></span>
                {editingArticle ? "卷帙修撰" : "新起卷帙"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">文章标题</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-200)] tracking-widest text-sm"
                  placeholder="请输入标题"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">归属分类</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] tracking-widest text-sm appearance-none"
                  >
                    {channels.map((ch: any) => (
                      <option key={ch.id} value={ch.name}>{ch.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">作者 / 来源</label>
                  <input 
                    type="text" 
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] tracking-widest text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">修撰大儒</label>
                  <input 
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] tracking-widest text-sm"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">基础阅量</label>
                  <input 
                    type="number"
                    value={formData.views}
                    onChange={(e) => setFormData({...formData, views: e.target.value})}
                    required
                    min={0}
                    className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] tracking-widest text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">内容引言</label>
                <textarea 
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/50 border border-[var(--color-ink-200)] focus:border-[var(--color-ink-seal)] focus:outline-none transition-colors text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-200)] tracking-widest text-sm resize-none"
                  placeholder="简述文章要旨"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">文章正文</label>
                <div className="border border-[var(--color-ink-200)] focus-within:border-[var(--color-ink-seal)] transition-colors">
                  <RichTextEditor 
                    value={formData.content} 
                    onChange={(val) => setFormData({...formData, content: val})} 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm tracking-widest text-[var(--color-ink-800)]">状态设定</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="已发布" 
                      checked={formData.status === "已发布"}
                      onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                      className="accent-[var(--color-ink-seal)]"
                    />
                    <span className="text-sm tracking-widest text-[var(--color-ink-800)]">已发布</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="草稿" 
                      checked={formData.status === "草稿"}
                      onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                      className="accent-[var(--color-ink-seal)]"
                    />
                    <span className="text-sm tracking-widest text-[var(--color-ink-800)]">草稿</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--color-ink-200)]/60 flex items-center justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm tracking-widest text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] transition-colors">
                  放置不用
                </button>
                <button type="submit" className="px-8 py-2.5 bg-[var(--color-ink-900)] hover:bg-[var(--color-ink-seal)] text-[var(--color-zh-bg)] text-sm tracking-[0.2em] transition-colors border border-transparent">
                  落笔成文
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
