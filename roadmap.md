# Roadmap

## Módulo Empleo — candidaturas
- [x] Capa de datos `src/lib/applications.ts` (subida CV, insert, listado, estados, notas, signed URL, borrado)
- [ ] Formulario público de candidatura en `/empleo/$id` (validación, 10 MB, PDF/DOC/DOCX, consentimiento, anti doble envío)
- [ ] Panel admin: pestañas Ofertas / Candidaturas, contador de candidatos, "Ver candidatos"
- [ ] Detalle de candidato: datos, estado, notas internas, descarga CV (signed URL 60 s), eliminar candidato + CV
- [ ] Condiciones extra: limpiar CV huérfano, advertencia si el CV no se puede borrar, aviso si no hay `cv_path`
- [ ] `npm run build` y verificación
