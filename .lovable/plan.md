# Corrección del fallo de envío en `/formulario-tecnico`

## Diagnóstico (ya verificado)

He consultado directamente la base de datos a la que se conecta la aplicación (`VITE_SUPABASE_URL` configurado en el proyecto):

- La tabla `public.project_information` **no existe** en esa base de datos. Error real: `relation "public.project_information" does not exist`.
- De hecho, el esquema `public` está **completamente vacío**: tampoco existen `job_offers`, `admin_users` ni `job_applications`.

Conclusión: la app no está apuntando a tu Supabase externo (donde creaste las tablas), sino al proyecto interno de Lovable Cloud, que está vacío. Cuando el formulario envía, Supabase responde "tabla no encontrada" y el `catch` muestra el mensaje genérico. No es un problema de CHECK, ni de `status`, ni de valores null, ni de RLS: la tabla no está en la base de datos conectada.

El código del formulario es correcto (`status: "new"`, `internal_notes: null`, vacíos como `null`), así que no hay que tocar diseño ni lógica del formulario salvo para mostrar el error real en consola.

## Cambios propuestos

1. **Mostrar el error real en consola** (`src/routes/formulario-tecnico.tsx`):
   - En el `catch`, añadir `console.error("Error al enviar formulario técnico:", error)` para que el mensaje real de Supabase quede visible en las herramientas de desarrollo. El mensaje visible para el usuario se mantiene igual.

2. **Apuntar la app a tu Supabase externo** (la causa raíz):
   - Necesito que me confirmes la **URL** y la **clave pública (anon/publishable)** de tu proyecto Supabase externo donde existe `project_information` (el mismo donde funcionan Empleo y `admin_users`).
   - Con esos datos actualizaré `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` del proyecto para que el cliente de `src/lib/supabase.ts` conecte con tu base de datos real.

## Lo que NO se hace

- No se crean tablas ni se modifica RLS.
- No se activa nada nuevo de Lovable Cloud (aunque el proyecto de Lovable Cloud ya existe como backend, no se usará: se reemplazará la conexión por la tuya externa).
- No se toca diseño ni otras secciones.

## Verificación

- Enviar el formulario en el preview y comprobar en consola que no hay error (o ver el error real si persistiera).
- Confirmar que la ficha aparece en `/admin/proyectos` y que Empleo sigue funcionando contra tu Supabase externo.
- `npm run build`.

## Necesito de ti

La URL (`https://xxxx.supabase.co`) y la clave pública (anon o publishable) de tu Supabase externo. Sin ellas la app no puede alcanzar tus tablas.
