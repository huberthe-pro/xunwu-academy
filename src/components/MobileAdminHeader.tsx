"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, ArrowLeft, Layers, Menu, X, LogOut } from "lucide-react";

export default function MobileAdminHeader({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "admin_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  return (
    <div className="md:hidden w-full bg-white/90 border-b border-[var(--color-ink-200)] sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold tracking-[0.2em] text-[var(--color-ink-seal)]">寻吾书院后台</span>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] p-2"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-[var(--color-ink-200)] shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 space-y-2">
            <Link 
              href="/admin" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-none bg-[var(--color-ink-50)] text-[var(--color-ink-900)] font-medium transition-all"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="tracking-widest">仪表盘</span>
            </Link>
            
            {isSuperAdmin && (
              <Link 
                href="/admin/channels" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-none text-[var(--color-ink-600)] transition-all"
              >
                <Layers className="w-5 h-5" />
                <span className="tracking-widest">频道管理</span>
              </Link>
            )}

            <Link 
              href="/admin/content" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-none text-[var(--color-ink-600)] transition-all"
            >
              <FileText className="w-5 h-5" />
              <span className="tracking-widest">内容管理</span>
            </Link>

            {isSuperAdmin && (
              <Link 
                href="/admin/settings" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-none text-[var(--color-ink-600)] transition-all"
              >
                <Settings className="w-5 h-5" />
                <span className="tracking-widest">系统设置</span>
              </Link>
            )}

            <div className="h-px bg-[var(--color-ink-200)] my-2"></div>
            
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-[var(--color-ink-600)] transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="tracking-widest">隐退 (登出)</span>
            </button>
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-3 text-[var(--color-ink-400)] transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="tracking-widest">返回前台</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
