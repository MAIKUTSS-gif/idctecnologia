import { Link } from "@tanstack/react-router";
import { Cpu, Wrench, PackageCheck, ArrowUpRight, Check } from "lucide-react";
import engImg from "@/assets/service-engineering.jpg";
import maintImg from "@/assets/service-maintenance.jpg";
import distImg from "@/assets/service-distribution.jpg";

const SERVICES = [
  {
    icon: Cpu,
    tag: "01 / Engineering",
    title: "Ingeniería para la Automatización",
    desc: "Diseño y desarrollo llave en mano de sistemas automatizados con tecnología de vanguardia.",
    points: ["Automatización PLC", "SCADA & HMI", "Visión artificial", "Industria 4.0", "Integración OT/IT", "Seguridad de máquinas"],
    img: engImg,
  },
  {
    icon: Wrench,
    tag: "02 / Maintenance",
    title: "Mantenimiento Industrial",
    desc: "Garantizamos la disponibilidad de tus líneas con planes preventivos, predictivos y soporte 24/7.",
    points: ["Preventivo programado", "Correctivo express", "Predictivo IoT", "Asistencia 24/7", "Optimización líneas"],
    img: maintImg,
  },
  {
    icon: PackageCheck,
    tag: "03 / Distribution",
    title: "Distribución Industrial",
    desc: "Componentes industriales de marcas oficiales con stock disponible y entrega inmediata.",
    points: ["Sensorica", "Seguridad de máquinas", "Neumática", "Control de fluidos", "Actuadores eléctricos", "Identificación"],
    img: distImg,
  },
] as const;

export function Services() {
  return (
    <section id="servicios" className="relative py-28 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-electric" />
            Servicios principales
          </div>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Tres Áreas de Negocios; <span className="text-gradient">Un Único Socio Industrial</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Desde la ingeniería conceptual y de detalle hasta el suministro, instalación y mantenimiento de los proyectos realizados.
          </p>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card hover-lift"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/90">
                  {s.tag}
                </div>
                <div className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-tech shadow-glow">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>

              <div className="p-7">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="h-4 w-4 text-electric" /> {p}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/servicios"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:gap-2.5"
                >
                  Conocer servicio <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
