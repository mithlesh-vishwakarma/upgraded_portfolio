import { api } from "../lib/api";

export type Project = {
  id: string;
  name: string;
  image_url: string;
  short_description: string;
  tech_stack: string[];
  features: string[];
  challenges_solved: string;
  live_url: string;
  github_url?: string;
  project_type: string;
  start_date: string;
  end_date: string;
};

export const getProjects = () => api<Project[]>("/projects");
