import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-graphite py-28 text-graphite-foreground lg:py-40">
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-electric/40 blur-[140px] animate-pulse-glow" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-tech/30 blur-[140px] animate-pulse-glow" />

      <div className="container relative mx-auto max-w-4xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
          <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-tech-green animate-pulse" />
          Hablemos de tu próximo proyecto
        </div>

        <h2 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          Transforma tu producción con{" "}
          <span className="text-gradient">ingeniería industrial inteligente</span>.
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-white/70">
          Cuéntanos tu reto y te conectamos en 24h con el ingeniero que mejor encaja
          con tu sector y proceso.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="hero" size="xl">
            <Link to="/contacto">
              Hablar con un ingeniero <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="xl" className="text-white">
            <a href="https://wa.me/34918796046" target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" /> WhatsApp directo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
