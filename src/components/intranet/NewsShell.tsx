import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { checkIntranetAccess } from "@/lib/intranet";
import { NEWS_CATEGORY_LABELS, type NewsCategory, type NewsItem } from "@/lib/news";

export function NewsShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [state, setState] = useState<"checking" | "denied" | "ready">("checking");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!active) return;
        if (!data.user) {
          navigate({ to: "/intranet/login", replace: true });
          return;
        }
        const ok = await checkIntranetAccess();
        if (active) setState(ok ? "ready" : "denied");
      } catch {
        if (active) setState("denied");
      }
    })();
    return () => { active = false; };
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/intranet/login", replace: true });
  }

  if (state === "checking") return <div className="flex min-h-screen items-center justify-center bg-muted/40"><NewsLoading /></div>;
  if (state === "denied") return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-soft">
        <h1 className="font-display text-xl font-semibold">Acceso no autorizado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Esta cuenta no tiene acceso al área de empleados.</p>
        <Button type="button" className="mt-6" onClick={handleSignOut}>Cerrar sesión</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/40 pb-20 pt-44 md:pt-48">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <header className="flex items-start justify-between gap-3 border-b border-border pb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-normal">Noticias internas</h1>
            <p className="text-sm text-muted-foreground">Área privada de empleados.</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Cerrar sesión</span>
            <span className="sr-only sm:hidden">Cerrar sesión</span>
          </Button>
        </header>
        {children}
      </div>
    </div>
  );
}

export function NewsLoading() {
  return <div className="flex justify-center py-12" role="status" aria-label="Cargando noticias"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
}

export function NewsCategoryLabel({ category }: { category: NewsItem["category"] }) {
  return <p className="break-words text-xs font-semibold uppercase tracking-normal text-primary">{NEWS_CATEGORY_LABELS[category as NewsCategory] ?? category}</p>;
}

export function NewsDate({ item }: { item: NewsItem }) {
  const value = item.published_at ?? item.created_at;
  return <time className="block text-xs text-muted-foreground" dateTime={value}>{new Date(value).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</time>;
}

export function NewsImage({ url, title }: { url: string; title: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img src={url} alt={title} onError={() => setFailed(true)} className="aspect-video w-full object-cover" />;
}