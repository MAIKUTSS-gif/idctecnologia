import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, ImageIcon, Loader2, LogOut, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";
import { checkIsAdmin } from "@/lib/jobs";
import {
  compressNewsImage,
  createNews,
  deleteNews,
  getNewsImageUrl,
  isAllowedNewsImage,
  NEWS_IMAGE_ACCEPT,
  removeNewsImage,
  uploadNewsImage,
  listAllNews,
  NEWS_CATEGORIES,
  NEWS_CATEGORY_LABELS,
  setNewsPublished,
  updateNews,
  type NewsCategory,
  type NewsItem,
} from "@/lib/news";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export const Route = createFileRoute("/admin/noticias")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Gestión de noticias internas — IDC Tecnología" },
      { name: "description", content: "Panel interno de gestión de noticias de IDC Tecnología." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Gestión de noticias internas — IDC Tecnología" },
      { property: "og:description", content: "Panel interno de noticias." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminNewsPage,
});

const selectClass =
  "h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function categoryLabel(c: string) {
  return NEWS_CATEGORY_LABELS[c as NewsCategory] ?? c;
}

type FormState = {
  title: string;
  category: NewsCategory;
  subtitle: string;
  body: string;
  image_caption: string;
};
const emptyForm: FormState = {
  title: "",
  category: "comunicado",
  subtitle: "",
  body: "",
  image_caption: "",
};

