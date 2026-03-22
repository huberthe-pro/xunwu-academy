# 寻吾书院 - 部署与合并策略 (Deployment & Merge Strategy)

## 1. 分支管理 (Branching Strategy)
采用简化的 Git Flow：
- **`main` (生产分支)**：随时可发布，对应线上真实域名。受到保护，不可直接 commit，必须通过 PR（Pull Request）合并。
- **`dev` (开发测试分支)**：用于汇聚所有成员的改动。自动化部署至 staging 测试环境。
- **`feature/*` (功能分支)**：每开发一个新功能（如：`feature/admin-rbac`）时创建，开发完毕后提 PR 到 `dev` 分支。

## 2. 环境规划 (Environments)

### 2.1 开发版 (Development)
- 对应的环境变量文件：`.env.development`
- 适用对象：研发团队本地调试、Staging 服测试。
- 数据连接：本地 Mock 数据 / 测试库。

### 2.2 生产版 (Production)
- 对应的环境变量文件：`.env.production`（需在托管平台注入）
- 适用对象：线上真实用户。
- 数据连接：真实的生产数据库 / 强密码校验。

## 3. 部署方案推荐 (Vercel)

由于寻吾书院使用了 **Next.js 15+** 构建，最平滑的部署方式为 **Vercel**：

### 部署步骤：
1. 请确保您已经将最新代码 `git push` 到 GitHub 服务器。
2. 登录 [Vercel (vercel.com)](https://vercel.com)，点击 **"Add New Project"**。
3. 选择关联您的本代码仓库（`xunwu`）。
4. 在 **Environment Variables** 设置中，依照 `.env.production` 填入您的生产级密钥和接口地址（不要将 `.env.production` 直接提交到代码库）。
5. 点击 **Deploy**。Vercel 会自动识别 Next.js 并执行 `npm run build`。

### 后续自动化 (CI/CD)：
- 每次您向 `main` 分支提交 PR（如 `dev -> main`）并合并后，Vercel 会自动抓取最新代码，为您平滑发布新版本，无需停机。
