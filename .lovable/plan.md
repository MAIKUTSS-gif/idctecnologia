## Cambios

**1. Redes sociales del pie de página** (`src/components/layout/SiteFooter.tsx`)
- Solo queda el icono de LinkedIn, enlazado a https://es.linkedin.com/company/idc-tecnolog%C3%ADa, con `target="_blank" rel="noopener noreferrer"` y `aria-label="LinkedIn de IDC Tecnología"`. Mismo tamaño y estilo que ahora.
- Se quitan los iconos de X (pájaro de Twitter) y YouTube porque no hay dirección. Por eso no hace falta añadir el logotipo de X ni ninguna librería nueva.

**2. Años de experiencia** (`src/routes/sobre-nosotros.tsx`)
- Cifra "+25 Años" pasa a "+30 Años".
- Título de la pestaña/buscadores: "Sobre IDC Tecnología — +25 años de ingeniería industrial" pasa a "+30 años".
- Búsqueda en toda la web de "25 años", "+25", "20 años" y "dos décadas": no hay más menciones. Inicio y Ventajas ya dicen "+30" y "tres décadas".

Al terminar: typecheck, `npm run build` y lista de archivos modificados.
