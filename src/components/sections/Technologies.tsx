import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Code2, Database, LayoutPanelTop, Wrench } from "lucide-react";

import TechnologyCard from "../technology/TechnologyCard";
import { technologyCategories } from "../../data/technologiesContent";
import type { Language } from "../../types/language";
import TechnologyIconWall from "../technology/TechnologyIconWall";
import type { TechnologyCategory } from "../../types/technology";

interface TechnologiesProps {
  language: Language;
}

const technologiesContent = {
  "pt-BR": {
    eyebrow: "STACK",
    title: "Stack principal",
    description:
      "Desenvolvo interfaces e aplicações web utilizando tecnologias que equilibram performance, usabilidade e identidade visual.",
  },
  en: {
    eyebrow: "STACK",
    title: "Core stack",
    description:
      "I develop interfaces and web applications using technologies that balance performance, usability, and visual identity.",
  },
} satisfies Record<
  Language,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
>;

const categoryIcons: Record<TechnologyCategory["iconKey"], LucideIcon> = {
  frontend: LayoutPanelTop,
  backend: Code2,
  database: Database,
  tools: Wrench,
};

function Technologies({ language }: TechnologiesProps) {
  const content = technologiesContent[language];

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    technologyCategories[0].id
  );
  const [openCategoryId, setOpenCategoryId] = useState<string>(
    technologyCategories[0].id
  );

  const activeCategory = useMemo(
    () =>
      technologyCategories.find((category) => category.id === activeCategoryId) ??
      technologyCategories[0],
    [activeCategoryId]
  );

  return (
    <section
      id="technologies"
      className="
        relative w-full overflow-hidden bg-transparent
        lg:h-screen
      "
    >
      <div
        className="
          mx-auto flex w-full max-w-[1440px] items-center
          px-5 pt-24 pb-14
          sm:px-6 sm:pt-28 sm:pb-16
          md:px-10 md:pt-28 md:pb-18
          lg:h-full lg:px-16 lg:pt-20 lg:pb-6
        "
      >
        <div
          className="
            grid w-full items-start gap-10
            lg:grid-cols-[0.86fr_1.14fr] lg:gap-8
          "
        >
          {/* Coluna esquerda */}
          <div className="flex w-full max-w-[680px] flex-col gap-10 lg:gap-12">
            <header className="max-w-[660px]">
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <span className="h-px w-8 bg-accent sm:w-10" />
                <span
                  className="
                    font-primary text-[0.78rem] font-medium uppercase tracking-[0.24em]
                    text-accent sm:text-[0.82rem]
                  "
                >
                  {content.eyebrow}
                </span>
              </div>

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
                  mt-5 max-w-[590px] font-primary text-primary
                  text-[0.98rem] leading-[1.5]
                  sm:text-[1rem]
                  md:text-[1.03rem]
                  lg:mt-6 lg:leading-[1.4]
                "
              >
                {content.description}
              </p>
            </header>

            {/* Mobile / tablet: accordion */}
            <div className="flex flex-col gap-3 lg:hidden">
              {technologyCategories.map((category) => {
                const isOpen = openCategoryId === category.id;
                const Icon = categoryIcons[category.iconKey];

                return (
                  <article
                    key={category.id}
                    className="
                      overflow-hidden rounded-[24px] border border-black/8 bg-white
                      shadow-[0_14px_35px_rgba(55,58,60,0.07)]
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenCategoryId((current) =>
                          current === category.id ? "" : category.id
                        )
                      }
                      className="
                        flex w-full items-center justify-between gap-4
                        px-5 py-4 text-left
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl
                            bg-accent/8 ring-1 ring-inset ring-accent/12
                          "
                        >
                          <Icon
                            className="h-[1rem] w-[1rem] text-accent"
                            strokeWidth={2}
                          />
                        </div>

                        <span className="font-title text-[1.25rem] font-semibold text-black">
                          {category.title[language]}
                        </span>
                      </div>

                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-primary/70 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5">
                          <p
                            className="
                              mb-4 border-t border-black/10 pt-4
                              font-primary text-[0.95rem] leading-[1.55] text-primary
                            "
                          >
                            {category.description[language]}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {category.items.map((item) => (
                              <div
                                key={item.name}
                                className="
                                  rounded-xl border border-black/8 bg-[#f8f8f8]
                                  px-3 py-2
                                "
                              >
                                <span className="font-primary text-[0.8rem] font-medium text-primary">
                                  {item.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Desktop: navegação lateral + painel ativo */}
            <div className="hidden lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-4">
              <div
                className="
                  overflow-hidden rounded-[24px] border border-black/8 bg-white/72
                  backdrop-blur-[8px]
                  shadow-[0_14px_35px_rgba(55,58,60,0.06)]
                "
              >
                {technologyCategories.map((category, index) => {
                  const isActive = activeCategoryId === category.id;
                  const Icon = categoryIcons[category.iconKey];

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategoryId(category.id)}
                      className={`
                        relative flex w-full items-center gap-3 px-4 py-4 text-left
                        transition-all duration-300
                        ${index !== technologyCategories.length - 1 ? "border-b border-black/8" : ""}
                        ${isActive ? "bg-white" : "bg-transparent hover:bg-white/60"}
                      `}
                    >
                      <Icon
                        className={`h-[0.95rem] w-[0.95rem] shrink-0 transition-colors duration-300 ${
                          isActive ? "text-accent" : "text-primary/65"
                        }`}
                        strokeWidth={2}
                      />

                      <span
                        className={`font-primary text-[0.96rem] font-medium transition-colors duration-300 ${
                          isActive ? "text-black" : "text-primary/80"
                        }`}
                      >
                        {category.title[language]}
                      </span>

                      {isActive && (
                        <span className="absolute right-0 top-1/2 h-9 w-[2px] -translate-y-1/2 rounded-full bg-accent" />
                      )}
                    </button>
                  );
                })}
              </div>

              <TechnologyCard
                category={activeCategory}
                language={language}
              />
            </div>
          </div>

          {/* Coluna direita */}
          <div className="hidden lg:block relative">
            <TechnologyIconWall />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Technologies;