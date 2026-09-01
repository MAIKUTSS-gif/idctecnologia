import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Rocket,
  Globe2,
  TrendingUp,
  Handshake,
  GraduationCap,
  ShieldCheck,
  Factory,
  Cpu,
  Clock,
  ArrowUpRight,
  MapPin,
  Briefcase,
  Send,
  CheckCircle2,
  Paperclip,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";
import heroImage from "@/assets/careers-hero.jpg";
import ctaImage from "@/assets/careers-cta.jpg";

export const Route = createFileRoute("/trabaja-con-nosotros")({
  head: () => ({
    meta: [
      { title: "Trabaja con nosotros — Empleo en automatización | IDC Tecnología" },
      {
        name: "description",
        content:
          "Únete a IDC Tecnología: ofertas de empleo en programación PLC, robótica, visión artificial y puesta en marcha industrial en Alcalá de Henares.",
      },
      { property: "og:title", content: "Trabaja con nosotros — IDC Tecnología" },
      {
        property: "og:description",
        content: "Ofertas de empleo en automatización industrial, robótica y digitalización de procesos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://idctecnologia.lovable.app/trabaja-con-nosotros" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://idctecnologia.lovable.app/trabaja-con-nosotros" }],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <>
      <CareersHero />
      <WhyIdc />
      <Technologies />
      <Benefits />
      <Journey />
      <Jobs />
      <ApplicationForm />
      <FinalCta />
    </>
  );
}

/* ---------------- 1. HERO ---------------- */

function CareersHero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-graphite text-graphite-foreground">
      <img
        src={heroImage}
        alt="Línea de producción automatizada con robots industriales"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-graphite/75" />
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute -left-20 top-24 h-96 w-96 rounded-full bg-electric/25 blur-[140px]" />

      <div className="container relative mx-auto px-4 pb-24 pt-40">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-green animate-pulse" />
            Talento · Industria 4.0 · Alcalá de Henares
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Construye el futuro de la automatización{" "}
            <span className="text-gradient">con nosotros</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            Buscamos personas apasionadas por la tecnología, la innovación y la industria 4.0.
          </p>

          <div
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <Button asChild variant="hero" size="xl">
              <a href="#ofertas">
                Ver ofertas <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="xl">
              <a href="#candidatura">
                <Send className="h-4 w-4" /> Enviar CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 2. POR QUÉ IDC ---------------- */

const REASONS = [
  {
    icon: Rocket,
    title: "Proyectos innovadores",
    desc: "Robótica, visión artificial y digitalización en plantas punteras.",
  },
  {
    icon: Globe2,
    title: "Clientes nacionales e internacionales",
    desc: "Trabajarás con líderes industriales dentro y fuera de España.",
  },
  {
    icon: TrendingUp,
    title: "Desarrollo profesional",
    desc: "Plan de carrera real y formación técnica continua.",
  },
  {
    icon: Handshake,
    title: "Buen ambiente de trabajo",
    desc: "Equipos pequeños, cercanos y con mucho apoyo técnico.",
  },
];

function WhyIdc() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section className="py-24">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`mx-auto max-w-3xl text-center transition-all duration-700 ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-electric">Cultura</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            ¿Por qué trabajar con IDC Tecnología?
          </h2>
          <p className="mt-5 text-muted-foreground">
            Somos una empresa especializada en automatización industrial, programación PLC,
            robótica, visión artificial, puesta en marcha y digitalización de procesos
            industriales. Desde 1996 ayudamos a las fábricas a producir mejor, y lo hacemos con
            un equipo técnico que aprende en cada proyecto.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              className={`group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-700 hover:-translate-y-1 hover:shadow-elevated ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-tech text-primary-foreground shadow-glow">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3. TECNOLOGÍAS ---------------- */

const TECHS = [
  "Siemens",
  "Omron",
  "ABB",
  "Schneider Electric",
  "KUKA",
  "Profinet",
  "TIA Portal",
  "RobotStudio",
  "Visión artificial",
];

function Technologies() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section className="border-y border-border bg-surface py-24">
      <div ref={ref} className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-electric">Stack técnico</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Tecnologías con las que trabajarás
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {TECHS.map((t, i) => (
            <div
              key={t}
              className={`group flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-electric/40 hover:shadow-elevated ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-electric/10 text-electric transition-colors group-hover:bg-electric group-hover:text-primary-foreground">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="font-display text-sm font-semibold md:text-base">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4. QUÉ OFRECEMOS ---------------- */

const OFFERS = [
  { icon: GraduationCap, title: "Formación continua", desc: "Cursos de fabricante y certificaciones pagadas." },
  { icon: ShieldCheck, title: "Estabilidad laboral", desc: "Contratación indefinida y cartera de clientes sólida." },
  { icon: Factory, title: "Proyectos reales", desc: "Puesta en marcha en planta desde el primer mes." },
  { icon: Cpu, title: "Equipamiento moderno", desc: "Portátil, licencias y herramienta de campo actualizada." },
  { icon: Clock, title: "Flexibilidad", desc: "Horario flexible y jornada intensiva los viernes." },
  { icon: TrendingUp, title: "Posibilidad de crecimiento", desc: "Promoción interna a jefe de proyecto." },
];

function Benefits() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section className="py-24">
      <div ref={ref} className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-electric">Beneficios</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Qué ofrecemos
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map((o, i) => (
            <div
              key={o.title}
              className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-700 hover:-translate-y-1 hover:shadow-elevated ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-tech-green/15 text-tech-green">
                  <o.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{o.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 5. CÓMO ES TRABAJAR AQUÍ ---------------- */

const STEPS = [
  { n: "01", title: "Entras en el equipo", desc: "Onboarding con un ingeniero senior como referente." },
  { n: "02", title: "Formación inicial", desc: "PLC, robótica y estándares internos de programación." },
  { n: "03", title: "Participas en proyectos", desc: "Diseño, programación y puesta en marcha en cliente." },
  { n: "04", title: "Creces profesionalmente", desc: "Asumes proyectos propios y especialización técnica." },
];

function Journey() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden bg-graphite py-24 text-graphite-foreground">
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-tech/20 blur-[140px]" />

      <div ref={ref} className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-tech">Tu recorrido</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Cómo es trabajar aquí
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-white/15 lg:block" />
          <div className="grid gap-8 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`relative transition-all duration-700 ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-tech font-mono text-sm font-semibold text-primary-foreground shadow-glow">
                  {s.n}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. OFERTAS ---------------- */

function Jobs() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["published-job-offers"],
    queryFn: listPublishedOffers,
    refetchOnWindowFocus: true,
  });
  return (
    <section id="ofertas" className="scroll-mt-28 py-24">
      <div ref={ref} className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-electric">Empleo</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Ofertas disponibles
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {JOBS.map((j, i) => (
            <article
              key={j.title}
              className={`group flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-700 hover:-translate-y-1 hover:border-electric/40 hover:shadow-elevated ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight">{j.title}</h3>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
                  <MapPin className="h-3.5 w-3.5" /> {j.location}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
                  <Briefcase className="h-3.5 w-3.5" /> {j.contract}
                </span>
              </div>
              <p className="mt-4 flex-1 text-sm text-muted-foreground">{j.desc}</p>
              <Button asChild variant="hero" className="mt-6 self-start">
                <a href="#candidatura">
                  Inscribirme <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 7. FORMULARIO ---------------- */

const applicationSchema = z.object({
  name: z.string().trim().min(2, "Nombre demasiado corto").max(100),
  surname: z.string().trim().min(2, "Apellidos demasiado cortos").max(120),
  email: z.string().trim().email("Email no válido").max(255),
  phone: z.string().trim().min(6, "Teléfono no válido").max(40),
  city: z.string().trim().min(2, "Indica tu ciudad").max(120),
  position: z.string().min(1, "Elige un puesto"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  gdpr: z.literal("on", { message: "Debes aceptar la política de privacidad" }),
});

function ApplicationForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = applicationSchema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <section id="candidatura" className="scroll-mt-28 border-y border-border bg-surface py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-electric">Candidatura</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Envía tu candidatura
          </h2>
          <p className="mt-4 text-muted-foreground">
            Adjunta tu CV y cuéntanos qué te gustaría desarrollar con nosotros.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-tech-green/20">
                <CheckCircle2 className="h-8 w-8 text-tech-green" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-semibold">¡Candidatura enviada!</h3>
              <p className="mt-3 max-w-md text-muted-foreground">
                Hemos recibido tus datos. Si tu perfil encaja, el equipo de RRHH te contactará en
                los próximos días.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Nombre" name="name" placeholder="Tu nombre" error={errors.name} />
                <Field label="Apellidos" name="surname" placeholder="Tus apellidos" error={errors.surname} />
                <Field label="Email" name="email" type="email" placeholder="tu@email.com" error={errors.email} />
                <Field label="Teléfono" name="phone" placeholder="+34 ..." error={errors.phone} />
                <Field label="Ciudad" name="city" placeholder="Madrid" error={errors.city} />
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Puesto de interés
                  </label>
                  <select
                    name="position"
                    defaultValue=""
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
                  >
                    <option value="" disabled>
                      Selecciona un puesto
                    </option>
                    {JOBS.map((j) => (
                      <option key={j.title}>{j.title}</option>
                    ))}
                    <option>Candidatura espontánea</option>
                  </select>
                  {errors.position && <p className="mt-1 text-xs text-destructive">{errors.position}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Cuéntanos tu experiencia y qué te motiva…"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Adjuntar CV
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-background px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-electric hover:text-foreground">
                  <Paperclip className="h-4 w-4" />
                  {fileName || "Selecciona un archivo PDF o Word (máx. 5 MB)"}
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  name="gdpr"
                  className="mt-0.5 h-4 w-4 rounded border-input accent-[var(--electric,#2563eb)]"
                />
                <span>
                  He leído y acepto la política de privacidad y el tratamiento de mis datos con
                  fines de selección de personal (RGPD).
                </span>
              </label>
              {errors.gdpr && <p className="text-xs text-destructive">{errors.gdpr}</p>}

              <Button type="submit" variant="hero" size="xl" className="w-full">
                Enviar candidatura <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
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

/* ---------------- 8. CTA FINAL ---------------- */

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-graphite py-28 text-graphite-foreground">
      <img
        src={ctaImage}
        alt="Ingenieros trabajando con equipos de automatización industrial"
        width={1920}
        height={1088}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-graphite/80" />
      <div className="absolute inset-0 grid-bg-dark opacity-25" />

      <div className="container relative mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          ¿Preparado para impulsar la <span className="text-gradient">industria del mañana</span>?
        </h2>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="hero" size="xl">
            <a href="#candidatura">
              Únete a IDC Tecnología <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
