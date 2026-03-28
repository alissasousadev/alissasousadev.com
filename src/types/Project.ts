export type ProjectLinkType = "deploy" | "github";

export interface ProjectLink {
  label: ProjectLinkType;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: {
    "pt-BR": string;
    en: string;
  };
  image: string;
  featured?: boolean;
  links: ProjectLink[];
}