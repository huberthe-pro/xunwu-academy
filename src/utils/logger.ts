"use client";

import { SystemLog } from "@/data/mock";

const LOGS_KEY = "xunwu_system_logs";

export function addLog(action: string, status: "成功" | "失败" = "成功") {
  if (typeof window === "undefined") return;

  try {
    const rawLogs = localStorage.getItem(LOGS_KEY);
    const logs: SystemLog[] = rawLogs ? JSON.parse(rawLogs) : [];
    
    let operator = localStorage.getItem("xunwu_current_user") || "佚名";

    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      action,
      operator,
      timestamp: new Date().toLocaleString("zh-CN", { hour12: false }),
      status
    };

    const updatedLogs = [newLog, ...logs].slice(0, 50); // Keep last 50 logs
    localStorage.setItem(LOGS_KEY, JSON.stringify(updatedLogs));
    
    // Also dispatch an event so other components can refresh
    window.dispatchEvent(new Event("xunwuLogsUpdated"));
  } catch (e) {
    console.error("Failed to write log", e);
  }
}

export function getLogs(): SystemLog[] {
  if (typeof window === "undefined") return [];
  
  try {
    const rawLogs = localStorage.getItem(LOGS_KEY);
    return rawLogs ? JSON.parse(rawLogs) : [];
  } catch (e) {
    return [];
  }
}
