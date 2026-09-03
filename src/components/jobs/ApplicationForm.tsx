import { useRef, useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  submitApplication,
  validateCvFile,
  type ApplicationFormValues,
} from "@/lib/applications";

const schema = z.object({
  first_name: z.string().trim().min(1, "El nombre es obligatorio").max(80),
  last_name: z.string().trim().min(1, "Los apellidos son obligatorios").max(120),
  email: z.string().trim().min(1, "El email es obligatorio").email("Email no válido").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  linkedin: z
    .string()
    .trim()
    .max(255)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || /^(https?:\/\/)?([\w-]+\.)*linkedin\.com\/.+/i.test(v) || /^https?:\/\/.+/i.test(v), {
      message: "Introduce una URL válida",
    }),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
});

const EMPTY: ApplicationFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  city: "",
  linkedin: "",
  message: "",
};

type Errors = Partial<Record<keyof ApplicationFormValues | "cv" | "privacy", string>>;

export function ApplicationForm({ jobOfferId }: { jobOfferId: string }) {
  const [values, setValues] = useState<ApplicationFormValues>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof ApplicationFormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const next: Errors = {};
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ApplicationFormValues;
        if (!next[key]) next[key] = issue.message;
      }
    }
    const cvError = validateCvFile(file);
    if (cvError) next.cv = cvError;
    if (!privacy) next.privacy = "Debes aceptar la Política de Privacidad para continuar";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      await submitApplication(jobOfferId, values, file as File);
      setDone(true);
      setValues(EMPTY);
      setFile(null);
      setPrivacy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setErrors({
        cv:
          err instanceof Error
            ? err.message
            : "No se ha podido enviar la candidatura. Inténtalo de nuevo.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mt-14 rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-10 w-10 text-electric" />
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
          Tu candidatura se ha enviado correctamente.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Revisaremos tu perfil y nos pondremos en contacto contigo si encaja con la vacante.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-14 rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-electric">Candidatura</p>
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
        Inscríbete en esta oferta
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Los campos marcados con * son obligatorios.
      </p>

      <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
        <Field label="Nombre *" id="first_name" error={errors.first_name}>
          <Input
            id="first_name"
            value={values.first_name}
            onChange={(e) => set("first_name", e.target.value)}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Apellidos *" id="last_name" error={errors.last_name}>
          <Input
            id="last_name"
            value={values.last_name}
            onChange={(e) => set("last_name", e.target.value)}
            autoComplete="family-name"
          />
        </Field>
        <Field label="Email *" id="email" error={errors.email}>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
          />
        </Field>
        <Field label="Teléfono" id="phone" error={errors.phone}>
          <Input
            id="phone"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
          />
        </Field>
        <Field label="Ciudad" id="city" error={errors.city}>
          <Input id="city" value={values.city} onChange={(e) => set("city", e.target.value)} />
        </Field>
        <Field label="LinkedIn" id="linkedin" error={errors.linkedin}>
          <Input
            id="linkedin"
            placeholder="https://www.linkedin.com/in/..."
            value={values.linkedin}
            onChange={(e) => set("linkedin", e.target.value)}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Mensaje / carta de presentación" id="message" error={errors.message}>
            <Textarea
              id="message"
              rows={5}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="CV *" id="cv" error={errors.cv}>
            <div className="flex flex-wrap items-center gap-3">
              <Input
                id="cv"
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  const selected = e.target.files?.[0] ?? null;
                  setFile(selected);
                  setErrors((prev) => ({ ...prev, cv: validateCvFile(selected) ?? undefined }));
                }}
                className="max-w-sm cursor-pointer file:mr-3 file:cursor-pointer"
              />
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Upload className="h-3.5 w-3.5" /> PDF, DOC o DOCX · máximo 10 MB
              </span>
            </div>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="privacy"
              checked={privacy}
              onCheckedChange={(checked) => {
                setPrivacy(checked === true);
                if (checked === true) setErrors((prev) => ({ ...prev, privacy: undefined }));
              }}
              className="mt-0.5"
            />
            <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed text-muted-foreground">
              He leído y acepto la Política de Privacidad y autorizo el tratamiento de mis datos para
              gestionar mi candidatura.
            </Label>
          </div>
          {errors.privacy && <p className="mt-2 text-xs text-destructive">{errors.privacy}</p>}
        </div>

        <div className="sm:col-span-2">
          <Button type="submit" variant="hero" disabled={submitting} className="w-full sm:w-auto">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Enviando candidatura…" : "Enviar candidatura"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
