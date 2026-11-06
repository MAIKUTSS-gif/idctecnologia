# Sustituir el logo por el original

Los dos archivos nuevos miden 1000 × 244 px, tienen fondo transparente y no tienen márgenes.

## Dónde aparece el logo hoy
- **Cabecera:** versión normal y versión clara, que se alternan según la página y el scroll.
- **Pie de página:** la versión normal sobre fondo oscuro.
- **Correos:** `public/email/idc-logo.png`.
- **Login de admin, intranet y resto de páginas:** no muestran el logo. No se toca nada ahí.

## Cambios
1. **Cabecera:** idc-logo.png sustituye a la versión normal e idc-logo-claro.png a la clara. Se mantienen la misma altura en pantalla (46/54/62 px), el cambio entre versiones y la transición. width/height pasan a 1000 × 244. Como el logo nuevo es algo más apaisado, a la misma altura queda un poco más ancho.
2. **Pie de página:** el fondo es oscuro, así que se usa idc-logo-claro.png, con la altura actual y width/height 1000 × 244. El logo no tenía filtro de brillo ni de invertir colores. Solo tenía un halo azul alrededor (sombra luminosa azul de 18 px). Ese halo se quita.
3. **Correos:** `public/email/idc-logo.png` se sustituye por idc-logo.png con el mismo nombre. En la etiqueta del logo solo se añaden width="197" height="48". Nada más de la plantilla cambia.
4. **Archivos antiguos que se eliminan:** `src/assets/idc-logo-header.png`, `src/assets/idc-logo-header-light.png` y el antiguo `src/assets/idc-logo.png`. El favicon no se toca.
5. **Comprobación:** cabecera en escritorio y en móvil (390 px), en Inicio y en Servicios, arriba del todo y con scroll.

Al terminar: typecheck, `npm run build` y lista de archivos creados, modificados y eliminados.
