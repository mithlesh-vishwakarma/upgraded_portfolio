-- Migration: Create resumes table and storage bucket policy in Supabase
-- Execute this query in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    resume_url TEXT NOT NULL,
    file_size BIGINT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active resume
DROP POLICY IF EXISTS "Allow public read access to resumes" ON resumes;
CREATE POLICY "Allow public read access to resumes" ON resumes
    FOR SELECT USING (true);

-- Allow authenticated admin full access to resumes
DROP POLICY IF EXISTS "Allow admin full access to resumes" ON resumes;
CREATE POLICY "Allow admin full access to resumes" ON resumes
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Ensure storage bucket 'portfolio' exists for uploading resume PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;
