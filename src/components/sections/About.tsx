import aboutProfile from "../../assets/about/about-profile.webp"
import type { Language } from "../../types/language"
import Button from "../ui/Button"

/* Props da seção About */
interface AboutProps {
  language: Language
}

/* Conteúdo da seção em dois idiomas */
const aboutContent = {
  "pt-BR": {
    eyebrow: "Sobre",
    title: "Oi.",
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
    eyebrow: "About",
    title: "Hey there.",
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
    eyebrow: string
    title: string
    buttonLabel: string
    buttonHref: string
    alt: string
    paragraphs: string[]
  }
>

/* Seção About */
function About({ language }: AboutProps) {
  const content = aboutContent[language]

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-transparent"
      aria-labelledby="about-title"
    >
      {/* Bloco superior centralizado: label da seção + título */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-20 md:px-10 lg:px-16 lg:pt-24">
        <header className="max-w-[760px]">
          <div className="mb-5 flex items-center gap-4">
            {/* Linha decorativa da seção */}
            <span className="h-px w-12 shrink-0 bg-accent" />

            {/* Nome pequeno da seção */}
            <span
              className="
                font-primary text-[0.78rem] font-medium uppercase tracking-[0.24em]
                text-accent sm:text-[0.82rem]
              "
            >
              {content.eyebrow}
            </span>
          </div>

          {/* Título principal mantendo o tamanho anterior */}
          <h2
            id="about-title"
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
        </header>
      </div>

      {/* Bloco inferior em largura total para permitir a imagem colada na borda esquerda */}
      <div
        className="
          mt-10 grid items-start gap-10
          lg:grid-cols-[640px_minmax(0,1fr)]
          lg:gap-18
        "
      >
        {/* Coluna da imagem */}
        <div className="w-full">
          <img
          src={aboutProfile}
          alt={content.alt}
          className="
          block w-full h-auto
          aspect-[1014/768]
          object-cover object-left"
          />
        </div>

        {/* Coluna de texto */}
        <div className="px-6 pb-8 md:px-10 md:pb-10 lg:px-0 lg:pr-16 lg:pb-24">
          <div className="max-w-[720px]">
            <div
              className="
                space-y-6
                font-primary text-[22px] leading-[37px] text-black/80
                sm:text-lg sm:leading-9
                lg:text-[1.35rem] lg:leading-[2.3rem]
              "
            >
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Botão do currículo */}
            <div className="mt-8 sm:mt-10">
              <Button
                href={content.buttonHref}
                target="_blank"
                rel="noreferrer"
                variant="dark"
              >
                {content.buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About