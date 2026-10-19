import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, LogOut, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { supabase } from "@/lib/supabase";
import { checkIsAdmin } from "@/lib/jobs";
import { deleteSuggestion, listSuggestions, setSuggestionStatus, type Suggestion } from "@/lib/suggestions";

export const Route = createFileRoute("/admin/sugerencias")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Gestión de sugerencias — IDC Tecnología" },
    { name: "description", content: "Panel privado de gestión de sugerencias de empleados de IDC Tecnología." },
    { property: "og:title", content: "Gestión de sugerencias — IDC Tecnología" },
    { property: "og:description", content: "Panel interno de sugerencias del equipo." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AdminSuggestionsPage,
});

function AdminSuggestionsPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<"checking" | "denied" | "ready">("checking");
  const [rows, setRows] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [toDelete, setToDelete] = useState<Suggestion | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try { setRows(await listSuggestions()); }
    catch { setLoadError(true); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/admin/login", replace: true });
        return;
      }
      const admin = await checkIsAdmin();
      if (!active) return;
      if (!admin) { setState("denied"); return; }
      setState("ready");
      void refresh();
    })();
    return () => { active = false; };
  }, [navigate, refresh]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  async function toggleStatus(item: Suggestion) {
    if (busy) return;
    setBusy(true);
    try {
      await setSuggestionStatus(item.id, item.status === "nueva" ? "revisada" : "nueva");
      toast.success("Estado actualizado");
      await refresh();
    } catch { toast.error("No se ha podido cambiar el estado"); }
    finally { setBusy(false); }
  }

  async function confirmDelete() {
    if (!toDelete || busy) return;
    setBusy(true);
    try {
      await deleteSuggestion(toDelete.id);
      setToDelete(null);
      toast.success("Sugerencia eliminada");
      await refresh();
    } catch { toast.error("No se ha podido eliminar la sugerencia"); }
    finally { setBusy(false); }
  }

  if (state === "checking") return <div className="flex min-h-screen items-center justify-center bg-muted/40"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (state === "denied") return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
        <h1 className="font-display text-xl font-semibold">Acceso no autorizado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tu cuenta no tiene permisos de administración.</p>
        <Button type="button" className="mt-6" onClick={handleSignOut}>Cerrar sesión</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/40 pb-20 pt-48">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-semibold">Sugerencias</h1>
          <Button type="button" variant="outline" onClick={handleSignOut}><LogOut className="h-4 w-4" /> Cerrar sesión</Button>
        </div>
        <nav aria-label="Panel de administración" className="mt-6 inline-flex max-w-full flex-wrap rounded-full border border-border bg-card p-1 shadow-soft">
          <Button type="button" size="sm" variant="ghost" asChild className="rounded-full"><Link to="/admin/empleo">Empleo</Link></Button>
          <Button type="button" size="sm" variant="ghost" asChild className="rounded-full"><Link to="/admin/proyectos">Proyectos</Link></Button>
          <Button type="button" size="sm" variant="ghost" asChild className="rounded-full"><Link to="/admin/noticias">Noticias</Link></Button>
          <Button type="button" size="sm" asChild className="rounded-full"><Link to="/admin/sugerencias" aria-current="page">Sugerencias</Link></Button>
        </nav>
        <div className="mt-6 space-y-4">
          {loading ? <div role="status" aria-label="Cargando sugerencias" className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : loadError ? (
            <div className="py-10 text-center"><p role="alert" className="mb-4 text-sm text-destructive">No se han podido cargar las sugerencias.</p><Button type="button" variant="outline" onClick={refresh}>Reintentar</Button></div>
          ) : rows.length === 0 ? <p className="py-10 text-center text-sm text-muted-foreground">Todavía no hay sugerencias.</p> : rows.map((item) => (
            <article key={item.id} className="rounded-lg border border-border bg-card p-5 shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><h2 className="break-words font-display font-semibold">{item.author_name || "Anónimo"}</h2><Badge variant={item.status === "nueva" ? "default" : "secondary"}>{item.status === "nueva" ? "Nueva" : "Revisada"}</Badge></div>
                  <time dateTime={item.created_at} className="mt-2 block text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })}</time>
                  <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed">{item.message}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => toggleStatus(item)}>{item.status === "nueva" ? <Check className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}{item.status === "nueva" ? "Marcar como revisada" : "Volver a nueva"}</Button>
                  <Button type="button" size="sm" variant="outline" className="text-destructive" disabled={busy} onClick={() => setToDelete(item)}><Trash2 className="h-4 w-4" /> Eliminar</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => { if (!open && !busy) setToDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Eliminar esta sugerencia?</AlertDialogTitle><AlertDialogDescription>La sugerencia se eliminará de forma permanente. Esta acción no se puede deshacer.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel type="button" disabled={busy}>Cancelar</AlertDialogCancel><AlertDialogAction type="button" disabled={busy} onClick={(event) => { event.preventDefault(); void confirmDelete(); }}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} Eliminar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}