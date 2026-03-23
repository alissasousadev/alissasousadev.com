import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import type { Language } from "../types/language";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";

function Home() {
  // Controla o idioma atual do site.
  const [language, setLanguage] = useState<Language>("pt-BR");

  // Função temporária até o modal de contato ser criado.
  function handleOpenContactModal() {
    window.alert( language === "pt-BR" ? 
      "Aqui vamos abrir o modal de contato." : 
      "The contact modal will open here." );
  }

  return (
    <div 
    id="home" 
    className="min-h-screen flex flex-col text-brand-700">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onContactClick={handleOpenContactModal}
      />
      <Hero language={language} />
      <main className="flex-1">
        <section id="about" />
        <section id="projects" />
      </main>
      <Footer />
    </div>
  );
}

export default Home;