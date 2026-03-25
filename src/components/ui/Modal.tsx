import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabelledby?: string;
}

/*
  Modal base reutilizável.
  Responsável por:
  - renderizar overlay
  - travar scroll da página
  - fechar no ESC
  - exibir painel com scroll interno
*/
function Modal({ isOpen, onClose, children, ariaLabelledby }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center px-4 py-4 sm:px-6 sm:py-8 lg:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledby}
    >
      {/* Overlay: escurece e desfoca o fundo */}
      <button
        type="button"
        aria-label="Fechar modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-md"
      />

      {/* Painel principal do modal */}
      <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[24px] border border-white/10 bg-white/8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:max-w-[560px]">
        {/* Botão de fechar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/80 transition hover:bg-white/14 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Área interna com scroll próprio */}
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto px-5 pb-6 pt-14 sm:px-6 sm:pb-6 sm:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;