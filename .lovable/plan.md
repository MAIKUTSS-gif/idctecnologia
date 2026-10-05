# Correos SMTP en Contacto/Presupuesto y Candidaturas

## Situación actual (revisada)

- **Contacto y "Solicitar presupuesto" son el mismo formulario** (página Contacto, título "Solicitar presupuesto"; los botones del menú y del Hero llevan ahí). Hoy solo valida y muestra "¡Solicitud enviada!": no guarda ni envía nada.
- **Candidaturas** (`ApplicationForm` en la página de cada oferta): sube el CV al bucket privado y guarda en `job_applications` desde el navegador con el Supabase externo. Funciona y no se toca.

## Decisiones (según tus respuestas)

- Formulario de Contacto: si el servicio elegido es **"Otro"** se envían los correos de **consulta**; con cualquier otro servicio, los de **presupuesto**. Sin cambiar campos ni diseño.
- Si falla el correo en Contacto (no hay base de datos donde guardarlo sin crear tablas): se muestra un aviso sencillo "No hemos podido enviar tu solicitud. Inténtalo de nuevo o escríbenos a informacion@idc.es / llámanos al +34 91 879 60 46", **conservando lo escrito** para reintentar. Nunca se muestra el error técnico.

## Pasos

1. **Limpieza:** borrar `src/lib/smtp-test.server.ts` y `src/routes/api/public/smtp-test.ts`. Se mantienen nodemailer y @types/nodemailer.
2. **Helper definitivo** `src/lib/email.server.ts` (solo servidor):
   - Lee SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM y EMAIL_NOTIFICATIONS con `process.env` dentro de la función.
   - Transporte: `port: Number(SMTP_PORT)`, `secure: false`, `requireTLS: true`.
   - Remitente `"IDC Tecnología" <EMAIL_FROM>`.
   - `sendInternalNotice({ subject, text, replyTo? })` → siempre a EMAIL_NOTIFICATIONS.
   - `sendUserConfirmation({ to, subject, text })`.
   - Escapado de saltos de línea en asuntos (evita inyección de cabeceras); texto plano y versión HTML sencilla escapada.
   - Los registros de error solo incluyen tipo de correo y código SMTP, nunca credenciales ni contraseñas.
3. **Endpoint de Contacto** `src/routes/api/public/contact.ts` (POST):
   - Valida con Zod los mismos campos y límites del formulario (nombre, empresa, email, teléfono, servicio de la lista cerrada, mensaje).
   - Antispam sin servicios externos: campo oculto "honeypot" (invisible, no cambia el diseño) y tiempo mínimo de rellenado (~3 s); si salta, responde OK sin enviar.
   - Decide en el servidor el tipo (consulta/presupuesto) y los textos; el destinatario interno es siempre EMAIL_NOTIFICATIONS y la confirmación solo va al email validado. No acepta destinatario, asunto ni cuerpo libres.
   - Aviso interno: asunto "Nueva consulta web - IDC Tecnología" o "Nueva solicitud de presupuesto - IDC Tecnología", con Nombre, Empresa, Email, Teléfono (si hay), Servicio y Mensaje; `replyTo` = email del cliente.
   - Confirmación al cliente con los textos exactos indicados.
   - Si el aviso interno se envía, responde éxito (la confirmación al cliente es secundaria: si falla, solo se registra). Si falla el aviso interno, responde error genérico.
4. **Formulario de Contacto** `src/routes/contacto.tsx`: mantener validación y aspecto; el envío llama al endpoint con estado "Enviando…" y bloqueo de doble envío; añadir el honeypot oculto; mostrar el aviso de fallo descrito arriba.
5. **Endpoint de Candidaturas** `src/routes/api/public/application-email.ts` (POST):
   - Recibe solo `{ applicationId }`… no es posible leerlo sin permisos de lectura públicos, así que recibe `{ jobOfferId, first_name, last_name, email, phone, city, linkedin, message }`, validados con el mismo esquema.
   - En servidor comprueba con la clave pública del Supabase externo que la oferta existe y está publicada, y toma de ahí el título (no se confía en el título del navegador).
   - Aviso interno "Nueva candidatura - [oferta]" con los datos y la frase "El CV y los datos completos del candidato están disponibles en el panel de administración de IDC Tecnología." Sin adjunto ni enlace al CV.
   - Confirmación al candidato con el texto exacto.
   - Mismo honeypot/tiempo mínimo.
6. **ApplicationForm**: tras `submitApplication` correcto, llamar al endpoint **sin esperar ni bloquear**; si falla, solo se registra. La candidatura y el CV nunca se borran por un fallo de correo y el mensaje de éxito no cambia. `src/lib/applications.ts` no se modifica.

## Seguridad

- Las variables SMTP solo se leen en archivos `.server.ts` y rutas de servidor; nada `VITE_`.
- Endpoints con función fija: cada uno decide en el servidor a quién y qué envía.
- Comprobación final de que nodemailer y los nombres SMTP_ no aparecen en el código del navegador.

## No se toca

Supabase, tablas, RLS, Storage, gestión de candidaturas, Formulario técnico, panel Admin, menú, diseño, Lovable Cloud, DNS, Resend.

## Verificación

- typecheck y `npm run build`; búsqueda de SMTP_/nodemailer en el bundle del cliente.
- Playwright: Contacto igual en escritorio, tablet y móvil; envío muestra éxito o aviso de fallo (en la vista previa de Lovable el SMTP no funciona, así que verás el aviso de fallo; en Vercel debe llegar).
- Prueba real en Vercel: Contacto con "Otro" (consulta), Contacto con otro servicio (presupuesto), una candidatura (aparece en Admin + dos correos).
