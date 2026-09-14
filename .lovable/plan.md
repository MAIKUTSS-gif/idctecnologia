# Corrección del INSERT en `/formulario-tecnico`

## Causa real

`submitProjectInformation()` en `src/lib/project-information.ts` ejecuta un INSERT que, por defecto, intenta **devolver la fila creada**. Ese SELECT implícito choca con la política RLS de la tabla, que permite INSERT como `anon` pero no SELECT/retorno de filas. Por eso Supabase devuelve un error y el formulario muestra el mensaje genérico.

## Cambio único a realizar

En `src/lib/project-information.ts`, línea 57, cambiar:

```ts
const { error } = await supabase.from(TABLE).insert(payload);
```

por:

```ts
const { error } = await supabase.from(TABLE).insert(payload, { returning: "minimal" });
```

Esto fuerza al cliente a no solicitar la fila insertada, evitando el SELECT que dispara RLS.

## Lo que NO se toca

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` ni ninguna credencial.
- Tablas, RLS, Lovable Cloud, diseño ni otras secciones.

## Verificación

- `npm run build`.
- Envío real desde `/formulario-tecnico` para confirmar que guarda correctamente.
