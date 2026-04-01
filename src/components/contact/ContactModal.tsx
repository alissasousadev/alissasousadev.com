import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import type { Language } from "../../types/language";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

/* Dados do formulário */
type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

/* Erros de validação */
type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

/* Estado inicial do formulário */
const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

/* Regex simples para e-mail */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Conteúdo em PT-BR e EN */
const content = {
  "pt-BR": {
    description: "Fique à vontade para entrar em contato.",
    nameLabel: "Nome",
    namePlaceholder: "Digite seu nome",
    emailLabel: "E-mail",
    emailPlaceholder: "Digite seu e-mail",
    messageLabel: "Mensagem",
    messagePlaceholder: "Escreva sua mensagem aqui...",
    button: "Enviar mensagem",
    sending: "Enviando...",
    socialTitle: "Minhas redes",
    safeMessage: "Seus dados estão seguros.",
    successMessage: "Mensagem enviada com sucesso.",
    errorMessage: "Não foi possível enviar sua mensagem. Tente novamente.",
    errors: {
      name: "O nome deve ter no mínimo 3 caracteres.",
      email: "Digite um e-mail válido.",
      message: "A mensagem deve ter no mínimo 10 caracteres.",
    },
  },
  en: {
    description: "Feel free to get in touch.",
    nameLabel: "Name",
    namePlaceholder: "Enter your name",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    messageLabel: "Message",
    messagePlaceholder: "Write your message here...",
    button: "Send message",
    sending: "Sending...",
    socialTitle: "My social links",
    safeMessage: "Your data is safe.",
    successMessage: "Message sent successfully.",
    errorMessage: "Your message could not be sent. Please try again.",
    errors: {
      name: "Name must be at least 3 characters long.",
      email: "Enter a valid email address.",
      message: "Message must be at least 10 characters long.",
    },
  },
} satisfies Record<
  Language,
  {
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    button: string;
    sending: string;
    socialTitle: string;
    safeMessage: string;
    successMessage: string;
    errorMessage: string;
    errors: Record<keyof ContactFormData, string>;
  }
>;

/* Redes sociais */
const socialLinks = [
  {
    href: "https://www.linkedin.com/in/alissasousa/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://github.com/alissasousadev",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.instagram.com/eualissasousa",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "mailto:alissasousa.dev@outlook.com",
    label: "Email",
    icon: Mail,
  },
];

/* Validação dos campos */
function validateForm(
  values: ContactFormData,
  messages: (typeof content)["pt-BR"]["errors"],
  language: Language
): ContactFormErrors {
  const validationErrors: ContactFormErrors = {};

  if (values.name.trim().length < 3) {
    validationErrors.name = messages.name;
  }

  if (!emailRegex.test(values.email.trim())) {
    validationErrors.email = messages.email;
  }

  if (values.message.trim().length === 0) {
    validationErrors.message =
      language === "pt-BR"
        ? "A mensagem não pode ser vazia."
        : "Message cannot be empty.";
  } else if (values.message.trim().length < 10) {
    validationErrors.message = messages.message;
  }

  return validationErrors;
}

function ContactModal({ isOpen, onClose, language }: ContactModalProps) {
  /* Conteúdo do idioma atual */
  const copy = useMemo(() => content[language], [language]);

  /* Estados principais */
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Atualiza os campos e limpa o erro do campo alterado */
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name as keyof ContactFormErrors]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  }

  /* Fecha o modal e limpa o formulário */
  function resetAndCloseModal() {
    setFormData(INITIAL_FORM);
    setErrors({});
    setIsSubmitting(false);
    onClose();
  }

  /* Valida e envia os dados sem sair da página */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setErrors({});

  const validationErrors = validateForm(formData, copy.errors, language);
  setErrors(validationErrors);

  const firstErrorField = (
    ["name", "email", "message"] as Array<keyof ContactFormData>
  ).find((field) => validationErrors[field]);

  if (firstErrorField) {
    document.getElementById(firstErrorField)?.focus();
    return;
  }

  setIsSubmitting(true);

  try {
    const payload = new FormData();
    payload.append("name", formData.name.trim());
    payload.append("email", formData.email.trim());
    payload.append("message", formData.message.trim());
    payload.append("_captcha", "false");
    payload.append(
      "_subject",
      language === "pt-BR"
        ? "Novo contato do portfólio"
        : "New portfolio contact"
    );

    const response = await fetch(
      "https://formsubmit.co/ajax/a5cb4cfc81091ca4bb4d6af509bff19b",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    toast.success(copy.successMessage);
    resetAndCloseModal();
  } catch (error) {
    console.error("Form submit error:", error);
    setIsSubmitting(false);
    toast.error(copy.errorMessage);
  }
}

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledby="contact-modal-description"
    >
      <div className="mx-auto w-full max-w-[460px] text-white">
        {/* Texto de apoio */}
        <header className="mb-4 pr-8 text-center sm:mb-5 sm:pr-10">
          <p
            id="contact-modal-description"
            className="font-primary text-sm leading-6 text-white/80 sm:text-base"
          >
            {copy.description}
          </p>
        </header>

        {/* Formulário */}
        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          {/* Campo: Nome */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-primary text-sm font-medium text-white/90"
            >
              {copy.nameLabel}
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder={copy.namePlaceholder}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/8 px-4 font-primary text-sm text-white outline-none 
              transition placeholder:text-white/40 focus:border-accent focus:bg-white/12"
            />

            {errors.name && (
              <span className="mt-2 block font-primary text-sm text-red-300">
                {errors.name}
              </span>
            )}
          </div>

          {/* Campo: E-mail */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-primary text-sm font-medium text-white/90"
            >
              {copy.emailLabel}
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={copy.emailPlaceholder}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/8 px-4 font-primary text-sm text-white outline-none 
              transition placeholder:text-white/40 focus:border-accent focus:bg-white/12"
            />

            {errors.email && (
              <span className="mt-2 block font-primary text-sm text-red-300">
                {errors.email}
              </span>
            )}
          </div>

          {/* Campo: Mensagem */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-primary text-sm font-medium text-white/90"
            >
              {copy.messageLabel}
            </label>

            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={copy.messagePlaceholder}
              className="min-h-[100px] w-full resize-none rounded-xl border border-white/10 bg-white/8 px-4 py-3 font-primary text-sm 
              text-white outline-none transition placeholder:text-white/40 focus:border-accent focus:bg-white/12"
            />

            {errors.message && (
              <span className="mt-2 block font-primary text-sm text-red-300">
                {errors.message}
              </span>
            )}
          </div>

          {/* Botão principal */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 flex h-12 w-full items-center justify-center rounded-xl bg-white px-6 font-primary text-sm font-semibold 
            uppercase tracking-[0.08em] text-black transition hover:scale-[1.01] hover:bg-white/90 disabled:cursor-not-allowed 
            disabled:opacity-70"
          >
            {isSubmitting ? copy.sending : copy.button}
          </button>

          {/* Redes sociais */}
          <div className="pt-2 text-center">
            <p className="mb-3 font-primary text-sm text-white/70">
              {copy.socialTitle}
            </p>

            <div className="flex items-center justify-center gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? "_self" : "_blank"}
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 
                  text-white/80 transition hover:border-accent hover:text-accent"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Mensagem de confiança */}
          <p className="pt-1 text-center font-primary text-sm italic text-white/70">
            {copy.safeMessage}
          </p>
        </form>
      </div>
    </Modal>
  );
}

export default ContactModal;