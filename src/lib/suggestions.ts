import { z } from "zod";
import { supabase } from "@/lib/supabase";

export type SuggestionStatus = "nueva" | "revisada";
export type Suggestion = {
  id: string | number;
  message: string;
  author_name: string | null;
  status: SuggestionStatus;
  created_at: string;
};

export const suggestionInputSchema = z.object({
  message: z.string().max(5000).refine((value) => value.trim().length > 0),
  author_name: z.string().max(120).transform((value) => value.trim() || null),
});

export async function createSuggestion(message: string, authorName: string) {
  const input = suggestionInputSchema.parse({ message, author_name: authorName });
  // INSERT only: employees have no SELECT permission.
  const { error } = await supabase.from("suggestions").insert(input);
  if (error) throw error;
}

export async function listSuggestions(): Promise<Suggestion[]> {
  const { data, error } = await supabase.from("suggestions")
    .select("id,message,author_name,status,created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Suggestion[];
}

export async function setSuggestionStatus(id: Suggestion["id"], status: SuggestionStatus) {
  const { error } = await supabase.from("suggestions").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteSuggestion(id: Suggestion["id"]) {
  const { error } = await supabase.from("suggestions").delete().eq("id", id);
  if (error) throw error;
}