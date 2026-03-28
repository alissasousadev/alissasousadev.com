import type { Project } from "../types/Project";


/* Lista principal de projetos do portfólio */
export const projectsContent: Project[] = [
  {
    id: 1,
    title: "Domposer",
    description: {
      "pt-BR":
        "Domposer é um construtor de sites com interface visual que permite organizar HTML e CSS com rapidez, enviar arquivos, baixar projetos e salvar trabalhos com um fluxo de edição prático.",
      en: "Domposer is a website builder with a visual interface that allows users to quickly organize HTML and CSS, upload files, download projects, and save work with a practical editing flow.",
    },
    image: "/media/projects/domposer.png",
    featured: true,
    links: [
      {
        label: "deploy",
        url: "https://seu-deploy.com",
      },
      {
        label: "github",
        url: "https://github.com/seuusuario/domposer",
      },
    ],
  },
  {
    id: 2,
    title: "Bay.js",
    description: {
      "pt-BR":
        "Uma biblioteca leve de web components, focada em simplicidade, reutilização e integração fácil em projetos, sem exigir uma configuração complexa.",
      en: "A lightweight web components library focused on simplicity, reusability, and easy integration into projects without requiring a complex setup.",
    },
    image: "/media/projects/bayjs.png",
    featured: true,
    links: [
      {
        label: "deploy",
        url: "https://seu-deploy.com",
      },
      {
        label: "github",
        url: "https://github.com/seuusuario/bayjs",
      },
    ],
  },
  {
    id: 3,
    title: "Cookiemunch",
    description: {
      "pt-BR":
        "Um plugin minimalista de cookies que ajuda usuários a escolher quais cookies aceitar ou recusar, com opções de personalização para tema e integração em diferentes interfaces.",
      en: "A minimal cookie plugin that helps users choose which cookies to accept or decline, with customization options for theme and integration into different interfaces.",
    },
    image: "/media/projects/cookiemunch.png",
    featured: true,
    links: [
      {
        label: "deploy",
        url: "https://seu-deploy.com",
      },
      {
        label: "github",
        url: "https://github.com/seuusuario/cookiemunch",
      },
    ],
  },
  {
    id: 4,
    title: "FitTrack",
    description: {
      "pt-BR":
        "Aplicação voltada ao gerenciamento de treinos, combinando organização, usabilidade e uma estrutura visual limpa para rotinas fitness.",
      en: "An application focused on workout management, combining organization, usability, and a clean visual structure for fitness routines.",
    },
    image: "/media/projects/fittrack.png",
    links: [
      {
        label: "deploy",
        url: "https://seu-deploy.com",
      },
      {
        label: "github",
        url: "https://github.com/seuusuario/fittrack",
      },
    ],
  },
  {
    id: 5,
    title: "Blog Pessoal API",
    description: {
      "pt-BR":
        "API REST desenvolvida com NestJS, autenticação e modelagem relacional de dados, criada com foco em arquitetura limpa e manutenção.",
      en: "A REST API developed with NestJS, authentication, and relational data modeling, built with a focus on clean architecture and maintainability.",
    },
    image: "/media/projects/blog-api.png",
    links: [
      {
        label: "deploy",
        url: "https://seu-deploy.com",
      },
      {
        label: "github",
        url: "https://github.com/seuusuario/blog-api",
      },
    ],
  },
  {
    id: 6,
    title: "CRUD Farmácia",
    description: {
      "pt-BR":
        "Projeto backend para gerenciamento de categorias e produtos com TypeScript, NestJS e modelagem relacional.",
      en: "A backend project for category and product management using TypeScript, NestJS, and relational modeling.",
    },
    image: "/media/projects/crud-farmacia.png",
    links: [
      {
        label: "deploy",
        url: "https://seu-deploy.com",
      },
      {
        label: "github",
        url: "https://github.com/seuusuario/crud-farmacia",
      },
    ],
  },
];

/* Projetos em destaque na Home */
export const featuredProjects = projectsContent.filter(
  (project) => project.featured
);

/* Projetos exibidos na página completa */
export const moreProjects = projectsContent;