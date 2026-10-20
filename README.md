# IDC Tecnología

Web corporativa de IDC Tecnología: automatización, ingeniería y mantenimiento industrial, con portal de empleo, intranet de empleados y panel de administración.

## Tecnologías

- React 19 y TanStack Start (TanStack Router)
- Vite 7
- Tailwind CSS v4
- Supabase (base de datos, autenticación y almacenamiento)
- Nodemailer (envío de correo SMTP desde el servidor)

## Arranque en local

```bash
bun install
bun run dev
```

Compilación de producción:

```bash
npm run build
```

## Variables de entorno

Cliente (navegador):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Servidor (correo):

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `EMAIL_FROM`
- `EMAIL_NOTIFICATIONS`
- `EMAIL_LOGO_URL` (opcional)
