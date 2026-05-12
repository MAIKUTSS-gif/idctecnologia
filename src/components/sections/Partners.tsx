const PARTNERS = ["SIEMENS", "ABB", "SCHNEIDER", "OMRON", "SICK", "SMC", "BOSCH REXROTH", "FESTO", "ROCKWELL", "PHOENIX"];

export function Partners() {
  return (
    <section className="border-y border-border bg-surface py-16">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Trabajamos con los líderes globales de la industria
        </p>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-surface to-transparent" />

          <div className="flex w-max animate-marquee gap-16">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="font-display text-2xl font-semibold tracking-[0.18em] text-foreground/40 transition-colors hover:text-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
