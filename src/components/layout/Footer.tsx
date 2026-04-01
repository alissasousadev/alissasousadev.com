import { Github, Instagram, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t bg-black">
      {/* Container principal do footer */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 md:py-5">
        
        {/* Bloco esquerdo: ano + nome */}
        <div className="flex flex-col leading-none">
          <span className="font-primary text-sm text-white md:text-base">
            © {new Date().getFullYear()}
          </span>

          <p className="mt-1 font-primary text-lg text-white md:text-xl">
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
            className="text-white transition-colors duration-300 hover:text-accent"
          >
            <Github className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.75} />
          </a>

          <a
            href="https://linkedin.com/in/alissasousa"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-white transition-colors duration-300 hover:text-accent"
          >
            <Linkedin className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.75} />
          </a>

          <a
            href="mailto:alissasousa.dev@outlook.com"
            aria-label="Email"
            className="text-white transition-colors duration-300 hover:text-accent"
          >
            <Mail className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.75} />
          </a>

          <a
            href="https://www.instagram.com/eualissasousa"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-white transition-colors duration-300 hover:text-accent"
          >
            <Instagram className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;