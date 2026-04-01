import aboutProfile from "../../assets/about/about-profile.webp"
import type { Language } from "../../types/language"
import Button from "../ui/Button"

/* Props da seção Sobre */
interface AboutProps {
  language: Language
}

/* Conteúdo da seção em dois idiomas */
const aboutContent = {
  "pt-BR": {
    title: "Sobre mim",
    buttonLabel: "currículo",
    buttonHref: "/curriculo-alissa-sousa.pdf",
    alt: "Retrato de Alissa Sousa",
    paragraphs: [
      "Sou Alissa Sousa, desenvolvedora full stack, e encontrei na tecnologia um espaço para unir lógica, criação e intenção.",
      "Desenvolvo aplicações web com foco em soluções bem estruturadas, funcionais e visualmente consistentes. Meu interesse está na construção de experiências digitais completas, conectando back-end, front-end e usabilidade para criar produtos que não apenas funcionem bem, mas também comuniquem com clareza e propósito.",
      "Acredito em uma tecnologia pensada com detalhe, consistência e sensibilidade — capaz de transformar ideias em experiências reais.",
    ],
  },
  en: {
    title: "About me",
    buttonLabel: "resume",
    buttonHref: "/resume-alissa-sousa.pdf",
    alt: "Portrait of Alissa Sousa",
    paragraphs: [
      "I’m Alissa Sousa, a full stack developer, and I found in technology a space where I can bring together logic, creativity, and intention.",
      "I build web applications focused on well-structured, functional, and visually consistent solutions. My interest lies in creating complete digital experiences, connecting back-end, front-end, and usability to develop products that not only work well, but also communicate with clarity and purpose.",
      "I believe in technology shaped by detail, consistency, and sensitivity — capable of turning ideas into real experiences.",
    ],
  },
} satisfies Record<
  Language,
  {
    title: string
    buttonLabel: string
    buttonHref: string
    alt: string
    paragraphs: string[]
  }
>

/* Seção Sobre */
function About({ language }: AboutProps) {
  const content = aboutContent[language]

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-black"
      aria-labelledby="about-title"
    >
      {/* Fundo visual da seção */}
      <div className="absolute inset-0">
        <img
          src={aboutProfile}
          alt={content.alt}
          className="
            absolute inset-0 h-full w-full object-cover
            object-[74%_center]
            sm:object-[76%_center]
            lg:object-[80%_center]
          "
        />

        {/* Base de contraste */}
        <div className="absolute inset-0 bg-black/30 sm:bg-black/24 lg:bg-black/18" />

        {/* Gradiente principal para legibilidade */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black
            via-black/78
            to-black/30
            sm:via-black/62
            lg:from-black/95
            lg:via-black/45
            lg:to-transparent
          "
        />

        {/* Camada sutil de profundidade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_38%)]" />
      </div>

      {/* Container */}
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div
          className="
            grid min-h-[100svh] items-center
            py-24
            sm:py-24
            lg:grid-cols-[1.05fr_0.95fr]
            lg:py-20
          "
        >
          {/* Coluna de texto */}
          <div className="max-w-[560px] sm:max-w-[600px]">
            {/* Cabeçalho */}
            <header className="mb-6 sm:mb-7">
              <h2
                id="about-title"
                className="
                  font-title font-semibold tracking-[-0.03em] text-white
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {content.title}
                <span className="text-white">.</span>
              </h2>
            </header>

            {/* Texto principal */}
            <div
              className="
                space-y-4
                font-primary text-[15px] leading-7 text-white/88
                sm:space-y-5 sm:text-base sm:leading-8
                lg:text-lg lg:leading-8
              "
            >
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Botão principal */}
            <div className="mt-8">
              <Button
              href={content.buttonHref}
              target="_blank"
              rel="noreferrer"
              variant="light"
              >
                {content.buttonLabel}
                </Button>
              </div>
          </div>

          {/* Coluna auxiliar para manter a composição no desktop */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default About