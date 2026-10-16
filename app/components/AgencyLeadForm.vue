<script setup lang="ts">
import type { LeadErrors } from '#shared/utils/leads'

// Alta de inmobiliarias en la lista de espera, en 3 pasos: datos de contacto, cartera y confirmación.
const { brand, legal } = useAppConfig()
const { submit, pending, serverError } = useLeadSubmit()

const TOTAL_STEPS = 3
const STEP_TITLES = ['Tus datos', 'Vuestra cartera', 'Confirmar']
const STEP_FIELDS: (keyof LeadErrors)[][] = [
  ['name', 'company', 'email', 'phone'],
  ['city', 'managedUnits', 'timing'],
  ['consentContact', 'adult'],
]

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  city: '',
  managedUnits: '',
  timing: '',
  interests: [] as string[],
  comments: '',
  consentContact: false,
  consentNews: false,
  adult: false,
  website: '', // campo trampa
})
const step = ref(1)
const errors = ref<LeadErrors>({})
const done = ref(false)
const root = ref<HTMLElement | null>(null)
const formEl = ref<HTMLFormElement | null>(null)

function allErrors(): LeadErrors {
  const res = validateLead({ ...form, role: 'inmobiliaria' })
  return res.ok ? {} : res.errors
}
function stepErrors(n: number): LeadErrors {
  const all = allErrors()
  return Object.fromEntries(Object.entries(all).filter(([k]) => STEP_FIELDS[n - 1]!.includes(k as keyof LeadErrors)))
}

async function scrollToTop() {
  await nextTick()
  const top = (root.value?.getBoundingClientRect().top ?? 0) + window.scrollY - 110
  if (top < window.scrollY) window.scrollTo({ top, behavior: 'smooth' })
}
async function focusFirstError() {
  await nextTick()
  formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}

// Si hay errores, vuelve al primer paso que los tenga.
function jumpToErrors(errs: LeadErrors): boolean {
  if (!Object.keys(errs).length) return false
  errors.value = errs
  const first = STEP_FIELDS.findIndex(fields => fields.some(f => errs[f]))
  if (first >= 0) step.value = first + 1
  focusFirstError()
  return true
}

function goTo(n: number) {
  step.value = n
  errors.value = {}
  scrollToTop()
}

async function onSubmit() {
  if (step.value < TOTAL_STEPS) {
    const errs = stepErrors(step.value)
    errors.value = errs
    if (Object.keys(errs).length) return focusFirstError()
    return goTo(step.value + 1)
  }
  if (jumpToErrors(allErrors())) return
  const res = await submit({ ...form, role: 'inmobiliaria' })
  if (res.ok) {
    done.value = true
    scrollToTop()
  }
  else if (res.errors) {
    jumpToErrors(res.errors)
  }
}

const err = (k: keyof LeadErrors) => (errors.value[k] ? { 'aria-invalid': 'true' as const, 'aria-describedby': `ag-${k}-err` } : {})
const holder = computed(() => legal.holder || `${brand.name} (titular pendiente de publicar)`)
</script>

