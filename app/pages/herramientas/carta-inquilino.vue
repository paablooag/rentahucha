<script setup lang="ts">
const title = 'Carta de presentación para alquilar piso: generador gratis'
const description = 'Escribe en un minuto la carta de presentación para el propietario: quién eres, tu trabajo, con quién vivirás y por qué serás buen inquilino. Gratis, para copiar y enviar.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description })

const f = reactive({
  name: '', job: '', employment: '', seniority: '', income: '', household: '', people: '', pets: 'No', reason: '', stay: '', moveDate: '', references: false, extra: '',
})
const plural = computed(() => !!f.household && f.household !== 'Solo/a')
const joinPets = computed(() => {
  const pet = f.pets === 'Perro' ? 'un perro' : f.pets === 'Gato' ? 'un gato' : 'una mascota'
  if (f.pets === 'No') return plural.value ? 'No tenemos mascotas.' : 'No tengo mascotas.'
  return `${plural.value ? 'Tenemos' : 'Tengo'} ${pet} tranquilo y acostumbrado a vivir en piso.`
})

const letter = computed(() => {
  const p: string[] = []
  p.push(`Hola, me llamo ${f.name || '[tu nombre]'} y me interesa mucho el piso.`)
  const work: string[] = []
  if (f.job) work.push(`Trabajo como ${f.job.trim()}`)
  if (f.employment) work.push(work.length ? `con ${f.employment.toLowerCase()}` : `Tengo ${f.employment.toLowerCase()}`)
  if (f.seniority) work.push(`desde hace ${f.seniority.trim()}`)
  if (work.length) p.push(`${work.join(' ')}.`)
  if (f.income) p.push(`Los ingresos netos del hogar están en el tramo de ${f.income} al mes, y puedo acreditarlos con nóminas o la declaración de la renta.`)
  const home: string[] = []
  if (f.household === 'Solo/a') home.push('Viviría solo/a')
  else if (f.household === 'En pareja') home.push('Viviríamos mi pareja y yo')
  else if (f.household === 'Familia con hijos') home.push(`Somos una familia${f.people ? ` de ${f.people}` : ''}`)
  else if (f.household === 'Compartiendo piso') home.push(`Seríamos ${f.people || 'varias'} personas compartiendo`)
  if (home.length) p.push(`${home.join('')}. ${joinPets.value}`)
  if (f.reason) p.push(`${plural.value ? 'Nos mudamos' : 'Me mudo'} porque ${f.reason.trim().replace(/^porque\s+/i, '').replace(/[.]$/, '')}.`)
  const plan: string[] = []
  if (f.stay) plan.push(`${plural.value ? 'Buscamos' : 'Busco'} una vivienda para ${f.stay === 'Menos de 1 año' ? 'menos de un año' : f.stay === '1–3 años' ? 'entre uno y tres años' : 'más de tres años'}`)
  if (f.moveDate) plan.push(`${plan.length ? 'y ' : ''}${plural.value ? 'podríamos' : 'podría'} entrar a partir del ${new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' }).format(new Date(`${f.moveDate}T12:00:00`))}`)
  if (plan.length) { const t = plan.join(' '); p.push(`${t.charAt(0).toUpperCase()}${t.slice(1)}.`) }
  p.push(`${plural.value ? 'Somos' : 'Soy'} ${plural.value ? 'personas ordenadas y cuidadosas' : 'una persona ordenada y cuidadosa'}, ${plural.value ? 'pagamos' : 'pago'} siempre a tiempo y ${plural.value ? 'cuidaremos' : 'cuidaré'} la casa como si fuera ${plural.value ? 'nuestra' : 'mía'}.${f.references ? ` ${plural.value ? 'Podemos darte el contacto de nuestro casero anterior' : 'Puedo darte el contacto de mi casero anterior'} como referencia.` : ''}`)
  if (f.extra.trim()) p.push(f.extra.trim().replace(/([^.!?])$/, '$1.'))
  p.push('¿Te vendría bien que lo visitáramos esta semana? Muchas gracias.')
  return p.join('\n\n')
})

const copied = ref(false)
async function copy() {
  await navigator.clipboard.writeText(letter.value)
  copied.value = true
  trackEvent('carta_generada')
  setTimeout(() => (copied.value = false), 2000)
}

