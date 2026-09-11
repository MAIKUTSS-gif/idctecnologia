import { supabase } from "@/lib/supabase";

const TABLE = "project_information";

export type ProjectStatus = "new" | "reviewed" | "prepared" | "in_progress" | "completed";

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  new: "Nuevo",
  reviewed: "Revisado",
  prepared: "Preparado",
  in_progress: "En curso",
  completed: "Finalizado",
};

export const PROJECT_STATUSES = Object.keys(PROJECT_STATUS_LABELS) as ProjectStatus[];

export type ProjectInformation = {
  id: string;
  company: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  machine_line: string | null;
  modification_description: string | null;
  current_operation: string | null;
  plc_brand: string | null;
  plc_model: string | null;
  plc_backup: string | null;
  has_hmi: string | null;
  hmi_model: string | null;
  hmi_backup: string | null;
  electrical_schematics: string | null;
  free_io: string | null;
  free_inputs: string | null;
  free_outputs: string | null;
  affects_safety: string | null;
  machine_availability: string | null;
  additional_information: string | null;
  status: ProjectStatus | string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string | null;
};

export type ProjectInformationInput = Omit<
  ProjectInformation,
  "id" | "status" | "internal_notes" | "created_at" | "updated_at"
>;

/** Envío público: siempre status 'new' y sin notas internas. */
export async function submitProjectInformation(input: ProjectInformationInput): Promise<void> {
  const payload = {
    ...input,
    status: "new" as const,
    internal_notes: null,
  };
  const { error } = await supabase.from(TABLE).insert(payload);
  if (error) throw error;
}

export async function listProjectInformation(): Promise<ProjectInformation[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ProjectInformation[];
}

export async function updateProjectStatus(
  id: string,
  status: ProjectStatus,
): Promise<void> {
  const { error } = await supabase.from(TABLE).update({ status }).eq("id", id);
  if (error) throw error;
}

export async function updateInternalNotes(id: string, notes: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ internal_notes: notes.trim() === "" ? null : notes })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteProjectInformation(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