<template>
  <div ref="root" class="card card-shadow agency">
    <div v-if="done" class="done" role="status">
      <span class="ok"><AppIcon name="check" :size="28" /></span>
      <h3>¡Gracias, {{ form.name.split(' ')[0] }}! {{ form.company }} ya está en la lista.</h3>
      <p class="muted">Te escribiremos a <strong>{{ form.email }}</strong> antes del lanzamiento con las condiciones para inmobiliarias en {{ form.city }}.</p>
      <div class="next">
        <NuxtLink to="/blog?para=inmobiliarias" class="btn btn-ghost btn-sm">Guías para inmobiliarias</NuxtLink>
        <NuxtLink to="/como-funciona" class="btn btn-primary btn-sm">Cómo funciona por dentro</NuxtLink>
      </div>
    </div>

    <form v-else ref="formEl" class="form" novalidate @submit.prevent="onSubmit">
      <div class="progress">
        <div class="progress-head" aria-live="polite">
          <span class="step-label">Paso {{ step }} de {{ TOTAL_STEPS }}</span>
          <strong>{{ STEP_TITLES[step - 1] }}</strong>
        </div>
        <div class="bar" role="progressbar" :aria-valuenow="step" aria-valuemin="1" :aria-valuemax="TOTAL_STEPS" :aria-label="`Paso ${step} de ${TOTAL_STEPS}`">
          <span :style="{ width: `${(step / TOTAL_STEPS) * 100}%` }" />
        </div>
      </div>

      <!-- Paso 1: contacto -->
      <div v-show="step === 1" class="stepwrap">
        <div class="row">
          <div class="field">
            <label for="ag-name">Tu nombre</label>
            <input id="ag-name" v-model="form.name" class="input" autocomplete="name" v-bind="err('name')">
            <span v-if="errors.name" id="ag-name-err" class="error">{{ errors.name }}</span>
          </div>
          <div class="field">
            <label for="ag-company">Inmobiliaria</label>
            <input id="ag-company" v-model="form.company" class="input" autocomplete="organization" v-bind="err('company')">
            <span v-if="errors.company" id="ag-company-err" class="error">{{ errors.company }}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label for="ag-email">Correo electrónico</label>
            <input id="ag-email" v-model="form.email" class="input" type="email" autocomplete="email" inputmode="email" v-bind="err('email')">
            <span v-if="errors.email" id="ag-email-err" class="error">{{ errors.email }}</span>
          </div>
          <div class="field">
            <label for="ag-phone">Teléfono <span class="opt">(opcional)</span></label>
            <input id="ag-phone" v-model="form.phone" class="input" type="tel" autocomplete="tel" inputmode="tel" v-bind="err('phone')">
            <span v-if="errors.phone" id="ag-phone-err" class="error">{{ errors.phone }}</span>
          </div>
        </div>
      </div>

      <!-- Paso 2: cartera -->
      <div v-show="step === 2" class="stepwrap">
        <div class="field">
          <label for="ag-city">Ciudad o zona en la que trabajáis</label>
          <input id="ag-city" v-model="form.city" class="input" placeholder="Madrid, Costa del Sol, Valencia…" v-bind="err('city')">
          <span v-if="errors.city" id="ag-city-err" class="error">{{ errors.city }}</span>
        </div>

        <fieldset>
          <legend>¿Cuántos pisos en alquiler gestionáis?</legend>
          <div class="chips" role="radiogroup" v-bind="err('managedUnits')">
            <label v-for="o in LEAD_OPTIONS.agencyUnits" :key="o" class="chip" :class="{ on: form.managedUnits === o }">
              <input v-model="form.managedUnits" type="radio" name="managedUnits" :value="o"> {{ o }}
            </label>
          </div>
          <span v-if="errors.managedUnits" id="ag-managedUnits-err" class="error">{{ errors.managedUnits }}</span>
        </fieldset>

        <fieldset>
          <legend>¿Cuándo os gustaría empezar?</legend>
          <div class="chips" role="radiogroup" v-bind="err('timing')">
            <label v-for="o in LEAD_OPTIONS.agencyTiming" :key="o" class="chip" :class="{ on: form.timing === o }">
              <input v-model="form.timing" type="radio" name="agencyTiming" :value="o"> {{ o }}
            </label>
          </div>
          <span v-if="errors.timing" id="ag-timing-err" class="error">{{ errors.timing }}</span>
        </fieldset>

        <fieldset>
          <legend>¿Qué os interesa más? <span class="opt">(opcional, varias)</span></legend>
          <div class="chips">
            <label v-for="o in LEAD_OPTIONS.agencyInterest" :key="o" class="chip" :class="{ on: form.interests.includes(o) }">
              <input v-model="form.interests" type="checkbox" :value="o"> {{ o }}
            </label>
          </div>
        </fieldset>
      </div>

      <!-- Campo trampa para bots: oculto a personas y lectores de pantalla. -->
      <div class="hp" aria-hidden="true">
        <label for="ag-website">No rellenar</label>
        <input id="ag-website" v-model="form.website" tabindex="-1" autocomplete="off">
      </div>

      <!-- Paso 3: confirmación -->
      <div v-show="step === 3" class="stepwrap">
        <div class="summary">
          <dl>
            <dt>Contacto</dt>
            <dd>{{ form.name }} · {{ form.company }} · {{ form.email }}{{ form.phone ? ` · ${form.phone}` : '' }} <button type="button" class="edit" @click="goTo(1)">Editar</button></dd>
            <dt>Cartera</dt>
            <dd>{{ form.managedUnits }} pisos en {{ form.city }} · {{ form.timing }} <button type="button" class="edit" @click="goTo(2)">Editar</button></dd>
          </dl>
        </div>

        <div class="field">
          <label for="ag-comments">¿Algo que quieras contarnos? <span class="opt">(opcional)</span></label>
          <textarea id="ag-comments" v-model="form.comments" class="textarea" rows="3" maxlength="500" placeholder="Cómo trabajáis hoy el alquiler, qué os preocupa…" />
        </div>

        <div class="consents">
          <label class="checkbox">
            <input v-model="form.consentContact" type="checkbox" v-bind="err('consentContact')">
            <span>Acepto que {{ brand.name }} guarde estos datos para avisarme del lanzamiento y conocer el interés en el servicio, según la <NuxtLink to="/legal/privacidad">política de privacidad</NuxtLink>.</span>
          </label>
          <span v-if="errors.consentContact" id="ag-consentContact-err" class="error">{{ errors.consentContact }}</span>
          <label class="checkbox">
            <input v-model="form.adult" type="checkbox" v-bind="err('adult')">
            <span>Confirmo que soy mayor de edad.</span>
          </label>
          <span v-if="errors.adult" id="ag-adult-err" class="error">{{ errors.adult }}</span>
          <label class="checkbox">
            <input v-model="form.consentNews" type="checkbox">
            <span>Quiero recibir también la newsletter con novedades del alquiler. <span class="opt">(opcional)</span></span>
          </label>
        </div>

        <details class="first-layer">
          <summary>Información básica sobre protección de datos</summary>
          <dl>
            <dt>Responsable</dt><dd>{{ holder }} · {{ brand.email }}</dd>
            <dt>Finalidad</dt><dd>Avisarte del lanzamiento, contarte las condiciones para inmobiliarias y analizar de forma agregada el interés en el servicio. La newsletter, solo si la marcas.</dd>
            <dt>Legitimación</dt><dd>Tu consentimiento, que puedes retirar cuando quieras.</dd>
            <dt>Destinatarios</dt><dd>Nadie, salvo el proveedor que aloja la web como encargado del tratamiento.</dd>
            <dt>Conservación</dt><dd>Hasta el lanzamiento y, como máximo, 24 meses.</dd>
            <dt>Derechos</dt><dd>Acceso, rectificación, supresión, oposición, limitación y portabilidad en {{ brand.email }}. <NuxtLink to="/legal/privacidad">Más información</NuxtLink>.</dd>
          </dl>
        </details>
      </div>

      <p v-if="serverError" class="error server" role="alert">{{ serverError }}</p>

      <div class="nav">
        <button v-if="step > 1" type="button" class="btn btn-ghost" @click="goTo(step - 1)">← Atrás</button>
        <button v-if="step < TOTAL_STEPS" type="submit" class="btn btn-primary next-btn">Siguiente <AppIcon name="arrow" :size="18" /></button>
        <button v-else type="submit" class="btn btn-primary next-btn" :disabled="pending">
          {{ pending ? 'Enviando…' : 'Quiero subir nuestros pisos' }}
        </button>
      </div>
      <p class="small muted reassure">Es una lista de espera: no os comprometéis a nada.</p>
    </form>
  </div>
