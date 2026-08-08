-- Migration: Add sort_order to projects table
-- Execute this query in your Supabase SQL Editor to enable custom sorting of projects.

ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;
