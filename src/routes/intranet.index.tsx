import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { checkIntranetAccess } from "@/lib/intranet";
import { listPublishedNews, NEWS_CATEGORY_LABELS, type NewsCategory, type NewsItem } from "@/lib/news";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/intranet/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Intranet de empleados — IDC Tecnología" },
      { name: "description", content: "Noticias internas para el equipo de IDC Tecnología." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Intranet de empleados — IDC Tecnología" },
      { property: "og:description", content: "Noticias internas del equipo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IntranetPage,
});

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function IntranetPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<"checking" | "denied" | "ready">("checking");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/intranet/login", replace: true });
        return;
      }
      const ok = await checkIntranetAccess();
      if (!active) return;
      if (!ok) {
        setState("denied");
        return;
      }
      setState("ready");
      try {
        const rows = await listPublishedNews();
        if (active) setNews(rows);
      } catch {
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/intranet/login", replace: true });
  }

  if (state === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <h1 className="font-display text-xl font-semibold">Acceso no autorizado</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta cuenta no tiene acceso al área de empleados.
          </p>
          <Button type="button" className="mt-6" onClick={handleSignOut}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 pb-20 pt-44 md:pt-48">
      <div className="mx-auto w-full max-w-3xl px-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold">Noticias internas</h1>
            <p className="text-sm text-muted-foreground">Área privada de empleados.</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Cerrar sesión</span>
            <span className="sr-only sm:hidden">Cerrar sesión</span>
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : loadError ? (
            <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground shadow-soft">
              No se han podido cargar las noticias. Inténtalo de nuevo más tarde.
            </p>
          ) : news.length === 0 ? (
            <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground shadow-soft">
              Todavía no hay noticias publicadas.
            </p>
          ) : (
            news.map((item) => (
              <article
                key={String(item.id)}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">
                    {NEWS_CATEGORY_LABELS[item.category as NewsCategory] ?? item.category}
                  </Badge>
                  {item.published_at && <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>}
                </div>
                <h2 className="mt-3 break-words font-display text-lg font-semibold sm:text-xl">
                  {item.title}
                </h2>
                {item.body && (
                  <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/90">
                    {item.body}
                  </p>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
