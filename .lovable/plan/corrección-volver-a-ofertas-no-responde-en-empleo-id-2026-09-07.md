# Corrección: "Volver a ofertas" no responde en `/empleo/$id`

## Diagnóstico (ya verificado con navegador automatizado)

El enlace **sí está bien implementado**: es un `<Link to="/trabaja-con-nosotros">` de TanStack Router con `href` correcto. No hay handler roto ni error de hidratación.

**Causa real:** la cabecera fija (`SiteHeader`, `fixed inset-x-0 top-0 z-50`) con el logo grande (`h-28`) mide ~160-176 px de alto, pero la página de detalle usa solo `py-32` (128 px) de espacio superior. Resultado: la cabecera **solapa el enlace "Volver a ofertas"** (situado en y≈128) y **intercepta el clic**. El test automatizado confirma: `elementFromPoint` devuelve el `<header>` y el clic nunca llega al enlace.

Es el mismo problema ya resuelto en `/admin/empleo` (donde se usó `pt-48`).

## Cambios

**Único archivo modificado: `src/routes/empleo.$id.tsx`**

- Cambiar el padding superior del `<section>` de `py-32` a `px` equivalente con `pt-48` (192 px) y mantener el padding inferior (`pb-32`), para que el enlace quede por debajo de la cabecera fija en escritorio, tablet y móvil.
- No se toca el `Link` (ya es el componente correcto del router, navega en cliente sin recarga, con flecha, texto, color y hover actuales intactos).
- No se modifica SiteHeader, Supabase, RLS ni ninguna otra sección.

## Verificación

1. Test automatizado (Playwright): el clic en "Volver a ofertas" navega a `/trabaja-con-nosotros` en 1280 px, 768 px y 375 px, y `elementFromPoint` ya no devuelve la cabecera.
2. `npm run build` correcto.
