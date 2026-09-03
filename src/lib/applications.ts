import { supabase } from "@/lib/supabase";

export const BUCKET = "candidate-cvs";
const TABLE = "job_applications";

export type ApplicationStatus = "new" | "reviewing" | "interview" | "selected" | "rejected";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "Nuevo",
  reviewing: "En revisión",
  interview: "Entrevista",
  selected: "Seleccionado",
  rejected: "Descartado",
};

export const STATUS_ORDER: ApplicationStatus[] = [
  "new",
  "reviewing",
  "interview",
  "selected",
  "rejected",
];

export type JobApplication = {
  id: string;
  job_offer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  linkedin: string | null;
  message: string | null;
  cv_path: string | null;
  cv_original_name: string | null;
  status: ApplicationStatus;
  internal_notes: string | null;
  privacy_accepted: boolean;
  privacy_accepted_at: string | null;
  created_at: string;
  job_offers?: { title: string | null } | null;
};

export type ApplicationFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  message: string;
};

export const MAX_CV_BYTES = 10 * 1024 * 1024;
export const ALLOWED_CV_EXTENSIONS = ["pdf", "doc", "docx"] as const;

export function getCvExtension(fileName: string): string {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

export function validateCvFile(file: File | null): string | null {
  if (!file) return "El CV es obligatorio";
  const ext = getCvExtension(file.name);
  if (!ALLOWED_CV_EXTENSIONS.includes(ext as (typeof ALLOWED_CV_EXTENSIONS)[number])) {
    return "Formato no válido. Admitimos PDF, DOC o DOCX";
  }
  if (file.size > MAX_CV_BYTES) return "El archivo supera el máximo de 10 MB";
  if (file.size === 0) return "El archivo está vacío";
  return null;
}

/** Sube el CV al bucket privado con una ruta aleatoria. */
export async function uploadCv(jobOfferId: string, file: File) {
  const ext = getCvExtension(file.name) || "pdf";
  const path = `oferta-${jobOfferId}/${crypto.randomUUID()}/cv.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  return { cv_path: path, cv_original_name: file.name };
}

export async function removeCv(path: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}

/**
 * Envía una candidatura. Solo se permite si la oferta está publicada.
 * Si la inserción falla tras subir el CV, se elimina el archivo huérfano.
 */
export async function submitApplication(
  jobOfferId: string,
  values: ApplicationFormValues,
  file: File,
): Promise<void> {
  const { data: offer, error: offerError } = await supabase
    .from("job_offers")
    .select("id")
    .eq("id", jobOfferId)
    .eq("published", true)
    .maybeSingle();
  if (offerError) throw offerError;
  if (!offer) throw new Error("Esta oferta ya no está disponible.");

  const { cv_path, cv_original_name } = await uploadCv(jobOfferId, file);

  const now = new Date().toISOString();
  const { error } = await supabase.from(TABLE).insert({
    job_offer_id: jobOfferId,
    first_name: values.first_name.trim(),
    last_name: values.last_name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim() || null,
    city: values.city.trim() || null,
    linkedin: values.linkedin.trim() || null,
    message: values.message.trim() || null,
    cv_path,
    cv_original_name,
    status: "new",
    privacy_accepted: true,
    privacy_accepted_at: now,
  });

  if (error) {
    // Limpieza del CV huérfano
    try {
      await removeCv(cv_path);
    } catch {
      /* se ignora: el error relevante es el de la inserción */
    }
    throw error;
  }
}

export async function listApplications(options?: {
  status?: ApplicationStatus | "all";
  jobOfferId?: string | null;
}): Promise<JobApplication[]> {
  let query = supabase
    .from(TABLE)
    .select("*, job_offers(title)")
    .order("created_at", { ascending: false });
  if (options?.status && options.status !== "all") query = query.eq("status", options.status);
  if (options?.jobOfferId) query = query.eq("job_offer_id", options.jobOfferId);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as JobApplication[];
}

/** Devuelve el número de candidaturas por oferta. */
export async function countApplicationsByOffer(): Promise<Record<string, number>> {
  const { data, error } = await supabase.from(TABLE).select("job_offer_id");
  if (error) throw error;
  const counts: Record<string, number> = {};
  for (const row of (data ?? []) as { job_offer_id: string }[]) {
    counts[row.job_offer_id] = (counts[row.job_offer_id] ?? 0) + 1;
  }
  return counts;
}

export async function updateApplication(
  id: string,
  patch: { status?: ApplicationStatus; internal_notes?: string | null },
): Promise<void> {
  const { error } = await supabase.from(TABLE).update(patch).eq("id", id);
  if (error) throw error;
}

/** Signed URL temporal (60 s) para descargar el CV desde el bucket privado. */
export async function getCvSignedUrl(cvPath: string | null): Promise<string> {
  if (!cvPath) throw new Error("Esta candidatura no tiene un CV disponible.");
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(cvPath, 60);
  if (error || !data?.signedUrl) {
    throw new Error(error?.message ?? "No se ha podido generar el enlace de descarga.");
  }
  return data.signedUrl;
}

/**
 * Elimina el CV y después la candidatura. Si el CV no existe o su borrado falla,
 * se informa con una advertencia pero el registro se elimina igualmente.
 */
export async function deleteApplication(
  app: Pick<JobApplication, "id" | "cv_path">,
): Promise<{ cvWarning: string | null }> {
  let cvWarning: string | null = null;
  if (app.cv_path) {
    try {
      await removeCv(app.cv_path);
    } catch (err) {
      cvWarning =
        err instanceof Error
          ? `No se ha podido eliminar el CV del almacenamiento: ${err.message}`
          : "No se ha podido eliminar el CV del almacenamiento.";
    }
  } else {
    cvWarning = "Esta candidatura no tenía un CV asociado.";
  }

  const { error } = await supabase.from(TABLE).delete().eq("id", app.id);
  if (error) throw error;
  return { cvWarning };
}
