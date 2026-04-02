import type { TechnologyCategory } from "../types/technology";

/* Dados da seção Tecnologias */
export const technologyCategories: TechnologyCategory[] = [
  {
    id: "frontend",
    title: {
      "pt-BR": "Front-end",
      en: "Front-end",
    },
    description: {
      "pt-BR":
        "Desenvolvimento de interfaces interativas, responsivas e com foco em experiência visual.",
      en: "Development of interactive, responsive interfaces focused on visual experience.",
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
    description: {
      "pt-BR":
        "Construção de APIs e regras de negócio com foco em organização, escalabilidade e manutenção.",
      en: "Building APIs and business rules focused on organization, scalability, and maintainability.",
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
    description: {
      "pt-BR":
        "Modelagem e persistência de dados com estrutura consistente e suporte ao crescimento da aplicação.",
      en: "Data modeling and persistence with a consistent structure that supports application growth.",
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
    description: {
      "pt-BR":
        "Ferramentas que apoiam versionamento, prototipação, organização do fluxo e qualidade do desenvolvimento.",
      en: "Tools that support version control, prototyping, workflow organization, and development quality.",
    },
    iconKey: "tools",
    items: [
      { name: "GitHub", iconName: "github" },
      { name: "Figma", iconName: "figma" },
      { name: "Git", iconName: "git" },
    ],
  },
];