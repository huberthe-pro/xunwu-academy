import { mockArticles } from "@/data/mock";

export default function AdminDashboard() {
  const publishedArticles = mockArticles.filter((a) => a.status === "已发布");
  const totalViews = publishedArticles.reduce((acc, curr) => acc + curr.views, 0);

  return (
    <div className="p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">仪表盘</h1>
        <p className="text-gray-500 mt-1">欢迎来到寻吾书院平台管理中心。</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">文章总数</h3>
          <div className="text-3xl font-bold text-gray-800">{mockArticles.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">分类</h3>
          <div className="text-3xl font-bold text-gray-800">4</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">阅读总量</h3>
          <div className="text-3xl font-bold text-gray-800">{totalViews.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">最近发布</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {publishedArticles.map((article) => (
            <div key={article.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-[var(--color-ink-900)]">{article.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-none text-xs font-medium border border-[var(--color-ink-seal)]/30 text-[var(--color-ink-seal)] tracking-widest">
                    {article.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">{article.summary}</p>
              </div>
              <div className="text-sm text-gray-400 text-right min-w-[100px]">
                <div>{article.publishDate}</div>
                <div className="mt-1">{article.views.toLocaleString()} 阅读</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
