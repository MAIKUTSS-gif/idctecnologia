# Diseño HTML de los correos automáticos

## Situación actual
- `src/lib/email.server.ts` genera el HTML con `toHtml(text)`: el texto plano escapado con `<br>`. Los 6 correos (consulta, presupuesto y candidatura × aviso interno / confirmación) usan ese mismo bloque sin diseño.
- El logo de la web está empaquetado (`src/assets/idc-logo.png`), por lo que su URL final cambia en cada build: no sirve para correos.

## Qué se cambia (solo presentación)
1. **Logo con URL estable:** copiar el logo actual a `public/email/idc-logo.png` (archivo normal, se publica en `https://<dominio>/email/idc-logo.png`).
   - URL absoluta: variable opcional de servidor `EMAIL_LOGO_URL`; si no existe, se construye con el origen de la petición **solo si es https**. Si no se puede determinar, la cabecera muestra el texto "IDC Tecnología". Sin adjuntos ni base64.
2. **Nuevo módulo** `src/lib/email-templates.server.ts` (solo servidor) con piezas reutilizables, todo con estilos inline y tablas (compatibles con Outlook/Gmail/móvil, ancho máx. 600 px, fluido en móvil):
   - `layout({ preheader, logoUrl, body })`: fondo gris claro, tarjeta blanca centrada, bordes suaves.
   - `header(logoUrl)`: logo (~44 px alto) o texto de respaldo; línea azul corporativa.
   - `title(text)`, `paragraph(text)`.
   - `receivedBadge(text)`: caja azul suave con ✓ "Información recibida correctamente".
   - `dataTable(fields)`: ficha etiqueta/valor, omite vacíos; email como enlace `mailto:`.
   - `messageBox(title, text)`: caja separada "Mensaje", respetando saltos de línea.
   - `autoNotice()` y `footer()`: "Este es un mensaje automático…" + "IDC Tecnología · Automatización · Ingeniería · Industria 4.0 · www.idc.es". Sin textos legales inventados.
   - `escapeHtml` aplicado a **todo** valor del usuario (nombre, empresa, mensaje, oferta, LinkedIn…).
3. **`email.server.ts`:** `sendInternalNotice` y `sendUserConfirmation` aceptan un `html` opcional; si llega se usa, si no se mantiene el `toHtml` actual. Transporte, remitente, destinatarios, `replyTo`, asuntos y `text` quedan idénticos.
4. **Endpoints** `contact.ts` y `application-email.ts`: solo se añade el `html` construido con las piezas anteriores. Los textos planos, la validación, el antispam, la lógica consulta/presupuesto y el manejo de errores no cambian.
   - Confirmaciones: título ("Hemos recibido tu consulta / solicitud / candidatura"), "Hola, [nombre]", mismos párrafos actuales, caja de recibido, aviso automático y pie.
   - Avisos internos: título ("Nueva consulta web / Nueva solicitud de presupuesto / Nueva candidatura"), ficha de datos, caja "Mensaje" (si hay) y, en candidaturas, la frase del panel de administración. Sin CV.

## No se toca
SMTP, Nodemailer, endpoints (rutas y respuestas), validaciones, antispam, destinatarios, replyTo, formularios, Supabase, Storage, RLS, textos funcionales.

## Verificación
- typecheck y `npm run build`.
- Renderizar los 6 correos con datos de prueba (incluyendo `<script>` en nombre/mensaje) y capturas en 600 px y 375 px para comprobar diseño y escapado.
- Confirmar que el `text` plano sigue existiendo, que el logo usa URL https absoluta y que nada de esto llega al navegador.

## Qué necesito de ti (opcional)
Si quieres fijar el logo al dominio definitivo, crea en Vercel `EMAIL_LOGO_URL = https://<tu-dominio>/email/idc-logo.png`. Si no, se usa el dominio desde el que se envía el formulario.
