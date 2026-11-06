# Página de Aviso legal

## Qué se hará
1. **Nueva página /aviso-legal** con el estilo de las demás páginas legales (como Canal del Informante): cabecera oscura con título "Aviso legal" y, debajo, el texto en una columna de lectura cómoda, apartados como subtítulos y párrafos bien espaciados, también en móvil. Se añade `/aviso-legal` a la lista de rutas oscuras de la cabecera para que menú y logo se lean en blanco.
2. **Texto literal** del archivo, sin cambiar una palabra. Solo formato: subtítulos, negritas en los inicios indicados ("Uso incorrecto del Portal:", "Utilización de los contenidos:", "Publicidad:", "Virus:", etc.), enlace `tel:+34918796046` en el teléfono y `mailto:` en los correos.
3. **Metadatos**: título "Aviso legal | IDC Tecnología", descripción breve, og/twitter y canónica `https://idctecnologia.vercel.app/aviso-legal`.
4. **Pie de página**: enlace "Aviso legal" en la línea inferior junto al copyright, mismo estilo discreto.
5. **Redirección 301** `/aviso_legal.php` → `/aviso-legal` en un `vercel.json` nuevo (`redirects` con `"permanent": true`, que Vercel sirve como 308; para forzar exactamente 301 se usa `"statusCode": 301`). Se aplica en el borde de Vercel antes de llegar a la app. El archivo contendrá únicamente la sección "redirects", sin ninguna otra configuración.

Al terminar: typecheck y build, y lista de archivos.

## Nota
No existe ninguna constante compartida de dirección de la web: cada página escribe la URL directamente. Para no tocar otras páginas, la nueva usará la misma forma escrita que las demás. Si prefieres crear la constante, habría que modificar otras páginas.

## Archivos
- Nuevo: `src/routes/aviso-legal.tsx`, `vercel.json`
- Modificados: `src/components/layout/SiteHeader.tsx` (lista de rutas oscuras), `src/components/layout/SiteFooter.tsx` (enlace)
