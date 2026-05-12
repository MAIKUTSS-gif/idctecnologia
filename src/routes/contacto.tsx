import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Solicita presupuesto industrial | IDC Tecnología" },
      { name: "description", content: "Habla con un ingeniero industrial. Presupuesto en 24h para proyectos de automatización, mantenimiento o distribución." },
      { property: "og:title", content: "Contacto — IDC Tecnología" },
      { property: "og:description", content: "Solicita presupuesto y habla con un ingeniero." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nombre demasiado corto").max(100),
  company: z.string().trim().min(2, "Indica la empresa").max(120),
  email: z.string().trim().email("Email no válido").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().min(1, "Elige un servicio"),
  message: z.string().trim().min(10, "Cuéntanos un poco más").max(2000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-graphite pb-20 pt-40 text-graphite-foreground lg:pt-52">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-electric/30 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-tech/20 blur-[140px]" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            Contacto
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Hablemos de tu <span className="text-gradient">próximo proyecto</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Respuesta en menos de 24h por un ingeniero especialista en tu sector.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-tech-green/20">
                  <CheckCircle2 className="h-8 w-8 text-tech-green" />
                </div>
                <h2 className="mt-6 font-display text-3xl font-semibold">¡Solicitud enviada!</h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Hemos recibido tu mensaje. Un ingeniero te contactará en menos de 24 horas
                  laborables.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  Solicitar presupuesto
                </h2>
                <p className="text-sm text-muted-foreground">
                  Cuéntanos brevemente tu reto industrial.
                </p>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Nombre" name="name" placeholder="Tu nombre" error={errors.name} />
                  <Field label="Empresa" name="company" placeholder="Nombre empresa" error={errors.company} />
                  <Field label="Email" name="email" type="email" placeholder="tu@empresa.com" error={errors.email} />
                  <Field label="Teléfono" name="phone" placeholder="+34 ..." error={errors.phone} />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Servicio
                  </label>
                  <select
                    name="service"
                    defaultValue=""
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
                  >
                    <option value="" disabled>Selecciona un servicio</option>
                    <option>Automatización industrial</option>
                    <option>Mantenimiento industrial</option>
                    <option>Distribución de componentes</option>
                    <option>Industria 4.0 / digitalización</option>
                    <option>Otro</option>
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Cuéntanos sobre tu proyecto, objetivos y plazos…"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" variant="hero" size="xl" className="w-full">
                  Enviar solicitud <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Aside contact */}
          <div className="space-y-4">
            <ContactCard icon={Phone} title="Teléfono" value="+34 91 879 60 46" sub="Lun–Vie 8:00–20:00" />
            <ContactCard icon={Mail} title="Email" value="informacion@idc.es" sub="Respuesta en 24h" />
            <ContactCard icon={MapPin} title="Oficina central" value="Polígono Industrial Norte" sub="28100 Madrid, España" />
            <a
              href="https://wa.me/34918796046"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-graphite p-5 text-graphite-foreground transition-transform hover:scale-[1.01]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-tech-green text-graphite">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">WhatsApp directo</div>
                <div className="text-xs text-white/60">Atención inmediata para clientes</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", placeholder, error,
}: { label: string; name: string; type?: string; placeholder?: string; error?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ContactCard({
  icon: Icon, title, value, sub,
}: { icon: typeof Phone; title: string; value: string; sub: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-tech text-primary-foreground shadow-glow">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="font-semibold">{value}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
