import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import {
  formatFields,
  logEmailError,
  sendInternalNotice,
  sendUserConfirmation,
} from "@/lib/email.server";
import { confirmationEmail, internalEmail, resolveLogoUrl } from "@/lib/email-templates.server";

const schema = z.object({
  jobOfferId: z
    .union([z.string().trim().min(1).max(64), z.number().int().positive()])
    .transform(String),
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  linkedin: z.string().trim().max(255).optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  website: z.string().max(200).optional(), // honeypot
});

export const Route = createFileRoute("/api/public/application-email")({
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
        if (d.website) return Response.json({ ok: true });

        // Título de la oferta leído en servidor (solo ofertas publicadas).
        const url = (process.env["VITE_SUPABASE_URL"] ?? import.meta.env.VITE_SUPABASE_URL) as string;
        const key = (process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) as string;
        const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
        const { data: offer } = await sb
          .from("job_offers")
          .select("title")
          .eq("id", d.jobOfferId)
          .eq("published", true)
          .maybeSingle();
        if (!offer) return Response.json({ ok: false }, { status: 404 });
        const title = String((offer as { title: string }).title);
        const fullName = `${d.first_name} ${d.last_name}`;

        const logoUrl = resolveLogoUrl(request);

        try {
          await sendInternalNotice({
            html: internalEmail({
              logoUrl,
              heading: "Nueva candidatura",
              fields: [
                ["Candidato", fullName],
                ["Oferta", title],
                ["Email", d.email, "email"],
                ["Teléfono", d.phone],
                ["Ciudad", d.city],
                ["LinkedIn", d.linkedin],
              ],
              message: d.message,
              notes: [
                "El CV y los datos completos del candidato están disponibles en el panel de administración de IDC Tecnología.",
              ],
            }),
            subject: `Nueva candidatura - ${title}`,
            text:
              "Nueva candidatura recibida.\n\n" +
              formatFields([
                ["Candidato", fullName],
                ["Oferta", title],
                ["Email", d.email],
                ["Teléfono", d.phone],
                ["Ciudad", d.city],
                ["LinkedIn", d.linkedin],
                ["Mensaje", d.message],
              ]) +
              "\n\nEl CV y los datos completos del candidato están disponibles en el panel de administración de IDC Tecnología.",
            replyTo: d.email,
          });
        } catch (error) {
          logEmailError("candidatura-interno", error);
        }

        try {
          await sendUserConfirmation({
            to: d.email,
            html: confirmationEmail({
              logoUrl,
              heading: "Hemos recibido tu candidatura",
              name: d.first_name,
              paragraphs: [
                `Hemos recibido correctamente tu candidatura para la oferta “${title}”.`,
                "Nuestro equipo revisará tu perfil y se pondrá en contacto contigo si tu candidatura continúa en el proceso de selección.",
                "Gracias por tu interés en formar parte de IDC Tecnología.",
              ],
            }),
            subject: "Hemos recibido tu candidatura - IDC Tecnología",
            text: `Hola ${d.first_name},\n\nHemos recibido correctamente tu candidatura para la oferta “${title}”.\n\nNuestro equipo revisará tu perfil y se pondrá en contacto contigo si tu candidatura continúa en el proceso de selección.\n\nEste es un mensaje automático. Por favor, no respondas a este correo.\n\nGracias por tu interés en formar parte de IDC Tecnología.`,
          });
        } catch (error) {
          logEmailError("candidatura-confirmacion", error);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
