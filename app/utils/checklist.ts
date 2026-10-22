// Checklist para propietarios que van a alquilar su piso (vivienda habitual, LAU).
// Se usa en la página pública /herramientas/checklist-alquilar-piso y en el PDF /dossier/checklist-propietarios.
// Solo hechos generales y estables de la normativa estatal; lo que depende de la comunidad autónoma se dice así.

export interface ChecklistItem { id: string; title: string; text: string }
export interface ChecklistSection { id: string; title: string; when: string; items: ChecklistItem[] }

export const CHECKLIST: ChecklistSection[] = [
  {
    id: 'papeles',
    title: 'Papeles del piso',
    when: 'Antes de anunciarlo',
    items: [
      { id: 'cee', title: 'Certificado de eficiencia energética', text: 'Es obligatorio para alquilar y la etiqueta debe aparecer en el anuncio. Lo hace un técnico habilitado y hay que registrarlo en tu comunidad autónoma.' },
      { id: 'habitabilidad', title: 'Cédula de habitabilidad o licencia de primera ocupación', text: 'Solo en las comunidades que la exigen para alquilar. Comprueba la normativa de la tuya y si la tienes en vigor.' },
      { id: 'zona', title: 'Zona tensionada y tipo de propietario', text: 'Mira si tu municipio está declarado zona de mercado residencial tensionado y si eres gran tenedor: cambian las reglas para fijar la renta.' },
      { id: 'comunidad', title: 'Estatutos de la comunidad e hipoteca', text: 'Revisa que los estatutos no limiten el uso y, si el piso tiene hipoteca, lo que diga la escritura sobre el alquiler.' },
      { id: 'seguro-hogar', title: 'Seguro de hogar al día', text: 'Que cubra continente y responsabilidad civil como arrendador. El seguro de impago es opcional y, si lo quieres, lo contratas tú.' },
    ],
  },
  {
    id: 'piso',
    title: 'El piso, listo para entrar',
    when: 'Antes de las visitas',
    items: [
      { id: 'revision', title: 'Instalaciones revisadas', text: 'Caldera, gas, electricidad, fontanería, persianas y cerraduras. Lo que falle el primer mes será tu primera incidencia.' },
      { id: 'reparaciones', title: 'Pequeñas reparaciones hechas', text: 'Pintura, juntas, grifos que gotean y enchufes. Un piso cuidado atrae a inquilinos que cuidan.' },
      { id: 'fotos', title: 'Fotos con buena luz', text: 'Horizontales, de día y con el piso recogido. Incluye plano si lo tienes.' },
      { id: 'renta', title: 'Renta fijada con datos', text: 'Compara anuncios parecidos en tu barrio y consulta el sistema estatal de índices de precios de alquiler. Un precio realista atrae mejores candidatos.' },
      { id: 'suministros', title: 'Suministros decididos', text: 'Decide si los cambiará de titular el inquilino o siguen a tu nombre y cómo se repercuten. Déjalo por escrito.' },
    ],
  },
  {
    id: 'inquilino',
    title: 'Elegir inquilino',
    when: 'Durante las visitas',
    items: [
      { id: 'ingresos', title: 'Ingresos acreditados', text: 'Nóminas, contrato, vida laboral o declaración de la renta. Como referencia prudente, que la renta no supere el 30-35 % de los ingresos netos.' },
      { id: 'identidad', title: 'Identidad comprobada', text: 'DNI o NIE de todos los que firmen. Pide los documentos con su consentimiento y guárdalos solo lo necesario.' },
      { id: 'referencias', title: 'Referencias anteriores', text: 'Si viene de otro alquiler, pregunta (con su permiso) al casero anterior.' },
      { id: 'trato', title: 'Mismo trato para todos', text: 'Decide con criterios objetivos y ajenos a origen, sexo, religión o si tiene hijos. La discriminación está prohibida.' },
    ],
  },
  {
    id: 'contrato',
    title: 'El contrato',
    when: 'Al firmar',
    items: [
      { id: 'escrito', title: 'Contrato por escrito y conforme a la LAU', text: 'Partes, piso, renta, forma de pago, duración, gastos y anexos. Firmado por todos los inquilinos.' },
      { id: 'duracion', title: 'Duración y prórrogas claras', text: 'El inquilino puede prorrogar hasta 5 años (7 si el arrendador es empresa) y luego hay prórroga tácita de hasta 3 años más. Si podrías necesitar el piso para ti o un familiar, ponlo expresamente en el contrato.' },
      { id: 'fianza', title: 'Fianza de una mensualidad', text: 'Es obligatoria en vivienda habitual. En la mayoría de comunidades hay que depositarla en el organismo autonómico en un plazo: compruébalo.' },
      { id: 'garantia', title: 'Garantía adicional con tope', text: 'Además de la fianza, como máximo dos mensualidades en contratos de hasta 5 o 7 años (una en temporada). No puedes exigir al inquilino un seguro de impago.' },
      { id: 'honorarios', title: 'Honorarios de agencia, a cargo del propietario', text: 'Los gastos de gestión y formalización no se pueden cobrar al inquilino. Con el decreto de octubre de 2026, en los contratos nuevos tampoco el IBI.' },
      { id: 'actualizacion', title: 'Actualización de la renta pactada', text: 'Solo se actualiza si el contrato lo dice. Para contratos desde mayo de 2023, el límite es el índice que publica el INE.' },
      { id: 'inventario', title: 'Inventario con fotos firmado', text: 'Estado de cada estancia y de los muebles, con fecha. Es tu mejor prueba al terminar el contrato.' },
    ],
  },
  {
    id: 'durante',
    title: 'Durante el alquiler',
    when: 'Cada mes y cada año',
    items: [
      { id: 'cobro', title: 'Cobro por transferencia o domiciliación', text: 'Deja rastro de cada pago. Si falla, habla pronto: muchos retrasos son baches puntuales.' },
      { id: 'reparar', title: 'Reparaciones necesarias, a tu cargo', text: 'Las de conservación son del propietario; las pequeñas por el uso diario, del inquilino. Atiende rápido: evita que crezcan.' },
      { id: 'impago', title: 'Si hay impago, por la vía legal', text: 'Requerimiento fehaciente, intento de acuerdo y demanda. Nunca cambies la cerradura ni cortes suministros.' },
      { id: 'irpf', title: 'Declara las rentas en el IRPF', text: 'Puedes deducir IBI, comunidad, seguro, intereses, reparaciones y amortización. La reducción va del 50 % al 90 % en contratos de mayo de 2023 al 1-12-2026 y del 15 % al 100 % en los posteriores (si se convalida el decreto de octubre).' },
    ],
  },
  {
    id: 'final',
    title: 'Al terminar',
    when: 'Fin del contrato',
    items: [
      { id: 'preaviso', title: 'Preavisos', text: 'El inquilino puede irse a partir de los 6 meses avisando con 30 días. Para no renovar al final de las prórrogas, tú debes avisar con 4 meses (él, con 2).' },
      { id: 'revision-final', title: 'Documento de finalización firmado', text: 'Comparad el piso con el inventario inicial y firmad el documento de finalización con su estado (obligatorio desde octubre de 2026): si no se firma o no recoge desperfectos, se presume que se entregó bien. El desgaste normal no es un desperfecto.' },
      { id: 'devolucion', title: 'Devolución de la fianza', text: 'Tienes un mes desde la entrega de llaves; después genera intereses. Descuenta solo lo justificado.' },
    ],
  },
]

export const CHECKLIST_TOTAL = CHECKLIST.reduce((n, s) => n + s.items.length, 0)
