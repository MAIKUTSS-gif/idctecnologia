# Cambios de texto (Empleo, Contacto, 24/7, Empleados)

Solo textos (y un icono). Sin tocar diseño ni estilos.

## Trabaja con nosotros (`src/routes/trabaja-con-nosotros.tsx`)
1. Introducción: "puesta en marcha y digitalización" -> "mantenimiento electromecánico, puestas en marcha y digitalización".
2. "Clientes nacionales e internacionales": texto -> "Desarrollarás tus capacidades en colaboración con compañías líderes."
3. Tarjeta "Flexibilidad" -> título "Equipos multidisciplinares de trabajo", texto "Sectores estratégicos de actividad: automoción, energía, farmacia, alimentación, envase y embalaje.", icono reloj -> icono de equipo (Users, misma librería).
   - Búsqueda "horario flexible"/"jornada intensiva": solo aparecía en esa tarjeta; no hay más menciones.

## Contacto (`src/routes/contacto.tsx`)
4. "Lun–Vie 8:00–20:00" -> "Lun–Vie 8:00–18:00". No aparece en el pie, metadatos ni datos estructurados.

## Soporte permanente
5. `Advantages.tsx`: título "Soporte técnico 24/7" -> "Soporte técnico permanente".
   Otras menciones de "24/7" referidas al soporte de IDC, que también cambiaré:
   - `Services.tsx`: "soporte 24/7" -> "soporte permanente"; "Asistencia 24/7" -> "Asistencia permanente".
   - `SiteFooter.tsx`: "Mantenimiento 24/7" -> "Mantenimiento industrial".
   No se cambia: `Projects.tsx` "producción 24/7" (es la planta del cliente).
   No se cambia: `Hero.tsx` cifra "24/7 · Soporte especializado" (se mantiene; "+340 Clientes activos" ya está en esa fila).

## Sobre nosotros (`src/routes/sobre-nosotros.tsx`)
6. "51-200" -> "90" Empleados. No aparece en ningún otro sitio.

Al terminar: typecheck y `npm run build`, y lista de archivos modificados.
