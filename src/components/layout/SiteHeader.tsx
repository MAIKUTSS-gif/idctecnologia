import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/sobre-nosotros", label: "Empresa" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled ? "glass shadow-soft" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-tech shadow-glow">
              <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-semibold tracking-tight">NOVATEK</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Industrial Automation
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="hero" size="default">
              <Link to="/contacto">Solicitar presupuesto</Link>
            </Button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-2xl glass p-4 shadow-elevated lg:hidden animate-fade-up">
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-foreground/5"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="hero" className="mt-2">
                <Link to="/contacto" onClick={() => setOpen(false)}>
                  Solicitar presupuesto
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
