<script setup lang="ts">
const title = 'Generador de anuncios de alquiler gratis: título y descripción en 1 minuto'
const description = 'Crea el anuncio de alquiler de tu piso en un minuto: título y descripción claros, con lo que buscan los inquilinos y lo que exige la ley (etiqueta energética). Gratis y sin registro.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/propietarios.png' })

const HIGHLIGHTS = ['Muy luminoso', 'Reformado', 'Silencioso', 'Cocina equipada', 'Armarios empotrados', 'Vistas', 'Junto al metro o transporte', 'Cerca de colegios', 'Zona de servicios y comercios', 'Ideal para teletrabajar']

const f = reactive({
  propertyType: 'Piso', city: '', district: '', sizeM2: null as number | null, bedrooms: 2, bathrooms: 1, floor: '',
  furnished: 'Amueblado', features: [] as string[], highlights: [] as string[], transport: '', rent: null as number | null,
  expensesIncl: false, energyRating: '', stayType: PROPERTY_OPTIONS.stayType[0] as string, availableFrom: '', extra: '',
})

const join = (items: string[]) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} y ${items.at(-1)}`)
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)
const rooms = computed(() => (f.bedrooms === 0 ? 'estudio' : `${f.bedrooms} ${f.bedrooms === 1 ? 'habitación' : 'habitaciones'}`))
const where = computed(() => [f.district, f.city].filter(Boolean).join(', '))

const adTitle = computed(() => {
  const adj = f.highlights.includes('Muy luminoso') ? ' luminoso' : f.highlights.includes('Reformado') ? ' reformado' : ''
  const type = f.propertyType === 'Estudio o loft' ? 'Estudio' : f.propertyType
  const extra = f.features.includes('Terraza o balcón') ? ' con terraza' : f.features.includes('Garaje') ? ' con garaje' : ''
  const base = f.bedrooms === 0 || type === 'Estudio' ? `${type}${adj}${extra}` : `${type}${adj} de ${rooms.value}${extra}`
  return `${base}${f.district ? ` en ${f.district}` : f.city ? ` en ${f.city}` : ''}`.slice(0, 90)
})

const adText = computed(() => {
  const p: string[] = []
  const type = f.propertyType === 'Estudio o loft' ? 'estudio' : f.propertyType.toLowerCase()
  const size = f.sizeM2 ? ` de ${f.sizeM2} m²` : ''
  const intro = `Se alquila ${type}${size}${f.bedrooms ? ` con ${rooms.value}` : ''} y ${f.bathrooms} ${f.bathrooms === 1 ? 'baño' : 'baños'}${where.value ? ` en ${where.value}` : ''}${f.floor ? `, ${f.floor}` : ''}.`
  p.push(intro)
  const adjectives = f.highlights.filter(h => ['Muy luminoso', 'Reformado', 'Silencioso'].includes(h))
  const things = f.highlights.filter(h => ['Cocina equipada', 'Armarios empotrados', 'Vistas'].includes(h))
  if (adjectives.length) p.push(`Es ${join(adjectives.map(lower))}.`)
  if (things.length) p.push(`Tiene ${join(things.map(lower))}.`)
  if (f.highlights.includes('Ideal para teletrabajar')) p.push('Ideal para teletrabajar.')
  const furn = f.furnished === 'Amueblado' ? 'Se alquila amueblado' : f.furnished === 'Sin amueblar' ? 'Se alquila sin amueblar' : 'Se alquila parcialmente amueblado'
  p.push(`${furn}${f.features.length ? ` y cuenta con ${join(f.features.map(lower))}` : ''}.`)
  const area: string[] = []
  if (f.highlights.includes('Junto al metro o transporte')) area.push(f.transport ? `transporte público (${f.transport})` : 'transporte público')
  if (f.highlights.includes('Zona de servicios y comercios')) area.push('comercios y servicios')
  if (f.highlights.includes('Cerca de colegios')) area.push('colegios')
  if (area.length) p.push(`Muy cerca tienes ${join(area)}.`)
  else if (f.transport) p.push(`Transporte cercano: ${f.transport}.`)
  if (f.extra.trim()) p.push(f.extra.trim().replace(/([^.!?])$/, '$1.'))
  const cond: string[] = []
  if (f.rent) cond.push(`Renta: ${formatEuro(f.rent)} al mes${f.expensesIncl ? ', gastos de comunidad incluidos' : ''}.`)
  cond.push(f.stayType.startsWith('Temporada') ? 'Alquiler de temporada.' : 'Alquiler de larga duración como vivienda habitual.')
  if (f.availableFrom) cond.push(`Disponible a partir del ${new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' }).format(new Date(`${f.availableFrom}T12:00:00`))}.`)
  cond.push(`Calificación energética: ${f.energyRating || '[indica la letra]'}.`)
  p.push(cond.join(' '))
  p.push('Buscamos inquilinos con ingresos estables que cuiden la vivienda. Escríbenos para concertar una visita.')
  return p.join('\n\n')
})

