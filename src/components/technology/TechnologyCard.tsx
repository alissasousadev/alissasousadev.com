import type { LucideIcon } from "lucide-react";
import { Code2, Database, LayoutPanelTop, Wrench } from "lucide-react";

import type { Language } from "../../types/language";
import type { TechnologyCategory } from "../../types/technology";

interface TechnologyCardProps {
  category: TechnologyCategory;
  language: Language;
}

const categoryIcons: Record<TechnologyCategory["iconKey"], LucideIcon> = {
  frontend: LayoutPanelTop,
  backend: Code2,
  database: Database,
  tools: Wrench,
};

function TechnologyCard({ category, language }: TechnologyCardProps) {
  const Icon = categoryIcons[category.iconKey];

  return (
    <article
      className="
        group relative min-h-[150px] overflow-visible rounded-[1.7rem]
        border border-white/45 bg-white/52 px-5 pb-4 pt-7
        shadow-[0_18px_45px_rgba(29,161,242,0.10)]
        backdrop-blur-[10px]
        transition-all duration-500 ease-out
        hover:-translate-y-1 hover:scale-[1.01]
        hover:border-white/70 hover:bg-white/60
        hover:shadow-[0_26px_60px_rgba(29,161,242,0.16)]
        sm:min-h-[156px] sm:rounded-[1.9rem] sm:px-6 sm:pb-5 sm:pt-8
        lg:min-h-[158px] lg:rounded-[2rem]
      "
    >
      <div
        className="
          pointer-events-none absolute inset-0 rounded-[inherit]
          bg-gradient-to-br from-white/28 via-transparent to-transparent
          opacity-80
        "
      />

      <div
        className="
          absolute -left-3 -top-3 z-10 flex h-14 w-14 items-center justify-center
          rounded-full border border-white/20 bg-[#1f3566]
          shadow-[0_14px_24px_rgba(31,53,102,0.28)]
          transition-all duration-500 ease-out
          group-hover:-translate-y-1 group-hover:translate-x-1
          group-hover:rotate-6
          group-hover:shadow-[0_18px_30px_rgba(31,53,102,0.38)]
          sm:-left-4 sm:-top-4 sm:h-15 sm:w-15
        "
      >
        <div
          className="
            absolute inset-0 rounded-full
            bg-gradient-to-br from-white/18 to-transparent
          "
        />

        <Icon className="relative z-10 h-5 w-5 text-white sm:h-6 sm:w-6" strokeWidth={2.2} />
      </div>

      <header className="relative z-[1] mb-4 pl-4 sm:pl-5">
        <h3
          className="
            font-title font-semibold leading-none text-black
            text-[1.28rem] sm:text-[1.38rem] lg:text-[1.5rem]
          "
        >
          {category.title[language]}
        </h3>

        <span className="mt-2.5 block h-px w-full bg-black/35 transition-all duration-500 group-hover:bg-black/45" />
      </header>

      <div
        className="
          relative z-[1] flex min-h-[56px] flex-wrap items-center
          content-center gap-x-4 gap-y-4
          sm:min-h-[64px]
        "
      >
        {category.items.map((item) => (
          <div
            key={item.name}
            className="
              flex h-9 w-9 items-center justify-center
              transition-transform duration-300 ease-out
              group-hover:scale-[1.02]
              sm:h-10 sm:w-10
            "
            title={item.name}
            aria-label={item.name}
          >
            <img
              src={item.icon}
              alt={item.alt}
              className="
                h-7 w-7 object-contain
                transition-transform duration-300 ease-out
                group-hover:scale-105
                sm:h-8 sm:w-8
              "
            />
          </div>
        ))}
      </div>
    </article>
  );
}

export default TechnologyCard;