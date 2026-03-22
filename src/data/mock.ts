export interface Channel {
  id: string;
  name: string;
  description: string;
  articleCount: number;
}

export const mockChannels: Channel[] = [
  { id: "ch-intro", name: "介绍", description: "书院缘起，寻吾初心", articleCount: 1 },
  { id: "ch-culture", name: "文化", description: "国学经典，文脉传承", articleCount: 2 },
  { id: "ch-event", name: "活动", description: "雅集雅事，四海会友", articleCount: 1 },
  { id: "ch-service", name: "服务", description: "匠心优选，文化体验", articleCount: 1 },
];

export interface Article {
  id: string;
  title: string;
  category: "介绍" | "文化" | "活动" | "服务";
  summary: string;
  author: string;
  publishDate: string;
  status: "已发布" | "草稿";
  views: number;
}

export const mockArticles: Article[] = [
  {
    id: "kunlun-001",
    title: "万山之祖：揭秘昆仑文化的精神内核",
    category: "介绍",
    summary: "昆仑山被誉为中华神话的摇篮。在此，我们追溯古籍，探寻昆仑何以成为精神的至高图腾。",
    author: "寻吾书院",
    publishDate: "2026-03-20",
    status: "已发布",
    views: 3420,
  },
  {
    id: "kunlun-002",
    title: "昆仑神柱与天人合一：古建筑中的宇宙观",
    category: "文化",
    summary: "从明清木构建筑的「擎天柱」到民间崇拜的四方神韵，昆仑文化深刻影响着传统建筑的设计理念。",
    author: "建筑研究所",
    publishDate: "2026-03-18",
    status: "已发布",
    views: 1850,
  },
  {
    id: "kunlun-003",
    title: "寻吾书院·甲辰年春季昆仑游学招募",
    category: "活动",
    summary: "跟随着西王母的传说与穆天子西游的足迹，我们将于四月开启为期七天的昆仑文化溯源之旅。",
    author: "活动中心",
    publishDate: "2026-03-15",
    status: "已发布",
    views: 5630,
  },
  {
    id: "kunlun-004",
    title: "昆仑玉雕：冰雪之魂的千年传承",
    category: "文化",
    summary: "昆仑玉温润如水、坚韧如刚，其独特的地理环境孕育了无与伦比的玉石文化。",
    author: "器物局",
    publishDate: "2026-03-10",
    status: "已发布",
    views: 2190,
  },
  {
    id: "kunlun-005",
    title: "寻吾·古法昆仑道茶品鉴服务",
    category: "服务",
    summary: "采撷雪山晨露与高海拔茶青，书院正式推出昆仑道茶品鉴服务，洗涤身心，明心见性。",
    author: "寻吾书院",
    publishDate: "2026-03-05",
    status: "草稿",
    views: 0,
  },
];

export interface AdminSettings {
  siteName: string;
}

export const mockAdminSettings: AdminSettings = {
  siteName: "寻吾书院后台",
};

export interface AdminUser {
  id: string;
  username: string;
  password?: string;
  role: "超级执笔者" | "执笔者";
  createdAt: string;
}

export const mockAdmins: AdminUser[] = [
  { id: "au-1", username: "admin", password: "123", role: "超级执笔者", createdAt: "2026-03-20" },
];
export interface SystemLog {
  id: string;
  action: string;
  operator: string;
  timestamp: string;
  status: "成功" | "失败";
}

export const mockSystemLogs: SystemLog[] = [
  { id: "log-1", action: "登录系统", operator: "admin", timestamp: "2026-03-22 09:12:34", status: "成功" },
  { id: "log-2", action: "更新频道「文化」", operator: "admin", timestamp: "2026-03-21 14:30:12", status: "成功" },
  { id: "log-3", action: "发布文章《昆仑神柱与天人合一》", operator: "admin", timestamp: "2026-03-18 10:05:44", status: "成功" },
  { id: "log-4", action: "尝试登录(密码错误)", operator: "未知", timestamp: "2026-03-17 22:10:05", status: "失败" },
  { id: "log-5", action: "新建文章草稿", operator: "admin", timestamp: "2026-03-05 16:45:22", status: "成功" },
];
