-- =============================================
-- Migration 003: CRM System
-- Tables: pipeline_stages, crm_leads
-- =============================================

-- Pipeline Stages
CREATE TABLE IF NOT EXISTS pipeline_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#8c5430' NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  is_default BOOLEAN DEFAULT false NOT NULL, -- true = "New Leads" stage, cannot be deleted/renamed
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Unique constraint on position for ordering
CREATE INDEX IF NOT EXISTS idx_pipeline_stages_position ON pipeline_stages(position);

-- CRM Leads
CREATE TABLE IF NOT EXISTS crm_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Source tracking
  source_type TEXT NOT NULL CHECK (source_type IN ('inquiry', 'quote')),
  source_id UUID NOT NULL,
  
  -- Contact info
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  
  -- Quote-specific fields (nullable for inquiry-sourced leads)
  project_type TEXT,
  service_required TEXT,
  material_preference TEXT,
  estimated_area TEXT,
  project_timeline TEXT,
  additional_requirements TEXT,
  
  -- Pipeline
  stage_id UUID NOT NULL REFERENCES pipeline_stages(id) ON DELETE RESTRICT,
  position_in_stage INTEGER DEFAULT 0 NOT NULL,
  
  -- Admin notes
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_crm_leads_stage_id ON crm_leads(stage_id);
CREATE INDEX IF NOT EXISTS idx_crm_leads_source ON crm_leads(source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_crm_leads_position ON crm_leads(stage_id, position_in_stage);

-- Seed default pipeline stage: "New Leads" (immutable)
INSERT INTO pipeline_stages (name, color, position, is_default)
VALUES ('New Leads', '#3b82f6', 0, true);

-- Additional default stages
INSERT INTO pipeline_stages (name, color, position, is_default)
VALUES 
  ('Contacted', '#f59e0b', 1, false),
  ('Qualified', '#8b5cf6', 2, false),
  ('Proposal Sent', '#ec4899', 3, false),
  ('Won', '#22c55e', 4, false),
  ('Lost', '#ef4444', 5, false);

-- RLS Policies
ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;

-- Pipeline stages: authenticated only
CREATE POLICY "Authenticated users can manage pipeline stages"
  ON pipeline_stages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- CRM leads: authenticated only
CREATE POLICY "Authenticated users can manage CRM leads"
  ON crm_leads FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
