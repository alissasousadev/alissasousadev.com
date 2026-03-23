import { Github, Instagram, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-20 border-t border-black/10 bg-[var(--color-background)]">
      {/* Container principal do footer */}
      <div className="mx-auto flex w-full max-w-7xl items-end justify-between px-6 py-4 sm:px-8 md:py-5">
        
        {/* Bloco esquerdo: ano + nome */}
        <div className="flex flex-col leading-tight">
          <span className="font-primary text-sm text-[var(--color-primary)] md:text-base">
            © {new Date().getFullYear()}
          </span>

          <p className="font-primary text-lg text-[var(--color-primary)] md:text-xl">
            Alissa Sousa
          </p>
        </div>

        {/* Bloco direito: redes sociais */}
        <div className="flex items-center gap-4 md:gap-5">
          <a
            href="https://github.com/alissasousadev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-[var(--color-primary)] transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <Github className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.75} />
          </a>

          <a
            href="https://linkedin.com/in/alissasousa"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--color-primary)] transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <Linkedin className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.75} />
          </a>

          <a
            href="mailto:alissasousa.dev@outlook.com"
            aria-label="Email"
            className="text-[var(--color-primary)] transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <Mail className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.75} />
          </a>

          <a
            href="https://www.instagram.com/eualissasousa"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-[var(--color-primary)] transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <Instagram className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;