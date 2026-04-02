import { ArrowUpRight } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  variant?: "light" | "dark";
  showIcon?: boolean;
}

function Button({
  children,
  href,
  target,
  rel,
  onClick,
  className = "",
  variant = "light",
  showIcon = true,
}: ButtonProps) {
  const navigate = useNavigate();

  /* Estrutura base do botão */
  const baseClasses =
    "group inline-flex items-center gap-2 rounded-full pl-2 pr-2 py-2 font-primary text-sm font-medium uppercase tracking-[0.02em] transition-all duration-300 hover:-translate-y-px focus:outline-none focus:ring-2";

  /* Variações de cor */
  const variantClasses = {
    light:
      "bg-white text-black hover:shadow-soft focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-black",
    dark:
      "bg-black text-white hover:shadow-soft focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-white",
  };

  /* Estilo do círculo do ícone */
  const iconCircleClasses =
    variant === "light"
      ? "bg-black/90 text-white ring-1 ring-white/10 backdrop-blur-sm"
      : "bg-white/90 text-black ring-1 ring-black/10 backdrop-blur-sm";

  /* Verifica se o href aponta para um arquivo estático */
  const isStaticFile =
    typeof href === "string" &&
    /\/[^/]+\.[a-zA-Z0-9]+($|\?)/.test(href);

  /* Identifica se o link é interno da aplicação */
  const isInternalLink =
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !isStaticFile &&
    target !== "_blank";

  function handleInternalClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!href) return;

    event.preventDefault();
    onClick?.();

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    navigate(href);
  }

  /* Conteúdo interno do botão */
  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>

      {showIcon && (
        <span
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full 
            transition-all duration-300 ${iconCircleClasses}`}
        >
          <ArrowUpRight
            className="absolute h-4.5 w-4.5 transition-all duration-[1000ms] ease-out group-hover:translate-x-[10px] 
            group-hover:-translate-y-[10px] group-hover:opacity-0"
            strokeWidth={1.1}
          />

          <ArrowUpRight
            className="absolute h-4.5 w-4.5 translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-[1000ms] 
            ease-out delay-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[450ms]"
            strokeWidth={1.1}
          />
        </span>
      )}
    </>
  );

  /* Renderiza rota interna com React Router */
  if (href && isInternalLink) {
    return (
      <Link
        to={href}
        onClick={handleInternalClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  /* Renderiza link externo ou arquivo estático */
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  /* Renderiza botão quando não existir href */
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {content}
    </button>
  );
}

export default Button;