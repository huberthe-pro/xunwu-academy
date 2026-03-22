"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [channels, setChannels] = useState<any[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('channels').select('*').order('name');
      if (data) setChannels(data);
    };
    fetchChannels();
  }, []);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#f8f9fa] border-b border-[var(--color-ink-200)]/60 shadow-lg z-50 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col p-6 space-y-4 text-center tracking-[0.3em] font-medium text-[var(--color-ink-800)]">
            {channels.map((channel) => (
              <Link 
                key={channel.id} 
                href={`/channel/${channel.id}`} 
                onClick={() => setIsOpen(false)}
                className="py-3 hover:text-[var(--color-ink-seal)] hover:bg-[var(--color-ink-50)] transition-colors"
              >
                {channel.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
