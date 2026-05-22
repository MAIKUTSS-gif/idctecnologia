import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Youtube, Mail, Phone, MapPin, Send } from "lucide-react";
import logoVideo from "@/assets/idc-logo.mp4";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-graphite text-graphite-foreground">
      <div className="absolute inset-0 grid-bg-dark opacity-40" aria-hidden />
      <div className="absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-electric/30 blur-[120px]" aria-hidden />

      <div className="container relative mx-auto px-4 pb-10 pt-20">
        {/* Newsletter */}
        <div className="mb-16 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-md">
            <h3 className="text-2xl font-semibold tracking-tight">Newsletter Industrial 4.0</h3>
            <p className="mt-2 text-sm text-white/70">
              Casos de éxito, tecnología y tendencias en automatización. Una vez al mes.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="tu@empresa.com"
              className="h-12 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-sm placeholder:text-white/50 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/40"
            />
            <button
              type="submit"
              className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-tech text-primary-foreground shadow-glow transition-transform hover:scale-105"
              aria-label="Suscribirse"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center" aria-label="IDC Tecnología — Inicio">
              <video
                src={logoVideo}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden
                className="h-24 w-auto object-contain drop-shadow-[0_0_18px_rgba(80,140,255,0.45)]"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Ingeniería, automatización y mantenimiento industrial para fábricas que
              quieren ser más eficientes, seguras y rentables.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Servicios
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {["Ingeniería Industrial", "Automatización PLC/SCADA", "Mantenimiento 24/7", "Distribución técnica", "Industria 4.0"].map((s) => (
                <li key={s}>
                  <Link to="/servicios" className="text-white/70 transition-colors hover:text-white">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Empresa
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { l: "Sobre nosotros", to: "/sobre-nosotros" as const },
                { l: "Proyectos", to: "/proyectos" as const },
                { l: "Contacto", to: "/contacto" as const },
              ].map((s) => (
                <li key={s.l}>
                  <Link to={s.to} className="text-white/70 transition-colors hover:text-white">
                    {s.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-electric" />
                Parque Científico TecnoAlcalá<br />C/ Punto Mobi, 10 · 28805 Alcalá de Henares, Madrid
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-electric" />
                +34 91 879 60 46
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-electric" />
                informacion@idc.es
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} IDC Tecnología. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span>ISO 9001:2015</span>
            <span>ISO 14001</span>
            <span>ISO 45001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
