import { useState } from "react";
import type { Language } from "../../types/language";
import ContactModal from "../contact/ContactModal";

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

function ContactCTA({ language }: ContactCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const copy = content[language];

  return (
    <>
      <section
        id="contact"
        className="w-full bg-black px-6 py-24 sm:px-8 sm:py-28 lg:px-16 lg:py-32"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          {/* Título principal */}
          <h2 className="max-w-6xl font-primary text-[2.2rem] leading-[1.08] font-light tracking-[-0.04em] text-white sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem]">
            {copy.title}
          </h2>

          {/* Texto de apoio */}
          <p className="mt-6 max-w-3xl font-primary text-sm leading-7 text-white/70 sm:text-base sm:leading-8 md:text-lg">
            {copy.description}
          </p>

          {/* Botão principal */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 bg-white px-8 font-primary text-sm font-semibold uppercase tracking-[0.08em] text-black transition duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white"
          >
            {copy.button}
          </button>
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