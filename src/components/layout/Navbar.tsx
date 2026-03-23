import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

import alissaLogo from "../../assets/logos/alissa-logo.svg";
import { navbarContent } from "../../data/navbarContent";
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

/* destacar item ativo no desktop / permitir rolagem suave na navegação */
const sectionIds = ["about", "projects", "contact"] as const;

function Navbar({
  language,
  onLanguageChange,
  onContactClick,
}: NavbarProps) {
  const content = navbarContent[language];

  /*Controla qual seção está ativa no momento.*/
  const [activeSection, setActiveSection] = useState<string | null>(null);

  /*Controla a abertura do menu mobile.*/
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /*Itens principais da navegação.*/
  const navigationItems = useMemo(
    () => [
      { id: "about", label: content.about, href: "#about" },
      { id: "projects", label: content.projects, href: "#projects" },
    ],
    [content.about, content.projects]
  );

  /*Detecta a seção visível durante o scroll para destacar*/
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

  /*Trava o scroll da página enquanto o menu mobile estiver aberto.*/
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
  }

  /*Volta suavemente para o topo da página - quando clica na logo/nome*/
  function handleGoHome(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveSection(null);
    closeMobileMenu();
  }

  /*Rola suavemente até a seção clicada.*/
  function handleNavigationClick(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(sectionId);
    closeMobileMenu();
  }

  /*Mantém o comportamento atual do contato vindo por props /fecha o menu mobile e marca a seção como ativa.*/
  function handleContactClick(event?: MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    setActiveSection("contact");
    closeMobileMenu();
    onContactClick();
  }

  return (
    <>
      {/* Header fixo da navegação */}
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Marca / Home: clicar na imagem ou no nome leva ao topo */}
            <a
              href="#home"
              onClick={handleGoHome}
              aria-label={language === "pt-BR" ? "Ir para o início" : "Go to home"}
              className="flex shrink-0 items-center gap-2"
            >
              <img
                src={alissaLogo}
                alt=""
                aria-hidden="true"
                className="h-9 w-9 object-contain md:h-10 md:w-10"
              />

              <span className="font-primary text-[1.2rem] font-bold text-primary transition-colors duration-300 hover:text-accent md:text-[1.rem]">
                Alissa Sousa
              </span>
            </a>

            {/* Navegação desktop: Sobre, Projetos e Contato */}
            <div className="hidden md:flex md:items-center">
              <nav
                aria-label={
                  language === "pt-BR" ? "Navegação principal" : "Main navigation"
                }
                className="flex items-center"
              >
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(event) => handleNavigationClick(event, item.id)}
                      className="group relative px-5 py-3 font-primary text-[1rem] font-semibold text-primary transition-opacity duration-300 hover:opacity-80"
                    >
                      {item.label}

                      {/* Linha inferior suave exibida apenas no hover */}
                      <span
                        className={`absolute bottom-0 left-5 right-5 block h-[3px] origin-left bg-accent/20 transition-transform duration-300 ease-out ${
                          isActive
                            ? "scale-x-0"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />

                      {/* Linha inferior permanente da seção ativa */}
                      <span
                        className={`absolute bottom-0 left-5 right-5 block h-[3px] origin-left bg-accent transition-transform duration-300 ease-out ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  );
                })}

                {/* Item Contato */}
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="group relative px-5 py-3 font-primary text-[1rem] font-semibold text-primary transition-opacity duration-300 hover:opacity-80"
                >
                  {content.contact}

                  {/* Linha inferior suave no hover */}
                  <span
                    className={`absolute bottom-0 left-5 right-5 block h-[3px] origin-left bg-accent/20 transition-transform duration-300 ease-out ${
                      activeSection === "contact"
                        ? "scale-x-0"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />

                  {/* Linha inferior permanente quando Contato está ativo */}
                  <span
                    className={`absolute bottom-0 left-5 right-5 block h-[3px] origin-left bg-accent transition-transform duration-300 ease-out ${
                      activeSection === "contact" ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </nav>

              {/* Alternador de idioma no desktop */}
              <div className="ml-2 flex items-center gap-3 font-primary text-[1rem] text-primary lg:ml-4">
                <button
                  type="button"
                  onClick={() => onLanguageChange("en")}
                  aria-label={content.changeToEnglish}
                  className={`transition-opacity duration-300 ${
                    language === "en"
                      ? "text-primary"
                      : "text-primary/65 hover:text-primary"
                  }`}
                >
                  EN
                </button>

                <span className="text-primary/60">|</span>

                <button
                  type="button"
                  onClick={() => onLanguageChange("pt-BR")}
                  aria-label={content.changeToPortuguese}
                  className={`transition-opacity duration-300 ${
                    language === "pt-BR"
                      ? "text-primary"
                      : "text-primary/65 hover:text-primary"
                  }`}
                >
                  PT
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
          {/* Linha superior do hambúrguer / X */}
          <span
            className={`absolute left-0 block h-[2px] w-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMobileMenuOpen
                ? "top-[11px] rotate-45 bg-white"
                : "top-0 bg-primary"
            }`}
          />

          {/* Linha central do hambúrguer */}
          <span
            className={`absolute left-0 top-[11px] block h-[2px] w-7 transition-all duration-300 ${
              isMobileMenuOpen
                ? "scale-x-0 opacity-0 bg-white"
                : "scale-x-100 opacity-100 bg-primary"
            }`}
          />

          {/* Linha inferior do hambúrguer / X */}
          <span
            className={`absolute left-0 block h-[2px] w-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMobileMenuOpen
                ? "top-[11px] -rotate-45 bg-white"
                : "top-[22px] bg-primary"
            }`}
          />
        </span>
      </button>

      {/* Overlay do menu mobile */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Camada de apoio para suavizar a entrada do fundo */}
        <div
          className={`absolute inset-0 bg-primary/12 transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Círculo expansivo que revela o fundo do menu */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute right-0 top-0 h-[310vmax] w-[220vmax] translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-transform duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMobileMenuOpen ? "scale-100" : "scale-0"
            }`}
          />
        </div>

        {/* Conteúdo interno do menu mobile */}
        <div
          className={`relative grid h-full place-items-center px-10 transition-all duration-500 ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-5 opacity-0 delay-0"
          }`}
        >
          <div className="w-full max-w-[320px]">
            {/* Navegação mobile: Sobre, Projetos e Contato */}
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
                className="font-primary text-[2rem] font-semibold leading-none text-white transition-opacity duration-300 hover:opacity-80"
              >
                {content.about}
              </a>

              <a
                href="#projects"
                onClick={(event) => handleNavigationClick(event, "projects")}
                className="font-primary text-[2rem] font-semibold leading-none text-white transition-opacity duration-300 hover:opacity-80"
              >
                {content.projects}
              </a>

              <button
                type="button"
                onClick={handleContactClick}
                className="w-fit text-left font-primary text-[2rem] font-semibold leading-none text-white transition-opacity duration-300 hover:opacity-80"
              >
                {content.contact}
              </button>
            </nav>

            {/* Bloco inferior do menu mobile: redes sociais e idioma */}
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

              <div className="mt-12 flex items-center gap-2 font-primary text-[1.05rem] text-white">
                <button
                  type="button"
                  onClick={() => onLanguageChange("en")}
                  aria-label={content.changeToEnglish}
                  className={`transition-opacity duration-300 ${
                    language === "en"
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  EN
                </button>

                <span className="text-white/55">|</span>

                <button
                  type="button"
                  onClick={() => onLanguageChange("pt-BR")}
                  aria-label={content.changeToPortuguese}
                  className={`transition-opacity duration-300 ${
                    language === "pt-BR"
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  PT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Espaço reservado para compensar a altura do header fixo */}
      <div className="h-[96px] md:h-[104px]" />
    </>
  );
}

export default Navbar;