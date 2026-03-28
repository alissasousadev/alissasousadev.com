import { useState } from "react";
import ContactModal from "../components/contact/ContactModal";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import About from "../components/sections/About";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Technologies from "../components/sections/Technologies";
import type { Language } from "../types/language";
import ContactCTA from "../components/sections/ContactCTA";

/* Props da Home */
interface HomeProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

function Home({ language, onLanguageChange }: HomeProps) {
  /* Controla a abertura do modal de contato */
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Navbar
        language={language}
        onLanguageChange={onLanguageChange}
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <main>
        <Hero language={language} />
        <About language={language} />
        <Technologies language={language} />
        <Projects language={language} />
        <ContactCTA language={language} />
      </main>

      <Footer />

      <ContactModal
        language={language}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}

export default Home;