import { Bot, Database, Network, Gauge, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import dashImg from "@/assets/industry40.jpg";

const FEATURES = [
  { icon: Bot, title: "IA Industrial", desc: "Modelos predictivos para mantenimiento y calidad." },
  { icon: Network, title: "IoT conectado", desc: "Telemetría en tiempo real de sensores y PLC." },
  { icon: Database, title: "Data Lake OT", desc: "Centraliza datos de planta para BI y trazabilidad." },
  { icon: Gauge, title: "OEE en tiempo real", desc: "Mide y optimiza disponibilidad, rendimiento y calidad." },
];

export function Industry40() {
  return (
    <section className="relative overflow-hidden bg-graphite py-28 text-graphite-foreground lg:py-40">
      <div className="absolute inset-0 grid-bg-dark opacity-40" />
      <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-electric/30 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-tech/20 blur-[140px]" />

      <div className="container relative mx-auto grid items-center gap-16 px-4 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            <Sparkles className="h-3.5 w-3.5 text-cyan-tech" />
            Industria 4.0
          </div>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Convertimos tu planta en una{" "}
            <span className="text-gradient">fábrica inteligente</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
            Integramos IoT, IA y plataformas SCADA modernas para que cada decisión
            se tome con datos en tiempo real. Digitalización real, no powerpoints.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-electric/40 hover:bg-white/10"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-electric/20">
                  <f.icon className="h-5 w-5 text-electric" />
                </div>
                <div className="mt-4 font-display text-lg font-semibold">{f.title}</div>
                <div className="mt-1 text-sm text-white/60">{f.desc}</div>
              </div>
            ))}
          </div>

          <Link
            to="/servicios"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-electric transition-colors hover:text-cyan-tech"
          >
            Descubrir solución 4.0 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-2 shadow-elevated backdrop-blur-xl">
            <img
              src={dashImg}
              alt="Dashboard de planta industrial"
              loading="lazy"
              width={1600}
              height={1024}
              className="rounded-2xl"
            />
          </div>

          <div className="absolute -left-6 -bottom-6 hidden rounded-2xl border border-white/10 bg-graphite/90 p-4 shadow-elevated backdrop-blur-md md:block animate-float">
            <div className="text-[10px] uppercase tracking-wider text-white/50">Producción hoy</div>
            <div className="mt-1 font-mono text-2xl font-semibold text-tech-green">12 480 u.</div>
            <div className="mt-3 flex items-end gap-1 h-12">
              {[40, 65, 50, 80, 70, 92, 85].map((h, i) => (
                <div key={i} className="w-2 rounded-t bg-gradient-to-t from-electric to-cyan-tech" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <div className="absolute -right-6 -top-6 hidden rounded-2xl border border-white/10 bg-graphite/90 p-4 shadow-elevated backdrop-blur-md md:flex md:items-center md:gap-3 animate-float" style={{ animationDelay: "1s" }}>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-tech-green/20">
              <Gauge className="h-5 w-5 text-tech-green" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">OEE</div>
              <div className="font-mono text-lg font-semibold">87.4%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
