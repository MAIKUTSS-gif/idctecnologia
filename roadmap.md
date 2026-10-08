# Roadmap

## Correos SMTP (plan aprobado)
- [x] Retirar prueba SMTP temporal
- [x] Helper `src/lib/email.server.ts`
- [x] Contacto/Presupuesto → aviso interno + confirmación (según servicio)
- [x] Candidaturas → aviso interno + confirmación tras guardar
- [x] typecheck + build + SMTP fuera del bundle cliente
- [x] Prueba real en Vercel (usuario): Contacto/Presupuesto OK, candidaturas OK (aviso interno + confirmación)
- [x] Corrección `jobOfferId` (acepta texto o número) y retirada del diagnóstico temporal del 400


## Módulo Empleo — candidaturas
- [x] Capa de datos, formulario, panel admin, detalle (implementados anteriormente)
