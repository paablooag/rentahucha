// «¿Qué cambia en mi contrato?»: qué medidas del Real Decreto-ley 29/2026 se aplican a un contrato concreto.
// Texto comprobado en el BOE el 22-10-2026 (pendiente de convalidación). Cada resultado enlaza a su explicación.

export interface DecretoInput {
  /** Fecha de firma del contrato (AAAA-MM-DD) o vacío si aún no se ha firmado. */
  signedOn: string
  kind: 'habitual' | 'temporada' | 'habitacion'
  tensionZone: boolean
  /** Fecha en que termina el periodo obligatorio (5 o 7 años) o la prórroga tácita (AAAA-MM-DD), si se conoce. */
  termEnds: string
  /** El contrato prevé actualizar la renta. */
  hasUpdateClause: boolean
  /** La renta supera el límite máximo del índice de referencia. */
  aboveIndex: 'si' | 'no' | 'nose'
  bigHolder: boolean
}

export interface DecretoItem { tone: 'ok' | 'warn' | 'info'; title: string; text: string; link?: { to: string; label: string } }

const DECREE = '2026-10-08'
const IRPF_CUT = '2026-12-01'

export function decretoChecks(i: DecretoInput): DecretoItem[] {
  const out: DecretoItem[] = []
  const signed = i.signedOn || '9999-12-31'
  const newContract = signed >= DECREE
  const temporal = i.kind === 'temporada'

  // Subida de la renta (disposición final sexta y art. 18.1 LAU)
  if (!i.hasUpdateClause && !temporal) {
    out.push({ tone: 'info', title: 'La renta no se actualiza', text: 'Si el contrato no prevé actualizar la renta, no se actualiza (artículo 18.1 de la LAU).', link: { to: '/herramientas/subida-alquiler-irav', label: 'IRAV y subida' } })
  }
  else if (i.aboveIndex === 'si') {
    out.push({ tone: 'warn', title: 'Sin subida hasta finales de 2027', text: 'Si la renta supera el límite del índice de referencia, en las actualizaciones hasta el 31-12-2027 no procede ninguna subida.', link: { to: '/herramientas/subida-alquiler-irav', label: 'IRAV y subida' } })
  }
  else {
    out.push({ tone: 'info', title: 'Subida máxima del 2 % hasta finales de 2027', text: `Sin un nuevo acuerdo, la actualización no puede pasar del 2 % (ni de la variación del IRAV)${i.aboveIndex === 'nose' ? '; y sería del 0 % si la renta supera el índice de referencia' : ''}.`, link: { to: '/herramientas/subida-alquiler-irav', label: 'Calcula la subida' } })
  }

  // Prórroga extraordinaria (disposición final quinta): contratos de vivienda habitual vigentes el 8-10-2026
  if (!temporal && i.signedOn && i.signedOn < DECREE) {
    if (!i.termEnds) {
      out.push({ tone: 'info', title: 'Prórroga extraordinaria: indica la fecha', text: 'Se aplica si el periodo obligatorio (5 o 7 años) o la prórroga tácita termina antes del 31-12-2028. Indica esa fecha para saberlo.', link: { to: '/blog/prorroga-extraordinaria-alquiler-2026-quien-puede-pedirla', label: 'Requisitos' } })
    }
    else if (i.termEnds < '2028-12-31') {
      out.push({ tone: 'warn', title: 'El inquilino puede pedir la prórroga extraordinaria', text: 'Su periodo obligatorio o la prórroga tácita termina antes del 31-12-2028: si lleva ocho meses al día y la pide, puede quedarse hasta dos años más en las mismas condiciones, salvo excepciones (nuevo contrato con renta al menos un 5 % más baja, necesidad de la vivienda para ti o un familiar…).', link: { to: '/blog/prorroga-extraordinaria-cuando-puede-negarse-el-propietario', label: 'Cuándo puedes negarte' } })
    }
    else {
      out.push({ tone: 'ok', title: 'Sin prórroga extraordinaria', text: 'El periodo obligatorio o la prórroga tácita termina después del 31-12-2028, así que no se aplica.' })
    }
  }

  // Temporada
  if (temporal) {
    out.push(newContract
      ? { tone: 'warn', title: 'Vivienda temporal: causa escrita y probada', text: 'La causa debe constar en el contrato y probarla el propietario; más de 31 días y en general hasta 12 meses; garantía adicional de una mensualidad como máximo; el inquilino puede irse tras un mes avisando con 10 días. Sin causa, es vivienda habitual desde la firma.', link: { to: '/blog/alquiler-de-temporada-nuevas-reglas-12-meses', label: 'Las reglas' } }
      : { tone: 'info', title: 'Contrato de temporada anterior al decreto', text: 'Sigue con su régimen hasta que termine y no se puede prorrogar; si se renueva, pasa a las reglas de la vivienda temporal.', link: { to: '/blog/alquiler-de-temporada-nuevas-reglas-12-meses', label: 'Las reglas' } })
  }
  if (i.kind === 'habitacion') {
    out.push({ tone: 'info', title: 'Habitación: alquiler de vivienda', text: 'Alquilar una habitación es arrendamiento de vivienda (habitual o temporal) y la suma de las habitaciones no puede superar la renta del piso completo.', link: { to: '/blog/alquiler-por-habitaciones-nuevo-limite', label: 'Habitaciones' } })
  }

  // Gastos, tributos y garantías (contratos nuevos)
  if (newContract) {
    out.push({ tone: 'warn', title: 'El IBI no se puede repercutir al inquilino', text: 'En los contratos nuevos, los tributos de la vivienda no pueden imponerse al inquilino, y los gastos de gestión y formalización tampoco se le pueden cobrar. La comunidad sí puede pactarse por escrito con su importe anual.', link: { to: '/blog/ibi-comunidad-y-suministros-quien-los-paga', label: 'Quién paga qué' } })
    out.push({ tone: 'warn', title: 'Sin indemnización por desistimiento', text: temporal ? 'En la vivienda temporal el inquilino puede irse tras un mes avisando con 10 días, sin indemnización.' : 'Si el inquilino se va pasados seis meses avisando con 30 días, no hay indemnización para el propietario.', link: { to: '/blog/inquilino-quiere-irse-antes-indemnizacion', label: 'Desistimiento' } })
    out.push({ tone: 'info', title: 'Garantías y seguro', text: `Garantía adicional de como máximo ${temporal ? 'una mensualidad' : 'dos mensualidades'}, y no se puede exigir al inquilino un seguro de impago.`, link: { to: '/blog/fianza-garantia-adicional-y-aval-que-puedes-pedir', label: 'Garantías' } })
  }
  else if (i.signedOn) {
    out.push({ tone: 'info', title: 'Gastos y desistimiento de tu contrato', text: 'Tu contrato es anterior al 8-10-2026: en general, lo pactado entonces sobre el IBI o la indemnización por desistimiento sigue valiendo. Los gastos de gestión ya no podían cobrarse al inquilino desde la Ley 12/2023.' })
  }

  // IRPF (contratos de vivienda habitual)
  if (!temporal) {
    if (!i.signedOn || i.signedOn > IRPF_CUT) {
      out.push(i.bigHolder
        ? { tone: 'warn', title: 'IRPF: sin reducciones por bajar la renta', text: 'Para grandes tenedores, en los contratos posteriores al 1-12-2026 solo se prevén las reducciones del alquiler social (70 %) y de vivienda rehabilitada (60 %).', link: { to: '/herramientas/reduccion-irpf-alquiler', label: 'Calculadora' } }
        : { tone: 'ok', title: 'IRPF: reducción del 15 % al 100 %', text: `En los contratos posteriores al 1-12-2026, la reducción depende de si bajas, mantienes o subes la renta${i.tensionZone ? ' (en zona tensionada, hasta el 90-95 % al bajarla más de un 5 %)' : ''}, y llega al 100 % por debajo del índice de referencia.`, link: { to: '/herramientas/reduccion-irpf-alquiler', label: 'Calcula tu reducción' } })
    }
    else {
      out.push({ tone: 'info', title: 'IRPF: se mantiene tu régimen', text: signed < '2023-05-26' ? 'Tu contrato es anterior al 26-5-2023: reducción del 60 %.' : 'Tu contrato es de entre el 26-5-2023 y el 1-12-2026: régimen de la Ley 12/2023 (del 50 % al 90 %).', link: { to: '/herramientas/reduccion-irpf-alquiler', label: 'Calculadora' } })
    }
  }

  // Anuncio, fin del contrato y reparaciones (para todos)
  out.push({ tone: 'info', title: 'Si anuncias el piso', text: i.tensionZone ? 'Al ser zona tensionada, el anuncio debe indicar el índice de referencia y el límite de renta, además del número de registro y si eres gran tenedor cuando proceda.' : 'El anuncio debe ser veraz e indicar, cuando proceda, el número de registro y si eres gran tenedor.', link: { to: '/blog/que-debe-incluir-un-anuncio-de-alquiler-decreto-29-2026', label: 'Qué debe incluir' } })
  out.push({ tone: 'info', title: 'Reparaciones: 15 días para responder', text: temporal ? 'En la vivienda temporal también las pequeñas reparaciones son del propietario, que debe responder en 5 días hábiles.' : 'Si hay daños de habitabilidad, el inquilino puede pedir la reparación con un presupuesto; si no respondes en 15 días, puede hacerla y descontarla de la renta.', link: { to: '/blog/reparaciones-quien-paga-propietario-o-inquilino', label: 'Reparaciones' } })
  out.push({ tone: 'info', title: 'Al terminar: documento de finalización', text: 'Firmad un documento con el estado de la vivienda; si no se firma, se presume que se entregó bien.', link: { to: '/blog/documento-finalizacion-contrato-alquiler-plantilla', label: 'Plantilla' } })
  return out
}
