import TechnologyCard from "../technology/TechnologyCard";
import TechnologyVisual from "../technology/TechnologyVisual";
import { technologyCategories } from "../../data/technologies";
import type { Language } from "../../types/language";

interface TechnologiesProps {
  language: Language;
}

const technologiesContent = {
  "pt-BR": {
    title: "Tecnologias principais",
    description:
      "Desenvolvo interfaces e aplicações web utilizando tecnologias que equilibram performance, usabilidade e identidade visual.",
  },
  en: {
    title: "Core technologies",
    description:
      "I develop interfaces and web applications using technologies that balance performance, usability, and visual identity.",
  },
} satisfies Record<
  Language,
  {
    title: string;
    description: string;
  }
>;

function Technologies({ language }: TechnologiesProps) {
  const content = technologiesContent[language];

  return (
    <section
      id="technologies"
      className="
        relative w-full overflow-hidden bg-[#D9E2FE]
        scroll-mt-24 lg:h-screen lg:scroll-mt-32
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {technologyCategories.map((category) => (
                <TechnologyCard
                  key={category.id}
                  category={category}
                  language={language}
                />
              ))}
            </div>
          </div>

          {/* Coluna direita */}
          <div className="hidden lg:block relative">
            
              <TechnologyVisual />
            </div>
          </div>
        </div>
    </section>
  );
}

export default Technologies;