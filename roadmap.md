# Roadmap

## Prueba SMTP en Vercel (Nodemailer, plan aprobado)
- [x] Confirmar runtime Node en Vercel (nodejs24.x) — hecho por el usuario
- [x] Instalar nodemailer + @types/nodemailer
- [ ] Helper `src/lib/smtp-test.server.ts` (SMTP_HOST/PORT/USER/PASSWORD, EMAIL_FROM/EMAIL_NOTIFICATIONS, 587 STARTTLS)
- [ ] Endpoint temporal `src/routes/api/public/smtp-test.ts` (POST, cabecera x-smtp-test-token vs SMTP_TEST_TOKEN, 404 si falla)
- [ ] `npm run build` + verificación de que nodemailer y las SMTP no llegan al cliente
- [ ] Retirada del endpoint y del helper cuando el usuario confirme el correo (y borrar SMTP_TEST_TOKEN en Vercel)

## Módulo Empleo — candidaturas
- [x] Capa de datos `src/lib/applications.ts` (subida CV, insert, listado, estados, notas, signed URL, borrado)
- [ ] Formulario público de candidatura en `/empleo/$id` (validación, 10 MB, PDF/DOC/DOCX, consentimiento, anti doble envío)
- [ ] Panel admin: pestañas Ofertas / Candidaturas, contador de candidatos, "Ver candidatos"
- [ ] Detalle de candidato: datos, estado, notas internas, descarga CV (signed URL 60 s), eliminar candidato + CV
- [ ] Condiciones extra: limpiar CV huérfano, advertencia si el CV no se puede borrar, aviso si no hay `cv_path`
- [ ] `npm run build` y verificación
