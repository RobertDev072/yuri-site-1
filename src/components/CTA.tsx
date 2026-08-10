"use client";

import { useId, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import Button from "./Button";

const INTERESTS = [
  "Zonnepanelen",
  "Thuisbatterijen",
  "Laadoplossingen",
  "Dakrenovatie",
  "Verbouwing",
  "Anders",
] as const;

type FormState = {
  naam: string;
  contact: string;
  interesse: string;
  bericht: string;
};

const INITIAL_STATE: FormState = {
  naam: "",
  contact: "",
  interesse: INTERESTS[0],
  bericht: "",
};

// One shared template for the message content, reused for both the e-mail
// body and the WhatsApp text so the two channels always stay in sync — only
// the light WhatsApp bold-markup differs between the two `emphasize` modes.
function buildMessageLines(form: FormState, emphasize: boolean) {
  const label = (text: string) => (emphasize ? `*${text}*` : text);
  return [
    label("Nieuwe aanvraag via de website"),
    "",
    `${label("Naam:")} ${form.naam}`,
    `${label("Contact:")} ${form.contact}`,
    `${label("Interesse:")} ${form.interesse}`,
    "",
    label("Bericht:"),
    form.bericht,
  ];
}

export default function CTA() {
  const formId = useId();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  }

  function validate() {
    if (!form.naam.trim() || !form.contact.trim() || !form.bericht.trim()) {
      setError("Vul uw naam, e-mail of telefoon en bericht in.");
      return false;
    }
    return true;
  }

  // Default form submit (Enter key or the primary button) sends via e-mail.
  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const subject = `Aanvraag via website — ${form.interesse}`;
    const body = buildMessageLines(form, false).join("\n");
    window.location.href = `mailto:info@sgonderneming.nl?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  // Secondary action button (type="button", so it never triggers the
  // form's own submit handler) opens a WhatsApp chat with the same
  // information, formatted with WhatsApp's own *bold* markup.
  function handleWhatsAppClick() {
    if (!validate()) return;

    const text = buildMessageLines(form, true).join("\n");
    window.open(
      `https://wa.me/31611185395?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section id="contact" className="relative bg-accent px-5 py-20 sm:px-8 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden opacity-20"
      >
        <div className="absolute -left-1/4 top-0 h-full w-1/3 -skew-x-12 bg-black/30 blur-xl" />
        <div className="absolute left-[35%] top-0 h-full w-1/12 -skew-x-12 bg-[#1f6fb2]/40 blur-lg" />
        <div className="absolute right-[-5%] top-0 h-full w-1/4 -skew-x-12 bg-black/20 blur-xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-black tracking-tighter text-black sm:text-5xl">
            Klaar om te verduurzamen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-black/80 sm:text-lg">
            Vraag vrijblijvend advies aan of ontvang binnen 24 uur een offerte
            op maat. Wij regelen het van A tot Z.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="tel:+31611185395" tone="onAccent" icon={false} className="w-full sm:w-auto">
              <Phone size={20} aria-hidden="true" />
              06 11 18 53 95
            </Button>
            <Button
              href="mailto:info@sgonderneming.nl"
              variant="secondary"
              tone="onAccent"
              icon={false}
              className="w-full sm:w-auto"
            >
              <Mail size={20} aria-hidden="true" />
              info@sgonderneming.nl
            </Button>
          </div>

          <p className="mt-6 text-sm font-semibold text-black/70">
            Actief in heel Nederland
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          onSubmit={handleEmailSubmit}
          noValidate
          className="relative mt-14 rounded-3xl border border-black/15 bg-black/90 p-6 text-left shadow-[0_30px_90px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`${formId}-naam`}
                className="text-sm font-semibold text-white"
              >
                Naam <span className="text-accent">*</span>
              </label>
              <input
                id={`${formId}-naam`}
                name="naam"
                type="text"
                required
                autoComplete="name"
                value={form.naam}
                onChange={(e) => handleChange("naam", e.target.value)}
                className="focus-ring rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
                placeholder="Uw naam"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`${formId}-contact`}
                className="text-sm font-semibold text-white"
              >
                E-mail of telefoon <span className="text-accent">*</span>
              </label>
              <input
                id={`${formId}-contact`}
                name="contact"
                type="text"
                required
                autoComplete="email"
                value={form.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                className="focus-ring rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
                placeholder="naam@voorbeeld.nl of 06 12345678"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label
                htmlFor={`${formId}-interesse`}
                className="text-sm font-semibold text-white"
              >
                Interesse
              </label>
              <select
                id={`${formId}-interesse`}
                name="interesse"
                value={form.interesse}
                onChange={(e) => handleChange("interesse", e.target.value)}
                className="focus-ring rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white [color-scheme:dark]"
              >
                {INTERESTS.map((interest) => (
                  <option key={interest} value={interest} className="text-black">
                    {interest}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label
                htmlFor={`${formId}-bericht`}
                className="text-sm font-semibold text-white"
              >
                Bericht <span className="text-accent">*</span>
              </label>
              <textarea
                id={`${formId}-bericht`}
                name="bericht"
                required
                rows={4}
                value={form.bericht}
                onChange={(e) => handleChange("bericht", e.target.value)}
                className="focus-ring resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
                placeholder="Vertel kort over uw situatie of wensen…"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm font-semibold text-accent">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" icon={false}>
              <Mail size={20} aria-hidden="true" />
              Verstuur via e-mail
            </Button>
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-black transition-all duration-200 hover:scale-105 hover:bg-[#1ebe5a]"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Verstuur via WhatsApp
            </button>
          </div>

          <p className="mt-4 text-xs text-white/50">
            Dit opent uw e-mailprogramma of WhatsApp met een voorgevuld,
            netjes opgemaakt bericht — inclusief uw naam, contactgegevens en
            interesse. Wij verzamelen of bewaren de ingevulde gegevens niet
            zelf.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
