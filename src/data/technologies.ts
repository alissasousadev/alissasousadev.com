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
      {
        name: "HTML5",
        icon: "/media/technologies/icons/html5.svg",
        alt: "HTML5",
      },
      {
        name: "CSS",
        icon: "/media/technologies/icons/css.svg",
        alt: "CSS",
      },
      {
        name: "JavaScript",
        icon: "/media/technologies/icons/javascript.svg",
        alt: "JavaScript",
      },
      {
        name: "TypeScript",
        icon: "/media/technologies/icons/typescript.svg",
        alt: "TypeScript",
      },
      {
        name: "React",
        icon: "/media/technologies/icons/react.svg",
        alt: "React",
      },
      {
        name: "Tailwind CSS",
        icon: "/media/technologies/icons/tailwindcss.svg",
        alt: "Tailwind CSS",
      },
      {
        name: "Three.js",
        icon: "/media/technologies/icons/threejs.svg",
        alt: "Three.js",
      },
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
      {
        name: "Node.js",
        icon: "/media/technologies/icons/nodejs.svg",
        alt: "Node.js",
      },
      {
        name: "NestJS",
        icon: "/media/technologies/icons/nestjs.svg",
        alt: "NestJS",
      },
    ],
  },
  {
    id: "database",
    title: {
      "pt-BR": "Banco de dados",
      en: "Database",
    },
    iconKey: "database",
    items: [
      {
        name: "MySQL",
        icon: "/media/technologies/icons/mysql.svg",
        alt: "MySQL",
      },
    ],
  },
  {
    id: "tools",
    title: {
      "pt-BR": "Ferramentas",
      en: "Tools",
    },
    iconKey: "tools",
    items: [
      {
        name: "GitHub",
        icon: "/media/technologies/icons/github.svg",
        alt: "GitHub",
      },
      {
        name: "Figma",
        icon: "/media/technologies/icons/figma.svg",
        alt: "Figma",
      },
      {
        name: "Git",
        icon: "/media/technologies/icons/git.svg",
        alt: "Git",
      },
    ],
  },
];