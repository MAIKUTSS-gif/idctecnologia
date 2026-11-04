# Logo de la cabecera más grande

## Diagnóstico (comprobado)
- Archivo: `src/assets/idc-logo.png`, **1536 × 1024 px**, fondo transparente.
- El dibujo visible (esfera + "IDC Tecnología / FACTORY AUTOMATION") ocupa solo **~1257 × 337 px** en el centro; el resto es margen vacío (unos 275 px arriba y 410 abajo).
- Por eso, aunque la cabecera reserva hoy 112 px de alto en escritorio, el logo real solo se ve de unos 37 px: el margen transparente se come el espacio.

## Resolución
337 px de alto útil es suficiente: a 64 px se ve nítido incluso en pantallas de alta densidad (x2 y x3). No hace falta una versión mayor.

## Cambios
1. Crear `src/assets/idc-logo-header.png`: copia recortada del logo original, sin margen vacío (con unos pocos px de respiro), mismas proporciones, sin redimensionar ni deformar. El original no se toca (lo sigue usando el pie de página; el de correos es otro archivo y tampoco se toca).
2. `src/components/layout/SiteHeader.tsx`: usar el logo recortado con altura **~46 px en móvil, ~54 px en tablet y ~62 px en escritorio**, `w-auto` + `object-contain` para no deformar ni recortar, y `width/height` reales del recorte. Al quitar el margen invisible, la cabecera queda **más baja que ahora** con el logo visiblemente mayor (aprox. de 37 px a 62 px visibles).
3. Revisar con el navegador en 1280 px, 770 px y 390 px: logo completo, menú centrado verticalmente y sin solapes en móvil. Si en móvil el menú no cabe al lado, ajustaré solo el tamaño del logo en esa medida.

Nada más cambia. Después: typecheck y `npm run build`, e informe de archivos.
