import { Link } from "react-router-dom";
import { featuredProjects } from "../../data/projectsContent";
import type { Language } from "../../types/language";
import ProjectCard from "./ProjectCard";

/* Props do preview de projetos */
interface ProjectsPreviewProps {
  language: Language;
  showInlineButton?: boolean;
}

const previewContent = {
  "pt-BR": {
    button: "Ver mais projetos",
  },
  en: {
    button: "View more projects",
  },
} satisfies Record<
  Language,
  {
    button: string;
  }
>;

/* Lista resumida de projetos da Home */
function ProjectsPreview({
  language,
  showInlineButton = false,
}: ProjectsPreviewProps) {
  const content = previewContent[language];

  return (
    <div className="w-full">
      {/* Grid principal dos cards */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} language={language} />
        ))}
      </div>

      {/* Botão em fluxo normal: aparece só no mobile/tablet */}
      {showInlineButton && (
        <div className="mt-8 flex justify-start sm:mt-10 sm:justify-end lg:hidden">
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
      )}
    </div>
  );
}

export default ProjectsPreview;