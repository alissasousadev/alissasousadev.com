import type { Language } from "../../types/language";
import ProjectsPreview from "../projects/ProjectsPreview";
import Button from "../ui/Button";

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

function handleProjectsNavigation() {
  sessionStorage.setItem("homeReturnSection", "projects");
}

  return (
    <section
      id="projects"
      className="
        relative w-full overflow-hidden bg-transparent
        pt-14 pb-10
        sm:pt-16 sm:pb-12
        lg:min-h-screen lg:pt-28 lg:pb-24
      "
    >

      {/* Container principal */}
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
            <Button 
            href="/projects" 
            variant="dark"
            onClick={handleProjectsNavigation}
            >
            {content.button}
          </Button>
          </div>
        </div>

        {/* Cards com botão no final apenas no mobile/tablet */}
        <div className="mt-10 sm:mt-8">
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