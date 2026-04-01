import { useState } from "react";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiGsap,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNestjs,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiSwagger,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";

/* Estrutura de cada item exibido na grade */
type TechnologyLogo = {
  id: string;
  name: string;
  icon: IconType;
  color: string;
};

/* Lista fixa das tecnologias exibidas na coluna direita */
const technologyLogos: TechnologyLogo[] = [
  { id: "html", name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { id: "css", name: "CSS", icon: SiCss, color: "#1572B6" },
  { id: "javascript", name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { id: "typescript", name: "TypeScript", icon: SiTypescript, color: "#3178C6" },

  { id: "react", name: "React", icon: SiReact, color: "#61DAFB" },
  { id: "nodejs", name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { id: "nestjs", name: "NestJS", icon: SiNestjs, color: "#E0234E" },
  { id: "mysql", name: "MySQL", icon: SiMysql, color: "#4479A1" },

  { id: "git", name: "Git", icon: SiGit, color: "#F05032" },
  { id: "github", name: "GitHub", icon: SiGithub, color: "#181717" },
  { id: "figma", name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { id: "tailwind", name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },

  { id: "threejs", name: "Three.js", icon: SiThreedotjs, color: "#111111" },
  { id: "php", name: "PHP", icon: SiPhp, color: "#777BB4" },
  { id: "gsap", name: "GSAP", icon: SiGsap, color: "#88CE02" },
  { id: "swagger", name: "Swagger", icon: SiSwagger, color: "#85EA2D" },
];

/* Painel visual exibido apenas no desktop */
function TechnologyIconWall() {
  /* Controla qual item está em hover para liberar a cor original do ícone */
  const [hoveredLogoId, setHoveredLogoId] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/*painel encostado à direita*/}
      <div className="ml-auto grid w-full max-w-[620px] grid-cols-4 gap-3 xl:gap-1">
        {technologyLogos.map((technology) => {
          const Icon = technology.icon;
          const isHovered = hoveredLogoId === technology.id;

          return (
            <div
              key={technology.id}
              title={technology.name}
              aria-label={technology.name}
              onMouseEnter={() => setHoveredLogoId(technology.id)}
              onMouseLeave={() => setHoveredLogoId(null)}
              className="
                group flex aspect-square items-center justify-center
                rounded-[24px] border border-transparent bg-transparent
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:rounded-[28px]
                hover:border-white/20
                hover:bg-white/10
                hover:shadow-[0_18px_40px_rgba(55,58,60,0.10)]
              "
            >
              {/* cor da tecnologia + leve destaque. */}
              <Icon
                className="
                  text-[2.7rem] transition-all duration-300 ease-out
                  xl:text-[2.9rem]
                  group-hover:scale-[1.06]
                "
                style={{
                  color: isHovered ? technology.color : "#7F8795",
                  filter: isHovered
                    ? "drop-shadow(0 8px 20px rgba(255,255,255,0.08))"
                    : "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TechnologyIconWall;