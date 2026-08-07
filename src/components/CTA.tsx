"use client";

import { useId, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
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

export default function CTA() {
  const formId = useId();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.naam.trim() || !form.contact.trim() || !form.bericht.trim()) {
      setError("Vul uw naam, e-mail of telefoon en bericht in.");
      return;
    }

    const subject = `Aanvraag via website — ${form.interesse}`;
    const body = [
      `Naam: ${form.naam}`,
      `E-mail of telefoon: ${form.contact}`,
      `Interesse: ${form.interesse}`,
      "",
      form.bericht,
    ].join("\n");

    const mailto = `mailto:info@sgonderneming.nl?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
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
          <h2 className="text-4xl font-black tracking-tighter text-black sm:text-5xl">
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
          onSubmit={handleSubmit}
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

          <Button type="submit" className="mt-6">
            Verstuur aanvraag
          </Button>

          <p className="mt-4 text-xs text-white/50">
            Dit opent uw e-mailprogramma met een voorgevuld bericht. Wij
            verzamelen of bewaren de ingevulde gegevens niet zelf.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
