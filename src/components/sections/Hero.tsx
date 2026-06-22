import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, ShieldCheck, Cpu, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/hero-factory.png.asset.json";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background text-foreground">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroAsset.url}
          alt="Fábrica inteligente con robots industriales"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-electric/20 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-cyan-tech/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="container relative mx-auto px-4 pb-32 pt-40 lg:pb-40 lg:pt-48">
        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/70 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-md shadow-soft">
            <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-tech-green animate-pulse" />
            Desde 1996 · Automatización · Ingeniería · Industria 4.0
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-[88px]">
            Automatización industrial inteligente para{" "}
            <span className="text-gradient">fábricas del futuro</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Diseñamos, integramos y mantenemos soluciones industriales avanzadas para empresas
            que buscan máxima eficiencia, productividad y control tecnológico.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="default" size="xl" className="shadow-glow">
              <Link to="/contacto">
                Solicitar presupuesto <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/servicios">
                <Play className="h-4 w-4" /> Ver servicios
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating dashboard card */}
        <div className="mx-auto mt-20 max-w-5xl animate-fade-up" style={{ animationDelay: "200ms" }}>
          <div className="relative rounded-3xl border border-border/50 bg-white/80 p-2 backdrop-blur-xl shadow-elevated">
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-background/80 p-6 md:grid-cols-4 md:p-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-semibold text-gradient md:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground md:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -left-4 -top-4 hidden rounded-2xl border border-border/50 bg-white/90 px-4 py-3 backdrop-blur-md shadow-elevated md:flex md:items-center md:gap-3 animate-float">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-electric/15">
                <Cpu className="h-5 w-5 text-electric" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">PLC online</div>
                <div className="font-mono text-sm font-semibold text-tech-green">128 / 128</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-border/50 bg-white/90 px-4 py-3 backdrop-blur-md shadow-elevated md:flex md:items-center md:gap-3 animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-tech/15">
                <Activity className="h-5 w-5 text-cyan-tech" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">OEE planta</div>
                <div className="font-mono text-sm font-semibold text-cyan-tech">+34%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logos / certificaciones */}
        <div className="mt-20">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Partners oficiales y certificaciones
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-80">
            {["SIEMENS", "ABB", "SCHNEIDER", "OMRON", "SICK", "SMC", "BOSCH"].map((b) => (
              <span key={b} className="font-display text-lg font-semibold tracking-[0.15em] text-foreground/70">
                {b}
              </span>
            ))}
            <span className="ml-2 inline-flex items-center gap-2 rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/80">
              <ShieldCheck className="h-3.5 w-3.5 text-tech-green" /> ISO 9001
            </span>
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
