<script setup lang="ts">
const title = 'Encuesta del alquiler 2027: ¿qué te preocupa al alquilar?'
const description = 'Responde en 1 minuto, de forma anónima, y mira qué preocupa a propietarios e inquilinos: impagos, precios, requisitos, estafas… Resultados en directo.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description })

type Results = { total: number; ready: false; min: number } | {
  total: number; ready: true; min: number
  ownerWorry: { answered: number; options: { option: string; n: number; pct: number }[] }
  tenantWorry: { answered: number; options: { option: string; n: number; pct: number }[] }
  wants: { answered: number; options: { option: string; n: number; pct: number }[] }
}

const { data: initial } = await useFetch<Results>('/api/formularios/encuesta')
const results = ref<Results | null>(initial.value ?? null)

const f = reactive({ role: '', ownerWorry: '', tenantWorry: '', wants: [] as string[], city: '', email: '', consentNews: false, website: '' })
const isOwner = computed(() => f.role !== '' && f.role !== SURVEY.role.options[1])
const isTenant = computed(() => f.role !== '' && f.role !== SURVEY.role.options[0])
const done = ref(false)
const pending = ref(false)
const error = ref('')

function toggleWant(o: string) {
  const i = f.wants.indexOf(o)
  if (i >= 0) f.wants.splice(i, 1)
  else if (f.wants.length < 2) f.wants.push(o)
}

async function submit() {
  pending.value = true
  error.value = ''
  try {
    results.value = await $fetch<Results>('/api/formularios/encuesta', { method: 'POST', body: { ...f, ownerWorry: isOwner.value ? f.ownerWorry : '', tenantWorry: isTenant.value ? f.tenantWorry : '' } })
    done.value = true
    trackEvent('encuesta')
    try { localStorage.setItem('rh-encuesta', '1') } catch {}
  }
  catch (e) { error.value = apiError(e).message }
  finally { pending.value = false }
}
onMounted(() => { try { if (localStorage.getItem('rh-encuesta')) done.value = true } catch {} })
const canSubmit = computed(() => f.role && ((isOwner.value && f.ownerWorry) || (isTenant.value && f.tenantWorry)))
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <span class="eyebrow">Encuesta abierta · Anónima · 1 minuto</span>
      <h1>¿Qué te preocupa al alquilar?</h1>
      <p class="lead">Propietarios e inquilinos, cada uno desde su lado. Responde y mira lo que contesta el resto: así sabremos qué hay que arreglar del alquiler.</p>

      <form v-if="!done" class="card card-shadow survey" @submit.prevent="submit">
        <input v-model="f.website" class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <fieldset>
          <legend>{{ SURVEY.role.q }}</legend>
          <div class="opts">
            <label v-for="o in SURVEY.role.options" :key="o" class="opt" :class="{ on: f.role === o }"><input v-model="f.role" type="radio" :value="o"> {{ o }}</label>
          </div>
        </fieldset>
        <fieldset v-if="isOwner">
          <legend>{{ SURVEY.ownerWorry.q }}</legend>
          <div class="opts">
            <label v-for="o in SURVEY.ownerWorry.options" :key="o" class="opt" :class="{ on: f.ownerWorry === o }"><input v-model="f.ownerWorry" type="radio" :value="o"> {{ o }}</label>
          </div>
        </fieldset>
        <fieldset v-if="isTenant">
          <legend>{{ SURVEY.tenantWorry.q }}</legend>
          <div class="opts">
            <label v-for="o in SURVEY.tenantWorry.options" :key="o" class="opt" :class="{ on: f.tenantWorry === o }"><input v-model="f.tenantWorry" type="radio" :value="o"> {{ o }}</label>
          </div>
        </fieldset>
        <fieldset v-if="f.role">
          <legend>{{ SURVEY.wants.q }}</legend>
          <div class="opts">
            <button v-for="o in SURVEY.wants.options" :key="o" type="button" class="opt" :class="{ on: f.wants.includes(o) }" :aria-pressed="f.wants.includes(o)" @click="toggleWant(o)">{{ o }}</button>
          </div>
        </fieldset>
        <div v-if="f.role" class="grid2">
          <div class="field"><label for="s-city">Tu ciudad <span class="muted small">(opcional)</span></label><input id="s-city" v-model="f.city" class="input" autocomplete="address-level2"></div>
          <div class="field"><label for="s-email">Tu correo <span class="muted small">(opcional, para recibir el informe final)</span></label><input id="s-email" v-model="f.email" class="input" type="email" autocomplete="email"></div>
          <label v-if="f.email" class="check full"><input v-model="f.consentNews" type="checkbox"> <span>Quiero recibir el informe con los resultados y novedades de RentaHucha (<NuxtLink to="/legal/privacidad" target="_blank">privacidad</NuxtLink>).</span></label>
        </div>
        <p v-if="error" class="err" role="alert">{{ error }}</p>
        <button class="btn btn-primary" type="submit" :disabled="!canSubmit || pending">{{ pending ? 'Enviando…' : 'Enviar y ver resultados' }}</button>
      </form>

      <div v-else class="results">
        <div class="card thanks">
          <strong>¡Gracias por responder!</strong>
          <p v-if="results && !results.ready">Llevamos {{ results.total }} {{ results.total === 1 ? 'respuesta' : 'respuestas' }}. Mostraremos los resultados en cuanto haya al menos {{ results.min }}, para que sean representativos. Compártela para que llegue antes:</p>
          <p v-else>Estos son los resultados hasta ahora ({{ results?.total }} respuestas). Compártela para que sean más representativos:</p>
          <div class="row">
            <a :href="`https://wa.me/?text=${encodeURIComponent('¿Qué te preocupa al alquilar? Responde en 1 minuto y mira lo que contesta el resto: https://rentahucha.es/encuesta-alquiler')}`" target="_blank" rel="noopener" class="btn btn-dark btn-sm">Compartir por WhatsApp</a>
          </div>
        </div>

        <template v-if="results?.ready">
          <section v-for="block in ([['ownerWorry', SURVEY.ownerWorry.q], ['tenantWorry', SURVEY.tenantWorry.q], ['wants', SURVEY.wants.q]] as const)" :key="block[0]" class="card block">
            <h2>{{ block[1] }}</h2>
            <p class="small muted">{{ results[block[0]].answered }} respuestas</p>
            <ul class="bars">
              <li v-for="o in results[block[0]].options" :key="o.option">
                <span class="bar" :style="{ width: `${o.pct}%` }" />
                <span class="lbl">{{ o.option }}</span><span class="n">{{ o.pct }} %</span>
              </li>
            </ul>
          </section>
        </template>

        <div class="note note-green next">
          <strong>Lo que estamos construyendo para resolverlo</strong>
          <p>Inquilinos verificados para los propietarios y, para los inquilinos, una hucha que llenas cada mes en lugar de avales: si cumples, la recuperas con un 10 % extra; si hay un impago comprobado, pasa al propietario.</p>
          <div class="row">
            <NuxtLink to="/propietarios" class="btn btn-ghost btn-sm">Soy propietario</NuxtLink>
            <NuxtLink to="/inquilinos" class="btn btn-ghost btn-sm">Busco piso</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 820px; }
