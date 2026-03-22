import Image from "next/image";
import { Info, BookOpen, CalendarDays, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { mockArticles, mockChannels } from "@/data/mock";
import MobileNav from "@/components/MobileNav";

export default function Home() {
  const iconMap: Record<string, any> = {
    "介绍": Info,
    "文化": BookOpen,
    "活动": CalendarDays,
    "服务": HeartHandshake,
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[var(--color-zh-bg)] text-[var(--color-ink-800)]">
      {/* Ink Wash Background Effects */}
      <div className="ink-blur-bg w-[600px] h-[600px] bg-[var(--color-ink-200)]/30 top-[-10%] right-[-10%]"></div>
      <div className="ink-blur-bg w-[800px] h-[800px] bg-[var(--color-ink-50)]/80 bottom-[-20%] left-[-20%]"></div>

      {/* Header */}
      <header className="px-8 py-8 md:px-16 flex justify-between items-center relative z-50 w-full mb-12">
        {/* Seal Logo */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-transparent border-2 border-[var(--color-ink-seal)] flex items-center justify-center p-1 relative transform rotate-1 group hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full bg-[var(--color-ink-seal)] flex flex-col items-center justify-center text-[var(--color-zh-bg)] leading-none text-xs font-bold pt-0.5 opacity-90" style={{ writingMode: 'vertical-rl' }}>
              寻吾
            </div>
          </div>
          <h1 className="text-2xl tracking-[0.3em] font-medium text-[var(--color-ink-900)]">寻吾书院</h1>
        </div>
        <nav className="space-x-12 text-sm hidden md:flex tracking-[0.2em] text-[var(--color-ink-600)]">
          {mockChannels.map((channel) => (
            <Link key={channel.id} href={`/channel/${channel.id}`} className="hover:text-[var(--color-ink-900)] transition-colors">
              {channel.name}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </header>

      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col pb-32">
        {/* Hero Section */}
        <section className="mb-24 md:mb-40 flex flex-col md:flex-row items-center gap-16 md:gap-24 relative mt-8 md:mt-16">
          <div className="flex-1 space-y-8 md:space-y-12 relative z-10 w-full">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.4] tracking-[0.1em] text-[var(--color-ink-900)] selection:bg-[var(--color-ink-seal)] selection:text-white">
              留白<span className="text-[var(--color-ink-400)] italic">天地</span>间<br />
              <span className="ml-[1em] relative inline-block">
                寻吾<span className="text-[var(--color-ink-seal)] inline-block mx-1">本真</span>意
              </span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-ink-600)] leading-loose max-w-lg tracking-[0.3em] font-light mt-8">
              在纷繁世事中执笔，于墨色千秋里寻源。<br />传承千年昆仑风骨与瀚海书香。
            </p>
            <div className="pt-8">
              <button className="px-12 py-4 bg-transparent text-[var(--color-ink-900)] border border-[var(--color-ink-900)] rounded-none hover:bg-[var(--color-ink-900)] hover:text-[var(--color-zh-bg)] transition-all duration-700 tracking-[0.3em] font-light text-sm relative group">
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-[var(--color-ink-seal)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                入卷
              </button>
            </div>
          </div>

        </section>

        {/* Categories Grid (Minimalist Lines) */}
        <section className="space-y-16 mb-24 md:mb-40">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-[var(--color-ink-200)]/60">
            {mockChannels.map((cat, i) => {
              const IconComponent = iconMap[cat.name] || Info;
              return (
                <Link href={`/channel/${cat.id}`} key={cat.id} className={`group cursor-pointer p-12 relative flex flex-col items-center text-center ${i !== mockChannels.length - 1 ? 'md:border-r border-[var(--color-ink-200)]/60' : ''}`}>
                  {/* Hover Ink Spread */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-ink-50)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <IconComponent strokeWidth={1} className="w-8 h-8 mb-8 text-[var(--color-ink-400)] group-hover:text-[var(--color-ink-900)] transition-colors duration-500 relative z-10" />
                  <h4 className="text-xl mb-4 tracking-[0.3em] font-medium text-[var(--color-ink-800)] relative z-10">{cat.name}</h4>
                  <p className="text-[var(--color-ink-600)] tracking-[0.1em] text-xs leading-loose relative z-10 uppercase">{cat.description}</p>

                  <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-[var(--color-ink-seal)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Latest Articles Section (Vertical Layout) */}
        <section className="space-y-24">
          <div className="flex items-end justify-between border-b border-[var(--color-ink-900)] pb-6 relative">
            <h3 className="text-2xl tracking-[0.4em] text-[var(--color-ink-900)] font-medium">寻吾卷宗</h3>
            <span className="text-[var(--color-ink-400)] tracking-widest text-xs uppercase">最新修撰</span>
            <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-[var(--color-ink-seal)]"></div>
          </div>
          <div className="flex flex-col">
            {mockArticles.filter((a) => a.status === "已发布").slice(0, 4).map((article, index) => (
              <Link href={`/article/${article.id}`} key={article.id} className="group py-8 md:py-12 border-b border-[var(--color-ink-200)]/60 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 hover:bg-[var(--color-ink-50)]/50 transition-colors duration-700 px-2 md:px-6 md:-mx-6">
                <div className="w-auto md:w-32 flex-shrink-0">
                  <span className="text-xs tracking-[0.2em] text-[var(--color-ink-600)] border border-[var(--color-ink-200)] px-4 py-2 block text-center group-hover:border-[var(--color-ink-800)] transition-colors duration-500">{article.category}</span>
                </div>

                <div className="flex-1 space-y-4">
                  <h4 className="text-2xl tracking-[0.1em] font-medium text-[var(--color-ink-900)] group-hover:text-[var(--color-ink-seal)] transition-colors duration-500 line-clamp-1">{article.title}</h4>
                  <p className="text-[var(--color-ink-600)] tracking-[0.1em] text-sm leading-loose line-clamp-1 font-light">{article.summary}</p>
                </div>

                <div className="w-full md:w-48 flex-shrink-0 text-left md:text-right space-y-1 md:space-y-2 text-xs text-[var(--color-ink-400)] tracking-widest font-light flex md:block justify-between items-center">
                  <div>{article.publishDate}</div>
                  <div>{article.author} · 阅 {article.views}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
