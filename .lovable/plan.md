# Diagnóstico temporal del formulario técnico

## Cambios limitados

1. En `submitProjectInformation()`, mantener exactamente el INSERT actual sin retorno:

```ts
const { error } = await supabase.from(TABLE).insert(payload);
```

2. Si el INSERT devuelve un error, registrar temporalmente en consola sus campos `message`, `code`, `details` y `hint`, y después relanzar el mismo error.
3. En el `catch` del formulario, recibir el error y registrarlo como `FORMULARIO TECNICO ERROR`, conservando el mensaje visible actual.

## Límites

- No añadir `.select()`, `.single()`, `.maybeSingle()` ni `returning`.
- No cambiar URL, claves, tablas, RLS, Lovable Cloud, diseño ni ninguna otra funcionalidad.

## Verificación

- Ejecutar `npm run build`.
- Confirmar que los dos registros temporales quedan en los puntos solicitados y que el comportamiento visible del formulario no cambia.
