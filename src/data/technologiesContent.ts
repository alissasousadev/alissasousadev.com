import type { TechnologyCategory } from "../types/technology";

/* Dados da seção Tecnologias */
export const technologyCategories: TechnologyCategory[] = [
  {
    id: "frontend",
    title: {
      "pt-BR": "Front-end",
      en: "Front-end",
    },
    iconKey: "frontend",
    items: [
      { name: "HTML5", iconName: "html5" },
      { name: "CSS", iconName: "css" },
      { name: "JavaScript", iconName: "javascript" },
      { name: "TypeScript", iconName: "typescript" },
      { name: "React", iconName: "react" },
      { name: "Tailwind CSS", iconName: "tailwindcss" },
      { name: "Three.js", iconName: "threejs" },
    ],
  },
  {
    id: "backend",
    title: {
      "pt-BR": "Back-end",
      en: "Back-end",
    },
    iconKey: "backend",
    items: [
      { name: "Node.js", iconName: "nodejs" },
      { name: "NestJS", iconName: "nestjs" },
    ],
  },
  {
    id: "database",
    title: {
      "pt-BR": "Banco de dados",
      en: "Database",
    },
    iconKey: "database",
    items: [{ name: "MySQL", iconName: "mysql" }],
  },
  {
    id: "tools",
    title: {
      "pt-BR": "Ferramentas",
      en: "Tools",
    },
    iconKey: "tools",
    items: [
      { name: "GitHub", iconName: "github" },
      { name: "Figma", iconName: "figma" },
      { name: "Git", iconName: "git" },
    ],
  },
];