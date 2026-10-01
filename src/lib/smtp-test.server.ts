import nodemailer from "nodemailer";

/**
 * Envía un correo de prueba usando la configuración SMTP de las variables
 * de entorno del servidor. Solo para el endpoint temporal de prueba.
 * Los archivos *.server.* nunca llegan al bundle del navegador.
 */
export async function sendSmtpTestEmail(): Promise<{ messageId: string }> {
  const host = process.env["SMTP_HOST"];
  const port = Number(process.env["SMTP_PORT"] ?? "587");
  const user = process.env["SMTP_USER"];
  const password = process.env["SMTP_PASSWORD"];
  const from = process.env["EMAIL_FROM"];
  const to = process.env["EMAIL_NOTIFICATIONS"];

  if (!host || !user || !password || !from || !to) {
    throw new Error("Configuración SMTP incompleta (variables de entorno ausentes)");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // STARTTLS en el puerto 587
    requireTLS: true,
    auth: { user, pass: password },
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject: "Prueba SMTP - IDC Tecnología",
    text:
      "Prueba SMTP - IDC Tecnología.\n\n" +
      "Si has recibido este correo, el envío de correo server-side mediante SMTP " +
      "(puerto 587, STARTTLS) funciona correctamente en el despliegue.\n\n" +
      "IDC Tecnología",
  });

  return { messageId: info.messageId };
}
