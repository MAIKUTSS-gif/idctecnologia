import nodemailer from "nodemailer";

/**
 * Envío de correo SMTP exclusivamente server-side.
 * Nunca registra credenciales: solo tipo de correo y código SMTP.
 */

type Field = [label: string, value: string | null | undefined];

function getTransport() {
  const host = process.env["SMTP_HOST"];
  const port = Number(process.env["SMTP_PORT"]);
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASSWORD"];
  const from = process.env["EMAIL_FROM"];
  const notifications = process.env["EMAIL_NOTIFICATIONS"];
  if (!host || !port || !user || !pass || !from || !notifications) {
    throw new Error("SMTP_CONFIG_MISSING");
  }
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
  });
  return { transporter, from: `"IDC Tecnología" <${from}>`, notifications };
}

const clean = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function toHtml(text: string) {
  return `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1a1a1a">${escapeHtml(text).replace(/\n/g, "<br>")}</div>`;
}

/** Construye un bloque "Etiqueta: valor" omitiendo los vacíos. */
export function formatFields(fields: Field[]): string {
  return fields
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(([l, v]) => `${l}: ${String(v).trim()}`)
    .join("\n");
}

export function logEmailError(kind: string, error: unknown) {
  const code =
    error && typeof error === "object" && "code" in error
      ? String((error as { code: unknown }).code)
      : error instanceof Error
        ? error.message
        : "unknown";
  console.error(`[email] fallo al enviar "${kind}" (code: ${code})`);
}

/** Aviso interno: siempre a EMAIL_NOTIFICATIONS. */
export async function sendInternalNotice(opts: { subject: string; text: string; replyTo?: string }) {
  const { transporter, from, notifications } = getTransport();
  await transporter.sendMail({
    from,
    to: notifications,
    subject: clean(opts.subject),
    text: opts.text,
    html: toHtml(opts.text),
    replyTo: opts.replyTo ? clean(opts.replyTo) : undefined,
  });
}

/** Confirmación automática al usuario. */
export async function sendUserConfirmation(opts: { to: string; subject: string; text: string }) {
  const { transporter, from } = getTransport();
  await transporter.sendMail({
    from,
    to: clean(opts.to),
    subject: clean(opts.subject),
    text: opts.text,
    html: toHtml(opts.text),
  });
}
