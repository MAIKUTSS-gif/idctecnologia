# Formulario técnico + gestión de fichas en el panel

Nueva página pública para recoger información técnica de máquinas y una nueva sección privada en el panel para gestionar las respuestas. Todo contra la tabla ya existente `public.project_information`, usando exclusivamente el Supabase externo de `src/lib/supabase.ts`. Sin Lovable Cloud, sin tablas nuevas, sin tocar RLS, sin service_role, sin subida de archivos.

## 1. Menú Empresa

En el desplegable "Empresa" se añade al final "Formulario técnico" → `/formulario-tecnico`. No se toca nada más del menú.

## 2. Página pública `/formulario-tecnico`

Mismo estilo visual que el resto de la web (cabecera, secciones, tarjetas, botones actuales), con el espaciado superior ya usado en otras páginas para evitar solape con la cabecera fija.

- Título "Formulario técnico" y el texto introductorio indicado.
- Ningún campo obligatorio.
- Bloque A — Máquina y modificación: empresa, persona de contacto, email, teléfono, máquina/línea, descripción de la modificación, funcionamiento actual (con los textos de ayuda indicados).
- Bloque B — PLC, HMI y documentación: marca de PLC (Siemens, Omron, Mitsubishi, Schneider, Allen-Bradley, Otro, No lo sé), modelo libre, backup PLC, HMI o pantalla, marca/modelo HMI, backup HMI, esquemas eléctricos, entradas/salidas libres (Sí/No/No lo sé) y, solo si responde "Sí", dos campos opcionales de entradas y salidas libres aproximadas; afecta a seguridad con el texto auxiliar sobre puertas, setas, barreras y enclavamientos.
- Bloque C — Disponibilidad y observaciones: parada para pruebas (Sí / No / Solo en determinados horarios / No lo sé), información adicional en textarea amplio y la nota discreta sobre enviar backups y esquemas por correo.
- Botón "Enviar información", bloqueo de doble envío y mensaje de éxito: "Información enviada correctamente. Gracias por ayudarnos a preparar la intervención."
- El envío guarda siempre `status = 'new'` e `internal_notes = null`. Los campos vacíos se guardan como nulos.

## 3. Panel admin

- Nueva ruta protegida `/admin/proyectos`, con la misma comprobación de administrador que `/admin/empleo` (sesión + verificación de admin, respetando las RLS existentes).
- Navegación interna entre "Empleo" y "Proyectos" dentro del panel, con el estilo actual.

## 4. Listado

Tabla con fecha, empresa, máquina/línea, PLC, estado y acciones Ver / Eliminar. Filtro por estado. Etiquetas: Nuevo, Revisado, Preparado, En curso, Finalizado.

## 5. Detalle

Ficha completa agrupada en los tres bloques, mostrando "No indicado" en los campos vacíos. Permite cambiar el estado y escribir notas internas (`internal_notes`), nunca visibles en la parte pública.

## 6. Eliminar

"Eliminar ficha" con diálogo de confirmación explícita.

## Detalles técnicos

- Nuevo `src/lib/project-information.ts`: tipos, etiquetas de estado, `submitProjectInformation`, `listProjectInformation`, `updateProjectStatus`, `updateInternalNotes`, `deleteProjectInformation`; todo a través del cliente de `src/lib/supabase.ts`.
- Nueva ruta `src/routes/formulario-tecnico.tsx` con validación ligera (solo formato de email si se rellena) y `head()` propio con título, descripción y etiquetas Open Graph/Twitter.
- Nueva ruta `src/routes/admin.proyectos.tsx` (`ssr: false`, `noindex`), reutilizando el patrón de `admin.empleo.tsx`.
- Modificaciones mínimas: `SiteHeader.tsx` (una entrada de menú) y `admin.empleo.tsx` (enlace de navegación interna al nuevo panel).

## Verificación

Envío público y guardado en `project_information`, acceso admin protegido, listado, filtro, detalle, cambio de estado, notas internas, eliminación con confirmación, comportamiento responsive y `npm run build`.
