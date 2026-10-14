import { supabase } from "@/lib/supabase";

export const NEWS_CATEGORIES = ["comunicado", "exito", "cambio_organizativo"] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  comunicado: "Comunicado oficial",
  exito: "Éxito de la empresa",
  cambio_organizativo: "Cambio organizativo",
};

export type NewsItem = {
  id: string | number;
  title: string;
  body: string | null;
  category: NewsCategory | string;
  subtitle?: string | null;
  image_path?: string | null;
  image_caption?: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
};

export type NewsInput = {
  title: string;
  body: string;
  category: NewsCategory;
  subtitle: string | null;
  image_path: string | null;
  image_caption: string | null;
};

const TABLE = "news";

export async function listAllNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as NewsItem[];
}

export async function createNews(input: NewsInput): Promise<void> {
  const { error } = await supabase.from(TABLE).insert({ ...input, published: false });
  if (error) throw error;
}

export async function updateNews(id: NewsItem["id"], input: NewsInput): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function setNewsPublished(id: NewsItem["id"], published: boolean): Promise<void> {
  const now = new Date().toISOString();
  const patch: Record<string, unknown> = { published, updated_at: now };
  if (published) patch.published_at = now;
  const { error } = await supabase.from(TABLE).update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteNews(id: NewsItem["id"], imagePath?: string | null): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
  if (imagePath) await removeNewsImage(imagePath);
}

/* ---------- Imágenes (bucket privado news-images) ---------- */

const IMAGE_BUCKET = "news-images";
export const NEWS_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_WIDTH = 1600;
const MAX_BYTES = 5 * 1024 * 1024;

export function isAllowedNewsImage(file: File): boolean {
  return ALLOWED_TYPES.includes(file.type);
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
}

/** Reduce a máx. 1600 px de ancho y convierte a WebP (o JPEG si no hay soporte). */
export async function compressNewsImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas no disponible");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();
  let blob = await canvasToBlob(canvas, "image/webp", 0.82);
  if (!blob || blob.type !== "image/webp") blob = await canvasToBlob(canvas, "image/jpeg", 0.85);
  if (!blob) throw new Error("No se ha podido procesar la imagen");
  if (blob.size > MAX_BYTES) throw new Error("La imagen sigue pesando más de 5 MB");
  return blob;
}

/** Sube la imagen ya comprimida con nombre UUID, sin upsert. Devuelve la ruta. */
export async function uploadNewsImage(blob: Blob): Promise<string> {
  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, blob, { contentType: blob.type, upsert: false });
  if (error) throw error;
  return path;
}

/** Borra una imagen; no lanza error (solo lo registra) para no bloquear la operación principal. */
export async function removeNewsImage(path: string): Promise<boolean> {
  const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([path]);
  if (error) {
    console.error("No se ha podido borrar la imagen de la noticia");
    return false;
  }
  return true;
}

export async function getNewsImageUrl(path: string, expiresIn = 3600): Promise<string | null> {
  const { data, error } = await supabase.storage.from(IMAGE_BUCKET).createSignedUrl(path, expiresIn);
  if (error || !data) return null;
  return data.signedUrl;
}

/** Solo noticias publicadas, de la más reciente a la más antigua por fecha de publicación. */
export async function listPublishedNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id,title,body,category,subtitle,image_path,image_caption,published,published_at,created_at,updated_at")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as NewsItem[];
}

/** Detail reads remain restricted to published rows, including for admins. */
export async function getPublishedNews(id: string): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id,title,body,category,subtitle,image_path,image_caption,published,published_at,created_at,updated_at")
    .eq("published", true)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as NewsItem | null;
}

/** Fetch all private images in one request; unavailable images are omitted. */
export async function getPublishedNewsImageUrls(items: NewsItem[]): Promise<Record<string, string>> {
  const paths = [...new Set(items.filter((item) => item.published).flatMap((item) => item.image_path ? [item.image_path] : []))];
  if (paths.length === 0) return {};
  const { data, error } = await supabase.storage.from(IMAGE_BUCKET).createSignedUrls(paths, 3600);
  if (error || !data) return {};
  const urls: Record<string, string> = {};
  for (const image of data) {
    if (image.path && image.signedUrl && !image.error) urls[image.path] = image.signedUrl;
  }
  return urls;
}
