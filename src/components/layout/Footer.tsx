import { Github, Linkedin } from "lucide-react";
import footerShape from "../../assets/footer.svg";

function Footer() {
  return (
    <footer className="relative mt-20 h-[110px] w-full sm:h-[130px] md:h-[160px] lg:h-auto">
      {/* SVG como base visual */}
      <img
        src={footerShape}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover lg:static lg:h-auto"
      />

      {/* Conteúdo sobreposto */}
      <div className="absolute inset-0 flex items-end px-4 pb-4 sm:px-6 sm:pb-6 md:px-12 md:pb-9 lg:pb-18">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <p className="font-primary whitespace-nowrap text-xs text-white sm:text-sm md:text-base">
            © 2026 Alissa Sousa
          </p>

          {/* Ícones das redes sociais */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <a
              href="https://github.com/alissasousadev"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-white transition-opacity duration-200 hover:opacity-80"
            >
              <Github
                className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
                strokeWidth={1}
              />
            </a>

            <a
              href="https://linkedin.com/in/alissasousa"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white transition-opacity duration-200 hover:opacity-80"
            >
              <Linkedin
                className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5"
                strokeWidth={1}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;