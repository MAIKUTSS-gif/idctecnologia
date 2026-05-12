import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Novatek transformó nuestra línea de envasado con un sistema de visión artificial que redujo defectos en un 27%. Profesionales de primer nivel.",
    name: "Carlos Méndez",
    role: "Director Técnico",
    company: "Grupo Alimentario Iberia",
  },
  {
    quote: "El soporte 24/7 nos ha salvado en momentos críticos. Equipo cercano, técnico y resolutivo. Han sido un partner desde hace 7 años.",
    name: "Marta Ferrer",
    role: "Responsable de Planta",
    company: "Auto Components SA",
  },
  {
    quote: "La integración SCADA y la digitalización del proceso nos dio visibilidad real del OEE por primera vez. Recomendados sin dudar.",
    name: "Javier Romero",
    role: "Ingeniero Industrial Senior",
    company: "Pharma Solutions",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-40 bg-surface">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Star className="h-3 w-3 fill-electric text-electric" /> Clientes B2B
          </div>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Confiados por <span className="text-gradient">líderes industriales</span>
          </h2>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="relative flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft hover-lift"
            >
              <Quote className="h-8 w-8 text-electric/30" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/85">
                "{t.quote}"
              </blockquote>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-electric text-electric" />
                ))}
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-tech font-display text-sm font-semibold text-primary-foreground">
                  {t.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold leading-tight">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
