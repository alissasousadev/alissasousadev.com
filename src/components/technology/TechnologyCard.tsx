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
        h-full min-h-[248px] w-full rounded-[28px] border border-black/8 bg-white
        px-6 py-6 shadow-[0_18px_42px_rgba(55,58,60,0.08)]
      "
    >
      <header className="mb-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl
              bg-accent/8 ring-1 ring-inset ring-accent/12
            "
          >
            <CategoryIcon
              className="h-[1.15rem] w-[1.15rem] text-accent"
              strokeWidth={2}
            />
          </div>

          <h3
            className="
              font-title text-[1.9rem] font-semibold leading-none text-black
            "
          >
            {category.title[language]}
          </h3>
        </div>

        <p
          className="
            mt-5 max-w-[420px] font-primary text-[0.98rem] leading-[1.55] text-primary
          "
        >
          {category.description[language]}
        </p>

        <span className="mt-5 block h-px w-full bg-black/10" />
      </header>

      <div className="flex flex-wrap items-start gap-2.5">
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
                inline-flex max-w-full items-center gap-2 rounded-xl
                border border-black/8 bg-[#f8f8f8]
                px-3 py-2 transition-all duration-300 ease-out
                hover:-translate-y-[1px]
                hover:bg-white
                hover:shadow-[0_8px_18px_rgba(55,58,60,0.08)]
              "
            >
              <TechIcon
                className="h-[0.9rem] w-[0.9rem] shrink-0"
                style={{ color: tech.color }}
              />

              <span
                className="
                  font-primary text-[0.8rem] font-medium leading-none
                  tracking-[-0.01em] text-primary
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