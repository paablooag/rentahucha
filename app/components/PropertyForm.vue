<script setup lang="ts">
// Formulario de datos del piso (alta y edición). Las fotos y el estado se gestionan en la página de edición.
const props = defineProps<{ initial?: Property | null; submitLabel: string }>()
const emit = defineEmits<{ saved: [Property] }>()

const blank = (): PropertyInput => ({
  title: '', city: '', district: '', address: '', propertyType: 'Piso', rent: NaN, expensesIncl: false, sizeM2: null,
  bedrooms: 2, bathrooms: 1, floor: '', furnished: '', features: [], energyRating: '', stayType: PROPERTY_OPTIONS.stayType[0], availableFrom: null, description: '',
  regCode: '', referenceIndex: '', rentLimit: '', bigHolder: false,
})
const form = reactive<PropertyInput>(props.initial ? { ...blank(), ...props.initial, features: [...props.initial.features] } : blank())
const errors = ref<PropertyErrors>({})
const pending = ref(false)
const error = ref('')
const savedAt = ref<Date | null>(null)

async function submit() {
  pending.value = true
  error.value = ''
  errors.value = {}
  try {
    const body = { ...form, rent: Number(form.rent), sizeM2: form.sizeM2 || null }
    const saved = props.initial
      ? await $fetch<Property>(`/api/mis-pisos/${props.initial.id}`, { method: 'PUT', body })
      : await $fetch<Property>('/api/mis-pisos', { method: 'POST', body })
    savedAt.value = new Date()
    emit('saved', saved)
  }
  catch (e) {
    const r = apiError(e)
    errors.value = r.errors
    error.value = Object.keys(r.errors).length ? 'Revisa los campos marcados.' : r.message
    await nextTick()
    document.querySelector<HTMLElement>('.pf [aria-invalid="true"]')?.focus()
  }
  finally { pending.value = false }
}
// Borrador del generador de anuncios (/herramientas/generador-anuncio), solo al crear un piso nuevo.
const fromDraft = ref(false)
onMounted(() => {
  if (props.initial) return
  try {
    const raw = localStorage.getItem('rh-draft-anuncio')
    if (!raw) return
    Object.assign(form, JSON.parse(raw))
    localStorage.removeItem('rh-draft-anuncio')
    fromDraft.value = true
  }
  catch {}
})
const err = (k: keyof PropertyInput) => ({ 'aria-invalid': !!errors.value[k] })
// Si la ciudad está en nuestra lista, decimos si el Ministerio la declara zona tensionada.
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
const knownCity = computed(() => CITIES.find(c => norm(c.name) === norm(form.city)) ?? null)
</script>

