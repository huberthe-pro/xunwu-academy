import Link from "next/link";
import { LayoutDashboard, FileText, Settings, ArrowLeft, Layers } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-zh-bg)] flex text-[var(--color-ink-800)]">
      {/* Sidebar */}
      <aside className="w-64 bg-white/50 border-r border-[var(--color-ink-200)] flex flex-col">
        <div className="p-6 border-b border-[var(--color-ink-200)] flex items-center justify-between">
          <span className="text-xl font-bold tracking-[0.2em] text-[var(--color-ink-seal)]">寻吾书院后台</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-none border-l-2 border-[var(--color-ink-seal)] bg-[var(--color-ink-50)] text-[var(--color-ink-900)] font-medium transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span className="tracking-widest">仪表盘</span>
          </Link>
          <Link href="/admin/channels" className="flex items-center gap-3 px-4 py-3 rounded-none border-l-2 border-transparent hover:border-[var(--color-ink-200)] hover:bg-[var(--color-ink-50)]/50 text-[var(--color-ink-600)] transition-all">
            <Layers className="w-5 h-5" />
            <span className="tracking-widest">频道管理</span>
          </Link>
          <Link href="/admin/content" className="flex items-center gap-3 px-4 py-3 rounded-none border-l-2 border-transparent hover:border-[var(--color-ink-200)] hover:bg-[var(--color-ink-50)]/50 text-[var(--color-ink-600)] transition-all">
            <FileText className="w-5 h-5" />
            <span className="tracking-widest">内容管理</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-none border-l-2 border-transparent hover:border-[var(--color-ink-200)] hover:bg-[var(--color-ink-50)]/50 text-[var(--color-ink-600)] transition-all">
            <Settings className="w-5 h-5" />
            <span className="tracking-widest">系统设置</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[var(--color-ink-200)]">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-ink-400)] hover:text-[var(--color-ink-900)] transition-colors tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            <span>返回前台</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#f8f9fa]">
        {children}
      </main>
    </div>
  );
}
