-- Enable RLS on all tables
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to admins (needed since login is client-side)
DROP POLICY IF EXISTS "public_select_admins" ON admins;
CREATE POLICY "public_select_admins" ON admins FOR SELECT USING (true);

-- Allow public full access to channels
DROP POLICY IF EXISTS "public_all_channels" ON channels;
CREATE POLICY "public_all_channels" ON channels FOR ALL USING (true) WITH CHECK (true);

-- Allow public full access to articles
DROP POLICY IF EXISTS "public_all_articles" ON articles;
CREATE POLICY "public_all_articles" ON articles FOR ALL USING (true) WITH CHECK (true);

-- Allow public full access to system_logs
DROP POLICY IF EXISTS "public_all_system_logs" ON system_logs;
CREATE POLICY "public_all_system_logs" ON system_logs FOR ALL USING (true) WITH CHECK (true);


-- Supabase Seed File
-- Generated based on src/data/mock.ts

-- 1. Insert Channels
INSERT INTO channels (name, description, article_count) VALUES
('介绍', '书院缘起，寻吾初心', 1),
('文化', '国学经典，文脉传承', 2),
('活动', '雅集雅事，四海会友', 1),
('服务', '匠心优选，文化体验', 1)
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Articles
INSERT INTO articles (title, category, summary, author, publish_date, status, views) VALUES
('万山之祖：揭秘昆仑文化的精神内核', '介绍', '昆仑山被誉为中华神话的摇篮。在此，我们追溯古籍，探寻昆仑何以成为精神的至高图腾。', '寻吾书院', '2026-03-20', '已发布', 3420),
('昆仑神柱与天人合一：古建筑中的宇宙观', '文化', '从明清木构建筑的「擎天柱」到民间崇拜的四方神韵，昆仑文化深刻影响着传统建筑的设计理念。', '建筑研究所', '2026-03-18', '已发布', 1850),
('寻吾书院·甲辰年春季昆仑游学招募', '活动', '跟随着西王母的传说与穆天子西游的足迹，我们将于四月开启为期七天的昆仑文化溯源之旅。', '活动中心', '2026-03-15', '已发布', 5630),
('昆仑玉雕：冰雪之魂的千年传承', '文化', '昆仑玉温润如水、坚韧如刚，其独特的地理环境孕育了无与伦比的玉石文化。', '器物局', '2026-03-10', '已发布', 2190),
('寻吾·古法昆仑道茶品鉴服务', '服务', '采撷雪山晨露与高海拔茶青，书院正式推出昆仑道茶品鉴服务，洗涤身心，明心见性。', '寻吾书院', '2026-03-05', '草稿', 0);

-- 3. Insert System Logs
INSERT INTO system_logs (action, operator, timestamp, status) VALUES
('登录系统', 'admin', '2026-03-22 09:12:34+08', '成功'),
('更新频道「文化」', 'admin', '2026-03-21 14:30:12+08', '成功'),
('发布文章《昆仑神柱与天人合一》', 'admin', '2026-03-18 10:05:44+08', '成功'),
('尝试登录(密码错误)', '未知', '2026-03-17 22:10:05+08', '失败'),
('新建文章草稿', 'admin', '2026-03-05 16:45:22+08', '成功');
