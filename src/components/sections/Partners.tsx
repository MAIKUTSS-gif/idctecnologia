import logoSick from "@/assets/logo-sick.png";
import logoSmc from "@/assets/logo-smc.png";
import logo3m from "@/assets/logo-3m.png";
import logoWestinghouse from "@/assets/logo-westinghouse.png";
import logoValeo from "@/assets/logo-valeo.png";
import logoZara from "@/assets/logo-zara.png";
import logoUc3m from "@/assets/logo-uc3m.png";
import logoUpm from "@/assets/logo-upm.png";
import logoAernnova from "@/assets/logo-aernnova.png";
import logoAlter from "@/assets/logo-alter.png";
import logoAntena3 from "@/assets/logo-antena3.png";
import logoForvia from "@/assets/logo-forvia.png";
import logoNivea from "@/assets/logo-nivea.png";
import logoCampofrio from "@/assets/logo-campofrio.png";
import logoSaica from "@/assets/logo-saica.png";
import logoCsic from "@/assets/logo-csic.png";
import logoSaintGobain from "@/assets/saint-gobain.png";
import logoDanone from "@/assets/danone.png";
import logoErcros from "@/assets/logo-ercros.png";
import logoExide from "@/assets/exide.png";
import logoIberia from "@/assets/logo-iberia.png";
import logoInta from "@/assets/logo-inta.png";
import logoInternationalPaper from "@/assets/logo-international-paper.png";
import logoLilly from "@/assets/logo-lilly.png";
import logoOtis from "@/assets/logo-otis.png";
import logoTalgo from "@/assets/logo-talgo.png";


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
                  src={logoWestinghouse}
                  alt="Westinghouse"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Valeo" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoValeo}
                  alt="Valeo"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Zara" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoZara}
                  alt="Zara"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Universidad Carlos III" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoUc3m}
                  alt="Universidad Carlos III de Madrid"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Universidad Politécnica" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoUpm}
                  alt="Universidad Politécnica de Madrid"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Aernnova" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoAernnova}
                  alt="Aernnova"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Alter Farmacia" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoAlter}
                  alt="Alter Farmacia"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Antena 3" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoAntena3}
                  alt="Antena 3"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Hella" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoForvia}
                  alt="Forvia"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Nivea" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoNivea}
                  alt="Nivea"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Campofrío" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoCampofrio}
                  alt="Campofrío Food Group"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Saica" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoSaica}
                  alt="Saica"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "CSIC" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoCsic}
                  alt="CSIC"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Saint Gobain" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoSaintGobain}
                  alt="Saint-Gobain"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Danone" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoDanone}
                  alt="Danone"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "ERCROS" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoErcros}
                  alt="Ercros"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Exide" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoExide}
                  alt="Exide Technologies"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Iberia LAE" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoIberia}
                  alt="Iberia LAE"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "INTA" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoInta}
                  alt="INTA"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "International Paper" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoInternationalPaper}
                  alt="International Paper"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Lilly" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoLilly}
                  alt="Lilly"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "OTIS" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoOtis}
                  alt="OTIS"
                  className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              ) : p === "Patentes Talgo" ? (
                <img
                  key={`${p}-${i}`}
                  src={logoTalgo}
                  alt="Patentes Talgo"
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
