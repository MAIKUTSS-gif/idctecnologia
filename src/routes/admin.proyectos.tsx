import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Eye, Loader2, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";
import { checkIsAdmin } from "@/lib/jobs";
import {
  deleteProjectInformation,
  listProjectInformation,
  PROJECT_STATUSES,
  PROJECT_STATUS_LABELS,
  updateInternalNotes,
  updateProjectStatus,
  type ProjectInformation,
  type ProjectStatus,
} from "@/lib/project-information";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export const Route = createFileRoute("/admin/proyectos")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Gestión de fichas técnicas — IDC Tecnología" },
      {
        name: "description",
        content: "Panel interno de gestión de la información técnica de proyectos.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Gestión de fichas técnicas — IDC Tecnología" },
      { property: "og:description", content: "Panel interno de fichas técnicas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminProjectsPage,
});

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function statusLabel(status: string | null) {
  if (!status) return "Nuevo";
  return PROJECT_STATUS_LABELS[status as ProjectStatus] ?? status;
}

function value(v: string | null | undefined) {
  return v && v.trim() !== "" ? v : "No indicado";
}

function DetailRow({ label, text }: { label: string; text: string | null | undefined }) {
  return (
    <div className="border-b border-border/60 py-2 last:border-0">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm">{value(text)}</p>
    </div>
  );
}

const selectClass =
  "h-10 rounded-xl border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function AdminProjectsPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<"checking" | "denied" | "ready">("checking");
  const [rows, setRows] = useState<ProjectInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<ProjectInformation | null>(null);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [toDelete, setToDelete] = useState<ProjectInformation | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await listProjectInformation());
    } catch {
      toast.error("No se han podido cargar las fichas");
    } finally {
      setLoading(false);
    }
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

  function openDetail(row: ProjectInformation) {
    setSelected(row);
    setNotes(row.internal_notes ?? "");
  }

  async function changeStatus(row: ProjectInformation, status: ProjectStatus) {
    try {
      await updateProjectStatus(row.id, status);
      toast.success("Estado actualizado");
      setSelected((prev) => (prev && prev.id === row.id ? { ...prev, status } : prev));
      await refresh();
    } catch {
      toast.error("No se ha podido cambiar el estado");
    }
  }

  async function saveNotes() {
    if (!selected) return;
    setSavingNotes(true);
    try {
      await updateInternalNotes(selected.id, notes);
      toast.success("Notas internas guardadas");
      await refresh();
    } catch {
      toast.error("No se han podido guardar las notas");
    } finally {
      setSavingNotes(false);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await deleteProjectInformation(toDelete.id);
      toast.success("Ficha eliminada");
      if (selected?.id === toDelete.id) setSelected(null);
      setToDelete(null);
      await refresh();
    } catch {
      toast.error("No se ha podido eliminar la ficha");
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

  const visible = filter === "all" ? rows : rows.filter((r) => (r.status ?? "new") === filter);

  return (
    <div className="min-h-screen bg-muted/40 pb-20 pt-48">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold">Proyectos</h1>
            <p className="text-sm text-muted-foreground">
              Fichas técnicas recibidas desde el formulario público.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </Button>
        </div>

        <div className="mt-6 inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
          <Button type="button" size="sm" variant="ghost" asChild className="rounded-full">
            <Link to="/admin/empleo">Empleo</Link>
          </Button>
          <Button type="button" size="sm" className="rounded-full">
            Proyectos
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label className="text-sm text-muted-foreground" htmlFor="status-filter">
            Estado
          </label>
          <select
            id="status-filter"
            className={selectClass}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            {PROJECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {PROJECT_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
          {loading ? (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : visible.length === 0 ? (
            <p className="p-10 text-center text-sm text-muted-foreground">
              No hay fichas para este filtro.
            </p>
          ) : (
            <table className="w-full min-w-[760px] text-sm">
              <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Empresa</th>
                  <th className="px-4 py-3">Máquina / Línea</th>
                  <th className="px-4 py-3">PLC</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr key={row.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3">{formatDate(row.created_at)}</td>
                    <td className="px-4 py-3">{value(row.company)}</td>
                    <td className="px-4 py-3">{value(row.machine_line)}</td>
                    <td className="px-4 py-3">{value(row.plc_brand)}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{statusLabel(row.status as string | null)}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => openDetail(row)}
                        >
                          <Eye className="h-4 w-4" /> Ver
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setToDelete(row)}
                        >
                          <Trash2 className="h-4 w-4" /> Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{value(selected?.company)}</DialogTitle>
            <DialogDescription>
              Ficha recibida el {formatDate(selected?.created_at ?? null)}
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-sm font-semibold">Máquina y modificación</h3>
                <div className="mt-2">
                  <DetailRow label="Empresa" text={selected.company} />
                  <DetailRow label="Persona de contacto" text={selected.contact_name} />
                  <DetailRow label="Email" text={selected.contact_email} />
                  <DetailRow label="Teléfono" text={selected.contact_phone} />
                  <DetailRow label="Máquina / Línea" text={selected.machine_line} />
                  <DetailRow
                    label="Descripción de la modificación"
                    text={selected.modification_description}
                  />
                  <DetailRow label="Funcionamiento actual" text={selected.current_operation} />
                </div>
              </div>

              <div>
                <h3 className="font-display text-sm font-semibold">PLC, HMI y documentación</h3>
                <div className="mt-2">
                  <DetailRow label="Marca del PLC" text={selected.plc_brand} />
                  <DetailRow label="Modelo del PLC" text={selected.plc_model} />
                  <DetailRow label="Backup del PLC" text={selected.plc_backup} />
                  <DetailRow label="HMI o pantalla" text={selected.has_hmi} />
                  <DetailRow label="Marca/modelo de HMI" text={selected.hmi_model} />
                  <DetailRow label="Backup del HMI" text={selected.hmi_backup} />
                  <DetailRow
                    label="Esquemas eléctricos actualizados"
                    text={selected.electrical_schematics}
                  />
                  <DetailRow label="Entradas o salidas libres" text={selected.free_io} />
                  <DetailRow label="Entradas libres aproximadas" text={selected.free_inputs} />
                  <DetailRow label="Salidas libres aproximadas" text={selected.free_outputs} />
                  <DetailRow label="Afecta a seguridad" text={selected.affects_safety} />
                </div>
              </div>

              <div>
                <h3 className="font-display text-sm font-semibold">Disponibilidad y observaciones</h3>
                <div className="mt-2">
                  <DetailRow
                    label="Puede pararse para pruebas"
                    text={selected.machine_availability}
                  />
                  <DetailRow
                    label="Información adicional"
                    text={selected.additional_information}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="text-sm font-medium" htmlFor="detail-status">
                  Estado
                </label>
                <select
                  id="detail-status"
                  className={selectClass}
                  value={(selected.status as string) ?? "new"}
                  onChange={(e) => changeStatus(selected, e.target.value as ProjectStatus)}
                >
                  {PROJECT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {PROJECT_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="internal-notes">
                  Notas internas
                </label>
                <Textarea
                  id="internal-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Uso interno. Nunca se muestra públicamente."
                />
                <div className="mt-3 flex flex-wrap justify-between gap-2">
                  <Button type="button" onClick={saveNotes} disabled={savingNotes}>
                    {savingNotes && <Loader2 className="h-4 w-4 animate-spin" />} Guardar notas
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setToDelete(selected)}
                  >
                    <Trash2 className="h-4 w-4" /> Eliminar ficha
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta ficha?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará de forma permanente la información enviada por{" "}
              {value(toDelete?.company)}. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
            <AlertDialogAction type="button" onClick={confirmDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
