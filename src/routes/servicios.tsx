import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/sections/Services";
import { Industry40 } from "@/components/sections/Industry40";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Partners } from "@/components/sections/Partners";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — Ingeniería, automatización y mantenimiento industrial | Novatek" },
      { name: "description", content: "Automatización PLC/SCADA, mantenimiento preventivo y predictivo, distribución de componentes industriales. Servicios técnicos para la industria." },
      { property: "og:title", content: "Servicios industriales — Novatek" },
      { property: "og:description", content: "Ingeniería, automatización y mantenimiento llave en mano." },
    ],
  }),
  component: ServiciosPage,
});

function ServiciosPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-graphite pb-20 pt-40 text-graphite-foreground lg:pt-52">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-electric/30 blur-[140px]" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            Servicios
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Tres divisiones que <span className="text-gradient">cubren toda tu cadena industrial</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Desde el diseño de ingeniería de detalle hasta el suministro y mantenimiento.
          </p>
        </div>
      </section>
      <Services />
      <Industry40 />
      <Partners />
      <CtaFinal />
    </>
  );
}
