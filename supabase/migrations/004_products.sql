-- =============================================
-- Migration 004: Products
-- Tables: products
-- =============================================

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'Hybrid Flooring' NOT NULL,
  price TEXT, -- stored as text for display flexibility (e.g., "From $45/sqm")
  is_active BOOLEAN DEFAULT true NOT NULL,
  position INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_position ON products(position);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);

-- Seed existing products
INSERT INTO products (name, description, image_url, category, position) VALUES
(
  'European Oak',
  'Timeless elegance with rich, warm undertones. Perfect for creating expansive, inviting living spaces.',
  '/european_oak.png',
  'Hybrid Flooring',
  0
),
(
  'Spotted Gum',
  'A rich mix of pale and dark brown hues with distinct wavy grain, offering a striking Australian aesthetic.',
  '/spotted_gum.png',
  'Hybrid Flooring',
  1
),
(
  'Pewter Grey',
  'Cool weathered greyish-brown oak with subtle grain, bringing a modern, sophisticated touch to any room.',
  '/pewter_grey.png',
  'Hybrid Flooring',
  2
),
(
  'Mistral Oak',
  'Pale blond ash-like wood with soft muted grain, creating a light, airy, and contemporary feel.',
  '/mistral_oak.png',
  'Hybrid Flooring',
  3
),
(
  'Blackbutt',
  'Pale yellowish brown with straight even grain, providing a clean, bright, and durable surface.',
  '/blackbutt_new.png',
  'Hybrid Flooring',
  4
),
(
  'Pale Oak',
  'Very light whitish-beige wood with delicate grain, perfect for minimalist and Scandinavian-inspired interiors.',
  '/pale_oak_new.png',
  'Hybrid Flooring',
  5
);

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anyone can read active products (public product pages)
CREATE POLICY "Anyone can read active products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);
