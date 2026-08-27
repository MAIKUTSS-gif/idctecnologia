# Módulo de Empleo con Supabase externo

Todo el acceso a datos usará únicamente `src/lib/supabase.ts`. No se toca `src/integrations/supabase/`, no se activa Lovable Cloud, no se usan claves privadas.

## 1. Capa de datos (nuevo `src/lib/jobs.ts`)
- Tipo `JobOffer` con los campos: `id`, `title`, `location`, `department`, `contract_type`, `description`, `requirements`, `benefits`, `published`, `created_at`, `updated_at`.
- Funciones cliente: `listPublishedOffers()`, `getOfferById(id)`, `listAllOffers()` (admin), `createOffer`, `updateOffer`, `deleteOffer`, `togglePublished`.
- Todas ejecutadas desde el navegador con la clave pública; la seguridad real la aplican las políticas RLS existentes.

## 2. Login admin — `/admin/login`
- Nueva ruta `src/routes/admin.login.tsx`.
- Formulario email + contraseña, validación con Zod, `supabase.auth.signInWithPassword()`.
- Tras el login: comprobación contra `admin_users` (consulta por `user_id`); si no es admin → `signOut()` + mensaje "Acceso no autorizado".
- Si ya hay sesión admin activa, redirige directamente a `/admin/empleo`.
- Sin registro, sin "crear cuenta", sin alta pública de administradores.

## 3. Panel protegido — `/admin/empleo`
- Nueva ruta `src/routes/admin.empleo.tsx` con `ssr: false` (la sesión vive en el navegador).
- Al montar: `getUser()` → si no hay sesión, redirección a `/admin/login`; si hay sesión pero no está en `admin_users`, pantalla de acceso denegado con opción de cerrar sesión.
- Cabecera propia del panel (sin el header/footer público en su versión de contenido) con botón "Cerrar sesión".
- No se añade ningún enlace al panel en el menú público.

## 4. Dashboard de ofertas
- Tabla con: Título, Ubicación, Departamento, Tipo de contrato, Publicada (badge sí/no), Fecha de creación, Última actualización.
- Acciones por fila: Editar, Publicar/Despublicar, Eliminar.
- Botón principal "+ Nueva oferta".
- Estados de carga y de lista vacía; notificaciones con `sonner`.

## 5. Crear / editar oferta
- Formulario en diálogo (shadcn `Dialog`) reutilizado para alta y edición: título, ubicación, departamento, tipo de contrato, descripción, requisitos, beneficios, publicada sí/no.
- Botones "Guardar borrador" y "Publicar" en el alta; en edición, "Guardar cambios" respetando el estado publicado.
- Validación Zod y confirmación visual tras cada operación.

## 6. Eliminar
- `AlertDialog` con el texto "¿Seguro que quieres eliminar esta oferta?" y botones Cancelar / Eliminar. Nunca se borra sin confirmar.

## 7. Página pública `/trabaja-con-nosotros` (Empleo)
- Se mantiene íntegro el diseño actual; solo se sustituye el array estático `JOBS` por una consulta a Supabase de ofertas con `published = true` mediante TanStack Query.
- Cada tarjeta muestra título, ubicación, departamento, tipo de contrato y descripción corta, con botón "Ver oferta" hacia el detalle.
- Estados de carga (skeletons) y mensaje si no hay ofertas activas.
- Actualización automática: refetch al enfocar la ventana, de modo que los cambios hechos por RRHH se reflejan sin desplegar.

## 8. Detalle de oferta — `/empleo/$id`
- Nueva ruta `src/routes/empleo.$id.tsx` con el estilo público actual: hero compacto, título, ubicación, departamento, tipo de contrato, descripción, requisitos y beneficios.
- Metadatos `head()` propios y enlace de vuelta a las ofertas. Sin formulario de candidatura ni subida de CV (fase 2).

## 9. Verificación
- Comprobación en el navegador del flujo completo (login, listado, alta, edición, publicar/despublicar, borrado, logout) usando las credenciales de admin si me las facilitas; en caso contrario verificaré lo verificable sin sesión y te indicaré qué queda por comprobar manualmente.
- `npm run build` antes de terminar y lista exacta de archivos creados/modificados.

## Nota técnica
Asumo estos nombres de columna en `job_offers`: `title`, `location`, `department`, `contract_type`, `description`, `requirements`, `benefits`, `published`, `created_at`, `updated_at`; y en `admin_users` una columna `user_id` que referencia al usuario de Auth. Si difieren, indícamelo y ajusto el código.
