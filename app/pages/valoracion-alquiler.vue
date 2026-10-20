<script setup lang="ts">
const title = '¿Cuánto puedo pedir de alquiler por mi piso? Valoración gratis'
const description = 'Pide una valoración gratuita del alquiler de tu piso: te enviamos una horquilla orientativa con pisos comparables de tu zona y el índice de referencia oficial. Sin compromiso.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/propietarios.png' })

const route = useRoute()
const form = reactive({
  name: '', email: '', phone: '', city: typeof route.query.ciudad === 'string' ? route.query.ciudad : '', district: '',
  propertyType: 'Piso', sizeM2: null as number | null, bedrooms: '2', bathrooms: '1', condition: '', furnished: '',
  features: [] as string[], situation: '', currentRent: null as number | null, comments: '',
  consentContact: false, consentNews: false, website: '',
})
const errors = ref<Record<string, string>>({})
const pending = ref(false)
const error = ref('')
const done = ref(false)
const step = ref(1)

const STEP1 = ['city', 'district', 'propertyType', 'sizeM2', 'bedrooms', 'bathrooms', 'condition', 'situation']
function next() {
  errors.value = {}
  if (form.city.trim().length < 2) errors.value.city = '¿En qué ciudad está el piso?'
  if (form.district.trim().length < 2) errors.value.district = 'Indica el barrio o la zona: es lo que más cambia el precio.'
  if (!form.sizeM2) errors.value.sizeM2 = 'Indica los metros cuadrados (aproximados).'
  if (!form.condition) errors.value.condition = '¿En qué estado está?'
  if (!form.situation) errors.value.situation = '¿Cuál es su situación ahora?'
  if (Object.keys(errors.value).length) return
  step.value = 2
  nextTick(() => document.getElementById('val-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

async function submit() {
  pending.value = true
  error.value = ''
  errors.value = {}
  try {
    await $fetch('/api/formularios/valoracion', { method: 'POST', body: form })
    done.value = true
    trackEvent('valoracion')
  }
  catch (e) {
    const r = apiError(e)
    errors.value = r.errors
    if (Object.keys(r.errors).some(k => STEP1.includes(k))) step.value = 1
    error.value = Object.keys(r.errors).length ? 'Revisa los campos marcados.' : r.message
  }
  finally { pending.value = false }
}

const faqs = [
  { q: '¿Quién hace la valoración?', a: 'Una persona del equipo de RentaHucha, no un algoritmo. Revisa pisos parecidos anunciados en tu zona y el Sistema Estatal de Referencia del Precio del Alquiler del Ministerio de Vivienda, y te envía una horquilla orientativa con las referencias que ha usado.' },
  { q: '¿Cuánto tarda?', a: 'Normalmente menos de 48 horas laborables. Te la enviamos al correo que nos dejes.' },
  { q: '¿Me compromete a algo?', a: 'No. Es gratis y sin compromiso. Si después quieres alquilar con nosotros, te lo explicamos; si no, no volvemos a escribirte salvo que marques la casilla de novedades.' },
  { q: '¿Y si mi piso está en zona tensionada?', a: 'Te lo indicamos en la valoración. En zona tensionada, la renta de un contrato nuevo suele estar limitada por la del contrato anterior o por el índice de referencia, según el caso.' },
]
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }] })
const err = (k: string) => ({ 'aria-invalid': !!errors.value[k] })
</script>

