-- =============================================
-- Migration 007: Gallery Images
-- Tables: gallery_images
-- Storage: gallery-images bucket
-- =============================================

CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,           -- Public URL from Supabase Storage
  file_path TEXT,                    -- Storage path for deletion
  alt_text TEXT DEFAULT 'Gallery Image',
  sort_order INTEGER DEFAULT 0,
  is_static BOOLEAN DEFAULT false,   -- true = original static images, not deletable
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_gallery_images_sort ON gallery_images(sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_gallery_images_created ON gallery_images(created_at DESC);

-- RLS Policies
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Anyone can read gallery images (public gallery page)
CREATE POLICY "Anyone can read gallery images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can do everything (admin panel)
CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- Seed the 8 existing static images
-- =============================================
INSERT INTO gallery_images (image_url, alt_text, sort_order, is_static) VALUES
  ('/Gallery/img-1.webp', 'Premium flooring installation 1', 1, true),
  ('/Gallery/img-2.webp', 'Premium flooring installation 2', 2, true),
  ('/Gallery/img-3.webp', 'Premium flooring installation 3', 3, true),
  ('/Gallery/img-4.webp', 'Premium flooring installation 4', 4, true),
  ('/Gallery/img-5.webp', 'Premium flooring installation 5', 5, true),
  ('/Gallery/img-6.webp', 'Premium flooring installation 6', 6, true),
  ('/Gallery/img-7.webp', 'Premium flooring installation 7', 7, true),
  ('/Gallery/img-8.webp', 'Premium flooring installation 8', 8, true);

-- =============================================
-- Storage Bucket: gallery-images
-- =============================================
-- Run this in the Supabase SQL editor or via the dashboard:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('gallery-images', 'gallery-images', true);
--
-- CREATE POLICY "Anyone can view gallery images"
--   ON storage.objects FOR SELECT
--   TO anon, authenticated
--   USING (bucket_id = 'gallery-images');
--
-- CREATE POLICY "Authenticated users can upload gallery images"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'gallery-images');
--
-- CREATE POLICY "Authenticated users can update gallery images"
--   ON storage.objects FOR UPDATE
--   TO authenticated
--   USING (bucket_id = 'gallery-images')
--   WITH CHECK (bucket_id = 'gallery-images');
--
-- CREATE POLICY "Authenticated users can delete gallery images"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'gallery-images');
