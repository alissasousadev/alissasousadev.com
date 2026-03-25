import { useState } from "react";
import type { Language } from "../../types/language";
import ContactModal from "../contact/ContactModal";

interface ContactCTAProps {
  language: Language;
}

const content = {
  "pt-BR": {
    title: "Vamos conversar sobre o seu projeto?",
    description:
      "Estou disponível para oportunidades, freelas e novas conexões profissionais.",
    button: "Entrar em contato",
  },
  en: {
    title: "Shall we talk about your project?",
    description:
      "I am available for opportunities, freelance work, and new professional connections.",
    button: "Get in touch",
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
        className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center"
      >
        <h2 className="font-title text-4xl font-semibold text-primary sm:text-5xl">
          {copy.title}
        </h2>

        <p className="mt-4 max-w-2xl font-primary text-base leading-8 text-primary/75">
          {copy.description}
        </p>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 font-primary text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-accent"
        >
          {copy.button}
        </button>
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