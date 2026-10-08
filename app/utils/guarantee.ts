// Garantías al entrar: textos compartidos por la web y los dossieres.
// Fianza y garantía adicional funcionan como en cualquier alquiler y son del propietario (la fianza se deposita en
// el organismo autonómico). La hucha va SIEMPRE aparte y se llena SIEMPRE mes a mes; el propietario no decide sobre ella.
// LAU art. 36: fianza de un mes en vivienda habitual (dos en temporada) y garantía adicional de hasta dos mensualidades
// en vivienda habitual. Como la hucha está bloqueada a favor del contrato, garantía al firmar + hucha no pueden pasar
// de dos mensualidades; lo que exceda es ahorro del inquilino, no garantía. Art. 17: no exigir más de un mes de renta.
export const GUARANTEE_HEAD = {
  title: 'Fianza y garantías, como siempre. La hucha, además',
  lead: 'Cobras la fianza legal y, si quieres, una garantía adicional al firmar, igual que en cualquier alquiler. La hucha del inquilino va aparte: se llena mes a mes y es un colchón más para ti.',
}

export const GUARANTEE_OPTIONS = [
  {
    title: 'Fianza legal',
    text: 'Obligatoria: un mes en vivienda habitual y dos en alquiler de temporada. Se deposita en el organismo de tu comunidad autónoma, como siempre.',
  },
  {
    title: 'Garantía adicional',
    tag: 'Opcional',
    text: 'Si quieres, pides al firmar hasta dos mensualidades más, en depósito o con aval bancario. Es para ti mientras dure el contrato.',
  },
  {
    title: 'Hucha del inquilino',
    tag: 'Siempre incluida',
    text: 'Se llena mes a mes a nombre del inquilino y cubre los primeros impagos antes que el seguro. Si al terminar no debe nada, la recupera con bonus.',
  },
]

export const GUARANTEE_NOTE_TITLE = 'Dentro de la ley'

export const GUARANTEE_NOTE = 'En vivienda habitual, la garantía adicional (la que pidas al firmar más la hucha) no puede pasar de dos mensualidades: si ya pides las dos al firmar, la hucha sigue llenándose, pero como ahorro del inquilino. En total, fianza y garantías suman como máximo tres mensualidades, y no se puede exigir más de un mes de renta por adelantado.'

export const GUARANTEE_FAQ = {
  owner: {
    q: '¿Puedo pedir fianza y garantía adicional?',
    a: 'Sí, como en cualquier alquiler: la fianza legal (un mes en vivienda habitual) y, si quieres, hasta dos mensualidades de garantía adicional al firmar, en depósito o con aval. Eso es tuyo durante el contrato. La hucha del inquilino va aparte y se llena mes a mes; en vivienda habitual, entre la garantía al firmar y la hucha no se pueden superar las dos mensualidades que permite la ley.',
  },
  tenant: {
    q: '¿Me pueden pedir garantía extra al entrar?',
    a: 'Depende del piso. Siempre pagas el primer mes y la fianza legal. Algunos propietarios piden además una garantía adicional al firmar (hasta dos mensualidades), como en cualquier alquiler; lo verás indicado en cada piso. Tu hucha va aparte: se llena mes a mes y la recuperas con bonus si terminas sin deudas.',
  },
}
