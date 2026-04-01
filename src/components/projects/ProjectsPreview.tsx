import { featuredProjects } from "../../data/projectsContent";
import type { Language } from "../../types/language";
import Button from "../ui/Button";
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

function handleProjectsNavigation() {
  sessionStorage.setItem("homeReturnSection", "projects");
}

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
        <div className="mt-8 flex justify-center sm:mt-10 lg:hidden">
          <Button 
          href="/projects" 
          variant="light"
          onClick={handleProjectsNavigation}
          >
            {content.button}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProjectsPreview;