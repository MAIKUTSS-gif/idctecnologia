// Texto literal de la política de privacidad. No editar el contenido.
// Bloques: "p" párrafo, "ul" lista, "h3" subapartado. "**texto**" = negrita.
export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string };

export const POLITICA_PRIVACIDAD_SECTIONS: { title: string; blocks: PrivacyBlock[] }[] = [
  {
    title: "Responsable del tratamiento",
    blocks: [
      {
        type: "ul",
        items: [
          "Denominación social: IDC TECNOLOGÍA S.L.",
          "Nombre comercial: IDC.ES",
          "CIF: B19162916",
          "Domicilio social: C/ Punto Mobi, 10, TecnoAlcalá - Parque Científico UAH, 28805 Alcalá de Henares (Madrid)",
          "Inscrita en el Registro Mercantil de Madrid, folio 32, tomo 19616, sección 8, hoja M-344778",
          "Teléfono: (+34) 91 879 60 46",
          "Correo electrónico: informacion@idc.es",
          "Correo para asuntos de protección de datos: info@idc.es",
        ],
      },
    ],
  },
  {
    title: "Normativa aplicable",
    blocks: [
      {
        type: "p",
        text: "IDC TECNOLOGÍA S.L. (en adelante, «la Empresa») trata los datos personales de los usuarios de este sitio web de conformidad con el Reglamento (UE) 2016/679, General de Protección de Datos (RGPD), la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), y la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).",
      },
    ],
  },
  {
    title: "Qué datos tratamos y con qué finalidad",
    blocks: [
      { type: "h3", text: "Formulario de contacto y solicitud de presupuesto" },
      {
        type: "ul",
        items: [
          "**Datos:** los que usted facilite en el formulario, como su nombre, empresa, datos de contacto y el contenido de su consulta o solicitud.",
          "**Finalidad:** atender su consulta o elaborar y enviarle el presupuesto solicitado, así como enviarle una confirmación de recepción.",
          "**Base jurídica:** su consentimiento (art. 6.1.a RGPD) y la aplicación de medidas precontractuales adoptadas a petición suya (art. 6.1.b RGPD).",
          "**Conservación:** durante el tiempo necesario para atender su solicitud. Si se inicia una relación comercial, durante la vigencia de esta y, después, durante los plazos legalmente exigibles. En caso contrario, se suprimirán en un plazo máximo de un año desde la última comunicación.",
        ],
      },
      { type: "h3", text: "Candidaturas de empleo" },
      {
        type: "ul",
        items: [
          "**Datos:** los que usted facilite en el formulario de candidatura y en su currículum.",
          "**Finalidad:** gestionar su participación en el proceso de selección de la oferta a la que se inscribe y, salvo que usted se oponga, tenerle en cuenta para futuras vacantes.",
          "**Base jurídica:** su consentimiento al enviar la candidatura (art. 6.1.a RGPD) y la aplicación de medidas precontractuales a petición suya (art. 6.1.b RGPD).",
          "**Conservación:** durante el proceso de selección y hasta un máximo de un año después de su finalización. Transcurrido ese plazo, se suprimirán su candidatura y su currículum. Puede solicitar su supresión en cualquier momento.",
        ],
      },
      {
        type: "p",
        text: "Le rogamos que no incluya en su currículum datos especialmente protegidos, como los relativos a su salud, ideología, religión u origen étnico.",
      },
      { type: "h3", text: "Formulario técnico" },
      {
        type: "ul",
        items: [
          "**Datos:** sus datos de contacto y la información técnica que nos facilite sobre su proyecto.",
          "**Finalidad:** estudiar su necesidad técnica y preparar una propuesta.",
          "**Base jurídica:** la aplicación de medidas precontractuales adoptadas a petición suya (art. 6.1.b RGPD).",
          "**Conservación:** los mismos plazos indicados para el formulario de contacto y solicitud de presupuesto.",
        ],
      },
      { type: "h3", text: "Comunicaciones comerciales y boletín de noticias" },
      {
        type: "p",
        text: "La Empresa solo le enviará comunicaciones comerciales o su boletín de noticias, por correo electrónico u otro medio, si usted lo ha autorizado expresamente mediante una casilla destinada específicamente a ello, o si es cliente de la Empresa y las comunicaciones se refieren a productos o servicios similares a los contratados, conforme al artículo 21.2 de la LSSI-CE.",
      },
      {
        type: "p",
        text: "Estas comunicaciones se referirán a productos y servicios de la Empresa o de los fabricantes y colaboradores con los que trabaja, y serán enviadas siempre por la Empresa: los colaboradores nunca tendrán acceso a sus datos personales.",
      },
      {
        type: "p",
        text: "Puede retirar su consentimiento o darse de baja en cualquier momento mediante el enlace incluido en cada comunicación o escribiendo a info@idc.es. Sus datos se conservarán con esta finalidad hasta que se dé de baja.",
      },
      { type: "h3", text: "Canal del Informante" },
      {
        type: "p",
        text: "Las comunicaciones realizadas a través del Canal del Informante se gestionan mediante una plataforma externa especializada, que dispone de su propia información sobre protección de datos.",
      },
    ],
  },
  {
    title: "Datos obligatorios",
    blocks: [
      {
        type: "p",
        text: "Los campos marcados como obligatorios en cada formulario son necesarios para atender su solicitud; si no se facilitan, la Empresa no podrá tramitarla. Usted garantiza que los datos que facilita son veraces y que, si facilita datos de terceros, cuenta con su autorización.",
      },
    ],
  },
  {
    title: "Destinatarios de los datos",
    blocks: [
      {
        type: "p",
        text: "La Empresa no cederá sus datos personales a terceros, salvo obligación legal. Si en algún momento fuera a realizarse alguna cesión de datos, se le solicitaría previamente su consentimiento expreso, informado e inequívoco.",
      },
      {
        type: "p",
        text: "Para prestar sus servicios, la Empresa cuenta con proveedores de alojamiento web, base de datos y correo electrónico que, como encargados del tratamiento, pueden acceder a los datos únicamente para prestar dichos servicios, bajo contrato y con las garantías exigidas por la normativa.",
      },
      {
        type: "p",
        text: "Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, en particular en Estados Unidos. En esos casos, las transferencias se realizan con las garantías adecuadas previstas en el RGPD, como la decisión de adecuación del Marco de Privacidad de Datos UE-EE. UU. o las cláusulas contractuales tipo aprobadas por la Comisión Europea.",
      },
    ],
  },
  {
    title: "Sus derechos",
    blocks: [
      {
        type: "p",
        text: "Usted puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos, así como retirar el consentimiento prestado, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.",
      },
      {
        type: "p",
        text: "Para ello, puede enviar una solicitud indicando el derecho que desea ejercer a través de los siguientes medios:",
      },
      {
        type: "ul",
        items: [
          "Correo electrónico: info@idc.es",
          "Correo postal: IDC TECNOLOGÍA S.L., C/ Punto Mobi, 10, TecnoAlcalá - Parque Científico UAH, 28805 Alcalá de Henares (Madrid)",
        ],
      },
      {
        type: "p",
        text: "Si fuera necesario para verificar su identidad, la Empresa podrá solicitarle información adicional.",
      },
      {
        type: "p",
        text: "Si considera que sus derechos no han sido debidamente atendidos, puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
      },
    ],
  },
  {
    title: "Seguridad",
    blocks: [
      {
        type: "p",
        text: "La Empresa ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad e integridad de los datos personales que trata, así como para evitar su pérdida, alteración y/o acceso por parte de terceros no autorizados.",
      },
    ],
  },
  {
    title: "Cambios en esta política",
    blocks: [
      {
        type: "p",
        text: "La Empresa podrá actualizar esta Política de privacidad para adaptarla a cambios normativos o en el funcionamiento del sitio web. Le recomendamos revisarla periódicamente.",
      },
      { type: "p", text: "Última actualización: noviembre de 2026." },
    ],
  },
];
