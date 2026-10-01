# Prueba aislada del SMTP (Arsys) en Vercel

## Situación actual

- La app usa TanStack Start. La configuración de Vite (`@lovable.dev/vite-tanstack-config` más `wrangler.jsonc`) genera el servidor para Cloudflare Workers.
- Hay `nitro` en las dependencias. No hay `vercel.json` ni carpeta `src/routes/api/`.
- Cloudflare Workers no admite el SMTP tradicional por TCP con STARTTLS que usa nodemailer. Por tanto, la prueba solo funcionará si en Vercel el servidor se ejecuta en Node.js, y en la vista previa de Lovable fallará. Esto se comprueba en el paso 1.

## Pasos

1. **Confirmar cómo se compila en Vercel.** Revisar la configuración de compilación del despliegue: si usa Nitro con el preset de Vercel (Node) o el resultado para Workers. Si el resultado es Workers, se detiene el trabajo y se informa, porque SMTP no podría funcionar así.
2. **Dependencia:** instalar `nodemailer` y `@types/nodemailer`. Solo se usa en servidor.
3. **Helper de servidor** `src/lib/smtp-test.server.ts`:
   - Lee dentro de la función `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM` y `EMAIL_NOTIFICATIONS` mediante `process.env`.
   - Crea el transporte con `port: 587`, `secure: false` y `requireTLS: true` (STARTTLS).
   - Envía a `EMAIL_NOTIFICATIONS` desde `EMAIL_FROM`, con el asunto "Prueba SMTP - IDC Tecnología" y el texto exacto indicado.
   - Las importaciones con `.server` nunca llegan al navegador.
4. **Endpoint temporal protegido** `src/routes/api/public/smtp-test.ts` (POST):
   - Exige la cabecera `x-smtp-test-token`, que debe coincidir con una nueva variable de servidor `SMTP_TEST_TOKEN`.
   - Si falta el token, el valor es incorrecto o la variable no existe, responde 404. Así no revela que el endpoint existe.
   - Responde solo `{ ok: true, messageId }` o `{ ok: false, error: <mensaje genérico + code SMTP> }`, sin credenciales ni valores de variables.
   - GET y otros métodos no están definidos.
5. **Cómo ejecutar la prueba:**
   ```text
   curl -X POST https://<dominio-vercel>/api/public/smtp-test \
        -H "x-smtp-test-token: <valor de SMTP_TEST_TOKEN>"
   ```
6. **Retirada:** cuando confirmes que el correo llega, se borran el endpoint y el helper, y se elimina `SMTP_TEST_TOKEN` en Vercel. Mientras tanto, si la variable no existe en Vercel, el endpoint queda inactivo.

## Qué necesito de ti

- Añadir en Vercel la variable `SMTP_TEST_TOKEN` con un valor aleatorio largo, por ejemplo con `openssl rand -hex 32`.
- Confirmar o indicarme la configuración de compilación del despliegue en Vercel (paso 1).

## Lo que NO se toca

Formularios, Empleo, Formulario técnico, Supabase, RLS, bases de datos, Lovable Cloud, Resend, variables `VITE_` y diseño.

## Verificación

- `npm run build`.
- Comprobar que nodemailer y las variables SMTP no aparecen en el código que se envía al navegador.
- Prueba real con curl en Vercel: recepción del correo en `EMAIL_NOTIFICATIONS`.
