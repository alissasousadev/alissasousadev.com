import { useEffect, useState } from "react";
import ContactModal from "../components/contact/ContactModal";
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

useEffect(() => {
    const returnSection = sessionStorage.getItem("homeReturnSection");

    if (returnSection === "projects") {
      const timeout = window.setTimeout(() => {
        const section = document.getElementById("projects");

        if (section) {
          section.scrollIntoView({ behavior: "auto", block: "start" });
        }

        sessionStorage.removeItem("homeReturnSection");
      }, 80);

      return () => window.clearTimeout(timeout);
    }
  }, []);

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
        <div className="tech-projects-gradient">
        <Technologies language={language} />
        <Projects language={language} />
        </div>
        <ContactCTA language={language} />
      </main>

      

      <ContactModal
        language={language}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}

export default Home;