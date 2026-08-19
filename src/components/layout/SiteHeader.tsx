import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/idc-logo.png";

const EMPRESA_ITEMS = [
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/contacto", label: "Contacto" },
  { to: "/canal-del-informante", label: "Canal del Informante" },
] as const;

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/trabaja-con-nosotros", label: "Empleo" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [empresaOpen, setEmpresaOpen] = useState(false);
  const empresaRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const empresaActive = EMPRESA_ITEMS.some((item) => pathname === item.to);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (empresaRef.current && !empresaRef.current.contains(e.target as Node)) {
        setEmpresaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 md:py-3" : "py-4 md:py-5"
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
              width={325}
              height={100}
              className={`h-16 sm:h-20 md:h-28 w-auto transition-all duration-300 ${
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

            {/* Empresa dropdown */}
            <div className="relative" ref={empresaRef}>
              <button
                type="button"
                onClick={() => setEmpresaOpen((v) => !v)}
                onMouseEnter={() => setEmpresaOpen(true)}
                className={`flex items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium transition-colors hover:bg-foreground/5 hover:text-foreground sm:px-3 sm:text-xs md:px-4 md:text-sm ${
                  empresaActive ? "text-primary" : "text-foreground/80"
                }`}
                aria-haspopup="true"
                aria-expanded={empresaOpen}
              >
                Empresa
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    empresaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {empresaOpen && (
                <div
                  onMouseLeave={() => setEmpresaOpen(false)}
                  className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-xl border border-border/60 bg-surface-elevated/95 p-1.5 shadow-elevated backdrop-blur-md"
                >
                  {EMPRESA_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setEmpresaOpen(false)}
                      className={`block rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-electric/10 hover:text-primary ${
                        pathname === item.to
                          ? "bg-electric/10 text-primary"
                          : "text-foreground/80"
                      }`}
                      activeProps={{ className: "text-primary" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
