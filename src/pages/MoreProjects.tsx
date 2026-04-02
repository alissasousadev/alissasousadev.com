import { useLayoutEffect, useState } from "react";
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

/* Conteúdo da página em dois idiomas */
const pageContent = {
  "pt-BR": {
    eyebrow: "PROJETOS",
    title: "Meus projetos",
    description:
      "Desenvolvo projetos com foco em organização, clareza visual, usabilidade e estrutura limpa de código, buscando unir estética, funcionalidade e uma boa experiência de navegação.",
  },
  en: {
    eyebrow: "PROJECTS",
    title: "My projects",
    description:
      "I develop projects focused on organization, visual clarity, usability, and clean code structure, aiming to combine aesthetics, functionality, and a solid browsing experience.",
  },
} satisfies Record<
  Language,
  {
    eyebrow: string;
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

  /* Garante que a página abra sempre no topo */
  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

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
        {/* Fundo em degradê da página */}
        <div
          aria-hidden="true"
          className="about-projects-gradient absolute inset-0 z-0"
        />

        {/* Conteúdo principal */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
          {/* Cabeçalho */}
          <header
            className="max-w-[760px]"
            aria-labelledby="more-projects-title"
          >
            <div className="mb-5 flex items-center gap-4">
              {/* Linha decorativa da seção */}
              <span className="h-px w-12 shrink-0 bg-accent" />

              {/* Nome pequeno da seção */}
              <span
                className="
                  font-primary text-[13px] leading-[20px]
                  font-semibold uppercase tracking-[0.35em] text-accent
                "
              >
                {content.eyebrow}
              </span>
            </div>

            {/* Título principal da página */}
            <h1
              id="more-projects-title"
              className="
                font-title font-semibold tracking-[-0.03em] text-black
                text-4xl leading-[0.95]
                sm:text-5xl
                lg:text-[59px] lg:leading-[56px]
              "
            >
              {content.title}
            </h1>

            {/* Texto de apoio da página */}
            <p
              className="
                mt-5 max-w-[580px]
                font-primary text-[16px] leading-[23px] text-black/80
                lg:mt-6
              "
            >
              {content.description}
            </p>
          </header>

          {/* Lista completa de projetos */}
          <section className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
            {moreProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                language={language}
              />
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