# Limpieza de referencias a Lovable

## 1. Referencias encontradas (archivo:línea)

Código de la web:
- `src/routes/__root.tsx:74-75` — og:image y twitter:image apuntan a una captura de vista previa de Lovable (`id-preview-...`).
- `src/routes/__root.tsx:67` — `author: "Novatek"` (nombre antiguo; se cambia a "IDC Tecnología").
- `src/routes/__root.tsx` — no hay favicon declarado; `public/` no contiene favicon (se sirve el de Lovable por defecto).
- `src/routes/trabaja-con-nosotros.tsx:44,47` — og:url y canonical con `idctecnologia.lovable.app`.
- `src/routes/canal-del-informante.tsx:41,47` — og:url y canonical con `idctecnologia.lovable.app`.
- `vite.config.ts:1-6` — comentario "@lovable.dev/vite-tanstack-config already includes…".

Necesarios para Lovable (no se tocan):
- `package.json:74` — `@lovable.dev/vite-tanstack-config` y `vite.config.ts:7` (import).
- `src/integrations/supabase/previewAuthStorage.ts` (líneas 3, 8, 20-30, 69-102), `client.ts:42`, `client.server.ts:41`, `auth-middleware.ts:44` — archivos autogenerados.
- `.lovable/` (plans archivados y `project.json`) — carpeta interna del editor.
- `tsconfig.tsbuildinfo` — caché del compilador.

Notas de desarrollo:
- `roadmap.md` (notas de tareas).
- `AGENTS.md` (reglas internas para el asistente).
- No hay `README.md`.
- No hay comentarios que mencionen IA, prompts ni tareas en `src/`; los existentes son técnicos (seguridad, antispam, limpieza de archivos). Solo se neutralizan los de separadores de sección y redacción informal si procede.

## 2. Cambios

1. Crear `public/og-image.jpg` (1200x630, recortado) a partir de `src/assets/industry40.jpg` (o `hero-fondo-idc.png`).
2. En `__root.tsx`: og:image/twitter:image → `https://idctecnologia.vercel.app/og-image.jpg`; author → "IDC Tecnología"; añadir favicon derivado de `src/assets/idc-logo.png` en `public/favicon.png` y enlazarlo; borrar `public/favicon.ico` si existe.
3. Canonical y og:url de las dos páginas → `https://idctecnologia.vercel.app/...`.
4. Eliminar el comentario de `vite.config.ts` (sin cambiar la configuración).
5. Crear `README.md` neutro: IDC Tecnología, tecnologías (React 19, TanStack Start, Vite, Tailwind CSS v4, Supabase, Nodemailer), arranque local (`bun install`, `bun run dev`), variables sin valores: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM`, `EMAIL_NOTIFICATIONS` (se verificarán contra el código).
6. Eliminar `roadmap.md` y `AGENTS.md`. Se conserva `.lovable/` porque la usa el editor.

## 3. Se mantiene sin cambios

Dependencia `@lovable.dev/vite-tanstack-config`: solo actúa al compilar; no llega al navegador. Archivos autogenerados de `src/integrations/supabase/`: no los usa la web (el cliente propio es `src/lib/supabase.ts`) y el de vista previa solo se activa dentro del editor. Funcionalidad, diseño, textos, Supabase, variables y correo intactos.

## 4. Verificación

`npx tsgo --noEmit` y `npm run build`; comprobar en el HTML que no queda `lovable.app` en metadatos; listar archivos modificados y eliminados.
