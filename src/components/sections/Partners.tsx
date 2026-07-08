import logoSick from "@/assets/logo-sick.png";
import logoSmc from "@/assets/logo-smc.png";
import logo3m from "@/assets/logo-3m.png";
import logoWestinghouse from "@/assets/logo-westinghouse.png.asset.json";
import logoValeo from "@/assets/logo-valeo.png.asset.json";
import logoZara from "@/assets/logo-zara.png.asset.json";

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
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-electric">
          Partners oficiales de SICK y SMC
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-[48px]">
          <a
            href="https://www.sick.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SICK — sitio oficial"
            className="inline-flex items-center transition-transform duration-300 ease-out hover:scale-105"
          >
            <img
              src={logoSick}
              alt="SICK Sensor Intelligence"
              className="h-10 w-auto sm:h-[50px]"
              loading="lazy"
            />
          </a>
          <a
            href="https://www.smc.eu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SMC — sitio oficial"
            className="inline-flex items-center transition-transform duration-300 ease-out hover:scale-105"
          >
            <img
              src={logoSmc}
              alt="SMC"
              className="h-10 w-auto sm:h-[50px]"
              loading="lazy"
            />
          </a>
        </div>

        <p className="mt-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Trabajamos con los líderes globales de la industria
        </p>


        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-surface to-transparent" />

          <div className="flex w-max animate-marquee gap-16 items-center">
            {[...PARTNERS, ...PARTNERS].map((p, i) =>
              p === "3M" ? (
                <img
                  key={`${p}-${i}`}
                  src={logo3m}
                  alt="3M"
                  className="h-7 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Westinghouse" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoWestinghouse.url}
                  alt="Westinghouse"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Valeo" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoValeo.url}
                  alt="Valeo"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Zara" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoZara.url}
                  alt="Zara"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : (
                <span
                  key={`${p}-${i}`}
                  className="font-display text-2xl font-semibold tracking-[0.18em] text-foreground/40 transition-colors hover:text-foreground"
                >
                  {p}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
