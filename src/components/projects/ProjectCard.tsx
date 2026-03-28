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
        group flex h-full flex-col overflow-hidden rounded-[2.25rem]
        border border-black/8 bg-white/70
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-soft
      "
    >
      {/* Área da imagem do projeto */}
      <div className="relative h-[210px] overflow-hidden rounded-t-[2.25rem] sm:h-[220px] lg:h-[230px]">
        <img
          src={project.image}
          alt={`Preview do projeto ${project.title}`}
          className="
            h-full w-full object-cover object-top
            transition-transform duration-500 ease-out
            group-hover:scale-[1.03]
          "
        />

        {/* Gradiente suave para integrar a imagem ao card */}
        <div
          className="
            pointer-events-none absolute inset-x-0 bottom-0 h-28
            bg-gradient-to-t from-white via-white/85 to-transparent
          "
        />
      </div>

      {/* Conteúdo textual e links */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-8 sm:pb-8">
        <h3
          className="
            font-title font-semibold text-black
            text-[2rem] leading-[0.95]
            sm:text-[2.2rem]
            md:text-[2.35rem]
          "
        >
          {project.title}
        </h3>

        <p
          className="
            mt-5 font-primary text-black
            text-[0.98rem] leading-[1.6]
            sm:text-[1rem]
            md:text-[1.03rem]
          "
        >
          {project.description[language]}
        </p>

        {/* Links do projeto */}
        <div className="mt-auto flex items-center gap-5 pt-8 text-black">
          {project.links.map((link) => (
            <a
              key={`${project.id}-${link.label}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${link.label} do projeto ${project.title}`}
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