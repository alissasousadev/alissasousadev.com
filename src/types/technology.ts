import type { Language } from "./language";

export type TechnologyIconName =
  | "html5"
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "tailwindcss"
  | "threejs"
  | "nodejs"
  | "nestjs"
  | "mysql"
  | "github"
  | "figma"
  | "git";

export interface TechnologyItem {
  name: string;
  iconName: TechnologyIconName;
}

export interface TechnologyCategory {
  id: string;
  title: Record<Language, string>;
  iconKey: "frontend" | "backend" | "database" | "tools";
  items: TechnologyItem[];
}