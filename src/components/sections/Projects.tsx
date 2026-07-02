import { ArrowUpRight } from "lucide-react";
import p1Asset from "@/assets/project-paletizacion-robot.png.asset.json";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

const PROJECTS = [
  {
    img: p1,
    sector: "Automoción",
    title: "Paletizacíon mediante Robot en final de linea",
    desc: "Integración de 12 robots ABB con visión artificial para control de calidad en línea.",
    metrics: ["+38% productividad", "−22% scrap"],
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    img: p2,
    sector: "Energía",
    title: "Cuadros eléctricos a medida",
    desc: "Diseño y fabricación de armarios de control para subestación industrial.",
    metrics: ["IP54", "ISO 9001"],
  },
  {
    img: p3,
    sector: "Logística",
    title: "Smart factory completa",
    desc: "Digitalización integral de planta con SCADA, MES e IoT en producción 24/7.",
    metrics: ["99.7% uptime", "Industria 4.0"],
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="relative py-28 lg:py-40 bg-surface">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-electric" /> Proyectos destacados
            </div>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Casos reales de <span className="text-gradient">ingeniería industrial</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Más de 450 proyectos llave en mano para sectores de automoción, alimentación,
            farma, energía y logística.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className={`group relative overflow-hidden rounded-3xl bg-graphite text-graphite-foreground hover-lift min-h-[320px] ${p.span ?? ""}`}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={1280}
                height={960}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-transparent" />

              <div className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-xl bg-white/10 backdrop-blur-md transition-colors group-hover:bg-electric">
                <ArrowUpRight className="h-5 w-5" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                  {p.sector}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/70">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-white/85"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
