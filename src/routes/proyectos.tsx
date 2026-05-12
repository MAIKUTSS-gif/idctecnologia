import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/sections/Projects";
import { CtaFinal } from "@/components/sections/CtaFinal";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos industriales destacados | IDC Tecnología" },
      { name: "description", content: "Casos reales de automatización industrial: líneas robotizadas, cuadros eléctricos, smart factories e integraciones SCADA." },
      { property: "og:title", content: "Proyectos industriales — IDC Tecnología" },
      { property: "og:description", content: "+450 proyectos llave en mano para la industria." },
    ],
  }),
  component: ProyectosPage,
});

function ProyectosPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-graphite pb-20 pt-40 text-graphite-foreground lg:pt-52">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-tech/30 blur-[140px]" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            Portfolio
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Proyectos que <span className="text-gradient">hablan por nosotros</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Una selección de casos en automoción, energía, alimentación, farma y logística.
          </p>
        </div>
      </section>
      <Projects />
      <CtaFinal />
    </>
  );
}
