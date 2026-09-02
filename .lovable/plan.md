# Corrección: botones "+ Nueva oferta" y "Cerrar sesión" en /admin/empleo

## Diagnóstico

Los handlers están bien conectados (`onClick={openCreate}` / `onClick={handleSignOut}`, `Dialog` con `open={dialogOpen}` y `onOpenChange={setDialogOpen}`, y `handleSignOut` llama a `supabase.auth.signOut()` y redirige a `/admin/login`). No hay error de JavaScript.

El problema es de superposición: la cabecera pública (`SiteHeader`) se renderiza en el layout raíz con `position: fixed`, `top: 0` y `z-50`, y su altura real (logo grande + padding) supera el `pt-28` (112 px) que usa el panel. Es decir, la barra transparente de la cabecera queda por encima de la fila superior del panel y captura los clics de esos dos botones. Los botones de la tabla, que están más abajo, sí funcionan — lo que encaja exactamente con el síntoma descrito.

## Corrección propuesta

1. En `src/routes/admin.empleo.tsx`, aumentar el espacio superior del panel (`pt-28` → un valor por encima de la altura real de la cabecera, p. ej. `pt-44`) para que la fila de acciones quede fuera del área ocupada por la cabecera fija. Sin cambios de estilo en los botones ni en el resto del diseño.
2. Añadir `type="button"` explícito a los botones del panel y del diálogo (buena práctica; evita cualquier submit implícito futuro).
3. Ningún cambio en Supabase, RLS, tablas, ni en otras secciones de la web. No se activa Lovable Cloud.

## Verificación

- Prueba funcional en el navegador sobre la ruta del panel: comprobar que "+ Nueva oferta" abre el diálogo, que el diálogo se cierra, y que los botones quedan libres de la cabecera.
- Comprobación de que "Cerrar sesión" invoca `supabase.auth.signOut()` y navega a `/admin/login` (verificable sin credenciales comprobando que el clic dispara el handler y la navegación).
- `npm run build` al finalizar.
