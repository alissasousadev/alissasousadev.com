import { useState } from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { Language } from "../../types/language";
import ContactModal from "../contact/ContactModal";
import Button from "../ui/Button";

interface ContactCTAProps {
  language: Language;
}

const content = {
  "pt-BR": {
    title: "Traga sua ideia. Vamos transformar em uma experiência digital.",
    description:
      "Se você precisa de um site, landing page ou aplicação web com identidade visual, usabilidade e propósito, entre em contato para conversarmos sobre o seu projeto.",
    button: "Solicitar orçamento",
  },
  en: {
    title: "Bring your idea. Let’s turn it into a digital experience.",
    description:
      "If you need a website, landing page, or web application built with visual identity, usability, and purpose, get in touch so we can talk about your project.",
    button: "Request a quote",
  },
} satisfies Record<
  Language,
  {
    title: string;
    description: string;
    button: string;
  }
>;

const socialLinks = [
  {
    href: "https://github.com/alissasousadev",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/alissasousa",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:alissasousa.dev@outlook.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://www.instagram.com/eualissasousa",
    label: "Instagram",
    icon: Instagram,
  },
];

function ContactCTA({ language }: ContactCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const copy = content[language];

  return (
    <>
      <section
        id="contact"
        className="w-full bg-black px-6 pt-12 pb-20 sm:px-8 sm:pt-14 sm:pb-24 lg:px-16 lg:pt-24 lg:pb-32"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          {/* Título principal */}
          <h2 className="max-w-6xl font-primary text-[2.2rem] leading-[1.08] font-light tracking-[-0.04em] text-white 
          sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem]">
            {copy.title}
          </h2>

          {/* Texto de apoio */}
          <p className="mt-6 max-w-3xl font-primary text-sm leading-7 text-white/70 sm:text-base sm:leading-8 md:text-lg">
            {copy.description}
          </p>

          {/* Botão principal */}
          <div className="mt-10">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="light"
              className="pl-7 pr-3 py-3"
            >
              {copy.button}
            </Button>
          </div>

          {/* Redes sociais abaixo do botão */}
          <div className="mt-8 flex items-center justify-center gap-5">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="text-white/75 transition-colors duration-300 hover:text-accent"
              >
                <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
      </section>

      

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
      />
    </>
  );
}

export default ContactCTA;