h1 { font-size: clamp(2rem, 4vw, 2.8rem); margin: 10px 0; }
.survey { display: grid; gap: 22px; margin-top: 24px; }
fieldset { border: 0; padding: 0; margin: 0; display: grid; gap: 10px; }
legend { font-weight: 600; font-size: 1.05rem; margin-bottom: 10px; padding: 0; }
.opts { display: grid; gap: 8px; }
@media (min-width: 640px) { .opts { grid-template-columns: 1fr 1fr; } }
.opt { font: inherit; text-align: left; position: relative; display: block; padding: 12px 14px; border: 1px solid var(--line); border-radius: 12px; background: #fff; cursor: pointer; font-size: 0.95rem; }
.opt.on { border-color: var(--green); background: var(--lime-soft); }
.opt input { position: absolute; opacity: 0; pointer-events: none; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid2 > * { min-width: 0; }
.full { grid-column: 1 / -1; }
.check { display: flex; gap: 10px; align-items: flex-start; font-size: 0.88rem; }
.check input { margin-top: 3px; accent-color: var(--green); }
.err { color: var(--danger); margin: 0; }
.results { margin-top: 24px; display: grid; gap: 16px; }
.thanks { display: grid; gap: 8px; }
.thanks p { margin: 0; }
.block h2 { font-size: 1.15rem; margin: 0 0 4px; }
.block > p { margin: 0 0 12px; }
.bars { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
.bars li { position: relative; display: flex; justify-content: space-between; gap: 10px; padding: 8px 10px; border-radius: 8px; overflow: hidden; font-size: 0.92rem; }
.bar { position: absolute; inset: 0 auto 0 0; background: var(--lime-soft); border-radius: 8px; z-index: 0; }
.lbl, .n { position: relative; z-index: 1; }
.n { font-weight: 600; font-variant-numeric: tabular-nums; }
.next { display: grid; gap: 8px; }
.next p { margin: 0; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
@media (max-width: 560px) { .grid2 { grid-template-columns: 1fr; } }
</style>
