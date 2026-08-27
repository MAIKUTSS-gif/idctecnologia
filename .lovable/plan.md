# Plan: Cliente Supabase externo

Objetivo: preparar el código de la aplicación para que utilice un proyecto Supabase externo (no Lovable Cloud), exponiendo un cliente listo para usar en futuros cambios, sin alterar el diseño ni la funcionalidad actual.

## Acciones

1. **Añadir dependencia directa** `@supabase/supabase-js` en `package.json`.
2. **Crear** `src/lib/supabase.ts` con un cliente `createClient` de `@supabase/supabase-js` que lea exclusivamente:
   - `import.meta.env.VITE_SUPABASE_URL`
   - `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY`
   No se introducirán claves reales, ni se usará `service_role` ni ninguna clave privada.
3. **No modificar** `src/routes/trabaja-con-nosotros.tsx` ni cualquier otro apartado de Empleo.
4. **No crear** tablas, autenticación, Storage ni migraciones.
5. **No activar ni reconfigurar** Lovable Cloud.
6. **Verificar** compilación ejecutando `npm run build`.
7. **Reportar** los archivos creados y modificados.

## Archivos esperados

- **Creado:** `src/lib/supabase.ts`
- **Modificado:** `package.json`

## Nota técnica

El cliente se ubicará en `src/lib/supabase.ts` para no interferir con los archivos auto-generados de Lovable Cloud bajo `src/integrations/supabase/`. Las variables de entorno ya están configuradas en Vercel; el cliente usará los prefijos `VITE_` para que estén disponibles en el bundle del navegador.
