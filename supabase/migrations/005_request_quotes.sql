-- =============================================
-- Migration 005: Request Quotes
-- Tables: request_quotes
-- =============================================

CREATE TABLE IF NOT EXISTS request_quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  project_type TEXT, -- 'Residential' or 'Commercial'
  service_required TEXT,
  material_preference TEXT,
  estimated_area TEXT,
  project_timeline TEXT,
  additional_requirements TEXT,
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'read', 'archived')),
  is_in_crm BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for filtering
CREATE INDEX IF NOT EXISTS idx_request_quotes_status ON request_quotes(status);
CREATE INDEX IF NOT EXISTS idx_request_quotes_created_at ON request_quotes(created_at DESC);

-- RLS Policies
ALTER TABLE request_quotes ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a quote request (public form)
CREATE POLICY "Anyone can submit quote requests"
  ON request_quotes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view/update/delete
CREATE POLICY "Authenticated users can read quote requests"
  ON request_quotes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update quote requests"
  ON request_quotes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete quote requests"
  ON request_quotes FOR DELETE
  TO authenticated
  USING (true);
