-- Drop obsolete project child tables
DROP TABLE IF EXISTS project_tags CASCADE;
DROP TABLE IF EXISTS project_journey CASCADE;
DROP TABLE IF EXISTS project_problems CASCADE;
DROP TABLE IF EXISTS project_solutions CASCADE;
DROP TABLE IF EXISTS project_tech_stack CASCADE;
DROP TABLE IF EXISTS project_results CASCADE;
DROP TABLE IF EXISTS project_resources CASCADE;

-- Drop and recreate projects table with the updated schema
DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    image_url TEXT,
    short_description TEXT NOT NULL,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    challenges_solved TEXT NOT NULL,
    live_url TEXT,
    github_url TEXT,
    project_type TEXT NOT NULL DEFAULT 'Personal', -- 'Personal' or 'Freelanced'
    start_date TEXT, -- e.g., 'Oct 2023'
    end_date TEXT,   -- e.g., 'Mar 2024' or 'Present'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
CREATE POLICY "Allow public read access" ON projects
    FOR SELECT USING (true);

-- Allow authenticated admin to perform all CRUD operations
CREATE POLICY "Allow admin full access" ON projects
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Ensure storage bucket 'portfolio' exists for uploading project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket security policies for 'portfolio' bucket
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin Insert Access" ON storage.objects;
CREATE POLICY "Admin Insert Access" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
CREATE POLICY "Admin Update Access" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin Delete Access" ON storage.objects;
CREATE POLICY "Admin Delete Access" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'portfolio');
