import { createFileRoute } from "@tanstack/react-router";
// Importación solo-server: los archivos *.server.* nunca llegan al bundle del navegador.
import { sendSmtpTestEmail } from "@/lib/smtp-test.server";

/**
 * Endpoint TEMPORAL de prueba SMTP. Protegido con la cabecera
 * x-smtp-test-token comparada contra la variable de servidor SMTP_TEST_TOKEN.
 * Si falta el token, es incorrecto o la variable no existe, responde 404
 * para no revelar la existencia del endpoint.
 * Se elimina junto con SMTP_TEST_TOKEN cuando la prueba se confirme.
 */
export const Route = createFileRoute("/api/public/smtp-test")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const provided = request.headers.get("x-smtp-test-token");
        const expected = process.env["SMTP_TEST_TOKEN"];
        if (!expected || !provided || provided !== expected) {
          return new Response("Not found", { status: 404 });
        }

        try {
          const { messageId } = await sendSmtpTestEmail();
          return Response.json({ ok: true, messageId });
        } catch (error) {
          const smtpCode =
            error && typeof error === "object" && "code" in error
              ? String((error as { code: unknown }).code)
              : "";
          const message = error instanceof Error ? error.message : "Error desconocido";
          return Response.json(
            {
              ok: false,
              error: `Fallo del envío SMTP: ${message}${smtpCode ? ` [${smtpCode}]` : ""}`,
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
