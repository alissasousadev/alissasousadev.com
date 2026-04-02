import type { Language } from "../../types/language"
import ProjectsPreview from "../projects/ProjectsPreview"
import Button from "../ui/Button"

/* Props da seção Projects */
interface ProjectsProps {
  language: Language
}

/* Conteúdo da seção em dois idiomas */
const sectionContent = {
  "pt-BR": {
    eyebrow: "PROJETOS",
    title: "Projetos em destaque",
    description: "Uma coleção de projetos em que trabalhei.",
    button: "Ver mais projetos",
  },
  en: {
    eyebrow: "PROJECTS",
    title: "Featured projects",
    description: "A collection of projects I have worked on.",
    button: "View more projects",
  },
} satisfies Record<
  Language,
  {
    eyebrow: string
    title: string
    description: string
    button: string
  }
>

/* Seção de projetos exibida na Home */
function Projects({ language }: ProjectsProps) {
  const content = sectionContent[language]

  /* Guarda a seção atual para o retorno da página de projetos */
  function handleProjectsNavigation() {
    sessionStorage.setItem("homeReturnSection", "projects")
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
      aria-labelledby="projects-title"
    >
      {/* Container principal da seção */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* Cabeçalho com texto à esquerda e CTA no desktop à direita */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Bloco do cabeçalho padronizado com as outras seções */}
          <header className="max-w-[760px]">
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

            {/* Título principal da seção */}
            <h2
              id="projects-title"
              className="
                font-title font-semibold tracking-[-0.03em] text-black
                text-4xl leading-[0.95]
                sm:text-5xl
                lg:text-[59px] lg:leading-[56px]
              "
            >
              {content.title}
            </h2>

            {/* Texto de apoio da seção */}
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

          {/* Botão exibido apenas no desktop */}
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

        {/* Grade de cards */}
        <div className="mt-10 sm:mt-8">
          <ProjectsPreview
            language={language}
            showInlineButton={true}
          />
        </div>
      </div>
    </section>
  )
}

export default Projects