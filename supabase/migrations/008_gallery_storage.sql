-- =============================================
-- Migration 008: Gallery Storage Bucket
-- Creates the gallery-images storage bucket
-- and its access policies
-- =============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view gallery images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can update gallery images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery-images')
  WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can delete gallery images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery-images');