</template>

<style scoped>
.form { display: grid; gap: 22px; }
.progress { display: grid; gap: 10px; }
.progress-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.step-label { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.progress-head strong { font-size: 1.25rem; font-weight: 500; letter-spacing: -0.02em; }
.bar { height: 6px; background: var(--grey-01); border-radius: 99px; overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--ink); border-radius: 99px; transition: width 0.3s ease; }
.stepwrap { display: grid; gap: 20px; }
fieldset { border: 0; padding: 0; margin: 0; display: grid; gap: 12px; min-width: 0; }
legend { font-weight: 600; font-size: 1rem; color: var(--ink); margin-bottom: 10px; padding: 0; }
.row { display: grid; gap: 14px; }
@media (min-width: 640px) { .row { grid-template-columns: 1fr 1fr; } }
.opt { font-weight: 400; color: var(--muted); font-size: 0.85em; }
.error { color: var(--danger); font-size: 0.82rem; }
.input[aria-invalid="true"] { border-color: var(--danger); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  position: relative; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; user-select: none;
  padding: 9px 16px; border-radius: 999px; border: 1px solid #cecece; font-size: 0.92rem; transition: all 0.15s;
}
.chip input { position: absolute; opacity: 0; pointer-events: none; }
.chip:hover { border-color: var(--ink); }
.chip.on { background: var(--lime); border-color: var(--ink); font-weight: 500; }
.chip:has(input:focus-visible) { outline: 2px solid var(--ink); outline-offset: 2px; }
.chips[aria-invalid="true"] .chip { border-color: var(--danger); }
.summary { background: var(--off); border-radius: 14px; padding: 14px 16px; }
.summary dl { display: grid; grid-template-columns: max-content 1fr; gap: 8px 14px; margin: 0; font-size: 0.92rem; }
.summary dt { font-weight: 600; color: var(--ink); }
.summary dd { margin: 0; color: var(--muted); }
@media (max-width: 520px) { .summary dl { grid-template-columns: 1fr; gap: 2px; } .summary dd { margin-bottom: 8px; } }
.edit { font: inherit; font-size: 0.85rem; background: none; border: 0; padding: 0; margin-left: 6px; color: var(--ink); text-decoration: underline; cursor: pointer; }
.consents { display: grid; gap: 10px; }
.checkbox input[aria-invalid="true"] { outline: 2px solid var(--danger); }
.first-layer { background: var(--off); border-radius: 12px; padding: 12px 16px; font-size: 0.85rem; color: var(--muted); }
.first-layer summary { cursor: pointer; font-weight: 500; color: var(--ink); }
.first-layer dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 14px; margin: 12px 0 4px; }
.first-layer dt { font-weight: 600; color: var(--ink); }
.first-layer dd { margin: 0; }
@media (max-width: 520px) { .first-layer dl { grid-template-columns: 1fr; } .first-layer dd { margin-bottom: 6px; } }
.server { margin: 0; }
.nav { display: flex; gap: 10px; justify-content: space-between; }
.nav .next-btn { margin-left: auto; min-width: 200px; justify-content: center; }
@media (max-width: 520px) { .nav .next-btn { min-width: 0; flex: 1; } }
.reassure { text-align: center; margin: 0; }
.done { text-align: center; padding: 24px 4px; }
.ok { width: 64px; height: 64px; border-radius: 50%; display: inline-grid; place-items: center; background: var(--lime); color: var(--ink); margin-bottom: 18px; }
.done h3 { font-size: 1.4rem; }
.next { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
</style>
