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
