"use client";

import { createClient } from "./supabase/client";

export async function addLog(action: string, status: "成功" | "失败" = "成功") {
  if (typeof window === "undefined") return;

  try {
    const operator = localStorage.getItem("xunwu_current_user") || "佚名";
    
    const supabase = createClient();
    const { error } = await supabase.from('system_logs').insert({
      action,
      operator,
      status
    });

    if (!error) {
      window.dispatchEvent(new Event("xunwuLogsUpdated"));
    } else {
      console.error("Failed to write log to Supabase", error);
    }
  } catch (e) {
    console.error("Failed to write log", e);
  }
}
