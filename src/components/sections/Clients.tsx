const CLIENTS = [
  { name: "Westinghouse", domain: "westinghouse.com" },
  { name: "Valeo", domain: "valeo.com" },
  { name: "Zara", domain: "zara.com" },
  { name: "Universidad Carlos III", domain: "uc3m.es" },
  { name: "Universidad Politécnica", domain: "upm.es" },
  { name: "3M", domain: "3m.com" },
  { name: "Aernnova", domain: "aernnova.com" },
  { name: "Alter Farmacia", domain: "alterfarmacia.com" },
  { name: "Antena 3", domain: "antena3.com" },
  { name: "Hella", domain: "hella.com" },
  { name: "Nivea", domain: "nivea.com" },
  { name: "Campofrío", domain: "campofrio.es" },
  { name: "Saica", domain: "saica.com" },
  { name: "CSIC", domain: "csic.es" },
  { name: "Saint-Gobain", domain: "saint-gobain.com" },
  { name: "Danone", domain: "danone.com" },
  { name: "Ercros", domain: "ercros.com" },
  { name: "Exide", domain: "exidegroup.com" },
  { name: "Iberia", domain: "iberia.com" },
  { name: "INTA", domain: "inta.es" },
  { name: "International Paper", domain: "internationalpaper.com" },
  { name: "Lilly", domain: "lilly.com" },
  { name: "OTIS", domain: "otis.com" },
  { name: "Patentes Talgo", domain: "talgo.com" },
  { name: "Pladur", domain: "pladur.com" },
  { name: "Robert Bosch", domain: "bosch.com" },
];

export function Clients() {
  return (
    <section className="border-y border-border bg-surface py-20">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Empresas que confían en nosotros
        </p>
        <h2 className="mt-4 text-center font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Más de 25 años junto a <span className="text-gradient">líderes industriales</span>
        </h2>

        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-surface to-transparent" />

          <div className="flex w-max animate-marquee items-center gap-16">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="group flex h-16 w-40 shrink-0 items-center justify-center"
                title={c.name}
              >
                <img
                  src={`https://logo.clearbit.com/${c.domain}?size=200`}
                  alt={c.name}
                  loading="lazy"
                  width={160}
                  height={48}
                  className="max-h-12 w-auto max-w-full object-contain opacity-60 grayscale transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const fallback = img.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <span
                  className="hidden h-full w-full items-center justify-center text-center font-display text-base font-semibold tracking-[0.15em] text-foreground/50 transition-colors group-hover:text-foreground"
                  aria-hidden
                >
                  {c.name.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
