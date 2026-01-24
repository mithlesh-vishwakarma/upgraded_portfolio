import { api } from "../lib/api";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
};

export const getProjects = () => api<Project[]>("/api/projects");
