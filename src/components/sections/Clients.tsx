const CLIENTS = [
  { name: "Westinghouse", domain: "westinghouse.com" },
  { name: "Valeo", domain: "valeo.com" },
  { name: "Zara", domain: "zara.com" },
  { name: "Universidad Carlos III", domain: "uc3m.es" },
  { name: "Universidad Politécnica de Madrid", domain: "upm.es" },
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
    <section className="relative overflow-hidden border-y border-border bg-surface py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-30" aria-hidden />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-electric" />
            Clientes
          </div>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Empresas que <span className="text-gradient">confían en nosotros</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Más de 25 años acompañando a referentes industriales, tecnológicos e institucionales.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CLIENTS.map((c) => (
            <div
              key={c.name}
              className="group relative flex aspect-[5/3] items-center justify-center bg-card p-5 transition-colors duration-300 hover:bg-surface-elevated"
              title={c.name}
            >
              <img
                src={`https://logo.clearbit.com/${c.domain}?size=200`}
                alt={c.name}
                loading="lazy"
                width={160}
                height={64}
                className="max-h-12 w-auto max-w-[80%] object-contain opacity-60 grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <span
                className="hidden h-full w-full items-center justify-center text-center font-display text-sm font-semibold tracking-wide text-foreground/60 transition-colors group-hover:text-foreground"
                aria-hidden
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
          Industria · Automoción · Farma · Alimentación · Aeronáutica · Universidades · Centros de investigación
        </p>
      </div>
    </section>
  );
}
