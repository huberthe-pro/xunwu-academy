import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: article } = await supabase.from('articles').select('*').eq('id', id).eq('status', '已发布').single();
  
  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-zh-bg)] text-[var(--color-ink-900)] pt-16 pb-32 px-8 relative overflow-hidden">
      {/* Decorative Ink Wash Watermark */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-ink-50)] rounded-full blur-3xl opacity-50 -z-10 -translate-y-1/2 translate-x-1/2"></div>
      
      <article className="max-w-3xl mx-auto relative pt-12">
        {/* Abstract Vertical Guide Line */}
        <div className="absolute -left-16 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-ink-200)] to-transparent hidden lg:block"></div>
        
        <Link href="/" className="inline-flex items-center gap-3 text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] transition-colors mb-24 tracking-[0.2em] font-light text-sm uppercase group">
          <ArrowLeft strokeWidth={1} className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/> 归卷
        </Link>
        
        <header className="mb-24 relative">
          <div className="mb-10 flex items-center gap-4">
            <span className="w-2 h-2 bg-[var(--color-ink-seal)] inline-block"></span>
            <span className="text-xs tracking-[0.3em] text-[var(--color-ink-600)]">{article.category}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-medium tracking-[0.1em] leading-[1.4] mb-12 text-[var(--color-ink-900)] selection:bg-[var(--color-ink-seal)] selection:text-white">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-[var(--color-ink-400)] tracking-[0.2em] text-xs font-light border-b border-[var(--color-ink-200)] pb-8">
            <span className="text-[var(--color-ink-800)]">{article.author}</span>
            <span>|</span>
            <span>{article.publish_date}</span>
            <span>|</span>
            <span>阅 {(article.views || 0).toLocaleString()}</span>
          </div>
        </header>

        <div className="prose prose-lg mx-auto text-[var(--color-ink-800)] selection:bg-[var(--color-ink-seal)] selection:text-white relative">
          {/* Subtle Quote Mark Graphic */}
          <div className="absolute -top-12 -left-8 text-8xl text-[var(--color-ink-50)] font-serif z-[-1]">
            “
          </div>
          
          <p className="leading-[2.2] tracking-[0.1em] mb-12 font-light text-lg text-justify first-letter:text-5xl first-letter:font-medium first-letter:text-[var(--color-ink-seal)] first-letter:float-left first-letter:mr-4 first-letter:mt-1">
            {article.summary}
          </p>
          
          <p className="leading-[2.2] tracking-[0.15em] font-light text-justify text-[var(--color-ink-600)] mt-8">
            水墨流转，古意盎然。此处为详情内容占位符。在真实的渲染中，我们将通过优雅的行距与段间留白，将文章娓娓道来。昆仑的山风、先民的呼唤，在这里都化为横竖撇捺间的呼吸感。
          </p>
          
          {/* Footer Signature Block */}
          <div className="mt-32 pt-16 flex flex-col items-center justify-center opacity-80">
             <div className="w-10 h-10 border border-[var(--color-ink-seal)] flex flex-col items-center justify-center mb-6">
                 <div className="w-[34px] h-[34px] bg-[var(--color-ink-seal)] flex items-center justify-center text-white text-[10px] tracking-widest font-bold" style={{ writingMode: 'vertical-rl' }}>
                   寻吾
                 </div>
             </div>
             <div className="text-[var(--color-ink-400)] text-xs tracking-[0.3em] uppercase">Xun Wu Academy</div>
          </div>
        </div>
      </article>
    </main>
  );
}
