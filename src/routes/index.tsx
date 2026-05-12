import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
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
      { name: "description", content: "Ingeniería, automatización, mantenimiento industrial y distribución de componentes técnicos. Soluciones llave en mano para la industria 4.0." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Partners />
      <Services />
      <Industry40 />
      <Projects />
      <Advantages />
      <Testimonials />
      <CtaFinal />
    </>
  );
}
