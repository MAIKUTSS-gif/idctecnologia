import { Quote, Star } from "lucide-react";
import img1 from "@/assets/testimonial-1.png";
import img2 from "@/assets/testimonial-2.png";
import img3 from "@/assets/testimonial-3.png";

const TESTIMONIALS = [
  {
    quote: "La automatización implementada por IDC mejoró nuestra productividad y redujo incidencias desde el primer mes.",
    name: "Director de Planta",
    role: "Director de Planta",
    company: "Sector Automoción",
    image: img1,
  },
  {
    quote: "Destacamos su capacidad de respuesta, nivel técnico y soluciones personalizadas.",
    name: "Responsable Técnico",
    role: "Responsable Técnico",
    company: "Industria Alimentaria",
    image: img2,
  },
  {
    quote: "Un partner tecnológico fiable para proyectos industriales complejos.",
    name: "Production Manager",
    role: "Production Manager",
    company: "Industria Farmacéutica",
    image: img3,
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
            Reconocidos por <span className="text-gradient">Referentes Industriales</span>
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
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-11 w-11 rounded-xl object-cover"
                  loading="lazy"
                  width={44}
                  height={44}
                />
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
