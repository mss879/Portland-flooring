-- =======================================================
-- Migration 009: Gallery Projects (Folders)
-- Creates gallery_projects and links gallery_images to it.
-- =======================================================

-- 1. Create gallery_projects table
CREATE TABLE IF NOT EXISTS gallery_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Add project_id column to gallery_images
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES gallery_projects(id) ON DELETE CASCADE;

-- 3. Create index on project_id for querying
CREATE INDEX IF NOT EXISTS idx_gallery_images_project ON gallery_images(project_id);

-- 4. Enable Row Level Security
ALTER TABLE gallery_projects ENABLE ROW LEVEL SECURITY;

-- 5. Set up RLS Policies for gallery_projects
CREATE POLICY "Anyone can read gallery projects"
  ON gallery_projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert gallery projects"
  ON gallery_projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery projects"
  ON gallery_projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery projects"
  ON gallery_projects FOR DELETE
  TO authenticated
  USING (true);

-- 6. Insert a default project for pre-existing static showcase images
INSERT INTO gallery_projects (name, slug, sort_order)
VALUES ('Signature Collection', 'signature-collection', 1)
ON CONFLICT (name) DO NOTHING;

-- 7. Associate existing static images with the 'Signature Collection' project
UPDATE gallery_images
SET project_id = (SELECT id FROM gallery_projects WHERE slug = 'signature-collection')
WHERE is_static = true AND project_id IS NULL;
