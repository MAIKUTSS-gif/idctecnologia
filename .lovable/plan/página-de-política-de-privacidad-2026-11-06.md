# Página de Política de privacidad

1. **Nueva página /politica-privacidad** con el mismo diseño que Aviso legal: parte de arriba oscura (añadida a la lista de páginas oscuras de la cabecera), columna de lectura cómoda, apartados como subtítulos, buena lectura en móvil. El texto va en un archivo aparte, `src/lib/politica-privacidad-text.ts`.
2. **Texto literal** del documento, solo con formato: subtítulos, subapartados, listas, negritas indicadas y enlaces (teléfono tel:+34918796046, correos mailto:, www.aepd.es en pestaña nueva).
3. **Metadatos**: título "Política de privacidad | IDC Tecnología", descripción breve y canónica en https://idctecnologia.vercel.app/politica-privacidad, igual que Aviso legal.
4. **Pie de página**: "Política de privacidad" junto a "Aviso legal", mismo estilo.
5. **vercel.json**: segunda regla en "redirects", /politica.php a /politica-privacidad (301). Nada más.
6. **Aviso legal**: sustituir solo el párrafo de "Privacidad" por el nuevo texto, con "Política de Privacidad" enlazado a /politica-privacidad.
7. **Formularios** (Contacto/Presupuesto, Candidatura, Formulario técnico): si tienen casilla de aceptación, enlazar "política de privacidad" a la nueva página en pestaña nueva. Si no tienen, no añadirla; solo informar.
8. **Informe sin cambios**: cookies/almacenamiento del navegador y servicios externos que carga la web.

Al terminar: typecheck, `npm run build` y lista de archivos creados/modificados.
