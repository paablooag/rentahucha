// Demanda real en una ciudad (personas que buscan piso). Por debajo de 5 no se da la cifra, para no presumir de poco.
export default defineCachedEventHandler(async (event) => {
  const city = decodeURIComponent(getRouterParam(event, 'ciudad') ?? '').slice(0, 60)
  const n = city.length >= 2 ? await demandFor(city) : 0
  return { show: n >= 5, n: n >= 5 ? n : null }
}, { maxAge: 600, name: 'demanda', getKey: event => String(getRouterParam(event, 'ciudad') ?? '').toLowerCase() })
