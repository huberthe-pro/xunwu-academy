import { mockArticles } from "@/data/mock";
import { BookOpen, Eye, Layers } from "lucide-react";

export default function AdminDashboard() {
  const publishedArticles = mockArticles.filter((a) => a.status === "已发布");
  const totalViews = publishedArticles.reduce((acc, curr) => acc + curr.views, 0);

  return (
    <div className="p-8 font-sans pb-32">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-[var(--color-ink-900)] tracking-[0.1em]">仪表盘</h1>
        <p className="text-[var(--color-ink-600)] mt-2 font-light tracking-widest text-sm">欢迎来到寻吾书院平台管理中心，总览四海风雅事。</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/60 p-6 border border-[var(--color-ink-200)] relative group hover:border-[var(--color-ink-400)] transition-colors">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-ink-50)]/50 rounded-bl-full -z-10 group-hover:bg-[var(--color-ink-50)] transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[var(--color-ink-600)] text-sm font-medium tracking-widest">文章总数</h3>
            <BookOpen className="w-5 h-5 text-[var(--color-ink-300)]" />
          </div>
          <div className="text-4xl font-light text-[var(--color-ink-900)] tracking-wider">
            {mockArticles.length}
            <span className="text-base text-[var(--color-ink-400)] ml-2 tracking-widest">卷</span>
          </div>
        </div>
        
        <div className="bg-white/60 p-6 border border-[var(--color-ink-200)] relative group hover:border-[var(--color-ink-400)] transition-colors">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-ink-50)]/50 rounded-bl-full -z-10 group-hover:bg-[var(--color-ink-50)] transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[var(--color-ink-600)] text-sm font-medium tracking-widest">雅集频道</h3>
            <Layers className="w-5 h-5 text-[var(--color-ink-300)]" />
          </div>
          <div className="text-4xl font-light text-[var(--color-ink-900)] tracking-wider">
            4
            <span className="text-base text-[var(--color-ink-400)] ml-2 tracking-widest">栏</span>
          </div>
        </div>
        
        <div className="bg-white/60 p-6 border border-[var(--color-ink-200)] relative group hover:border-[var(--color-ink-400)] transition-colors">
           <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-ink-50)]/50 rounded-bl-full -z-10 group-hover:bg-[var(--color-ink-50)] transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[var(--color-ink-600)] text-sm font-medium tracking-widest">过客足迹 (阅读总量)</h3>
            <Eye className="w-5 h-5 text-[var(--color-ink-300)]" />
          </div>
          <div className="text-4xl font-light text-[var(--color-ink-900)] tracking-wider">
            {totalViews.toLocaleString()}
            <span className="text-base text-[var(--color-ink-400)] ml-2 tracking-widest">阅</span>
          </div>
        </div>
      </div>

      <div className="bg-white/60 border border-[var(--color-ink-200)] relative">
        <div className="p-6 border-b border-[var(--color-ink-200)]/60 flex items-center justify-between bg-[var(--color-ink-50)]/30">
          <h2 className="text-lg font-medium text-[var(--color-ink-900)] tracking-[0.1em] flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--color-ink-seal)]"></span>
            近日行文
          </h2>
          <span className="text-xs text-[var(--color-ink-400)] tracking-widest">已发布的卷帙</span>
        </div>
        <div className="divide-y divide-[var(--color-ink-200)]/60">
          {publishedArticles.map((article) => (
            <div key={article.id} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--color-ink-50)]/50 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-[var(--color-ink-900)] tracking-widest">{article.title}</h3>
                  <span className="px-2 py-0.5 text-xs font-mono border border-[var(--color-ink-200)] text-[var(--color-ink-500)] tracking-widest">
                    {article.category}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-ink-500)] font-light tracking-wide line-clamp-1 max-w-2xl">{article.summary}</p>
              </div>
              <div className="text-sm text-[var(--color-ink-400)] sm:text-right flex sm:block justify-between items-center sm:min-w-[120px] tracking-widest border-t sm:border-t-0 border-[var(--color-ink-200)]/30 pt-3 sm:pt-0 mt-2 sm:mt-0">
                <div className="font-mono text-xs">{article.publishDate}</div>
                <div className="mt-1.5 flex items-center justify-end gap-1.5 text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  {article.views.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          {publishedArticles.length === 0 && (
            <div className="p-12 text-center text-[var(--color-ink-400)] tracking-widest text-sm">
              暂无已发布的卷帙
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
