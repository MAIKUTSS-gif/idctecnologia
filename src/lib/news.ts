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
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
};

export type NewsInput = {
  title: string;
  body: string;
  category: NewsCategory;
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

export async function deleteNews(id: NewsItem["id"]): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

/** Solo noticias publicadas, de la más reciente a la más antigua por fecha de publicación. */
export async function listPublishedNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return (data ?? []) as NewsItem[];
}
