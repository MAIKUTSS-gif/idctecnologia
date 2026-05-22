import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { Industry40 } from "@/components/sections/Industry40";
import { Projects } from "@/components/sections/Projects";
import { Advantages } from "@/components/sections/Advantages";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaFinal } from "@/components/sections/CtaFinal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IDC Tecnología — Automatización industrial del futuro" },
      { name: "description", content: "Desde 1996 diseñamos, integramos y mantenemos soluciones industriales avanzadas. Ingeniería, mantenimiento electromecánico, distribución técnica e Industria 4.0." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Clients />
      <Services />
      <Industry40 />
      <Projects />
      <Advantages />
      <Testimonials />
      <CtaFinal />
    </>
  );
}
