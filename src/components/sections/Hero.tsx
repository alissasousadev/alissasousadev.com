import type { Language } from "../../types/language";
import HeroScene from "../three/HeroScene";

/* Props da seção Hero */
interface HeroProps {
  language: Language;
}

/* Estrutura do conteúdo traduzido da Hero */
type HeroContent = {
  greeting: string;
  title: string;
  description: string;
  aboutLabel: string;
};

/* Conteúdo traduzido da Home */
const heroCopy: Record<Language, HeroContent> = {
  "pt-BR": {
    greeting: "OLÁ, MEU NOME É ALISSA",
    title: "Developer Full Stack.",
    description:
      "Desenvolvo sites e aplicações web com foco em performance, usabilidade e identidade visual, criando experiências digitais funcionais, intuitivas e pensadas para gerar resultado.",
    aboutLabel: "Ir para a seção sobre mim",
  },
  en: {
    greeting: "HELLO, MY NAME IS ALISSA",
    title: "Developer Full Stack.",
    description:
      "I develop websites and web applications focused on performance, usability, and visual identity, creating digital experiences that are functional, intuitive, and designed to deliver results.",
    aboutLabel: "Go to about section",
  },
};

/* Classe reutilizada do título principal */
const titleTextClass =
  "text-[52px] leading-[0.95] sm:text-[68px] md:text-[78px] lg:text-[82px] lg:leading-[82px] xl:text-[94px] xl:leading-[94px]";

/* Hero principal da Home */
function Hero({ language }: HeroProps) {
  const content = heroCopy[language];

  return (
    <section
      id="home"
      aria-label={language === "pt-BR" ? "Seção inicial" : "Hero section"}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background da Hero: imagem inicial + vídeo em Three.js */}
      <div className="absolute inset-0 z-0">
        <HeroScene
          posterSrc="/media/hero/hero-cover.jpeg"
          videoSrc="/media/hero/hero-video.mp4"
        />
      </div>

      {/* Camada de contraste para proteger a leitura do texto */}
      <div className="absolute inset-0 z-10 bg-background/35" />

      {/* Conteúdo da Hero */}
      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-6 pt-[120px] pb-16 md:px-10 lg:px-16 lg:pt-[140px] lg:pb-24">
        <div className="w-full max-w-[1120px]">
          {/* Chamada superior */}
          <a
            href="#about"
            aria-label={content.aboutLabel}
            className="mb-3 inline-block font-primary text-[15px] font-bold uppercase tracking-[0.08em] text-accent transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:opacity-80 sm:text-[17px] sm:leading-[28px] lg:mb-4 lg:text-[19px] lg:leading-[31px]"
          >
            {content.greeting}
          </a>

          {/* Título principal */}
          <div className="w-full overflow-hidden">
            <h1 className="font-title font-semibold tracking-[-0.04em] text-primary">
              <span className={titleTextClass}>{content.title}</span>
            </h1>
          </div>

          {/* Texto de apoio */}
          <p className="mt-3 w-full font-primary text-[22px] leading-[34px] font-light text-primary/75 sm:text-[26px] sm:leading-[38px] lg:mt-8 lg:text-[32px] lg:leading-[45px]">
          {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;