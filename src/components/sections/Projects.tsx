import { Link } from "react-router-dom";

import type { Language } from "../../types/language";
import ProjectsPreview from "../projects/ProjectsPreview";

/* Props da seção Projects */
interface ProjectsProps {
  language: Language;
}

const sectionContent = {
  "pt-BR": {
    title: "Projetos",
    description: "Uma coleção de projetos em que trabalhei.",
    button: "Ver mais projetos",
  },
  en: {
    title: "Projects",
    description: "A collection of projects I have worked on.",
    button: "View more projects",
  },
} satisfies Record<
  Language,
  {
    title: string;
    description: string;
    button: string;
  }
>;

/* Seção de projetos exibida na Home */
function Projects({ language }: ProjectsProps) {
  const content = sectionContent[language];

  return (
    <section
      id="projects"
      className="
        relative w-full overflow-hidden
        pt-14 pb-20
        sm:pt-16 sm:pb-24
        lg:min-h-screen lg:pt-28 lg:pb-24
      "
    >
      {/* Fundo em degradê vindo do theme.css */}
      <div
        aria-hidden="true"
        className="projects-gradient absolute inset-0 z-0"
      />

      {/* Container principal alinhado com a navbar */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* Cabeçalho e CTA do desktop */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Título e descrição */}
          <div className="max-w-[590px]">
            <h2
              className="
                font-title font-semibold text-black
                text-[2.5rem] leading-[0.95]
                sm:text-[3rem]
                md:text-[3.3rem]
                lg:whitespace-nowrap lg:text-[3.7rem]
              "
            >
              {content.title}
            </h2>

            <p
              className="
                mt-5 max-w-[590px] font-primary text-black
                text-[0.98rem] leading-[1.5]
                sm:text-[1rem]
                md:text-[1.03rem]
                lg:mt-6 lg:leading-[1.4]
              "
            >
              {content.description}
            </p>
          </div>

          {/* Botão no desktop, ao lado direito do cabeçalho */}
          <div className="hidden lg:flex lg:justify-end">
            <Link
              to="/projects"
              className="
                inline-flex items-center gap-3 rounded-full
                border border-black/10 bg-black px-7 py-4
                font-primary text-base font-medium text-white
                transition-all duration-300 ease-out
                hover:-translate-y-0.5 hover:bg-primary
              "
            >
              <span>{content.button}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Cards com botão no final apenas no mobile/tablet */}
        <div className="mt-10 sm:mt-12">
          <ProjectsPreview
            language={language}
            showInlineButton={true}
          />
        </div>
      </div>
    </section>
  );
}

export default Projects;