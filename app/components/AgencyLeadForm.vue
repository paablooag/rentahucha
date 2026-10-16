<script setup lang="ts">
import type { LeadErrors } from '#shared/utils/leads'

// Alta de inmobiliarias en la lista de espera: un solo paso, con lo mínimo para contactar y dimensionar el interés.
const { brand, legal } = useAppConfig()
const { submit, pending, serverError } = useLeadSubmit()

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
const errors = ref<LeadErrors>({})
const done = ref(false)
const formEl = ref<HTMLFormElement | null>(null)

function check(): LeadErrors {
  const res = validateLead({ ...form, role: 'inmobiliaria' })
  return res.ok ? {} : res.errors
}

async function onSubmit() {
  errors.value = check()
  if (Object.keys(errors.value).length) {
    await nextTick()
    formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    return
  }
  const res = await submit({ ...form, role: 'inmobiliaria' })
  if (res.ok) done.value = true
  else if (res.errors) errors.value = res.errors
}

const err = (k: keyof LeadErrors) => (errors.value[k] ? { 'aria-invalid': 'true' as const, 'aria-describedby': `ag-${k}-err` } : {})
const holder = computed(() => legal.holder || `${brand.name} (titular pendiente de publicar)`)
</script>

<template>
  <div class="card card-shadow agency">
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

      <div class="field">
        <label for="ag-comments">¿Algo que quieras contarnos? <span class="opt">(opcional)</span></label>
        <textarea id="ag-comments" v-model="form.comments" class="textarea" rows="3" maxlength="500" placeholder="Cómo trabajáis hoy el alquiler, qué os preocupa…" />
      </div>

      <!-- Campo trampa para bots: oculto a personas y lectores de pantalla. -->
      <div class="hp" aria-hidden="true">
        <label for="ag-website">No rellenar</label>
        <input id="ag-website" v-model="form.website" tabindex="-1" autocomplete="off">
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

      <p v-if="serverError" class="error server" role="alert">{{ serverError }}</p>
      <button type="submit" class="btn btn-primary send" :disabled="pending">
        {{ pending ? 'Enviando…' : 'Quiero subir nuestros pisos' }} <AppIcon v-if="!pending" name="arrow" :size="18" />
      </button>
      <p class="small muted reassure">Es una lista de espera: no os comprometéis a nada.</p>
    </form>
  </div>
</template>

<style scoped>
.form { display: grid; gap: 20px; }
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
.consents { display: grid; gap: 10px; }
.checkbox input[aria-invalid="true"] { outline: 2px solid var(--danger); }
.first-layer { background: var(--off); border-radius: 12px; padding: 12px 16px; font-size: 0.85rem; color: var(--muted); }
.first-layer summary { cursor: pointer; font-weight: 500; color: var(--ink); }
.first-layer dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 14px; margin: 12px 0 4px; }
.first-layer dt { font-weight: 600; color: var(--ink); }
.first-layer dd { margin: 0; }
@media (max-width: 520px) { .first-layer dl { grid-template-columns: 1fr; } .first-layer dd { margin-bottom: 6px; } }
.server { margin: 0; }
.send { width: 100%; justify-content: center; }
.reassure { text-align: center; margin: 0; }
.done { text-align: center; padding: 24px 4px; }
.ok { width: 64px; height: 64px; border-radius: 50%; display: inline-grid; place-items: center; background: var(--lime); color: var(--ink); margin-bottom: 18px; }
.done h3 { font-size: 1.4rem; }
.next { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
</style>
