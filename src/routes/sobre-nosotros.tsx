import { createFileRoute } from "@tanstack/react-router";
import { Advantages } from "@/components/sections/Advantages";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaFinal } from "@/components/sections/CtaFinal";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre Novatek — 20 años de ingeniería industrial" },
      { name: "description", content: "Conoce el equipo, la metodología y la visión de Novatek: ingeniería industrial avanzada con cobertura nacional." },
      { property: "og:title", content: "Sobre Novatek" },
      { property: "og:description", content: "Equipo, metodología y visión de Novatek Industrial Automation." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-graphite pb-32 pt-40 text-graphite-foreground lg:pt-52">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-electric/30 blur-[140px]" />
        <div className="container relative mx-auto max-w-5xl px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
              Empresa
            </div>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Ingeniería industrial con visión <span className="text-gradient">2026</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Desde 2004 trabajamos junto a fabricantes para optimizar procesos productivos
              mediante automatización, digitalización y mantenimiento técnico de alto nivel.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
            {[
              { v: "20+", l: "Años" },
              { v: "450", l: "Proyectos" },
              { v: "80", l: "Ingenieros" },
              { v: "12", l: "Sectores" },
            ].map((s) => (
              <div key={s.l} className="bg-graphite p-8 text-center">
                <div className="font-display text-4xl font-semibold text-gradient md:text-5xl">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Advantages />
      <Testimonials />
      <CtaFinal />
    </>
  );
}
