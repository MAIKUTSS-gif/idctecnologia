import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitProjectInformation } from "@/lib/project-information";

export const Route = createFileRoute("/formulario-tecnico")({
  head: () => ({
    meta: [
      { title: "Formulario técnico — Información de máquina | IDC Tecnología" },
      {
        name: "description",
        content:
          "Facilítanos la información básica de la máquina y la modificación para que podamos preparar la intervención.",
      },
      { property: "og:title", content: "Formulario técnico — IDC Tecnología" },
      {
        property: "og:description",
        content: "Comparte los datos disponibles de tu máquina y de la modificación prevista.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TechnicalFormPage,
});

const YES_NO_UNKNOWN = ["Sí", "No", "No lo sé"];
const PLC_BRANDS = ["Siemens", "Omron", "Mitsubishi", "Schneider", "Allen-Bradley", "Otro", "No lo sé"];
const AVAILABILITY = ["Sí", "No", "Solo en determinados horarios", "No lo sé"];

const fieldClass =
  "flex h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const areaClass =
  "flex min-h-[110px] w-full rounded-xl border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {hint && <span className="mb-1.5 block text-xs text-muted-foreground">{hint}</span>}
      {children}
    </label>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">{children}</div>
    </div>
  );
}

function clean(value: FormDataEntryValue | null): string | null {
  const text = typeof value === "string" ? value.trim() : "";
  return text === "" ? null : text;
}

function TechnicalFormPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freeIo, setFreeIo] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);

    const email = clean(fd.get("contact_email"));
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("El email indicado no es válido.");
      return;
    }

    setError(null);
    setSending(true);
    try {
      await submitProjectInformation({
        company: clean(fd.get("company")),
        contact_name: clean(fd.get("contact_name")),
        contact_email: email,
        contact_phone: clean(fd.get("contact_phone")),
        machine_line: clean(fd.get("machine_line")),
        modification_description: clean(fd.get("modification_description")),
        current_operation: clean(fd.get("current_operation")),
        plc_brand: clean(fd.get("plc_brand")),
        plc_model: clean(fd.get("plc_model")),
        plc_backup: clean(fd.get("plc_backup")),
        has_hmi: clean(fd.get("has_hmi")),
        hmi_model: clean(fd.get("hmi_model")),
        hmi_backup: clean(fd.get("hmi_backup")),
        electrical_schematics: clean(fd.get("electrical_schematics")),
        free_io: clean(fd.get("free_io")),
        free_inputs: clean(fd.get("free_inputs")),
        free_outputs: clean(fd.get("free_outputs")),
        affects_safety: clean(fd.get("affects_safety")),
        machine_availability: clean(fd.get("machine_availability")),
        additional_information: clean(fd.get("additional_information")),
      });
      setSent(true);
    } catch {
      setError("No se ha podido enviar la información. Inténtalo de nuevo en unos minutos.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-graphite pb-20 pt-40 text-graphite-foreground lg:pt-52">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-electric/30 blur-[140px]" />
        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            Información de proyecto
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Formulario <span className="text-gradient">técnico</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Facilítanos la información básica disponible sobre la máquina y la modificación. No es
            necesario responder a todos los campos. Indica únicamente la información que tengas
            disponible.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4">
          {sent ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-6 font-display text-2xl font-semibold">
                Información enviada correctamente. Gracias por ayudarnos a preparar la intervención.
              </h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-8">
              <Block title="Máquina y modificación">
                <Field label="Empresa">
                  <input name="company" className={fieldClass} />
                </Field>
                <Field label="Persona de contacto">
                  <input name="contact_name" className={fieldClass} />
                </Field>
                <Field label="Email">
                  <input name="contact_email" type="email" className={fieldClass} />
                </Field>
                <Field label="Teléfono">
                  <input name="contact_phone" className={fieldClass} />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Máquina / Línea">
                    <input name="machine_line" className={fieldClass} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field
                    label="Descripción de la modificación"
                    hint="¿Qué tiene que hacer la máquina después del cambio?"
                  >
                    <textarea name="modification_description" className={areaClass} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field
                    label="Funcionamiento actual"
                    hint="Describe brevemente cómo funciona actualmente la máquina o la parte que se va a modificar."
                  >
                    <textarea name="current_operation" className={areaClass} />
                  </Field>
                </div>
              </Block>

              <Block title="PLC, HMI y documentación">
                <Field label="Marca del PLC">
                  <select name="plc_brand" className={fieldClass} defaultValue="">
                    <option value="">Selecciona una opción</option>
                    {PLC_BRANDS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Modelo del PLC">
                  <input name="plc_model" className={fieldClass} />
                </Field>
                <Field label="¿Existe backup del programa PLC?">
                  <select name="plc_backup" className={fieldClass} defaultValue="">
                    <option value="">Selecciona una opción</option>
                    {YES_NO_UNKNOWN.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="¿Hay HMI o pantalla?">
                  <select name="has_hmi" className={fieldClass} defaultValue="">
                    <option value="">Selecciona una opción</option>
                    {YES_NO_UNKNOWN.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Marca/modelo de HMI">
                  <input name="hmi_model" className={fieldClass} />
                </Field>
                <Field label="¿Existe backup del HMI?">
                  <select name="hmi_backup" className={fieldClass} defaultValue="">
                    <option value="">Selecciona una opción</option>
                    {YES_NO_UNKNOWN.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="¿Hay esquemas eléctricos actualizados?">
                  <select name="electrical_schematics" className={fieldClass} defaultValue="">
                    <option value="">Selecciona una opción</option>
                    {YES_NO_UNKNOWN.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="¿Sabéis si quedan entradas o salidas libres?">
                  <select
                    name="free_io"
                    className={fieldClass}
                    value={freeIo}
                    onChange={(e) => setFreeIo(e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    {YES_NO_UNKNOWN.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                {freeIo === "Sí" && (
                  <>
                    <Field label="Entradas libres aproximadas">
                      <input name="free_inputs" className={fieldClass} />
                    </Field>
                    <Field label="Salidas libres aproximadas">
                      <input name="free_outputs" className={fieldClass} />
                    </Field>
                  </>
                )}
                <div className="md:col-span-2">
                  <Field
                    label="¿La modificación afecta a seguridad?"
                    hint="Por ejemplo: puertas de seguridad, setas, barreras o enclavamientos."
                  >
                    <select name="affects_safety" className={fieldClass} defaultValue="">
                      <option value="">Selecciona una opción</option>
                      {YES_NO_UNKNOWN.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </Block>

              <Block title="Disponibilidad y observaciones">
                <div className="md:col-span-2">
                  <Field label="¿La máquina puede pararse para realizar pruebas?">
                    <select name="machine_availability" className={fieldClass} defaultValue="">
                      <option value="">Selecciona una opción</option>
                      {AVAILABILITY.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Información adicional">
                    <textarea
                      name="additional_information"
                      className={`${areaClass} min-h-[180px]`}
                    />
                  </Field>
                </div>
                <p className="text-xs text-muted-foreground md:col-span-2">
                  Si dispones de backups, esquemas eléctricos u otra documentación técnica, envíalos
                  por correo indicando el nombre del proyecto.
                </p>
              </Block>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div>
                <Button type="submit" size="lg" disabled={sending}>
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Enviar información
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