function NewsThumb({ path }: { path: string }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    getNewsImageUrl(path).then((u) => active && setUrl(u));
    return () => {
      active = false;
    };
  }, [path]);
  return (
    <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
      {url ? (
        <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

function AdminNewsPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<"checking" | "denied" | "ready">("checking");
  const [rows, setRows] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<NewsItem | null>(null);
  // Imagen en el formulario
  const [existingPath, setExistingPath] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function setLocalPreview(blob: Blob | null) {
    setPreviewUrl((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return blob ? URL.createObjectURL(blob) : null;
    });
  }

  function resetImageState() {
    setExistingPath(null);
    setNewImage(null);
    setLocalPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isAllowedNewsImage(file)) {
      toast.error("Formato no válido. Usa JPG, PNG o WebP.");
      e.target.value = "";
      return;
    }
    setProcessing(true);
    try {
      const blob = await compressNewsImage(file);
      setNewImage(blob);
      setLocalPreview(blob);
    } catch {
      toast.error("No se ha podido procesar la imagen");
    } finally {
      setProcessing(false);
      e.target.value = "";
    }
  }

  function handleRemoveImage() {
    setExistingPath(null);
    setNewImage(null);
    setLocalPreview(null);
  }

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await listAllNews());
    } catch {
      toast.error("No se han podido cargar las noticias");
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

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    resetImageState();
    setFormOpen(true);
  }

  function openEdit(item: NewsItem) {
    setEditing(item);
    setForm({
      title: item.title,
      category: (NEWS_CATEGORIES as readonly string[]).includes(item.category)
        ? (item.category as NewsCategory)
        : "comunicado",
      subtitle: item.subtitle ?? "",
      body: item.body ?? "",
      image_caption: item.image_caption ?? "",
    });
    resetImageState();
    if (item.image_path) {
      const path = item.image_path;
      setExistingPath(path);
      void getNewsImageUrl(path).then((u) => {
        setPreviewUrl((prev) => prev ?? u);
      });
    }
    setFormOpen(true);
  }

  async function handleSave() {
    const title = form.title.trim();
    if (!title) {
      toast.error("El título es obligatorio");
      return;
    }
    setSaving(true);
    let uploadedPath: string | null = null;
    try {
      if (newImage) uploadedPath = await uploadNewsImage(newImage);
      const finalPath = uploadedPath ?? existingPath;
      const subtitle = form.subtitle.trim();
      const caption = form.image_caption.trim();
      const input = {
        title,
        category: form.category,
        body: form.body,
        subtitle: subtitle || null,
        image_path: finalPath,
        image_caption: finalPath && caption ? caption : null,
      };
      if (editing) await updateNews(editing.id, input);
      else await createNews(input);
      // Borrar la imagen anterior si se ha sustituido o quitado
      const oldPath = editing?.image_path ?? null;
      if (oldPath && oldPath !== finalPath) await removeNewsImage(oldPath);
      toast.success(editing ? "Noticia actualizada" : "Noticia creada como borrador");
      setFormOpen(false);
      resetImageState();
      await refresh();
    } catch {
      if (uploadedPath) await removeNewsImage(uploadedPath);
      toast.error("No se ha podido guardar la noticia");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(item: NewsItem) {
    try {
      await setNewsPublished(item.id, !item.published);
      toast.success(item.published ? "Noticia despublicada" : "Noticia publicada");
      await refresh();
    } catch {
      toast.error("No se ha podido cambiar el estado");
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await deleteNews(toDelete.id, toDelete.image_path ?? null);
      toast.success("Noticia eliminada");
      setToDelete(null);
      await refresh();
    } catch {
      toast.error("No se ha podido eliminar la noticia");
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
            <h1 className="font-display text-2xl font-semibold">Noticias</h1>
            <p className="text-sm text-muted-foreground">Noticias internas de la empresa.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={openCreate}>
              <Plus className="h-4 w-4" /> Nueva noticia
            </Button>
            <Button type="button" variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </Button>
          </div>
        </div>

        <div className="mt-6 inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
          <Button type="button" size="sm" variant="ghost" asChild className="rounded-full">
            <Link to="/admin/empleo">Empleo</Link>
          </Button>
          <Button type="button" size="sm" variant="ghost" asChild className="rounded-full">
            <Link to="/admin/proyectos">Proyectos</Link>
          </Button>
          <Button type="button" size="sm" className="rounded-full">
            Noticias
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : rows.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground shadow-soft">
              Todavía no hay noticias.
            </div>
          ) : (
            rows.map((item) => (
              <article
                key={String(item.id)}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {item.image_path ? <NewsThumb path={item.image_path} /> : null}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={item.published ? "default" : "secondary"}>
                        {item.published ? "Publicada" : "Borrador"}
                      </Badge>
                      <Badge variant="outline">{categoryLabel(item.category)}</Badge>
                    </div>
                    <h2 className="mt-2 break-words font-display text-lg font-semibold">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Creada {formatDate(item.created_at)}
                      {item.published_at ? ` · Publicada ${formatDate(item.published_at)}` : ""}
                    </p>
                    {item.subtitle ? (
                      <p className="mt-2 break-words text-sm font-medium">{item.subtitle}</p>
                    ) : null}
                    {item.body ? (
                      <p className="mt-3 line-clamp-4 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                        {item.body}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <Button
                      type="button"
                      size="sm"
                      variant={item.published ? "outline" : "default"}
                      onClick={() => togglePublished(item)}
                    >
                      {item.published ? (
                        <>
                          <EyeOff className="h-4 w-4" /> Despublicar
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" /> Publicar
                        </>
                      )}
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => openEdit(item)}>
                      <Pencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                      onClick={() => setToDelete(item)}
                    >
                      <Trash2 className="h-4 w-4" /> Eliminar
                    </Button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar noticia" : "Nueva noticia"}</DialogTitle>
            <DialogDescription>
              El texto se guarda como texto plano y se respetan los saltos de línea.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="news-title">Título</Label>
              <Input
                id="news-title"
                maxLength={200}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-category">Categoría</Label>
              <select
                id="news-category"
                className={selectClass}
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value as NewsCategory }))
                }
              >
                {NEWS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {NEWS_CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-subtitle">Entradilla (opcional)</Label>
              <Textarea
                id="news-subtitle"
                rows={2}
                maxLength={300}
                value={form.subtitle}
                onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              />
              <p className="text-right text-xs text-muted-foreground">{form.subtitle.length}/300</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-image">Imagen (opcional)</Label>
              {previewUrl ? (
                <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
                  <img src={previewUrl} alt="Vista previa" className="max-h-64 w-full object-contain" />
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="absolute right-2 top-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" /> Quitar
                  </Button>
                </div>
              ) : null}
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileRef}
                  id="news-image"
                  type="file"
                  accept={NEWS_IMAGE_ACCEPT}
                  className="hidden"
                  onChange={handleFile}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={processing}
                  onClick={() => fileRef.current?.click()}
                >
                  {processing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ImageIcon className="h-4 w-4" />
                  )}
                  {previewUrl || existingPath ? "Cambiar imagen" : "Elegir imagen"}
                </Button>
                <span className="text-xs text-muted-foreground">
                  JPG, PNG o WebP. Se reduce a 1600 px antes de subirla.
                </span>
              </div>
            </div>
            {previewUrl || existingPath || newImage ? (
              <div className="space-y-2">
                <Label htmlFor="news-caption">Pie de foto (opcional)</Label>
                <Input
                  id="news-caption"
                  maxLength={200}
                  value={form.image_caption}
                  onChange={(e) => setForm((f) => ({ ...f, image_caption: e.target.value }))}
                />
              </div>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="news-body">Texto</Label>
              <Textarea
                id="news-body"
                rows={10}
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleSave} disabled={saving || processing}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta noticia?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará definitivamente «{toDelete?.title}». Esta acción no se puede deshacer.
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
