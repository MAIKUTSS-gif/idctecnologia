# Cambios pequeños de textos y pie

1. `src/components/sections/Hero.tsx`: cifra "+25" Años de experiencia pasa a "+30".
2. `src/routes/__root.tsx`: description, og:description y twitter:description, "Más de 20 años" pasa a "Más de 30 años".
3. `src/routes/__root.tsx`: og:title y twitter:title "IDC-TECNOLOGIA" pasan a "IDC Tecnología". El título de pestaña (title) se mantiene como está.
4. Erratas:
   - `src/components/sections/Projects.tsx`: "Paletización mediante Robot en final de línea" (el texto alternativo de la imagen usa el mismo título, así que se corrige a la vez).
   - `src/components/sections/Services.tsx`: "Sensorica" pasa a "Sensórica".
5. `src/components/layout/SiteFooter.tsx`: "Área de empleados" se añade como último enlace de la columna Empresa (tras "Canal del Informante", mismo estilo) y se quita de la línea inferior.

Al terminar: typecheck (`npx tsgo --noEmit`) y `npm run build`, e informe de archivos modificados.
