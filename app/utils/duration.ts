// Duración del alquiler: textos compartidos por la web y los dossieres.
// Basado en la LAU (arts. 3, 9 y 11); revisar con el abogado si cambia la normativa.
export const DURATION_OPTIONS = [
  {
    title: 'Vivienda habitual',
    text: 'Contrato anual que el inquilino puede renovar hasta 5 años (7 si el propietario es una empresa). Él puede irse a partir del sexto mes avisando con 30 días.',
  },
  {
    title: '¿Vas a necesitar el piso?',
    text: 'Si lo vas a necesitar para ti o un familiar directo, se deja indicado en el contrato desde el principio y puedes recuperarlo a partir del primer año, avisando con dos meses.',
  },
  {
    title: 'Alquiler de temporada',
    text: 'Si el inquilino viene por estudios, trabajo u otro motivo temporal, alquilas por meses o por un año. El motivo tiene que ser real y constar en el contrato.',
  },
]

export const DURATION_FAQ = {
  owner: {
    q: '¿Puedo alquilar solo durante un año?',
    a: 'Sí, con el contrato adecuado. Si el inquilino viene por estudios, trabajo u otro motivo temporal, se firma un alquiler de temporada con la duración que pactéis. Si es su vivienda habitual, puede renovar hasta 5 años, salvo que dejes indicado en el contrato que vas a necesitar el piso para ti o un familiar directo. Te ayudamos a elegir la fórmula correcta.',
  },
  tenant: {
    q: '¿Y si solo necesito el piso unos meses?',
    a: 'También hay pisos en alquiler de temporada para estancias por estudios o trabajo, con la duración que acordéis. Y en un contrato de vivienda habitual puedes irte a partir del sexto mes avisando con 30 días.',
  },
}
