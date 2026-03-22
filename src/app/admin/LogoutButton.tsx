"use client";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "admin_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  return (
    <button 
      onClick={handleLogout} 
      className="flex items-center gap-2 px-4 py-2 w-full text-sm text-[var(--color-ink-600)] hover:text-[var(--color-ink-seal)] transition-colors tracking-widest text-left outline-none"
    >
      <LogOut className="w-4 h-4" />
      <span>隐退 (登出)</span>
    </button>
  );
}