const touched = computed(() => !!(f.city || f.district || f.sizeM2))
const copied = ref(false)
async function copy() {
  await navigator.clipboard.writeText(`${adTitle.value}\n\n${adText.value}`)
  copied.value = true
  trackEvent('anuncio_generado')
  setTimeout(() => (copied.value = false), 2000)
}

const { user } = useAccount()
// Publicar gratis: se guarda un borrador en este navegador y el formulario del anuncio lo recoge.
function publish() {
  const energy = (PROPERTY_OPTIONS.energyRating as readonly string[]).includes(f.energyRating) ? f.energyRating : ''
  try {
    localStorage.setItem('rh-draft-anuncio', JSON.stringify({
      title: adTitle.value, city: f.city, district: f.district, propertyType: f.propertyType, sizeM2: f.sizeM2, bedrooms: f.bedrooms,
      bathrooms: f.bathrooms, floor: f.floor, furnished: f.furnished,
      features: f.features.filter(x => (PROPERTY_OPTIONS.features as readonly string[]).includes(x)), energyRating: energy,
      stayType: f.stayType, availableFrom: f.availableFrom || null, rent: f.rent ?? NaN, expensesIncl: f.expensesIncl, description: adText.value,
    }))
  }
  catch {}
  trackEvent('anuncio_generado')
  navigateTo(user.value?.role === 'propietario' ? '/mi-cuenta/pisos/nuevo' : { path: '/cuenta/registro', query: { tipo: 'propietario', next: '/mi-cuenta/pisos/nuevo' } })
}
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Herramienta gratis para propietarios</span>
          <h1>Generador de anuncios de alquiler</h1>
          <p class="lead">Marca cómo es tu piso y te escribimos el título y la descripción del anuncio. Cópialo donde quieras o publícalo gratis en RentaHucha.</p>
        </div>

        <div class="layout">
          <form class="card form" @submit.prevent>
            <div class="grid2">
              <div class="field"><label for="g-type">Tipo</label><select id="g-type" v-model="f.propertyType" class="select"><option v-for="o in PROPERTY_OPTIONS.propertyType" :key="o">{{ o }}</option></select></div>
              <div class="field"><label for="g-size">Superficie</label><div class="input-group"><input id="g-size" v-model.number="f.sizeM2" class="input" type="number" min="10" inputmode="numeric"><span class="suffix">m²</span></div></div>
              <div class="field"><label for="g-city">Ciudad</label><input id="g-city" v-model="f.city" class="input" placeholder="Valencia"></div>
              <div class="field"><label for="g-dis">Barrio</label><input id="g-dis" v-model="f.district" class="input" placeholder="Ruzafa"></div>
              <div class="field"><label for="g-bed">Habitaciones</label><input id="g-bed" v-model.number="f.bedrooms" class="input" type="number" min="0" max="20"></div>
              <div class="field"><label for="g-bath">Baños</label><input id="g-bath" v-model.number="f.bathrooms" class="input" type="number" min="1" max="10"></div>
              <div class="field"><label for="g-floor">Planta</label><input id="g-floor" v-model="f.floor" class="input" placeholder="3.º exterior con ascensor"></div>
              <div class="field"><label for="g-furn">Mobiliario</label><select id="g-furn" v-model="f.furnished" class="select"><option v-for="o in PROPERTY_OPTIONS.furnished" :key="o">{{ o }}</option></select></div>
              <div class="field full"><span class="label">Lo mejor del piso</span>
                <div class="chips"><label v-for="h in HIGHLIGHTS" :key="h" class="chip" :class="{ on: f.highlights.includes(h) }"><input v-model="f.highlights" type="checkbox" :value="h"> {{ h }}</label></div>
              </div>
              <div class="field full"><span class="label">Extras</span>
                <div class="chips"><label v-for="x in PROPERTY_OPTIONS.features" :key="x" class="chip" :class="{ on: f.features.includes(x) }"><input v-model="f.features" type="checkbox" :value="x"> {{ x }}</label></div>
              </div>
              <div v-if="f.highlights.includes('Junto al metro o transporte')" class="field full"><label for="g-tr">Transporte cercano</label><input id="g-tr" v-model="f.transport" class="input" placeholder="metro Colón a 3 minutos"></div>
              <div class="field"><label for="g-rent">Renta mensual <span class="muted small">(opcional)</span></label><div class="input-group"><input id="g-rent" v-model.number="f.rent" class="input" type="number" min="100" inputmode="numeric"><span class="suffix">€</span></div></div>
              <div class="field"><label for="g-energy">Calificación energética</label><select id="g-energy" v-model="f.energyRating" class="select"><option value="">Elige…</option><option v-for="o in PROPERTY_OPTIONS.energyRating" :key="o">{{ o }}</option></select></div>
              <div class="field"><label for="g-stay">Tipo de alquiler</label><select id="g-stay" v-model="f.stayType" class="select"><option v-for="o in PROPERTY_OPTIONS.stayType" :key="o">{{ o }}</option></select></div>
              <div class="field"><label for="g-av">Disponible desde</label><input id="g-av" v-model="f.availableFrom" class="input" type="date"></div>
              <div class="field full"><label for="g-extra">Algo más <span class="muted small">(opcional)</span></label><textarea id="g-extra" v-model="f.extra" class="input" rows="2" maxlength="400" placeholder="Orientación sur, comunidad tranquila, parking fácil…" /></div>
            </div>
          </form>

          <div class="preview">
            <div class="card card-shadow ad">
              <span class="eyebrow">Tu anuncio</span>
              <h2>{{ adTitle }}</h2>
              <p class="text">{{ adText }}</p>
              <p v-if="!f.energyRating" class="warn small">La calificación energética es obligatoria en los anuncios de alquiler.</p>
              <div class="row">
                <button type="button" class="btn btn-ghost btn-sm" :disabled="!touched" @click="copy">{{ copied ? '¡Copiado!' : 'Copiar texto' }}</button>
                <button type="button" class="btn btn-primary btn-sm" :disabled="!touched" @click="publish">Publicarlo gratis en RentaHucha →</button>
              </div>
              <p class="tiny muted">Al publicar, el anuncio se rellena solo con estos datos: solo te faltarán las fotos. Lo revisamos antes de publicarlo.</p>
            </div>
            <div class="note note-green tips">
              <strong>Consejos para que funcione</strong>
              <ul class="small">
                <li>Fotos horizontales, con luz de día y el piso recogido. La primera es la que más se mira.</li>
                <li>Pon el precio en el anuncio: los que no lo ponen reciben mensajes de gente que no encaja.</li>
                <li>Describe el perfil con criterios objetivos (ingresos estables, estancia larga), nunca por origen, sexo o si tiene hijos.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
.layout { display: grid; gap: 24px; }
@media (min-width: 1000px) { .layout { grid-template-columns: 1.1fr 1fr; align-items: start; } .preview { position: sticky; top: 96px; } }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid2 > * { min-width: 0; }
.full { grid-column: 1 / -1; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { position: relative; padding: 7px 12px; border: 1px solid var(--line); border-radius: 999px; cursor: pointer; font-size: 0.86rem; }
.chip.on { background: var(--lime-soft); border-color: var(--green); }
.chip input { position: absolute; opacity: 0; pointer-events: none; }
.preview { display: grid; gap: 14px; }
.ad { display: grid; gap: 10px; }
.ad h2 { font-size: 1.4rem; margin: 0; }
.text { white-space: pre-line; margin: 0; }
.warn { margin: 0; color: #8a5a00; background: #fff3cd; padding: 6px 10px; border-radius: 8px; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
.tiny { font-size: 0.78rem; margin: 0; }
.tips ul { margin: 6px 0 0; padding-left: 18px; display: grid; gap: 4px; }
@media (max-width: 560px) { .grid2 { grid-template-columns: 1fr; } }
</style>
