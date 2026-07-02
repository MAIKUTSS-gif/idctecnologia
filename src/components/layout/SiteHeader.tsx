import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/idc-logo.png";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/sobre-nosotros", label: "Empresa" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

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
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="IDC Tecnología — Factory Automation"
              width={220}
              height={68}
              className={`h-14 w-auto transition-all duration-300 ${
                scrolled
                  ? "drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                  : "drop-shadow-[0_0_14px_rgba(120,170,255,0.55)]"
              }`}
            />
          </Link>

          <nav className="flex items-center gap-0.5 sm:gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-2 py-2 text-[11px] font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground sm:px-3 sm:text-xs md:px-4 md:text-sm"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Button asChild variant="hero" size="default">
              <Link to="/contacto">Solicitar presupuesto</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

