import sickLogo from "@/assets/sick-logo-transparent.png";
import smcLogo from "@/assets/smc-logo-transparent.png";

export function Partners() {
  return (
    <section className="border-y border-border bg-surface py-16">
      <div className="container mx-auto px-4">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-electric">
          Partners oficiales de SICK y SMC
        </p>

        <p className="mt-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Trabajamos con los líderes globales de la industria
        </p>

        <div className="mt-10 flex items-center justify-center gap-12">
          <a
            href="https://www.sick.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform duration-300 ease-out hover:scale-105"
          >
            <img
              src={sickLogo}
              alt="SICK Sensor Intelligence"
              className="h-10 w-auto object-contain sm:h-11 md:h-12"
              loading="lazy"
            />
          </a>

          <a
            href="https://www.smcworld.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform duration-300 ease-out hover:scale-105"
          >
            <img
              src={smcLogo}
              alt="SMC Corporation"
              className="h-10 w-auto object-contain sm:h-11 md:h-12"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
