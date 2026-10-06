/**
 * Plantillas HTML de correo (solo servidor). Estilos inline + tablas.
 * Todo valor de usuario pasa por escapeHtml.
 */

const BLUE = "#1f5fd6";
const TEXT = "#1a1d24";
const MUTED = "#5b6472";
const BORDER = "#e3e7ee";
const BG = "#f3f5f8";
const FONT = "Arial,Helvetica,sans-serif";

export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const multiline = (s: string) => escapeHtml(s).replace(/\r?\n/g, "<br>");

/** URL absoluta https del logo, o null para usar texto de respaldo. */
export function resolveLogoUrl(request?: Request): string | null {
  const env = process.env["EMAIL_LOGO_URL"];
  if (env && /^https:\/\//i.test(env)) return env;
  if (!request) return null;
  try {
    const u = new URL(request.url);
    const proto = request.headers.get("x-forwarded-proto") ?? u.protocol.replace(":", "");
    const host = request.headers.get("x-forwarded-host") ?? u.host;
    if (proto !== "https" || !host || /localhost|127\.0\.0\.1/.test(host)) return null;
    return `https://${host}/email/idc-logo.png`;
  } catch {
    return null;
  }
}

export function header(logoUrl: string | null) {
  const brand = logoUrl
    ? `<img src="${escapeHtml(logoUrl)}" alt="IDC Tecnología" height="48" style="display:block;height:48px;width:auto;border:0;outline:none;text-decoration:none">`
    : `<span style="font-family:${FONT};font-size:20px;font-weight:bold;color:${TEXT};letter-spacing:-0.3px">IDC <span style="color:${BLUE}">Tecnología</span></span>`;
  return `<tr><td style="padding:24px 32px 20px;border-bottom:3px solid ${BLUE}">${brand}</td></tr>`;
}

export const title = (t: string) =>
  `<h1 style="margin:0 0 16px;font-family:${FONT};font-size:22px;line-height:1.3;color:${TEXT};font-weight:bold">${escapeHtml(t)}</h1>`;

export const paragraph = (t: string) =>
  `<p style="margin:0 0 14px;font-family:${FONT};font-size:15px;line-height:1.6;color:${TEXT}">${multiline(t)}</p>`;

export const receivedBadge = (t = "Información recibida correctamente") =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 20px"><tr><td style="background:#eef4ff;border:1px solid #cfdcf7;border-left:4px solid ${BLUE};border-radius:8px;padding:12px 16px;font-family:${FONT};font-size:14px;color:${TEXT}"><span style="color:${BLUE};font-weight:bold">&#10003;</span>&nbsp; ${escapeHtml(t)}</td></tr></table>`;

export type Field = [label: string, value: string | null | undefined, kind?: "email" | "text"];

export function dataTable(fields: Field[]) {
  const rows = fields
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(([l, v, kind], i) => {
      const val = String(v).trim();
      const content =
        kind === "email"
          ? `<a href="mailto:${escapeHtml(val)}" style="color:${BLUE};text-decoration:none">${escapeHtml(val)}</a>`
          : escapeHtml(val);
      const top = i === 0 ? "" : `border-top:1px solid ${BORDER};`;
      return `<tr><td width="34%" valign="top" style="${top}padding:10px 14px;font-family:${FONT};font-size:13px;color:${MUTED};font-weight:bold">${escapeHtml(l)}</td><td valign="top" style="${top}padding:10px 14px;font-family:${FONT};font-size:14px;color:${TEXT};word-break:break-word">${content}</td></tr>`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;border-collapse:separate;margin:0 0 20px">${rows}</table>`;
}

export function messageBox(heading: string, text: string | null | undefined) {
  if (!text || !text.trim()) return "";
  return `<p style="margin:0 0 8px;font-family:${FONT};font-size:13px;font-weight:bold;color:${MUTED};text-transform:uppercase;letter-spacing:0.6px">${escapeHtml(heading)}</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px"><tr><td style="background:${BG};border:1px solid ${BORDER};border-radius:8px;padding:14px 16px;font-family:${FONT};font-size:14px;line-height:1.6;color:${TEXT};word-break:break-word">${multiline(text)}</td></tr></table>`;
}

export const note = (t: string) =>
  `<p style="margin:0 0 6px;font-family:${FONT};font-size:13px;line-height:1.5;color:${MUTED}">${escapeHtml(t)}</p>`;

export const autoNotice = () =>
  `<p style="margin:20px 0 0;padding-top:16px;border-top:1px solid ${BORDER};font-family:${FONT};font-size:12px;line-height:1.5;color:${MUTED}">Este es un mensaje automático. Por favor, no respondas a este correo.</p>`;

export const footer = () =>
  `<tr><td style="padding:20px 32px;background:${BG};border-top:1px solid ${BORDER};font-family:${FONT};font-size:12px;line-height:1.6;color:${MUTED}"><strong style="color:${TEXT}">IDC Tecnología</strong><br>Automatización · Ingeniería · Industria 4.0<br><a href="https://www.idc.es" style="color:${BLUE};text-decoration:none">www.idc.es</a></td></tr>`;

export function layout(opts: { preheader: string; logoUrl: string | null; body: string }) {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>IDC Tecnología</title></head><body style="margin:0;padding:0;background:${BG}"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(opts.preheader)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${BORDER};border-radius:12px;overflow:hidden">${header(opts.logoUrl)}<tr><td style="padding:28px 32px">${opts.body}</td></tr>${footer()}</table></td></tr></table></body></html>`;
}

/** Confirmación al usuario: párrafos del texto actual, en HTML. */
export function confirmationEmail(o: {
  logoUrl: string | null;
  heading: string;
  name: string;
  paragraphs: string[];
}) {
  const body =
    title(o.heading) +
    paragraph(`Hola, ${o.name}`) +
    receivedBadge() +
    o.paragraphs.map(paragraph).join("") +
    autoNotice();
  return layout({ preheader: o.heading, logoUrl: o.logoUrl, body });
}

/** Aviso interno: ficha de datos + mensaje + notas. */
export function internalEmail(o: {
  logoUrl: string | null;
  heading: string;
  fields: Field[];
  message?: string | null;
  notes?: string[];
}) {
  const body =
    title(o.heading) +
    dataTable(o.fields) +
    messageBox("Mensaje", o.message) +
    (o.notes ?? []).map(note).join("");
  return layout({ preheader: o.heading, logoUrl: o.logoUrl, body });
}
