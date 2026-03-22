"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide the global footer for admin routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <footer className="w-full bg-[var(--color-zh-bg)] border-t border-[var(--color-ink-200)] relative overflow-hidden mt-auto">
      {/* Subtle Background Ink */}
      <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-[var(--color-ink-100)] rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-b border-[var(--color-ink-200)]/60 pb-16">

          {/* Brand/Logo Section */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-transparent border-2 border-[var(--color-ink-seal)] flex items-center justify-center p-1 relative">
                <div className="w-full h-full bg-[var(--color-ink-seal)] flex items-center justify-center text-[var(--color-zh-bg)] leading-none text-[10px] font-bold" style={{ writingMode: 'vertical-rl' }}>
                  寻吾
                </div>
              </div>
              <h2 className="text-xl tracking-[0.3em] font-medium text-[var(--color-ink-900)]">寻吾书院</h2>
            </div>
            <p className="text-[var(--color-ink-600)] text-sm leading-loose tracking-widest max-w-[280px] font-light">
              传承千年风骨，<br />
              书写华夏瀚海的壮阔波澜。
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-[var(--color-ink-900)] font-medium tracking-[0.2em] relative inline-block">
              讲堂
              <span className="absolute -bottom-2 left-0 w-4 h-0.5 bg-[var(--color-ink-seal)]"></span>
            </h3>
            <ul className="space-y-4 text-sm tracking-widest text-[var(--color-ink-500)] font-light">
              <li><Link href="/" className="hover:text-[var(--color-ink-seal)] transition-colors">书院明道</Link></li>
              <li><Link href="/" className="hover:text-[var(--color-ink-seal)] transition-colors">国学大观</Link></li>
              <li><Link href="/" className="hover:text-[var(--color-ink-seal)] transition-colors">雅集拾音</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h3 className="text-[var(--color-ink-900)] font-medium tracking-[0.2em] relative inline-block">
              修藏
              <span className="absolute -bottom-2 left-0 w-4 h-0.5 bg-[var(--color-ink-seal)]"></span>
            </h3>
            <ul className="space-y-4 text-sm tracking-widest text-[var(--color-ink-500)] font-light">
              <li><Link href="/" className="hover:text-[var(--color-ink-seal)] transition-colors">藏经阁</Link></li>
              <li><Link href="/" className="hover:text-[var(--color-ink-seal)] transition-colors">历代金石</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-6">
            <h3 className="text-[var(--color-ink-900)] font-medium tracking-[0.2em] relative inline-block">
              驿站
              <span className="absolute -bottom-2 left-0 w-4 h-0.5 bg-[var(--color-ink-seal)]"></span>
            </h3>
            <div className="text-sm tracking-widest text-[var(--color-ink-500)] font-light space-y-3">
              <p>飞鸽传书：wen@xunwushuyuan.com</p>
              <p>鸿雁来归：(86) 400-XUN-WU00</p>
              <p>烟雨江南某处深山古刹旁</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-[var(--color-ink-400)] font-light">
          <p>v0.1.0 © {new Date().getFullYear()} 寻吾书院 - 中国传统文化。 </p>
          <p>Made with ❤️ by 子珊 </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[var(--color-ink-900)] transition-colors">书院规制</Link>
            <Link href="/" className="hover:text-[var(--color-ink-900)] transition-colors">守秘契约</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