<template>
  <form class="pf" novalidate @submit.prevent="submit">
    <p v-if="fromDraft" class="note note-green small draft">Hemos rellenado el anuncio con lo que pusiste en el generador. Revísalo, guárdalo y sube las fotos.</p>
    <fieldset>
      <legend>Lo básico</legend>
      <div class="field full">
        <label for="pf-title">Título del anuncio</label>
        <input id="pf-title" v-model="form.title" class="input" maxlength="90" placeholder="Piso luminoso de 2 habitaciones junto al metro" v-bind="err('title')">
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>
      <div class="field">
        <label for="pf-city">Ciudad</label>
        <input id="pf-city" v-model="form.city" class="input" autocomplete="address-level2" placeholder="Valencia" v-bind="err('city')">
        <span v-if="errors.city" class="error">{{ errors.city }}</span>
      </div>
      <div class="field">
        <label for="pf-district">Barrio o zona</label>
        <input id="pf-district" v-model="form.district" class="input" placeholder="Ruzafa">
      </div>
      <div class="field full">
        <label for="pf-address">Dirección <span class="muted small">(privada: no se muestra en el anuncio)</span></label>
        <input id="pf-address" v-model="form.address" class="input" autocomplete="street-address" placeholder="Calle, número, piso">
      </div>
      <div class="field">
        <label for="pf-rent">Renta mensual</label>
        <div class="input-group"><input id="pf-rent" v-model.number="form.rent" class="input" type="number" min="100" step="10" inputmode="numeric" v-bind="err('rent')"><span class="suffix">€</span></div>
        <span v-if="errors.rent" class="error">{{ errors.rent }}</span>
        <label class="check small"><input v-model="form.expensesIncl" type="checkbox"> Gastos de comunidad incluidos</label>
      </div>
      <div class="field">
        <label for="pf-type">Tipo de alquiler</label>
        <select id="pf-type" v-model="form.stayType" class="select" v-bind="err('stayType')">
          <option v-for="o in PROPERTY_OPTIONS.stayType" :key="o" :value="o">{{ o }}</option>
        </select>
        <span v-if="errors.stayType" class="error">{{ errors.stayType }}</span>
      </div>
    </fieldset>

    <fieldset>
      <legend>La vivienda</legend>
      <div class="field">
        <label for="pf-ptype">Tipo de vivienda</label>
        <select id="pf-ptype" v-model="form.propertyType" class="select" v-bind="err('propertyType')">
          <option v-for="o in PROPERTY_OPTIONS.propertyType" :key="o" :value="o">{{ o }}</option>
        </select>
      </div>
      <div class="field">
        <label for="pf-size">Superficie</label>
        <div class="input-group"><input id="pf-size" v-model.number="form.sizeM2" class="input" type="number" min="10" inputmode="numeric" v-bind="err('sizeM2')"><span class="suffix">m²</span></div>
        <span v-if="errors.sizeM2" class="error">{{ errors.sizeM2 }}</span>
      </div>
      <div class="field">
        <label for="pf-bed">Habitaciones</label>
        <input id="pf-bed" v-model.number="form.bedrooms" class="input" type="number" min="0" max="20" inputmode="numeric" v-bind="err('bedrooms')">
        <span v-if="errors.bedrooms" class="error">{{ errors.bedrooms }}</span>
      </div>
      <div class="field">
        <label for="pf-bath">Baños</label>
        <input id="pf-bath" v-model.number="form.bathrooms" class="input" type="number" min="1" max="10" inputmode="numeric" v-bind="err('bathrooms')">
        <span v-if="errors.bathrooms" class="error">{{ errors.bathrooms }}</span>
      </div>
      <div class="field">
        <label for="pf-floor">Planta</label>
        <input id="pf-floor" v-model="form.floor" class="input" placeholder="3.º exterior">
      </div>
      <div class="field">
        <label for="pf-furn">Mobiliario</label>
        <select id="pf-furn" v-model="form.furnished" class="select" v-bind="err('furnished')">
          <option value="" disabled>Elige…</option>
          <option v-for="o in PROPERTY_OPTIONS.furnished" :key="o" :value="o">{{ o }}</option>
        </select>
        <span v-if="errors.furnished" class="error">{{ errors.furnished }}</span>
      </div>
      <div class="field">
        <label for="pf-energy">Calificación energética</label>
        <select id="pf-energy" v-model="form.energyRating" class="select">
          <option value="">Elige…</option>
          <option v-for="o in PROPERTY_OPTIONS.energyRating" :key="o" :value="o">{{ o }}</option>
        </select>
        <span class="hint">Obligatoria para publicar el anuncio.</span>
      </div>
      <div class="field">
        <label for="pf-avail">Disponible desde</label>
        <input id="pf-avail" v-model="form.availableFrom" class="input" type="date">
      </div>
      <div class="field full">
        <span class="label">Extras</span>
        <div class="chips">
          <label v-for="f in PROPERTY_OPTIONS.features" :key="f" class="chip" :class="{ on: form.features.includes(f) }">
            <input v-model="form.features" type="checkbox" :value="f"> {{ f }}
          </label>
        </div>
      </div>
      <div class="field full">
        <label for="pf-desc">Descripción</label>
        <textarea id="pf-desc" v-model="form.description" class="input" rows="7" maxlength="3000" placeholder="Cómo es el piso, la luz, el barrio, transporte cercano, qué incluye y qué perfil de inquilino buscas (con criterios objetivos)." />
        <span class="hint">{{ form.description.length }}/3000 · mínimo 80 caracteres para publicar. No incluyas teléfonos ni correos: los interesados te escribirán por la web.</span>
      </div>
    </fieldset>

    <fieldset>
      <legend>Datos legales del anuncio</legend>
      <p class="full small muted intro">Desde el 8 de octubre de 2026, todo anuncio de alquiler debe incluir estos datos <strong>cuando correspondan</strong> (art. 20 del <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823" target="_blank" rel="noopener">Real Decreto-ley 29/2026</a>). Si alguno no se aplica a tu piso, déjalo en blanco.</p>
      <p v-if="knownCity?.tension" class="full note note-green small">Según el Ministerio de Vivienda, {{ knownCity.name }} es zona de mercado residencial tensionado ({{ knownCity.tension.scope }}, hasta el {{ knownCity.tension.until }}): indica el índice de referencia y el límite de renta.</p>
      <p v-else-if="knownCity" class="full small muted">{{ knownCity.name }} no figura como zona tensionada en la última lista del Ministerio que hemos revisado ({{ CITIES_CHECKED }}). Compruébalo si tienes dudas.</p>
      <div class="field">
        <label for="pf-ref">Índice de referencia del precio <span class="muted small">(zona tensionada)</span></label>
        <input id="pf-ref" v-model="form.referenceIndex" class="input" maxlength="160" placeholder="Entre 780 y 950 €/mes">
        <span class="hint">Lo calcula el <a href="https://serpavi.mivau.gob.es/" target="_blank" rel="noopener">sistema estatal de índices (SERPAVI)</a> con la referencia catastral.</span>
      </div>
      <div class="field">
        <label for="pf-reg">Número o código de registro <span class="muted small">(si tiene)</span></label>
        <input id="pf-reg" v-model="form.regCode" class="input" maxlength="80" placeholder="Código autonómico o municipal">
        <span class="hint">Por ejemplo, el código de vivienda turística de tu comunidad. Si no tiene, déjalo en blanco.</span>
      </div>
      <div class="field full">
        <label for="pf-limit">Límite de renta aplicable y norma que lo fija <span class="muted small">(si hay limitación)</span></label>
        <input id="pf-limit" v-model="form.rentLimit" class="input" maxlength="300" placeholder="Renta del contrato anterior (850 €/mes, actualizada), art. 17.6 LAU">
      </div>
      <label class="check full"><input v-model="form.bigHolder" type="checkbox"> El arrendador es gran tenedor</label>
    </fieldset>

    <div class="actions">
      <p v-if="error" class="err" role="alert">{{ error }}</p>
      <p v-else-if="savedAt" class="ok small" role="status">Guardado</p>
      <button class="btn btn-primary" type="submit" :disabled="pending">{{ pending ? 'Guardando…' : submitLabel }}</button>
    </div>
  </form>
</template>

<style scoped>
.pf { display: grid; gap: 24px; }
.draft { margin: 0; }
.intro { margin: 0; }
.intro a, .hint a { color: inherit; }
fieldset { border: 1px solid var(--line); border-radius: 18px; padding: 20px; margin: 0; display: grid; gap: 16px; grid-template-columns: 1fr 1fr; background: #fff; }
fieldset > * { min-width: 0; }
legend { font-weight: 600; padding: 0 6px; }
.full { grid-column: 1 / -1; }
.check { display: flex; gap: 8px; align-items: center; margin-top: 6px; font-weight: 400; }
.check input { accent-color: var(--green); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { position: relative; padding: 7px 14px; border: 1px solid var(--line); border-radius: 999px; cursor: pointer; font-size: 0.9rem; font-weight: 400; }
.chip.on { background: var(--lime-soft); border-color: var(--green); }
.chip input { position: absolute; opacity: 0; pointer-events: none; }
.error { color: var(--danger); font-size: 0.85rem; }
.actions { display: flex; gap: 14px; align-items: center; justify-content: flex-end; flex-wrap: wrap; }
.err { color: var(--danger); margin: 0; }
.ok { color: var(--green); margin: 0; }
@media (max-width: 640px) { fieldset { grid-template-columns: 1fr; padding: 16px; } }
</style>
