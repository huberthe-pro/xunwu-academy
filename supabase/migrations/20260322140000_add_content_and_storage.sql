-- 1. Add `content` column to `articles`
ALTER TABLE articles ADD COLUMN IF NOT EXISTS content TEXT;

-- 2. Create the storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('xunwu-images', 'xunwu-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage RLS Policies
-- Allow anyone to read images (since bucket is public, this is implicit for files, but good to ensure)
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'xunwu-images' );

-- Allow authenticated users or public (since our app relies on client-side logic currently) to upload
CREATE POLICY "Public Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'xunwu-images' );

-- Optional: Allow public updates/deletes if needed by the frontend when editing articles
CREATE POLICY "Public Updates"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'xunwu-images' );

CREATE POLICY "Public Deletes"
ON storage.objects FOR DELETE
USING ( bucket_id = 'xunwu-images' );
