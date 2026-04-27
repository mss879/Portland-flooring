-- =============================================
-- Migration 006: Blogs
-- Tables: blogs
-- Storage: blog-images bucket
-- =============================================

CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  seo_keyword TEXT,
  author TEXT DEFAULT 'Portland Flooring' NOT NULL,
  cover_image TEXT, -- URL from Supabase Storage
  content TEXT NOT NULL, -- Markdown content
  status TEXT DEFAULT 'published' NOT NULL CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- RLS Policies
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Anyone can read published blogs (public-facing blog page)
CREATE POLICY "Anyone can read published blogs"
  ON blogs FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Authenticated users can do everything (admin panel)
CREATE POLICY "Authenticated users can read all blogs"
  ON blogs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- Storage Bucket: blog-images
-- =============================================
-- Run this in the Supabase SQL editor or via the dashboard:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('blog-images', 'blog-images', true);
--
-- CREATE POLICY "Anyone can view blog images"
--   ON storage.objects FOR SELECT
--   TO anon, authenticated
--   USING (bucket_id = 'blog-images');
--
-- CREATE POLICY "Authenticated users can upload blog images"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'blog-images');
--
-- CREATE POLICY "Authenticated users can update blog images"
--   ON storage.objects FOR UPDATE
--   TO authenticated
--   USING (bucket_id = 'blog-images')
--   WITH CHECK (bucket_id = 'blog-images');
--
-- CREATE POLICY "Authenticated users can delete blog images"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'blog-images');
