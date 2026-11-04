# Cabecera legible sobre fondos oscuros

## 1. Páginas revisadas
Parte superior **oscura** (fondo grafito):
- Servicios, Proyectos, Empleo (Trabaja con nosotros), Contacto
- Empresa: Sobre nosotros, Canal del Informante, Formulario técnico

Parte superior **clara**:
- Inicio (foto de fábrica con degradado blanco)
- Detalle de oferta de empleo (/empleo/…)

## 2. Cabecera transparente en páginas oscuras
- Enlaces del menú y flecha de "Empresa" en blanco (hover con fondo blanco suave).
- Enlace activo en azul claro, legible sobre negro.
- Logo en versión clara.
- El desplegable de "Empresa" ya tiene fondo propio claro: se mantiene igual.
- Nota: la cabecera actual no tiene icono de menú móvil (todo va en una fila). No se añade uno; en móvil se aplican los mismos colores claros a los enlaces visibles.

## 3. Con scroll, y en páginas claras
Menú oscuro y logo normal, exactamente como ahora.

## 4. Transición suave
Cambio de color de enlaces y fundido cruzado entre los dos logos (~300 ms).

## 5. Fondo al hacer scroll
Ahora es un 70 % opaco, y se ve grisáceo sobre fondos oscuros. Se sube a ~92 % solo en la cabecera (sin tocar el estilo "glass" usado en otras partes de la web).

## 6. Comprobación
Capturas de Inicio, Servicios, Proyectos, Empleo, Contacto y las tres páginas de Empresa, arriba y con scroll, en escritorio (1280 px) y móvil (390 px), con el desplegable de "Empresa" abierto.

## Logo claro
Nuevo archivo `src/assets/idc-logo-header-light.png` (mismo tamaño 1272×352 y transparencia): esfera roja intacta, letras "IDC", "Tecnología" y "FACTORY AUTOMATION" en blanco. Se genera recoloreando por píxel solo las zonas no rojas, para conservar formas y proporciones exactas. El original no se toca. Te avisaré para validarlo con la empresa.

No cambia el tamaño del logo ni nada más.

## Detalles técnicos
- Archivos: `src/components/layout/SiteHeader.tsx` (modificado) y `src/assets/idc-logo-header-light.png` (nuevo).
- Lista de rutas oscuras en una constante; `isDarkTop = DARK_ROUTES.has(pathname) && !scrolled`.
- Dos `<img>` superpuestos con `transition-opacity`.
- Fondo con scroll: clase utilitaria local en la cabecera (`bg-surface-elevated/92` + blur), sin modificar `.glass`.
- Al terminar: `npx tsgo --noEmit` y `npm run build`.
