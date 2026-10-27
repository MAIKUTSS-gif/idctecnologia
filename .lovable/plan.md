# Aviso para administradores en el buzón

## Cambio
En `/intranet/buzon`, una vez superado el control de acceso actual, se comprueba si la sesión es de la cuenta de empleados (`is_intranet_user()`).
- Si es la cuenta de empleados, se muestra el formulario de siempre, sin cambios.
- Si no lo es (es decir, quien ha entrado es un administrador), no se muestra el formulario y aparece este aviso:
  "Estás conectado como administrador. El buzón es para la cuenta de empleados; para probarlo, cierra sesión y entra con la contraseña de empleados."
- Mientras se hace la comprobación, se muestra el indicador de carga que ya existe.

## Archivo
- Solo se modifica `src/routes/intranet.buzon.tsx`. La función que comprueba el acceso, el login, el menú y las noticias no se tocan.

## Verificación
- Revisión de tipos (`npx tsgo --noEmit`) y `npm run build`.
