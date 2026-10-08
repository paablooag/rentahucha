// Garantías al entrar: textos compartidos por la web y los dossieres.
// LAU art. 36: fianza legal de un mes obligatoria y garantía adicional de hasta dos mensualidades
// (contratos de vivienda de hasta 5/7 años). Art. 17.2: no se puede exigir más de un mes de renta por adelantado.
export const GUARANTEE_OPTIONS = [
  {
    title: 'Hucha mes a mes',
    tag: 'Recomendada',
    text: 'La garantía adicional se forma cada mes en una hucha a nombre del inquilino. Atrae más candidatos y le da un motivo real para pagar a tiempo.',
  },
  {
    title: 'Garantía al firmar',
    text: 'Si lo prefieres, pides la garantía adicional por adelantado, en depósito o con aval bancario, hasta dos mensualidades.',
  },
  {
    title: 'Una mezcla',
    text: 'Una parte al firmar y el resto en la hucha. Siempre dentro del tope legal de dos mensualidades de garantía adicional.',
  },
]

export const GUARANTEE_NOTE = 'La fianza legal de un mes va aparte y es obligatoria en todos los casos. La ley no permite cobrar más de un mes de renta por adelantado.'

export const GUARANTEE_FAQ = {
  owner: {
    q: '¿Puedo pedir garantía adicional por adelantado?',
    a: 'Sí. Puedes pedir hasta dos mensualidades de garantía adicional al firmar (en depósito o con aval bancario), dejar que se forme en la hucha del inquilino o combinar ambas. La fianza legal de un mes va siempre aparte.',
  },
  tenant: {
    q: '¿Siempre entro pagando solo el primer mes y la fianza?',
    a: 'Depende del piso. Cada propietario elige cómo quiere la garantía: en los pisos con hucha entras con el primer mes y la fianza legal, y en otros pueden pedirte una garantía adicional al firmar (hasta dos mensualidades, como permite la ley). Lo verás indicado en cada piso antes de solicitarlo.',
  },
}
