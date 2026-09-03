import { useCallback, useEffect, useState } from "react";
import { Download, Loader2, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  deleteApplication,
  getCvSignedUrl,
  listApplications,
  STATUS_LABELS,
  STATUS_ORDER,
  updateApplication,
  type ApplicationStatus,
  type JobApplication,
} from "@/lib/applications";

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_VARIANT: Record<ApplicationStatus, "default" | "secondary" | "outline" | "destructive"> = {
  new: "default",
  reviewing: "secondary",
  interview: "outline",
  selected: "default",
  rejected: "destructive",
};

export function AdminApplications({
  jobOfferId,
  jobOfferTitle,
  onClearOfferFilter,
  onChanged,
}: {
  jobOfferId: string | null;
  jobOfferTitle?: string | null;
  onClearOfferFilter: () => void;
  onChanged: () => void;
}) {
  const [status, setStatus] = useState<ApplicationStatus | "all">("all");
  const [items, setItems] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<JobApplication | null>(null);
  const [draftStatus, setDraftStatus] = useState<ApplicationStatus>("new");
  const [draftNotes, setDraftNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [toDelete, setToDelete] = useState<JobApplication | null>(null);
  const [deleting, setDeleting] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await listApplications({ status, jobOfferId }));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "No se han podido cargar las candidaturas",
      );
    } finally {
      setLoading(false);
    }
  }, [status, jobOfferId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  function openDetail(app: JobApplication) {
    setSelected(app);
    setDraftStatus(app.status);
    setDraftNotes(app.internal_notes ?? "");
  }

  async function saveDetail() {
    if (!selected) return;
    setSaving(true);
    try {
      await updateApplication(selected.id, {
        status: draftStatus,
        internal_notes: draftNotes.trim() ? draftNotes : null,
      });
      toast.success("Candidatura actualizada");
      setSelected(null);
      await refresh();
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se han podido guardar los cambios");
    } finally {
      setSaving(false);
    }
  }

  async function downloadCv(app: JobApplication) {
    if (!app.cv_path) {
      toast.error("Esta candidatura no tiene un CV disponible.");
      return;
    }
    setDownloading(true);
    try {
      const url = await getCvSignedUrl(app.cv_path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se ha podido descargar el CV");
    } finally {
      setDownloading(false);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const { cvWarning } = await deleteApplication(toDelete);
      if (cvWarning) toast.warning(cvWarning);
      toast.success("Candidatura eliminada");
      setToDelete(null);
      setSelected(null);
      await refresh();
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se ha podido eliminar la candidatura");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-56">
          <Select value={status} onValueChange={(v) => setStatus(v as ApplicationStatus | "all")}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {STATUS_ORDER.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {jobOfferId && (
          <Button type="button" variant="outline" size="sm" onClick={onClearOfferFilter}>
            <X className="h-4 w-4" /> Oferta: {jobOfferTitle || jobOfferId}
          </Button>
        )}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Oferta</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  Cargando candidaturas…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  No hay candidaturas con estos filtros.
                </td>
              </tr>
            )}
            {!loading &&
              items.map((app) => (
                <tr key={app.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-medium">
                    {app.first_name} {app.last_name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {app.job_offers?.title ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{app.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{app.phone || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDateTime(app.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANT[app.status] ?? "secondary"}>
                      {STATUS_LABELS[app.status] ?? app.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <Button type="button" size="sm" variant="ghost" onClick={() => openDetail(app)}>
                        Ver detalle
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selected ? `${selected.first_name} ${selected.last_name}` : "Candidatura"}
            </DialogTitle>
            <DialogDescription>
              Detalle interno de la candidatura. Esta información no es pública.
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-6">
              <dl className="grid gap-4 sm:grid-cols-2">
                <Detail label="Oferta" value={selected.job_offers?.title ?? "—"} />
                <Detail label="Fecha" value={formatDateTime(selected.created_at)} />
                <Detail label="Email" value={selected.email} />
                <Detail label="Teléfono" value={selected.phone || "—"} />
                <Detail label="Ciudad" value={selected.city || "—"} />
                <Detail label="LinkedIn" value={selected.linkedin || "—"} link={selected.linkedin} />
              </dl>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Mensaje</p>
                <p className="mt-1 whitespace-pre-line text-sm">{selected.message || "—"}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Estado</Label>
                  <Select
                    value={draftStatus}
                    onValueChange={(v) => setDraftStatus(v as ApplicationStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_ORDER.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => downloadCv(selected)}
                    disabled={downloading}
                  >
                    {downloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Descargar CV
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="internal_notes">Notas internas</Label>
                <Textarea
                  id="internal_notes"
                  rows={4}
                  value={draftNotes}
                  onChange={(e) => setDraftNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              className="text-destructive"
              onClick={() => selected && setToDelete(selected)}
            >
              <Trash2 className="h-4 w-4" /> Eliminar candidato y datos
            </Button>
            <Button type="button" onClick={saveDetail} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar candidato y sus datos?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará el CV del almacenamiento privado y el registro de la candidatura de{" "}
              «{toDelete?.first_name} {toDelete?.last_name}». Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                void confirmDelete();
              }}
              disabled={deleting}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Detail({ label, value, link }: { label: string; value: string; link?: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 break-words text-sm">
        {link ? (
          <a
            href={link.startsWith("http") ? link : `https://${link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric underline-offset-4 hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
