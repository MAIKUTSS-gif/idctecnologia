import { supabase } from "@/lib/supabase";

export type JobOffer = {
  id: string;
  title: string;
  location: string | null;
  department: string | null;
  contract_type: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  published: boolean;
  created_at: string;
  updated_at: string | null;
};

export type JobOfferInput = {
  title: string;
  location: string;
  department: string;
  contract_type: string;
  description: string;
  requirements: string;
  benefits: string;
  published: boolean;
};

const TABLE = "job_offers";

export async function listPublishedOffers(): Promise<JobOffer[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as JobOffer[];
}

export async function getPublishedOffer(id: string): Promise<JobOffer | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as JobOffer | null) ?? null;
}

export async function listAllOffers(): Promise<JobOffer[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as JobOffer[];
}

export async function createOffer(input: JobOfferInput): Promise<JobOffer> {
  const { data, error } = await supabase.from(TABLE).insert(input).select().single();
  if (error) throw error;
  return data as JobOffer;
}

export async function updateOffer(id: string, input: Partial<JobOfferInput>): Promise<JobOffer> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as JobOffer;
}

export async function deleteOffer(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

/** Comprueba, respetando RLS, si el usuario autenticado es administrador. */
export async function checkIsAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_admin");
  if (!error && typeof data === "boolean") return data;

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return false;
  const { data: row } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return Boolean(row);
}
