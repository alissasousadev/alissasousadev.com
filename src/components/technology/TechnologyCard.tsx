import type { LucideIcon } from "lucide-react";
import { Code2, Database, LayoutPanelTop, Wrench } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNestjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";

import type { Language } from "../../types/language";
import type {
  TechnologyCategory,
  TechnologyIconName,
} from "../../types/technology";

interface TechnologyCardProps {
  category: TechnologyCategory;
  language: Language;
}

/* Ícones principais de cada categoria */
const categoryIcons: Record<TechnologyCategory["iconKey"], LucideIcon> = {
  frontend: LayoutPanelTop,
  backend: Code2,
  database: Database,
  tools: Wrench,
};

/* Ícones e cores oficiais das tecnologias */
const technologyIcons: Record<
  TechnologyIconName,
  { icon: IconType; color: string }
> = {
  html5: { icon: SiHtml5, color: "#E34F26" },
  css: { icon: SiCss, color: "#1572B6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  react: { icon: SiReact, color: "#61DAFB" },
  tailwindcss: { icon: SiTailwindcss, color: "#06B6D4" },
  threejs: { icon: SiThreedotjs, color: "#111111" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  nestjs: { icon: SiNestjs, color: "#E0234E" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  github: { icon: SiGithub, color: "#181717" },
  figma: { icon: SiFigma, color: "#F24E1E" },
  git: { icon: SiGit, color: "#F05032" },
};

/* Ajusta alguns nomes para uma leitura mais equilibrada */
const technologyLabels: Partial<Record<TechnologyIconName, string>> = {
  html5: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  tailwindcss: "Tailwind",
  threejs: "Three.js",
  nodejs: "Node.js",
};

function TechnologyCard({ category, language }: TechnologyCardProps) {
  const CategoryIcon = categoryIcons[category.iconKey];

  return (
    <article
      className="
        group relative min-h-[150px] overflow-visible rounded-[1.7rem]
        border border-white/60 bg-white/38 px-5 pb-4 pt-7
        shadow-[0_10px_30px_rgba(120,130,180,0.14)]
        backdrop-blur-[12px]
        transition-all duration-300 ease-out
        hover:-translate-y-[2px]
        hover:border-white/75 hover:bg-white/44
        hover:shadow-[0_14px_36px_rgba(120,130,180,0.18)]
        sm:min-h-[156px] sm:rounded-[1.9rem] sm:px-6 sm:pb-5 sm:pt-8
        lg:min-h-[158px] lg:rounded-[2rem]
      "
    >
      {/* Camada de brilho suave do card */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-[inherit]
          bg-[linear-gradient(180deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0.20)_100%)]
        "
      />

      {/* Anel interno sutil */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-[inherit]
          ring-1 ring-inset ring-white/35
        "
      />

      {/* Ícone da categoria */}
      <div
        className="
          absolute -left-3 -top-3 z-10 flex h-14 w-14 items-center justify-center
          rounded-full border border-white/65
          bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),rgba(232,235,245,0.82))]
          shadow-[0_10px_24px_rgba(130,140,180,0.18)]
          backdrop-blur-[10px]
          transition-all duration-300 ease-out
          group-hover:-translate-y-[2px]
          sm:-left-4 sm:-top-4 sm:h-15 sm:w-15
        "
      >
        <div
          className="
            absolute inset-[1px] rounded-full
            bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.28))]
          "
        />

        <CategoryIcon
          className="relative z-10 h-5 w-5 text-accent sm:h-6 sm:w-6"
          strokeWidth={2}
        />
      </div>

      {/* Cabeçalho do card */}
      <header className="relative z-[1] mb-4 pl-4 sm:pl-5">
        <h3
          className="
            font-title font-semibold leading-none text-black
            text-[1.28rem] sm:text-[1.38rem] lg:text-[1.5rem]
          "
        >
          {category.title[language]}
        </h3>

        <span className="mt-2.5 block h-px w-full bg-[#6b6b78]/28" />
      </header>

      {/* Tecnologias em badges compactos */}
      <div
        className="
          relative z-[1] flex flex-wrap items-start gap-2
          pl-4 sm:pl-5
        "
      >
        {category.items.map((item) => {
          const tech = technologyIcons[item.iconName];
          const TechIcon = tech.icon;
          const label = technologyLabels[item.iconName] ?? item.name;

          return (
            <div
              key={item.name}
              title={item.name}
              aria-label={item.name}
              className="
                inline-flex w-fit max-w-full items-center gap-1.5
                rounded-[0.55rem]
                border border-white/72 bg-white/52
                px-2 py-1
                shadow-[0_3px_10px_rgba(120,130,180,0.06)]
                transition-all duration-300 ease-out
                hover:-translate-y-[1px]
                hover:border-white/90 hover:bg-white/76
                hover:shadow-[0_7px_16px_rgba(120,130,180,0.10)]
              "
            >
              {/* Ícone menor para reduzir o peso visual do badge */}
              <TechIcon
                className="h-[0.78rem] w-[0.78rem] shrink-0"
                style={{ color: tech.color }}
              />

              {/* Texto menor e menos pesado */}
              <span
                className="
                  font-primary text-[0.74rem] font-medium leading-none
                  tracking-[-0.01em] text-primary/80
                  transition-colors duration-300
                "
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default TechnologyCard;