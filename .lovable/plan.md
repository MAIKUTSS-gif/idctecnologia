# Gestión de candidaturas (módulo Empleo)

Todo con el cliente externo `src/lib/supabase.ts`. Sin Lovable Cloud, sin service_role, sin crear tablas ni tocar RLS ni el bucket (sigue privado).

## 1. Capa de datos: `src/lib/applications.ts` (nuevo)

- Tipos `JobApplication`, `ApplicationStatus` (`new | reviewing | interview | selected | rejected`), `ApplicationInput`.
- `uploadCv(jobOfferId, file)`: sube a `candidate-cvs` en `oferta-{job_offer_id}/{crypto.randomUUID()}/cv.{ext}` con `upsert:false`; devuelve `{ cv_path, cv_original_name }`.
- `submitApplication(input)`: verifica antes que la oferta existe y `published = true` (lectura pública ya permitida); inserta en `job_applications` con `status:'new'`, `privacy_accepted:true`, `privacy_accepted_at: new Date().toISOString()`.
- `listApplications(filter?)`: select con join a `job_offers(title)`, orden por `created_at` desc; filtro opcional por estado y por `job_offer_id`.
- `countApplicationsByOffer()`: agrupa en cliente a partir de `select('job_offer_id')`.
- `updateApplication(id, { status? , internal_notes? })`.
- `getCvSignedUrl(cv_path)`: `storage.from('candidate-cvs').createSignedUrl(path, 60)`.
- `deleteApplication(app)`: primero `storage.remove([cv_path])`, después `delete` de la fila.

Todas las operaciones dependen exclusivamente de las RLS ya configuradas; los errores se muestran con toast.

## 2. Formulario público en `/empleo/$id`

Bajo el detalle de la oferta, tarjeta "Inscríbete en esta oferta" con el estilo actual (mismos `rounded-3xl`, `border-border`, `Button variant="hero"`).

Campos: Nombre*, Apellidos*, Email*, Teléfono, Ciudad, LinkedIn, Mensaje (Textarea), CV* (input file `accept=".pdf,.doc,.docx"`), checkbox obligatorio de privacidad con el texto indicado.

Validación con Zod: obligatorios no vacíos, email válido, longitudes máximas, LinkedIn como URL opcional, CV con extensión/MIME PDF/DOC/DOCX y ≤ 10 MB, `privacy === true`. Errores en línea bajo cada campo.

Envío: estado `submitting` que deshabilita el botón (evita doble envío) → subir CV → insertar candidatura → mensaje de éxito "Tu candidatura se ha enviado correctamente." reemplazando el formulario. Si falla el insert después de subir, se elimina el CV huérfano. El formulario no se renderiza si la oferta no está publicada (la ruta ya filtra por `published = true`).

## 3. Panel admin `/admin/empleo`

Se conserva íntegra la gestión actual de ofertas. Se añade encima de la tabla un conmutador de dos pestañas (`Ofertas` / `Candidaturas`) con el mismo lenguaje visual del panel.

- **Ofertas**: nueva columna "Candidatos: X" y botón "Ver candidatos" que salta a la pestaña Candidaturas prefiltrada por esa oferta.
- **Candidaturas**: filtro por estado (Todos / Nuevo / En revisión / Entrevista / Seleccionado / Descartado) más chip de oferta activa; tabla con Nombre, Oferta, Email, Teléfono, Fecha, Estado (Badge con color por estado).
- **Detalle** (Dialog al pulsar una fila): nombre y apellidos, oferta, email, teléfono, ciudad, LinkedIn, mensaje, fecha, selector de Estado, Textarea de Notas internas, botón "Guardar cambios", botón "Descargar CV" (genera Signed URL de 60 s y abre en pestaña nueva) y botón destructivo "Eliminar candidato y datos" con `AlertDialog` de confirmación que borra CV y fila.

Todos los botones con `type="button"`, coherente con la corrección anterior del panel.

## 4. Alcance y verificación

Archivos: nuevo `src/lib/applications.ts`; modificados `src/routes/empleo.$id.tsx` y `src/routes/admin.empleo.tsx`. Nada más se toca; sin enlaces admin en el menú público.

Verificación: `npm run build`, revisión del formulario público y sus validaciones en el navegador, y comprobación de que el panel sigue operativo. Las pruebas que requieren sesión de administrador o envío real de datos (descarga firmada, cambio de estado, borrado) las realizarás tú, ya que no dispongo de credenciales.

## Supuestos

Se asume que `job_applications` tiene las columnas indicadas en tu especificación (`id`, `job_offer_id`, `first_name`, `last_name`, `email`, `phone`, `city`, `linkedin`, `message`, `cv_path`, `cv_original_name`, `status`, `internal_notes`, `privacy_accepted`, `privacy_accepted_at`, `created_at`) y que las RLS permiten INSERT anónimo + subida al bucket, y lectura/actualización/borrado solo a administradores.
