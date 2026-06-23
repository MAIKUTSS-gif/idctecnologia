import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Cpu, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/hero-fondo-idc.png.asset.json";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f7fa]">
      {/* Background image */}
      <div
        className="absolute inset-0"
        role="img"
        aria-label="Fábrica inteligente con robots industriales"
        style={{
          backgroundImage: `url(${heroAsset.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* White-to-transparent overlay on the left for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(245,247,250,0.92) 0%, rgba(245,247,250,0.75) 35%, rgba(245,247,250,0.3) 55%, transparent 70%)",
        }}
      />

      <div className="container relative mx-auto px-4 pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="max-w-2xl animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/70 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm">
            <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-tech-green animate-pulse" />
            Desde 1996 · Automatización · Ingeniería · Industria 4.0
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[72px]">
            Automatización industrial inteligente para{" "}
            <span className="text-electric">fábricas del futuro</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
            Diseñamos, integramos y mantenemos soluciones industriales avanzadas para empresas
            que buscan máxima eficiencia, productividad y control tecnológico.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/contacto">
                Solicitar presupuesto <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="xl">
              <Link to="/servicios">
                <Play className="h-4 w-4" /> Ver servicios
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats dashboard */}
        <div className="mt-16 max-w-4xl animate-fade-up" style={{ animationDelay: "200ms" }}>
          <div className="relative rounded-2xl bg-graphite p-6 shadow-elevated md:p-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-semibold text-electric md:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-white/60 md:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -left-3 -top-3 hidden rounded-xl border border-white/10 bg-graphite px-3 py-2 shadow-elevated md:flex md:items-center md:gap-2 animate-float">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-electric/20">
                <Cpu className="h-4 w-4 text-electric" />
              </div>
              <div>
                <div className="text-xs text-white/60">PLC online</div>
                <div className="font-mono text-sm font-semibold text-tech-green">128 / 128</div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 hidden rounded-xl border border-white/10 bg-graphite px-3 py-2 shadow-elevated md:flex md:items-center md:gap-2 animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-tech/20">
                <Activity className="h-4 w-4 text-cyan-tech" />
              </div>
              <div>
                <div className="text-xs text-white/60">OEE planta</div>
                <div className="font-mono text-sm font-semibold text-cyan-tech">+34%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: "+25", label: "Años de experiencia" },
  { value: "+1.100", label: "Proyectos industriales" },
  { value: "+340", label: "Clientes activos" },
  { value: "24/7", label: "Soporte especializado" },
];
