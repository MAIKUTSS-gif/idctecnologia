import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  formatFields,
  logEmailError,
  sendInternalNotice,
  sendUserConfirmation,
} from "@/lib/email.server";
import { confirmationEmail, internalEmail, resolveLogoUrl } from "@/lib/email-templates.server";

const SERVICES = [
  "Automatización industrial",
  "Mantenimiento industrial",
  "Distribución de componentes",
  "Industria 4.0 / digitalización",
  "Otro",
] as const;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.enum(SERVICES),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(200).optional(), // honeypot
  elapsed: z.number().optional(),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }
        const parsed = schema.safeParse(body);
        if (!parsed.success) return Response.json({ ok: false }, { status: 400 });
        const d = parsed.data;

        // Antispam: honeypot relleno o envío demasiado rápido → OK silencioso.
        if (d.website || (typeof d.elapsed === "number" && d.elapsed < 3000)) {
          return Response.json({ ok: true });
        }

        const isQuote = d.service !== "Otro";
        const details = formatFields([
          ["Nombre", d.name],
          ["Empresa", d.company],
          ["Email", d.email],
          ["Teléfono", d.phone],
          ["Servicio", d.service],
          ["Mensaje", d.message],
        ]);

        const logoUrl = resolveLogoUrl(request);

        try {
          await sendInternalNotice({
            html: internalEmail({
              logoUrl,
              heading: isQuote ? "Nueva solicitud de presupuesto" : "Nueva consulta web",
              fields: [
                ["Nombre", d.name],
                ["Empresa", d.company],
                ["Email", d.email, "email"],
                ["Teléfono", d.phone],
                ["Servicio", d.service],
              ],
              message: d.message,
            }),
            subject: isQuote
              ? "Nueva solicitud de presupuesto - IDC Tecnología"
              : "Nueva consulta web - IDC Tecnología",
            text: `${isQuote ? "Nueva solicitud de presupuesto recibida desde la web." : "Nueva consulta recibida desde la web."}\n\n${details}`,
            replyTo: d.email,
          });
        } catch (error) {
          logEmailError(isQuote ? "presupuesto-interno" : "contacto-interno", error);
          return Response.json({ ok: false }, { status: 502 });
        }

        try {
          await sendUserConfirmation({
            to: d.email,
            html: confirmationEmail({
              logoUrl,
              heading: isQuote ? "Hemos recibido tu solicitud" : "Hemos recibido tu consulta",
              name: d.name,
              paragraphs: isQuote
                ? [
                    "Hemos recibido correctamente tu solicitud de presupuesto.",
                    "Nuestro equipo revisará la información facilitada y se pondrá en contacto contigo.",
                    "Gracias por confiar en IDC Tecnología.",
                  ]
                : [
                    "Hemos recibido correctamente tu consulta a través de la web de IDC Tecnología.",
                    "Nuestro equipo revisará la información y se pondrá en contacto contigo lo antes posible.",
                    "Gracias por contactar con IDC Tecnología.",
                  ],
            }),
            subject: isQuote
              ? "Hemos recibido tu solicitud - IDC Tecnología"
              : "Hemos recibido tu consulta - IDC Tecnología",
            text: isQuote
              ? `Hola ${d.name},\n\nHemos recibido correctamente tu solicitud de presupuesto.\n\nNuestro equipo revisará la información facilitada y se pondrá en contacto contigo.\n\nEste es un mensaje automático. Por favor, no respondas a este correo.\n\nGracias por confiar en IDC Tecnología.`
              : `Hola ${d.name},\n\nHemos recibido correctamente tu consulta a través de la web de IDC Tecnología.\n\nNuestro equipo revisará la información y se pondrá en contacto contigo lo antes posible.\n\nEste es un mensaje automático. Por favor, no respondas a este correo.\n\nGracias por contactar con IDC Tecnología.`,
          });
        } catch (error) {
          logEmailError(isQuote ? "presupuesto-confirmacion" : "contacto-confirmacion", error);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
