import { Award, Headphones, Settings2, Zap, MapPin, Layers } from "lucide-react";

const ITEMS = [
  { icon: Award, title: "+25 años de experiencia", desc: "Más de dos décadas integrando soluciones industriales en sectores exigentes desde 1996." },
  { icon: Headphones, title: "Soporte técnico 24/7", desc: "Ingenieros especializados disponibles en remoto y on-site cuando los necesitas." },
  { icon: Settings2, title: "Ingeniería llave en mano", desc: "Diseñamos cada proyecto según los KPIs reales de tu planta, de principio a fin." },
  { icon: Zap, title: "+1.100 proyectos entregados", desc: "Resultados demostrados con +340 clientes activos en toda España." },
  { icon: Layers, title: "Partners oficiales líderes", desc: "Siemens, ABB, SICK, SMC, Omron y Schneider Electric." },
  { icon: MapPin, title: "Cobertura nacional", desc: "Operativos en toda la península, Baleares y Canarias desde Alcalá de Henares." },
];

export function Advantages() {
  return (
    <section className="relative py-28 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-green" /> Por qué IDC Tecnología
          </div>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            La diferencia está en la <span className="text-gradient">ingeniería</span>
          </h2>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="group relative bg-card p-8 transition-colors hover:bg-surface"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-tech shadow-glow">
                <it.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-tech opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
