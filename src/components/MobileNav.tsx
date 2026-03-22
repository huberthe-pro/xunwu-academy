"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mockChannels } from "@/data/mock";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

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
            {mockChannels.map((channel) => (
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
