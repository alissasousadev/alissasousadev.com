import { useState } from "react";

import ContactModal from "../components/contact/ContactModal";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ProjectCard from "../components/projects/ProjectCard";
import { moreProjects } from "../data/projectsContent";
import type { Language } from "../types/language";

/* Props da página de projetos */
interface MoreProjectsProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const pageContent = {
  "pt-BR": {
    title: "Mais projetos",
    description:
      "Desenvolvo projetos com foco em organização, clareza visual, usabilidade e estrutura limpa de código, buscando unir estética, funcionalidade e uma boa experiência de navegação.",
  },
  en: {
    title: "More projects",
    description:
      "I develop projects focused on organization, visual clarity, usability, and clean code structure, aiming to combine aesthetics, functionality, and a solid browsing experience.",
  },
} satisfies Record<
  Language,
  {
    title: string;
    description: string;
  }
>;

function MoreProjects({
  language,
  onLanguageChange,
}: MoreProjectsProps) {
  /* Controla o modal de contato */
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const content = pageContent[language];

  return (
    <>
      <Navbar
        language={language}
        onLanguageChange={onLanguageChange}
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <main
        className="
          relative w-full overflow-hidden
          pt-28 pb-20
          sm:pt-32 sm:pb-24
        "
      >
        {/* Fundo em degradê vindo do theme.css */}
        <div
          aria-hidden="true"
          className="projects-gradient absolute inset-0 z-0"
        />

        {/* Conteúdo principal */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
          {/* Cabeçalho da página */}
          <header className="max-w-[590px]">
            <h1
              className="
                font-title font-semibold text-black
                text-[2.5rem] leading-[0.95]
                sm:text-[3rem]
                md:text-[3.3rem]
                lg:whitespace-nowrap lg:text-[3.7rem]
              "
            >
              {content.title}
            </h1>

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
          </header>

          {/* Lista completa de projetos */}
          <section className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
            {moreProjects.map((project) => (
              <ProjectCard key={project.id} project={project} language={language} />
            ))}
          </section>
        </div>
      </main>

      <Footer />

      <ContactModal
        language={language}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}

export default MoreProjects;