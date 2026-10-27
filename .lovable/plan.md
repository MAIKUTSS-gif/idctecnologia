# Buzón de sugerencias: ya implementado

El buzón ya está creado. Esta petición es la misma que se hizo antes, así que no hace falta cambiar nada.

## Lo que ya existe
- `/intranet/buzon`: protegida igual que `/intranet`. Tiene un formulario con el mensaje (obligatorio, máximo 5000 caracteres), el nombre (opcional, máximo 120) y el texto de ayuda sobre el anonimato. Si el nombre está vacío, se guarda como anónimo. El envío no pide que se devuelva la fila. Si todo va bien, se muestra una confirmación y el formulario se vacía. Si falla, se muestra un error y se conserva lo escrito.
- Menú de la intranet con "Noticias" y "Buzón", sin cambiar el diseño de las noticias.
- `/admin/sugerencias`: protegida igual que `/admin/noticias`. Muestra la lista de la más reciente a la más antigua, con la fecha, el nombre o "Anónimo", el estado y el mensaje en texto plano. Tiene botones para marcar como revisada o nueva y para eliminar con confirmación.
- Enlace "Sugerencias" en la navegación de todas las páginas de admin.

## Paso propuesto
- Volver a ejecutar la revisión de tipos y `npm run build` para confirmar que todo sigue correcto, sin cambiar nada más.

## Archivos (ya existentes)
- Creados: `src/lib/suggestions.ts`, `src/lib/suggestions.test.js`, `src/routes/intranet.buzon.tsx`, `src/routes/admin.sugerencias.tsx`
- Modificados: `src/components/intranet/NewsShell.tsx`, `src/routes/admin.empleo.tsx`, `src/routes/admin.proyectos.tsx`, `src/routes/admin.noticias.tsx`
