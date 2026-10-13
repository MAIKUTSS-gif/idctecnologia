# Panel de administración: sección Noticias

## Qué se añade
- Nueva página privada **/admin/noticias**, protegida igual que Empleo y Proyectos: si no hay sesión, redirige a /admin/login; si la hay, usa `checkIsAdmin` y, si no es admin, muestra el mismo estado bloqueado. Incluye "Cerrar sesión" igual que las otras.
- Enlace **"Noticias"** en la barra de navegación del panel, junto a Empleo y Proyectos (en las tres páginas).
- **Listado** de todas las noticias (borradores y publicadas), las más recientes primero (`created_at` descendente), con título, categoría, estado ("Publicada" / "Borrador") y fecha de publicación si existe.
- **Formulario crear/editar** (diálogo, igual que las ofertas de Empleo): título, categoría (desplegable "Comunicado oficial" → `comunicado`, "Éxito de la empresa" → `exito`, "Cambio organizativo" → `cambio_organizativo`) y texto (textarea).
- El texto se guarda tal cual como texto plano y se muestra con `whitespace-pre-wrap` como texto de React (nunca `dangerouslySetInnerHTML`), así respeta saltos de línea sin interpretar HTML.
- Botón **Publicar / Despublicar**: al publicar guarda `published = true` y `published_at = ahora`; al despublicar `published = false` (published_at se conserva).
- Botón **Eliminar** con confirmación (AlertDialog).
- Al editar se envía `updated_at = ahora`.
- Mismo diseño del panel (`pt-48`, tarjetas, botones con `type="button"`), tarjetas apiladas en móvil.

## Archivos
- Nuevo `src/lib/news.ts`: tipos, etiquetas de categoría y funciones `listAllNews`, `createNews`, `updateNews`, `setNewsPublished`, `deleteNews`, usando solo el cliente externo `src/lib/supabase.ts`. Los INSERT/UPDATE no dependen de devolver la fila (se recarga el listado después), por si RLS no permite RETURNING.
- Nuevo `src/routes/admin.noticias.tsx`.
- `src/routes/admin.empleo.tsx` y `src/routes/admin.proyectos.tsx`: solo se añade el enlace "Noticias".

## No se toca
Login, `checkIsAdmin`, correo/SMTP, tablas, RLS, Lovable Cloud, resto de páginas.

## Verificación
Typecheck y `npm run build`; lista de archivos creados/modificados. La prueba real con datos solo es posible en tu despliegue (la vista previa no apunta a tu Supabase externo).
