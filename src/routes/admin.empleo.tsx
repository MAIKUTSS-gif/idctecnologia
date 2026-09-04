import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Loader2, LogOut, Pencil, Trash2, Eye, EyeOff, Plus, Users } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";
import {
  checkIsAdmin,
  createOffer,
  deleteOffer,
  listAllOffers,
  updateOffer,
  type JobOffer,
  type JobOfferInput,
} from "@/lib/jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AdminApplications } from "@/components/jobs/AdminApplications";
import { countApplicationsByOffer } from "@/lib/applications";

export const Route = createFileRoute("/admin/empleo")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Gestión de ofertas de empleo — IDC Tecnología" },
      { name: "description", content: "Panel interno de gestión de ofertas de empleo de IDC Tecnología." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Gestión de ofertas de empleo — IDC Tecnología" },
      { property: "og:description", content: "Panel interno de gestión de ofertas de empleo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminJobsPage,
});

const EMPTY: JobOfferInput = {
  title: "",
  location: "",
  department: "",
  contract_type: "",
  description: "",
  requirements: "",
  benefits: "",
  published: false,
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function AdminJobsPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<"checking" | "denied" | "ready">("checking");
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [editing, setEditing] = useState<JobOffer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<JobOfferInput>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<JobOffer | null>(null);
  const [tab, setTab] = useState<"offers" | "applications">("offers");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [filterOffer, setFilterOffer] = useState<JobOffer | null>(null);

  const refreshCounts = useCallback(async () => {
    try {
      setCounts(await countApplicationsByOffer());
    } catch {
      /* el contador es informativo; no bloquea la gestión de ofertas */
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoadingList(true);
    try {
      setOffers(await listAllOffers());
    } catch {
      toast.error("No se han podido cargar las ofertas");
    } finally {
      setLoadingList(false);
    }
    void refreshCounts();
  }, [refreshCounts]);

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
      if (!admin) {
        setState("denied");
        return;
      }
      setState("ready");
      void refresh();
    })();
    return () => {
      active = false;
    };
  }, [navigate, refresh]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setDialogOpen(true);
  }

  function openEdit(offer: JobOffer) {
    setEditing(offer);
    setForm({
      title: offer.title ?? "",
      location: offer.location ?? "",
      department: offer.department ?? "",
      contract_type: offer.contract_type ?? "",
      description: offer.description ?? "",
      requirements: offer.requirements ?? "",
      benefits: offer.benefits ?? "",
      published: Boolean(offer.published),
    });
    setDialogOpen(true);
  }

  async function save(published?: boolean) {
    if (!form.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }
    const payload: JobOfferInput = {
      ...form,
      published: published ?? form.published,
    };
    setSaving(true);
    try {
      if (editing) {
        await updateOffer(editing.id, payload);
        toast.success("Oferta actualizada");
      } else {
        await createOffer(payload);
        toast.success(payload.published ? "Oferta publicada" : "Borrador guardado");
      }
      setDialogOpen(false);
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se ha podido guardar la oferta");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(offer: JobOffer) {
    try {
      await updateOffer(offer.id, { published: !offer.published });
      toast.success(offer.published ? "Oferta despublicada" : "Oferta publicada");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se ha podido cambiar el estado");
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await deleteOffer(toDelete.id);
      toast.success("Oferta eliminada");
      setToDelete(null);
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se ha podido eliminar la oferta");
    }
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
            Tu cuenta no tiene permisos de administración.
          </p>
          <Button type="button" className="mt-6" onClick={handleSignOut}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 pb-20 pt-48">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold">Ofertas de empleo</h1>
            <p className="text-sm text-muted-foreground">Gestión interna de las vacantes publicadas.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" onClick={openCreate}>
              <Plus className="h-4 w-4" /> Nueva oferta
            </Button>
            <Button type="button" variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </Button>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Ubicación</th>
                <th className="px-4 py-3">Departamento</th>
                <th className="px-4 py-3">Contrato</th>
                <th className="px-4 py-3">Publicada</th>
                <th className="px-4 py-3">Creada</th>
                <th className="px-4 py-3">Actualizada</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loadingList && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                    Cargando ofertas…
                  </td>
                </tr>
              )}
              {!loadingList && offers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                    Todavía no hay ofertas creadas.
                  </td>
                </tr>
              )}
              {!loadingList &&
                offers.map((offer) => (
                  <tr key={offer.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-medium">{offer.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{offer.location || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{offer.department || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{offer.contract_type || "—"}</td>
                    <td className="px-4 py-3">
                      <Badge variant={offer.published ? "default" : "secondary"}>
                        {offer.published ? "Sí" : "No"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(offer.created_at)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(offer.updated_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" type="button" variant="ghost" onClick={() => openEdit(offer)}>
                          <Pencil className="h-4 w-4" /> Editar
                        </Button>
                        <Button size="sm" type="button" variant="ghost" onClick={() => togglePublished(offer)}>
                          {offer.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          {offer.published ? "Despublicar" : "Publicar"}
                        </Button>
                        <Button
                          size="sm"
                          type="button"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => setToDelete(offer)}
                        >
                          <Trash2 className="h-4 w-4" /> Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar oferta" : "Nueva oferta"}</DialogTitle>
            <DialogDescription>
              Completa los datos de la vacante. Puedes guardarla como borrador o publicarla.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="department">Departamento</Label>
              <Input
                id="department"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="contract_type">Tipo de contrato</Label>
              <Input
                id="contract_type"
                value={form.contract_type}
                onChange={(e) => setForm({ ...form, contract_type: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="requirements">Requisitos</Label>
              <Textarea
                id="requirements"
                rows={4}
                value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="benefits">Beneficios</Label>
              <Textarea
                id="benefits"
                rows={4}
                value={form.benefits}
                onChange={(e) => setForm({ ...form, benefits: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <Switch
                id="published"
                checked={form.published}
                onCheckedChange={(checked) => setForm({ ...form, published: checked })}
              />
              <Label htmlFor="published">Publicada</Label>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => save(false)} disabled={saving}>
              Guardar borrador
            </Button>
            <Button type="button" onClick={() => save(editing ? undefined : true)} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? "Guardar cambios" : "Publicar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Seguro que quieres eliminar esta oferta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La oferta «{toDelete?.title}» se eliminará
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
