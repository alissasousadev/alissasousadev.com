import type { Language } from "./language";

export interface TechnologyItem {
  name: string;
  icon: string;
  alt: string;
}

export interface TechnologyCategory {
  id: string;
  title: Record<Language, string>;
  iconKey: "frontend" | "backend" | "database" | "tools";
  items: TechnologyItem[];
}