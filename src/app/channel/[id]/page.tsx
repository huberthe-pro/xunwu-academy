import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function ChannelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: channel } = await supabase.from('channels').select('*').eq('id', id).single();
  
  if (!channel) {
    notFound();
  }

  const { data: dbArticles } = await supabase.from('articles').select('*').eq('category', channel.name).eq('status', '已发布').order('publish_date', { ascending: false });
  const articles = dbArticles || [];

  return (
    <main className="min-h-screen bg-[var(--color-zh-bg)] text-[var(--color-ink-900)] pt-16 pb-32 px-8 relative overflow-hidden">
      {/* Decorative Ink Wash Watermark */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-ink-50)] rounded-full blur-3xl opacity-50 -z-10 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto relative pt-12">
        <Link href="/" className="inline-flex items-center gap-3 text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] transition-colors mb-24 tracking-[0.2em] font-light text-sm uppercase group">
          <ArrowLeft strokeWidth={1} className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/> 归卷
        </Link>
        
        <header className="mb-24 relative border-b border-[var(--color-ink-200)]/80 pb-12">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
             <div className="text-8xl font-serif text-[var(--color-ink-seal)]" style={{ writingMode: 'vertical-rl' }}>{channel.name}</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-[0.3em] mb-6 text-[var(--color-ink-900)]">
            【{channel.name}】
          </h1>
          <p className="text-[var(--color-ink-600)] tracking-[0.2em] text-lg font-light border-l-2 border-[var(--color-ink-seal)] pl-6">
            {channel.description}
          </p>
        </header>

        <section className="space-y-4">
          {articles.length === 0 ? (
            <div className="text-center text-[var(--color-ink-400)] tracking-widest py-32 font-light border border-dashed border-[var(--color-ink-200)]">
              此频道苍茫如雪，暂无点墨。
            </div>
          ) : (
            articles.map((article) => (
              <Link href={`/article/${article.id}`} key={article.id} className="group py-12 border-b border-[var(--color-ink-200)]/60 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 hover:bg-[var(--color-ink-50)]/50 transition-colors duration-700 px-8 -mx-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-ink-seal)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex-1 space-y-4">
                  <h4 className="text-2xl tracking-[0.1em] font-medium text-[var(--color-ink-900)] group-hover:text-[var(--color-ink-seal)] transition-colors duration-500 line-clamp-1">{article.title}</h4>
                  <p className="text-[var(--color-ink-600)] tracking-[0.1em] text-sm leading-[2] line-clamp-2 font-light">{article.summary}</p>
                </div>
                
                <div className="md:w-48 flex-shrink-0 md:text-right space-y-2 text-xs text-[var(--color-ink-400)] tracking-[0.2em] font-light uppercase">
                  <div>{article.publish_date}</div>
                  <div>{article.author} · 阅 {article.views}</div>
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
