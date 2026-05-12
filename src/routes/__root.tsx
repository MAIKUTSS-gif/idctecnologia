import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold text-gradient">404</h1>
        <h2 className="mt-4 font-display text-2xl font-semibold">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-tech px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">Algo no ha cargado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Inténtalo de nuevo o vuelve a la página principal.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-xl bg-gradient-tech px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
          >
            Reintentar
          </button>
          <a href="/" className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium">Inicio</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "IDC Tecnología — Automatización industrial e ingeniería 4.0" },
      { name: "description", content: "Soluciones llave en mano de automatización, ingeniería y mantenimiento industrial. Más de 20 años transformando fábricas." },
      { name: "author", content: "IDC Tecnología" },
      { property: "og:title", content: "IDC Tecnología — Automatización industrial" },
      { property: "og:description", content: "Ingeniería, automatización y mantenimiento industrial para la industria 4.0." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
      <a
        href="https://wa.me/34918796046"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-tech-green text-graphite shadow-elevated transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2.4} />
      </a>
    </QueryClientProvider>
  );
}
