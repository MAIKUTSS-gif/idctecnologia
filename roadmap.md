# Roadmap

## Buzón de sugerencias
- [ ] Formulario privado de empleados y menú Noticias/Buzón
- [ ] Gestión privada de sugerencias y enlaces del panel
- [ ] Pruebas de límites, anonimato e INSERT sin retorno; verificación de navegación

## Textos de la web (Inicio, Servicios, Industria 4.0)
- [x] Titulares, tarjetas y descripciones actualizados con el resaltado azul conservado

## Noticias de intranet — diseño editorial
- [x] Portada y tarjetas con entradilla e imágenes privadas solicitadas en lote
- [x] Detalle protegido de noticia publicada con pie de foto y texto completo
- [x] Verificar navegación y presentación móvil con datos simulados; compilación automática OK
- [ ] Verificar con la cuenta real y noticias del despliegue externo (requiere prueba del usuario en Vercel)

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
