# Diagnóstico temporal del 400 en el aviso de candidaturas

## Qué se cambia (solo un archivo)

`src/routes/api/public/application-email.ts`, únicamente la línea donde falla la validación:

```text
if (!parsed.success) return Response.json({ ok: false }, { status: 400 });
```

pasa a registrar en el servidor, antes de devolver exactamente la misma respuesta (`{ ok: false }`, HTTP 400):

```text
APPLICATION_EMAIL_VALIDATION_ERROR
{
  jobOfferIdType: "number" | "string" | "undefined" | ...,
  issues: [
    { field: "jobOfferId", code: "invalid_union", message: "Invalid input",
      unionIssues: [ { code, message }, ... ] },
    { field: "email", code: "invalid_string", message: "Invalid email" },
    ...
  ]
}
```

- Por cada error de validación: ruta del campo (`issue.path.join(".")`, o `(raíz)` si el cuerpo entero no es un objeto), código Zod y mensaje.
- `jobOfferId` usa una unión: Zod devuelve `invalid_union` con los motivos dentro. Se registran también esos motivos internos (solo código y mensaje) para ver si falla por tipo, longitud o número no positivo.
- `jobOfferIdType`: `typeof body.jobOfferId` (o `null`/`no-object` si el cuerpo no es un objeto).

## Qué NO se registra nunca

Ningún valor enviado: ni nombre, email, teléfono, ciudad, LinkedIn, mensaje, CV, id de la oferta, credenciales ni cabeceras. Los mensajes de Zod v3 de este proyecto no incluyen el valor recibido (p. ej. "Expected string, received number", "Invalid email", "String must contain at most 30 character(s)").

## Qué no cambia

Validaciones (esquema intacto), respuesta pública, código 400, consulta a Supabase, SMTP, Nodemailer, plantillas, formulario de candidaturas, CV, Contacto/Presupuesto y el resto de la web.

## Nota

El endpoint también devuelve 400 si el cuerpo no es JSON válido; ese caso no se registra (no lo has pedido). Si tras desplegar aparece el 400 sin la línea `APPLICATION_EMAIL_VALIDATION_ERROR` en los logs de Vercel, la causa sería el cuerpo de la petición, no la validación.

## Verificación

- Typecheck y `npm run build`.
- Prueba local con un envío inválido (p. ej. email mal formado y `jobOfferId` vacío): comprobar que la respuesta sigue siendo `{ ok: false }` 400 y que el registro solo contiene campo, código, mensaje y tipo, sin datos personales.
- Después: envías una candidatura real en Vercel y me pasas la línea del log; con eso propongo la corrección. El diagnóstico se retira en ese mismo cambio.
