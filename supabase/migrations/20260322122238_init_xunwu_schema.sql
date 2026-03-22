-- 1. 管理员 (Admins)
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('超级执笔者', '执笔者')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 频道 (Channels)
CREATE TABLE channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    article_count INTEGER DEFAULT 0
);

-- 3. 文章卷帙 (Articles)
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT REFERENCES channels(name) ON DELETE CASCADE,
    summary TEXT,
    author TEXT NOT NULL,
    publish_date DATE DEFAULT CURRENT_DATE,
    status TEXT NOT NULL CHECK (status IN ('已发布', '草稿')),
    views INTEGER DEFAULT 0
);

-- 4. 行迹微录 (System Logs)
CREATE TABLE system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    operator TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    status TEXT NOT NULL CHECK (status IN ('成功', '失败'))
);

-- 5. Data Seed
-- Insert the default super admin to prevent backend lock-outs
INSERT INTO admins (username, password, role) 
VALUES ('admin', 'admin', '超级执笔者')
ON CONFLICT (username) DO NOTHING;

INSERT INTO admins (username, password, role) 
VALUES ('123', '123', '执笔者')
ON CONFLICT (username) DO NOTHING;
