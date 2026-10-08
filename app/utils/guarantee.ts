// Garantías al entrar: textos compartidos por la web y los dossieres.
// La garantía adicional va SIEMPRE a la hucha del inquilino; el propietario solo elige cuándo se llena.
// LAU art. 36: fianza legal de un mes obligatoria (se deposita en el organismo autonómico, no va a la hucha)
// y garantía adicional de hasta dos mensualidades. Art. 17.2: no más de un mes de renta por adelantado.
export const GUARANTEE_HEAD = {
  title: 'Tú eliges cómo se llena la hucha',
  lead: 'La garantía adicional va siempre a la hucha del inquilino. Lo que decides es si se llena poco a poco o desde el primer día.',
}

export const GUARANTEE_OPTIONS = [
  {
    title: 'Mes a mes',
    tag: 'Recomendada',
    text: 'La hucha empieza vacía y el inquilino aporta un poco cada mes hasta el tope. Entra con menos dinero, así que atrae a más y mejores candidatos.',
  },
  {
    title: 'Llena desde el primer día',
    text: 'El inquilino ingresa al firmar la garantía adicional, hasta dos mensualidades, directamente en su hucha. Tú estás cubierto desde el día 1.',
  },
  {
    title: 'Una parte al firmar',
    text: 'La hucha arranca con una parte de la garantía y el resto se completa mes a mes, hasta el tope de dos mensualidades.',
  },
]

export const GUARANTEE_NOTE = 'Elijas lo que elijas, la garantía adicional está en una cuenta a nombre del inquilino, bloqueada a favor del contrato, y se le devuelve con bonus si cumple. La fianza legal de un mes va aparte, porque por ley se deposita en el organismo de la comunidad autónoma, y no se puede cobrar más de un mes de renta por adelantado.'

export const GUARANTEE_FAQ = {
  owner: {
    q: '¿Puedo pedir la garantía por adelantado?',
    a: 'Sí. Puedes pedir que el inquilino ingrese al firmar hasta dos mensualidades de garantía adicional. Ese dinero va directo a su hucha: a ti te protege igual y para él sigue siendo ahorro que recupera con bonus. La fianza legal de un mes va siempre aparte.',
  },
  tenant: {
    q: '¿Siempre entro pagando solo el primer mes y la fianza?',
    a: 'Depende del piso. En la mayoría la hucha se llena mes a mes y entras con el primer mes y la fianza legal. Algunos propietarios piden que la garantía adicional (hasta dos mensualidades) se ingrese al firmar, pero ese dinero no se pierde: va directo a tu hucha, es tuyo y lo recuperas con bonus al salir. Lo verás indicado en cada piso.',
  },
}
