const PARTNERS = [
  "Westinghouse",
  "Valeo",
  "Zara",
  "Universidad Carlos III",
  "Universidad Politécnica",
  "3M",
  "Aernnova",
  "Alter Farmacia",
  "Antena 3",
  "Hella",
  "Nivea",
  "Campofrío",
  "Saica",
  "CSIC",
  "Saint Gobain",
  "Danone",
  "ERCROS",
  "Exide",
  "Iberia LAE",
  "INTA",
  "International Paper",
  "Lilly",
  "OTIS",
  "Patentes Talgo",
  "Pladur",
  "Robert Bosch",
];

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
