import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { Language } from "../../types/language";

interface NavbarProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onContactClick: () => void;
}

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/alissasousa/",
    ariaLabel: "LinkedIn",
    icon: Linkedin,
    isExternal: true,
  },
  {
    href: "https://github.com/alissasousadev",
    ariaLabel: "GitHub",
    icon: Github,
    isExternal: true,
  },
  {
    href: "mailto:alissasousa.dev@outlook.com",
    ariaLabel: "Email",
    icon: Mail,
    isExternal: false,
  },
  {
    href: "https://www.instagram.com/eualissasousa",
    ariaLabel: "Instagram",
    icon: Instagram,
    isExternal: true,
  },
];

/* Seções monitoradas para destaque */
const sectionIds = ["about", "technologies", "projects", "contact"] as const;

/* Textos da navbar */
const navbarCopy = {
  "pt-BR": {
    about: "sobre mim",
    tech: "tecnologias",
    projects: "projetos",
    contact: "contato",
    sayHello: "fale comigo",
    changeToEnglish: "Mudar para inglês",
    changeToPortuguese: "Mudar para português",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    goHome: "Ir para o início",
  },
  en: {
    about: "about me",
    tech: "tech",
    projects: "projects",
    contact: "contact",
    sayHello: "say hello",
    changeToEnglish: "Change to English",
    changeToPortuguese: "Change to Portuguese",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    goHome: "Go to home",
  },
} satisfies Record<
  Language,
  {
    about: string;
    tech: string;
    projects: string;
    contact: string;
    sayHello: string;
    changeToEnglish: string;
    changeToPortuguese: string;
    openMenu: string;
    closeMenu: string;
    goHome: string;
  }
>;

