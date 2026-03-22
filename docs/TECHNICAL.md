# 寻吾书院 - 技术架构文档

## 1. 技术栈选型
- **框架体系**：Next.js 15+ (App Router) + React 19。利用 React Server Components (RSC) 进行高性能首屏渲染渲染。
- **样式引擎**：Tailwind CSS + 全局原生 CSS 变量 (`var(--color-ink-*)`)，结合 `lucide-react` 提供高保真矢量图标。
- **字体方案**：采用 Google Fonts的 `Noto Serif SC` (思源宋体) 构建贯穿全局的衬线体视觉，辅助极少量的 `Geist Sans` 处理数字。
- **数据层 (目前阶段)**：轻量级内存/浏览器 `LocalStorage` Mock 引擎，配合 `src/data/mock.ts`，为后续剥离接入 Supabase 或 Prisma 做好接口契约隔离。

## 2. 目录结构
```text
src/
├── app/
│   ├── (front)/           # [未来可剥离] 前台路由域
│   ├── admin/             # 后台管理引擎 (由 layout 统一守护)
│   ├── login/             # 登录凭证下发入口
│   ├── article/[id]/      # 文章详情页 (SSR / SSG 候选)
│   ├── channel/[id]/      # 频道列表页
│   ├── layout.tsx         # 全局根布局 (挂载 Footer)
│   └── page.tsx           # 首页聚合
├── components/            # UI 组件层 (如 Footer)
├── data/                  # 数据契约层 (Mock 数据及 TS Interface)
├── utils/                 # 工具链 (如 logger.ts 审计系统)
└── middleware.ts          # 边缘路由守卫 (RBAC 核心)
```

## 3. 核心机制设计

### 3.1 路由守卫与 RBAC (基于 Middleware)
- 使用 Next.js `middleware.ts` 进行无感知的权限分流。
- 登录时 (`/login/page.tsx`) 向浏览器下发 `admin_token`（基础通行证）与 `admin_role`（权限标识）。
- 在服务端组件 (如 `AdminLayout`) 和边缘节点 (Middleware) 中读取 Cookie，实现视图剪裁（隐藏功能入口）与硬路由阻击（拒绝非法访问）。

### 3.2 Audit Log (安全审计日志)
- 封装于 `src/utils/logger.ts`。
- **实现手段**：通过劫持用户在 React 组件内的状态写操作，静默追加操作记录至本地沙盒 (`LOGS_KEY`)。
- **事件总线**：利用 `window.dispatchEvent(new Event("xunwuLogsUpdated"))` 实现跨组件（如文章管理页 -> 系统设置页）的日志状态实时同步，无需借助 Redux。

## 4. 后续演进路线 (Tech Roadmap)
1. **持久化迁移**：将 `localStorage` 和内存 Mock 替换为真正的 PostgreSQL 数据库（建议使用 Prisma ORM 获取强类型推导）。
2. **富文本基建**：在内容管理的“修撰”流程中引入 TipTap 或 Quasar 建立真实的图文所见即所得编辑器。
3. **图像与 OSS**：目前以文字驱动，后续需接入 AWS S3 或阿里云 OSS 以支持水墨风格配图的真实上传。
