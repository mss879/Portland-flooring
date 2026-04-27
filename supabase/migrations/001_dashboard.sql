-- =============================================
-- Migration 001: Dashboard
-- Tables: notes, page_views
-- =============================================

-- Admin Notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Page Views / Visitor Tracking
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  visitor_id TEXT NOT NULL, -- anonymous ID from cookie/fingerprint
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for fast unique visitor counts
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);

-- Insert a default note
INSERT INTO notes (content) VALUES ('Welcome to Portland Flooring Admin! Use this space to jot down important notes.');

-- RLS Policies
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Notes: only authenticated users can CRUD
CREATE POLICY "Authenticated users can manage notes"
  ON notes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Page views: anyone can insert (public tracking), only authenticated can read
CREATE POLICY "Anyone can insert page views"
  ON page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read page views"
  ON page_views FOR SELECT
  TO authenticated
  USING (true);