function Navbar({
  language,
  onLanguageChange,
  onContactClick,
}: NavbarProps) {
  const content = navbarCopy[language];
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = useMemo(
    () => [
      { id: "about", label: content.about, href: "#about" },
      { id: "technologies", label: content.tech, href: "#technologies" },
      { id: "projects", label: content.projects, href: "#projects" },
    ],
    [content.about, content.tech, content.projects]
  );

  /* Detecta seção ativa no scroll */
  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + 140;
      let currentSection: string | null = null;

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);

        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = sectionId;
          break;
        }
      }

      setActiveSection(currentSection);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Trava scroll no menu mobile */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  /* Ao voltar para home, rola para a seção salva */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const savedSection = sessionStorage.getItem("homeReturnSection");

    if (!savedSection) return;

    const timer = window.setTimeout(() => {
      const section = document.getElementById(savedSection);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setActiveSection(savedSection);
      }

      sessionStorage.removeItem("homeReturnSection");
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
  }

  function handleGoHome(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    setActiveSection(null);
    closeMobileMenu();
    sessionStorage.removeItem("homeReturnSection");

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleNavigationClick(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) {
    event.preventDefault();
    closeMobileMenu();

    if (location.pathname !== "/") {
      sessionStorage.setItem("homeReturnSection", sectionId);
      navigate("/");
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(sectionId);
  }

  function handleContactClick(event?: MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    setActiveSection("contact");
    closeMobileMenu();
    onContactClick();
  }

  return (
    <>
      {/* Header fixo */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Marca / Home */}
            <a
              href="#home"
              onClick={handleGoHome}
              aria-label={content.goHome}
              className="flex shrink-0 items-center gap-3"
            >
              

              <span className="font-primary text-[1.05rem] font-bold tracking-[-0.01em] text-black transition-colors 
              duration-300 hover:text-accent md:text-[1.12rem]">
                Alissa Sousa
              </span>
            </a>

            {/* Navegação desktop */}
            <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
              <nav
                aria-label={
                  language === "pt-BR" ? "Navegação principal" : "Main navigation"
                }
                className="flex items-center gap-7 lg:gap-9"
              >
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(event) => handleNavigationClick(event, item.id)}
                      className="group relative py-2 font-primary text-[1rem] font-semibold text-black/85 transition-opacity 
                      duration-300 hover:opacity-80"
                    >
                      {item.label}

                      <span
                        className={`absolute -bottom-[10px] left-0 h-[3px] bg-accent transition-all duration-300 ease-out ${
                          isActive
                            ? "w-full opacity-100"
                            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                        }`}
                      />
                    </a>
                  );
                })}

                <button
                  type="button"
                  onClick={handleContactClick}
                  className="group relative py-2 font-primary text-[1rem] font-semibold text-black/85 transition-opacity 
                  duration-300 hover:opacity-80"
                >
                  {content.contact}

                  <span
                    className={`absolute -bottom-[10px] left-0 h-[3px] bg-accent transition-all duration-300 ease-out ${
                      activeSection === "contact"
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                </button>
              </nav>

              {/* Idioma desktop: PT | EN lado a lado */}
              <div className="flex items-center rounded-full bg-black/5 p-1">
                <button
                  type="button"
                  onClick={() => onLanguageChange("pt-BR")}
                  aria-label={content.changeToPortuguese}
                  className={`rounded-full px-4 py-2 font-primary text-[0.92rem] font-semibold uppercase transition-all duration-300 ${
                    language === "pt-BR"
                      ? "bg-black text-white shadow-sm"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  PT
                </button>

                <button
                  type="button"
                  onClick={() => onLanguageChange("en")}
                  aria-label={content.changeToEnglish}
                  className={`rounded-full px-4 py-2 font-primary text-[0.92rem] font-semibold uppercase transition-all duration-300 ${
                    language === "en"
                      ? "bg-black text-white shadow-sm"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão do menu mobile */}
      <button
        type="button"
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMobileMenuOpen ? content.closeMenu : content.openMenu}
        className="fixed right-6 top-6 z-[100] flex h-11 w-11 items-center justify-center md:hidden"
      >
        <span className="relative block h-6 w-7">
          <span
            className={`absolute left-0 block h-[2px] w-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMobileMenuOpen
                ? "top-[11px] rotate-45 bg-white"
                : "top-0 bg-black"
            }`}
          />

          <span
            className={`absolute left-0 top-[11px] block h-[2px] w-7 transition-all duration-300 ${
              isMobileMenuOpen
                ? "scale-x-0 opacity-0 bg-white"
                : "scale-x-100 opacity-100 bg-black"
            }`}
          />

          <span
            className={`absolute left-0 block h-[2px] w-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMobileMenuOpen
                ? "top-[11px] -rotate-45 bg-white"
                : "top-[22px] bg-black"
            }`}
          />
        </span>
      </button>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/12 transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute right-0 top-0 h-[310vmax] w-[220vmax] translate-x-1/2 -translate-y-1/2 rounded-full 
              bg-black transition-transform duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMobileMenuOpen ? "scale-100" : "scale-0"
            }`}
          />
        </div>

        <div
          className={`relative grid h-full place-items-center px-10 transition-all duration-500 ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-5 opacity-0 delay-0"
          }`}
        >
          <div className="w-full max-w-[320px]">
            <nav
              aria-label={
                language === "pt-BR"
                  ? "Navegação mobile principal"
                  : "Mobile main navigation"
              }
              className="flex flex-col gap-8"
            >
              <a
                href="#about"
                onClick={(event) => handleNavigationClick(event, "about")}
                className="font-primary text-[2rem] font-semibold leading-none text-white transition-opacity 
                duration-300 hover:opacity-80"
              >
                {content.about}
              </a>

              <a
                href="#technologies"
                onClick={(event) =>
                  handleNavigationClick(event, "technologies")
                }
                className="font-primary text-[2rem] font-semibold leading-none text-white transition-opacity duration-300 
                hover:opacity-80"
              >
                {content.tech}
              </a>

              <a
                href="#projects"
                onClick={(event) => handleNavigationClick(event, "projects")}
                className="font-primary text-[2rem] font-semibold leading-none text-white transition-opacity duration-300 
                hover:opacity-80"
              >
                {content.projects}
              </a>

              <button
                type="button"
                onClick={handleContactClick}
                className="w-fit text-left font-primary text-[2rem] font-semibold leading-none text-white transition-opacity 
                duration-300 hover:opacity-80"
              >
                {content.contact}
              </button>
            </nav>

            <div className="mt-14">
              <p className="mb-5 font-primary text-[1.05rem] font-medium uppercase tracking-[0.08em] text-white/45">
                {content.sayHello}
              </p>

              <div className="flex items-center gap-5">
                {socialLinks.map(({ href, ariaLabel, icon: Icon, isExternal }) => (
                  <a
                    key={ariaLabel}
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    aria-label={ariaLabel}
                    className="transition-opacity duration-300 hover:opacity-75"
                  >
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.4} />
                  </a>
                ))}
              </div>

              {/* Idioma mobile: PT | EN lado a lado */}
              <div className="mt-12 inline-flex items-center rounded-full bg-white/10 p-1">
                <button
                  type="button"
                  onClick={() => onLanguageChange("pt-BR")}
                  aria-label={content.changeToPortuguese}
                  className={`rounded-full px-4 py-2 font-primary text-[0.92rem] font-semibold uppercase
                    transition-all duration-300 ${
                    language === "pt-BR"
                      ? "bg-white text-black"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  PT
                </button>

                <button
                  type="button"
                  onClick={() => onLanguageChange("en")}
                  aria-label={content.changeToEnglish}
                  className={`rounded-full px-4 py-2 font-primary text-[0.92rem] font-semibold 
                    uppercase transition-all duration-300 ${
                    language === "en"
                      ? "bg-white text-black"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;