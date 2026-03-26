import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import type { Language } from "../types/language";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import ContactModal from "../components/contact/ContactModal";
import About from "../components/sections/About";

function Home() {
  // Controla o idioma atual do site.
  const [language, setLanguage] = useState<Language>("pt-BR");

  // Controla abertura e fechamento do modal de contato.
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Abre o modal quando clicar em "Contato" na navbar.
  function handleOpenContactModal() {
    setIsContactModalOpen(true);
  }

  // Fecha o modal.
  function handleCloseContactModal() {
    setIsContactModalOpen(false);
  }

  return (
    <div id="home" className="flex min-h-screen flex-col text-brand-700">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onContactClick={handleOpenContactModal}
      />

      <Hero language={language} />
      <About language={language} />

      <main className="flex-1">
        <section id="about" />
        <section id="projects" />
      </main>

      <Footer />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        language={language}
      />
    </div>
  );
}

export default Home;