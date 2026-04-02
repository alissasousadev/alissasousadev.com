import { Github, Globe } from "lucide-react";
import type { Language } from "../../types/language";
import type { Project, ProjectLinkType } from "../../types/Project";

/* Props do card de projeto */
interface ProjectCardProps {
  project: Project;
  language: Language;
}

/* Retorna o ícone correto de cada link */
function getLinkIcon(label: ProjectLinkType) {
  const iconClass = "h-6 w-6";

  switch (label) {
    case "deploy":
      return <Globe className={iconClass} />;
    case "github":
      return <Github className={iconClass} />;
    default:
      return null;
  }
}

/* Card reutilizável de projeto */
function ProjectCard({ project, language }: ProjectCardProps) {
  return (
    <article
      className="
        group flex h-full flex-col rounded-[2rem]
        border border-[#dfe6f3] bg-white
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-soft
      "
    >
      {/* Área visual superior */}
      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="relative h-[180px] overflow-hidden rounded-[1.7rem] sm:h-[190px] lg:h-[200px]">
          <img
            src={project.image}
            alt={`Preview do projeto ${project.title[language]}`}
            className="
              h-full w-full object-cover object-top
              transition-transform duration-500 ease-out
              group-hover:scale-[1.02]
            "
          />

          {/* Gradiente branco para integrar a imagem com a base do card */}
          <div
            className="
              pointer-events-none absolute inset-x-0 bottom-0 h-24
              bg-gradient-to-t from-white via-white/88 to-transparent
            "
          />
        </div>
      </div>

      {/* Conteúdo textual do card */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        {/* Nome do projeto */}
        <h3
          className="
            font-title font-semibold tracking-[-0.02em] text-black
            text-[2rem] leading-[1.05]
            sm:text-[2.1rem]
          "
        >
          {project.title[language]}
        </h3>

        {/* Descrição do projeto */}
        <p
          className="
            mt-5 font-primary text-[16px] leading-[23px] text-black/85
          "
        >
          {project.description[language]}
        </p>

        {/* Links posicionados no rodapé do card */}
        <div className="mt-auto flex items-center gap-4 pt-8 text-black">
          {project.links.map((link) => (
            <a
              key={`${project.id}-${link.label}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${link.label} do projeto ${project.title[language]}`}
              className="
                transition-all duration-300 ease-out
                hover:scale-110 hover:text-accent
              "
            >
              {getLinkIcon(link.label)}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;