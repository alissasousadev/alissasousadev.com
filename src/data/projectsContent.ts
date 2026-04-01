import type { Project } from "../types/Project";

/* Lista principal de projetos do portfólio */
export const projectsContent: Project[] = [
  {
    id: 1,
    title: {
      "pt-BR": "FoodFlow",
      en: "FoodFlow",
    },
    description: {
      "pt-BR":
        "O FoodFlow é um sistema de Delivery com uma aplicação web moderna desenvolvida em React + TypeScript + Vite, projetada para gerenciar produtos, categorias e interações do usuário de forma eficiente.",
      en: "FoodFlow is a delivery platform with a modern web application built with React + TypeScript + Vite, designed to efficiently manage products, categories, and user interactions.",
    },
    image: "/media/projects/foodflow.png",
    featured: true,
    links: [
      {
        label: "deploy",
        url: "https://sistemadelivery.vercel.app/",
      },
      {
        label: "github",
        url: "https://github.com/GenStudents/SistemaDeDeliveyFrontEnd",
      },
    ],
  },
  {
    id: 2,
    title: {
      "pt-BR": "RHConnect",
      en: "RHConnect",
    },
    description: {
      "pt-BR":
        "O Sistema de Gestão de RH é uma plataforma desenvolvida para transformar e modernizar a forma como as empresas gerenciam seus Recursos Humanos.",
      en: "The HR Management System is a platform developed to transform and modernize the way companies manage their Human Resources.",
    },
    image: "/media/projects/rhconnect.png",
    featured: true,
    links: [
      {
        label: "deploy",
        url: "https://sistema-rh-frontend.vercel.app/",
      },
      {
        label: "github",
        url: "https://github.com/GenStudents/sistema_RH_Front_end",
      },
    ],
  },
  {
    id: 3,
    title: {
      "pt-BR": "Games Store",
      en: "Games Store",
    },
    description: {
      "pt-BR":
        "Este projeto representa o desenvolvimento de uma API RESTful para uma Loja de Games, permitindo o gerenciamento de Categorias e Produtos, com relacionamento entre as entidades e validações de regras de negócio.",
      en: "This project represents the development of a RESTful API for a game store, allowing the management of categories and products, with entity relationships and business rule validations.",
    },
    image: "/media/projects/gamestore.png",
    featured: true,
    links: [
      {
        label: "github",
        url: "https://github.com/alissasousadev/game-store-backend",
      },
    ],
  },

  /* Projetos da página - mais projetos */
  {
    id: 4,
    title: {
      "pt-BR": "FitTrack",
      en: "FitTrack",
    },
    description: {
      "pt-BR":
        "Aplicação voltada ao gerenciamento de treinos, combinando organização, usabilidade e uma estrutura visual limpa para rotinas fitness.",
      en: "An application focused on workout management, combining organization, usability, and a clean visual structure for fitness routines.",
    },
    image: "/media/projects/fittrack.png",
    links: [
      {
        label: "deploy",
        url: "https://fittrack-frontend-ten.vercel.app/",
      },
      {
        label: "github",
        url: "https://github.com/GenStudents/sistema_FitTrack_Front_end",
      },
    ],
  },
  {
    id: 5,
    title: {
      "pt-BR": "API Blog Pessoal",
      en: "Personal Blog API",
    },
    description: {
      "pt-BR":
        "API REST desenvolvida com NestJS, autenticação e modelagem relacional de dados, criada com foco em arquitetura limpa e manutenção.",
      en: "A REST API developed with NestJS, authentication, and relational data modeling, built with a focus on clean architecture and maintainability.",
    },
    image: "/media/projects/blog-api.png",
    links: [
      {
        label: "deploy",
        url: "https://blogpessoal-zypu.onrender.com",
      },
      {
        label: "github",
        url: "https://github.com/alissasousadev/personal-blog-backend",
      },
    ],
  },
  {
    id: 6,
    title: {
      "pt-BR": "Farmácia CRUD",
      en: "Pharmacy CRUD",
    },
    description: {
      "pt-BR":
        "Projeto backend para gerenciamento de categorias e produtos com TypeScript, NestJS e modelagem relacional.",
      en: "A backend project for category and product management using TypeScript, NestJS, and relational modeling.",
    },
    image: "/media/projects/crud-farmacia.png",
    links: [
      {
        label: "github",
        url: "https://github.com/alissasousadev/pharmacy-management-backend",
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