<template>
  <div>
    <section class="section">
      <div class="container layout">
        <div class="intro">
          <span class="eyebrow">Gratis · Sin compromiso · Hecha por una persona</span>
          <h1>¿Cuánto puedes pedir de alquiler por tu piso?</h1>
          <p class="lead">Cuéntanos cómo es y te enviamos una horquilla orientativa con pisos comparables de tu zona y el índice de referencia oficial. En menos de 48 horas laborables.</p>
          <ul class="check-list">
            <li><AppIcon name="check" :size="18" /> Comparables reales de tu barrio, no una media de toda la ciudad</li>
            <li><AppIcon name="check" :size="18" /> Te decimos si tu piso está en zona tensionada y qué implica</li>
            <li><AppIcon name="check" :size="18" /> Qué mejoras subirían la renta y cuáles no compensan</li>
          </ul>
          <p class="small muted">Un precio ajustado alquila antes y atrae mejores candidatos: cada mes vacío te cuesta una mensualidad entera.</p>
        </div>

        <div id="val-form" class="card card-shadow form-card">
          <div v-if="done" class="done" role="status">
            <span class="ok"><AppIcon name="check" :size="22" /></span>
            <h2>¡Recibido, {{ form.name.split(' ')[0] }}!</h2>
            <p>Te enviaremos la valoración de tu piso en {{ form.district }}, {{ form.city }} a <strong>{{ form.email }}</strong> en menos de 48 horas laborables.</p>
            <p class="small muted">Mientras tanto, prepara lo que necesitas para alquilar:</p>
            <div class="row">
              <NuxtLink to="/herramientas/checklist-alquilar-piso" class="btn btn-dark btn-sm">Checklist para alquilar</NuxtLink>
              <NuxtLink to="/herramientas/rentabilidad-alquiler" class="btn btn-ghost btn-sm">Calcular rentabilidad</NuxtLink>
            </div>
          </div>

          <form v-else novalidate @submit.prevent="step === 1 ? next() : submit()">
            <input v-model="form.website" class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
            <div class="steps small"><span :class="{ on: step === 1 }">1. Tu piso</span><span :class="{ on: step === 2 }">2. Dónde te la enviamos</span></div>

            <div v-show="step === 1" class="grid2">
              <div class="field">
                <label for="v-city">Ciudad</label>
                <input id="v-city" v-model="form.city" class="input" autocomplete="address-level2" placeholder="Valencia" v-bind="err('city')">
                <span v-if="errors.city" class="error">{{ errors.city }}</span>
              </div>
              <div class="field">
                <label for="v-district">Barrio o zona</label>
                <input id="v-district" v-model="form.district" class="input" placeholder="Ruzafa" v-bind="err('district')">
                <span v-if="errors.district" class="error">{{ errors.district }}</span>
              </div>
              <div class="field">
                <label for="v-type">Tipo</label>
                <select id="v-type" v-model="form.propertyType" class="select"><option v-for="o in VALUATION_OPTIONS.propertyType" :key="o">{{ o }}</option></select>
              </div>
              <div class="field">
                <label for="v-size">Superficie</label>
                <div class="input-group"><input id="v-size" v-model.number="form.sizeM2" class="input" type="number" min="10" inputmode="numeric" v-bind="err('sizeM2')"><span class="suffix">m²</span></div>
                <span v-if="errors.sizeM2" class="error">{{ errors.sizeM2 }}</span>
              </div>
              <div class="field">
                <label for="v-bed">Habitaciones</label>
                <select id="v-bed" v-model="form.bedrooms" class="select"><option v-for="o in VALUATION_OPTIONS.bedrooms" :key="o">{{ o }}</option></select>
              </div>
              <div class="field">
                <label for="v-bath">Baños</label>
                <select id="v-bath" v-model="form.bathrooms" class="select"><option v-for="o in VALUATION_OPTIONS.bathrooms" :key="o">{{ o }}</option></select>
              </div>
              <div class="field">
                <label for="v-cond">Estado</label>
                <select id="v-cond" v-model="form.condition" class="select" v-bind="err('condition')"><option value="" disabled>Elige…</option><option v-for="o in VALUATION_OPTIONS.condition" :key="o">{{ o }}</option></select>
                <span v-if="errors.condition" class="error">{{ errors.condition }}</span>
              </div>
              <div class="field">
                <label for="v-furn">Mobiliario</label>
                <select id="v-furn" v-model="form.furnished" class="select"><option value="">—</option><option v-for="o in VALUATION_OPTIONS.furnished" :key="o">{{ o }}</option></select>
              </div>
              <div class="field full">
                <span class="label">Extras</span>
                <div class="chips">
                  <label v-for="f in VALUATION_OPTIONS.features" :key="f" class="chip" :class="{ on: form.features.includes(f) }"><input v-model="form.features" type="checkbox" :value="f"> {{ f }}</label>
                </div>
              </div>
              <div class="field full">
                <label for="v-sit">Situación</label>
                <select id="v-sit" v-model="form.situation" class="select" v-bind="err('situation')"><option value="" disabled>Elige…</option><option v-for="o in VALUATION_OPTIONS.situation" :key="o">{{ o }}</option></select>
                <span v-if="errors.situation" class="error">{{ errors.situation }}</span>
              </div>
              <div v-if="form.situation.startsWith('Alquilado')" class="field full">
                <label for="v-rent">Renta actual</label>
                <div class="input-group"><input id="v-rent" v-model.number="form.currentRent" class="input" type="number" min="100" inputmode="numeric"><span class="suffix">€/mes</span></div>
              </div>
              <button class="btn btn-primary full" type="submit">Siguiente →</button>
            </div>

            <div v-show="step === 2" class="grid2">
              <div class="field">
                <label for="v-name">Nombre</label>
                <input id="v-name" v-model="form.name" class="input" autocomplete="name" v-bind="err('name')">
                <span v-if="errors.name" class="error">{{ errors.name }}</span>
              </div>
              <div class="field">
                <label for="v-email">Correo electrónico</label>
                <input id="v-email" v-model="form.email" class="input" type="email" autocomplete="email" v-bind="err('email')">
                <span v-if="errors.email" class="error">{{ errors.email }}</span>
              </div>
              <div class="field full">
                <label for="v-phone">Teléfono <span class="muted small">(opcional, por si hay que aclarar algo)</span></label>
                <input id="v-phone" v-model="form.phone" class="input" type="tel" autocomplete="tel">
              </div>
              <div class="field full">
                <label for="v-com">¿Algo más que debamos saber? <span class="muted small">(opcional)</span></label>
                <textarea id="v-com" v-model="form.comments" class="input" rows="3" maxlength="1000" placeholder="Planta, orientación, si es exterior, reformas recientes…" />
              </div>
              <label class="check full"><input v-model="form.consentContact" type="checkbox"> <span>Acepto que RentaHucha use estos datos para enviarme la valoración y contactarme sobre ella, según la <NuxtLink to="/legal/privacidad" target="_blank">política de privacidad</NuxtLink>.</span></label>
              <span v-if="errors.consentContact" class="error full">{{ errors.consentContact }}</span>
              <label class="check full"><input v-model="form.consentNews" type="checkbox"> <span>Además, quiero recibir novedades y consejos para propietarios (opcional).</span></label>
              <p v-if="error" class="err full" role="alert">{{ error }}</p>
              <div class="row full">
                <button type="button" class="btn btn-ghost" @click="step = 1">← Atrás</button>
                <button class="btn btn-primary" type="submit" :disabled="pending">{{ pending ? 'Enviando…' : 'Quiero mi valoración' }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Sobre la valoración</h2>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.layout { display: grid; gap: 40px; }
@media (min-width: 980px) { .layout { grid-template-columns: 1fr 1.05fr; align-items: start; } }
.intro h1 { font-size: clamp(2rem, 4vw, 3rem); margin: 12px 0; }
.intro .check-list { margin: 20px 0; }
.form-card { scroll-margin-top: 100px; }
.steps { display: flex; gap: 16px; margin-bottom: 16px; color: var(--muted); }
.steps .on { color: var(--ink); font-weight: 600; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid2 > * { min-width: 0; }
.full { grid-column: 1 / -1; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { position: relative; padding: 7px 14px; border: 1px solid var(--line); border-radius: 999px; cursor: pointer; font-size: 0.88rem; }
.chip.on { background: var(--lime-soft); border-color: var(--green); }
.chip input { position: absolute; opacity: 0; pointer-events: none; }
.check { display: flex; gap: 10px; align-items: flex-start; font-size: 0.88rem; }
.check input { margin-top: 3px; accent-color: var(--green); }
.error { color: var(--danger); font-size: 0.85rem; }
.err { color: var(--danger); margin: 0; }
.row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: space-between; }
.done { display: grid; gap: 10px; justify-items: start; }
.done h2 { margin: 0; font-size: 1.6rem; }
.done p { margin: 0; }
.ok { width: 44px; height: 44px; border-radius: 50%; background: var(--lime); display: grid; place-items: center; }
@media (max-width: 560px) { .grid2 { grid-template-columns: 1fr; } }
</style>