// Crear perfil: se guarda un borrador del perfil de inquilino que la página «Mi perfil» recoge.
const { user } = useAccount()
function createProfile() {
  try {
    localStorage.setItem('rh-draft-perfil', JSON.stringify({
      employment: (TENANT_OPTIONS.employment as readonly string[]).includes(f.employment) ? f.employment : '',
      income: f.income, household: f.household, people: f.people, pets: f.pets, moveDate: f.moveDate || null,
      stay: f.stay, about: letter.value.slice(0, 1000),
    }))
  }
  catch {}
  trackEvent('carta_generada')
  navigateTo(user.value?.role === 'inquilino' ? '/mi-cuenta/perfil' : { path: '/cuenta/registro', query: { tipo: 'inquilino', next: '/mi-cuenta/perfil' } })
}
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Herramienta gratis para inquilinos</span>
          <h1>Carta de presentación para alquilar piso</h1>
          <p class="lead">Con tantos candidatos por piso, el primer mensaje cuenta. Rellena lo básico y te escribimos una presentación clara para el propietario.</p>
        </div>

        <div class="layout">
          <form class="card form" @submit.prevent>
            <div class="grid2">
              <div class="field"><label for="c-name">Tu nombre</label><input id="c-name" v-model="f.name" class="input" autocomplete="given-name"></div>
              <div class="field"><label for="c-job">Profesión</label><input id="c-job" v-model="f.job" class="input" placeholder="enfermera en el Hospital Clínico"></div>
              <div class="field"><label for="c-emp">Situación laboral</label><select id="c-emp" v-model="f.employment" class="select"><option value="">—</option><option v-for="o in TENANT_OPTIONS.employment" :key="o">{{ o }}</option></select></div>
              <div class="field"><label for="c-sen">Antigüedad</label><input id="c-sen" v-model="f.seniority" class="input" placeholder="4 años"></div>
              <div class="field"><label for="c-inc">Ingresos netos del hogar <span class="muted small">(opcional)</span></label><select id="c-inc" v-model="f.income" class="select"><option value="">Prefiero no decirlo</option><option v-for="o in TENANT_OPTIONS.income" :key="o">{{ o }}</option></select></div>
              <div class="field"><label for="c-house">Con quién vivirás</label><select id="c-house" v-model="f.household" class="select"><option value="">—</option><option v-for="o in TENANT_OPTIONS.household" :key="o">{{ o }}</option></select></div>
              <div v-if="f.household === 'Familia con hijos' || f.household === 'Compartiendo piso'" class="field"><label for="c-people">Cuántas personas</label><select id="c-people" v-model="f.people" class="select"><option value="">—</option><option v-for="o in TENANT_OPTIONS.people" :key="o">{{ o }}</option></select></div>
              <div class="field"><label for="c-pets">Mascotas</label><select id="c-pets" v-model="f.pets" class="select"><option v-for="o in TENANT_OPTIONS.pets" :key="o">{{ o }}</option></select></div>
              <div class="field full"><label for="c-reason">Por qué te mudas</label><input id="c-reason" v-model="f.reason" class="input" placeholder="empiezo un trabajo nuevo en la ciudad"></div>
              <div class="field"><label for="c-stay">Cuánto tiempo</label><select id="c-stay" v-model="f.stay" class="select"><option value="">—</option><option v-for="o in TENANT_OPTIONS.stay" :key="o">{{ o }}</option></select></div>
              <div class="field"><label for="c-move">Desde cuándo</label><input id="c-move" v-model="f.moveDate" class="input" type="date"></div>
              <label class="check full"><input v-model="f.references" type="checkbox"> Puedo dar referencias de mi casero anterior</label>
              <div class="field full"><label for="c-extra">Algo más <span class="muted small">(opcional)</span></label><textarea id="c-extra" v-model="f.extra" class="input" rows="2" maxlength="400" placeholder="Teletrabajo dos días a la semana, me encanta cocinar…" /></div>
            </div>
          </form>

          <div class="preview">
            <div class="card card-shadow letter">
              <span class="eyebrow">Tu carta</span>
              <p class="text">{{ letter }}</p>
              <div class="row">
                <button type="button" class="btn btn-ghost btn-sm" @click="copy">{{ copied ? '¡Copiada!' : 'Copiar carta' }}</button>
                <button type="button" class="btn btn-primary btn-sm" @click="createProfile">Guardarla en mi perfil de inquilino →</button>
              </div>
              <p class="tiny muted">En RentaHucha, los propietarios ven tu perfil al recibir tu mensaje: no tendrás que repetirlo en cada piso.</p>
            </div>
            <div class="note note-green tips">
              <strong>Lo que más valoran los propietarios</strong>
              <ul class="small">
                <li>Ingresos estables que puedas acreditar: la renta, idealmente por debajo del 30-35 % de lo que ganáis.</li>
                <li>Saber cuánto tiempo te quedarás y desde cuándo puedes entrar.</li>
                <li>Responder rápido y proponer día para la visita.</li>
              </ul>
              <NuxtLink to="/herramientas/cuanto-alquiler-puedo-pagar" class="small">¿Cuánto alquiler puedes pagar con tu sueldo? →</NuxtLink>
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
@media (min-width: 1000px) { .layout { grid-template-columns: 1fr 1fr; align-items: start; } .preview { position: sticky; top: 96px; } }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid2 > * { min-width: 0; }
.full { grid-column: 1 / -1; }
.check { display: flex; gap: 10px; align-items: center; font-size: 0.92rem; }
.check input { accent-color: var(--green); }
.preview { display: grid; gap: 14px; }
.letter { display: grid; gap: 12px; }
.text { white-space: pre-line; margin: 0; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
.tiny { font-size: 0.78rem; margin: 0; }
.tips ul { margin: 6px 0 8px; padding-left: 18px; display: grid; gap: 4px; }
@media (max-width: 560px) { .grid2 { grid-template-columns: 1fr; } }
</style>
