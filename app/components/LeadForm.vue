<script setup lang="ts">
import type { LeadErrors, LeadRole } from '#shared/utils/leads'

const props = withDefaults(defineProps<{ role?: LeadRole; switchable?: boolean }>(), { role: 'propietario', switchable: false })
const emit = defineEmits<{ 'update:role': [LeadRole] }>()

const { brand, legal } = useAppConfig()
const { submit, pending, serverError } = useLeadSubmit()

const role = ref<LeadRole>(props.role)
watch(() => props.role, (r) => { role.value = r })
watch(role, r => emit('update:role', r))
const isOwner = computed(() => role.value === 'propietario')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  city: '',
  units: '',
  rentRange: '',
  flatStatus: '',
  propertyType: '',
  bedrooms: '',
  bathrooms: '',
  sizeM2: null as number | null,
  condition: '',
  furnished: '',
  features: [] as string[],
  stayPref: '',
  maxRent: null as number | null,
  ageRange: '',
  people: '',
  wantedBedrooms: '',
  wantedBathrooms: '',
  pets: '',
  stayType: '',
  mustHaves: [] as string[],
  household: '',
  employment: '',
  timing: '',
  interests: [] as string[],
  comments: '',
  consentContact: false,
  consentNews: false,
  adult: false,
  website: '', // campo trampa
})

const errors = ref<LeadErrors>({})
const touched = ref(false)
const done = ref<'nuevo' | 'actualizado' | null>(null)
const formEl = ref<HTMLFormElement | null>(null)

const interestOptions = computed(() => (isOwner.value ? LEAD_OPTIONS.ownerInterest : LEAD_OPTIONS.tenantInterest))
const timingOptions = computed(() => (isOwner.value ? LEAD_OPTIONS.ownerTiming : LEAD_OPTIONS.tenantTiming))

// Al cambiar de tipo se vacían los campos que no aplican y los intereses.
watch(role, () => {
  form.interests = []
  form.timing = ''
  errors.value = {}
  touched.value = false
})

const payload = () => ({ role: role.value, ...form, maxRent: form.maxRent ?? undefined, sizeM2: form.sizeM2 ?? undefined })

function validate() {
  const result = validateLead(payload())
  errors.value = result.ok ? {} : result.errors
  return result.ok
}

// Tras el primer intento de envío, los errores se recalculan mientras el usuario corrige.
watch(form, () => { if (touched.value) validate() }, { deep: true })

async function focusFirstError() {
  await nextTick()
  formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}

async function onSubmit() {
  touched.value = true
  if (!validate()) return focusFirstError()
  const res = await submit(payload())
  if (res.ok) {
    done.value = 'nuevo'
    formEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  else if (res.errors) {
    errors.value = res.errors
    focusFirstError()
  }
}

const err = (k: keyof LeadErrors) => (errors.value[k] ? { 'aria-invalid': 'true' as const, 'aria-describedby': `lf-${k}-err` } : {})
const holder = computed(() => legal.holder || `${brand.name} (titular pendiente de publicar)`)
</script>

<template>
  <div class="card card-shadow lead">
    <div v-if="done" class="done" role="status">
      <span class="ok"><AppIcon name="check" :size="28" /></span>
      <h3>¡Gracias, {{ form.name.split(' ')[0] }}! Ya estás en la lista.</h3>
      <p v-if="isOwner" class="muted">Te escribiremos a <strong>{{ form.email }}</strong> antes del lanzamiento para dar de alta tu piso con prioridad y condiciones de lanzamiento.</p>
      <p v-else class="muted">Te escribiremos a <strong>{{ form.email }}</strong> antes del lanzamiento para crear tu pasaporte de inquilino y avisarte de pisos en {{ form.city }}.</p>
      <div class="next">
        <NuxtLink :to="`/blog?para=${isOwner ? 'propietarios' : 'inquilinos'}`" class="btn btn-ghost btn-sm">Leer el blog</NuxtLink>
        <NuxtLink :to="isOwner ? '/herramientas/coste-impago' : '/herramientas/simulador-hucha'" class="btn btn-primary btn-sm">
          {{ isOwner ? 'Calcular el coste de un impago' : 'Simular mi hucha' }}
        </NuxtLink>
      </div>
    </div>

    <form v-else ref="formEl" class="form" novalidate @submit.prevent="onSubmit">
      <div v-if="switchable" class="switch" role="radiogroup" aria-label="¿Quién eres?">
        <button type="button" role="radio" :aria-checked="isOwner" :class="{ on: isOwner }" @click="role = 'propietario'">
          <AppIcon name="key" :size="18" /> Soy propietario
        </button>
        <button type="button" role="radio" :aria-checked="!isOwner" :class="{ on: !isOwner }" @click="role = 'inquilino'">
          <AppIcon name="piggy" :size="18" /> Busco piso
        </button>
      </div>

      <fieldset>
        <legend>Tus datos</legend>
        <div class="row">
          <div class="field">
            <label for="lf-name">Nombre</label>
            <input id="lf-name" v-model="form.name" class="input" autocomplete="given-name" v-bind="err('name')">
            <span v-if="errors.name" :id="'lf-name-err'" class="error">{{ errors.name }}</span>
          </div>
          <div class="field">
            <label for="lf-email">Correo electrónico</label>
            <input id="lf-email" v-model="form.email" class="input" type="email" autocomplete="email" inputmode="email" v-bind="err('email')">
            <span v-if="errors.email" id="lf-email-err" class="error">{{ errors.email }}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label for="lf-phone">Teléfono <span class="opt">(opcional)</span></label>
            <input id="lf-phone" v-model="form.phone" class="input" type="tel" autocomplete="tel" inputmode="tel" placeholder="Solo si prefieres que te llamemos" v-bind="err('phone')">
            <span v-if="errors.phone" id="lf-phone-err" class="error">{{ errors.phone }}</span>
          </div>
          <div class="field">
            <label for="lf-city">{{ isOwner ? 'Ciudad del piso' : 'Ciudad donde buscas' }}</label>
            <input id="lf-city" v-model="form.city" class="input" autocomplete="address-level2" placeholder="Madrid, Valencia, Sevilla…" v-bind="err('city')">
            <span v-if="errors.city" id="lf-city-err" class="error">{{ errors.city }}</span>
          </div>
        </div>
      </fieldset>

      <fieldset v-if="isOwner">
        <legend>Tu piso</legend>
        <div class="row three">
          <div class="field">
            <label for="lf-units">Pisos en alquiler</label>
            <select id="lf-units" v-model="form.units" class="select" v-bind="err('units')">
              <option value="" disabled>Elige</option>
              <option v-for="o in LEAD_OPTIONS.units" :key="o">{{ o }}</option>
            </select>
            <span v-if="errors.units" id="lf-units-err" class="error">{{ errors.units }}</span>
          </div>
          <div class="field">
            <label for="lf-rent">Renta aproximada</label>
            <select id="lf-rent" v-model="form.rentRange" class="select" v-bind="err('rentRange')">
              <option value="" disabled>Elige</option>
              <option v-for="o in LEAD_OPTIONS.ownerRent" :key="o">{{ o }}</option>
            </select>
            <span v-if="errors.rentRange" id="lf-rentRange-err" class="error">{{ errors.rentRange }}</span>
          </div>
          <div class="field">
            <label for="lf-status">Ahora mismo el piso está…</label>
            <select id="lf-status" v-model="form.flatStatus" class="select" v-bind="err('flatStatus')">
              <option value="" disabled>Elige</option>
              <option v-for="o in LEAD_OPTIONS.flatStatus" :key="o">{{ o }}</option>
            </select>
            <span v-if="errors.flatStatus" id="lf-flatStatus-err" class="error">{{ errors.flatStatus }}</span>
          </div>
        </div>
      </fieldset>

      <fieldset v-if="isOwner">
        <legend>Cómo es el piso <span class="opt">(si tienes varios, el que quieras alquilar primero)</span></legend>
        <div class="row four">
          <div class="field">
            <label for="lf-ptype">Tipo</label>
            <select id="lf-ptype" v-model="form.propertyType" class="select" v-bind="err('propertyType')">
              <option value="" disabled>Elige</option>
              <option v-for="o in LEAD_OPTIONS.propertyType" :key="o">{{ o }}</option>
            </select>
            <span v-if="errors.propertyType" id="lf-propertyType-err" class="error">{{ errors.propertyType }}</span>
          </div>
          <div class="field">
            <label for="lf-bed">Habitaciones</label>
            <select id="lf-bed" v-model="form.bedrooms" class="select" v-bind="err('bedrooms')">
              <option value="" disabled>Elige</option>
              <option v-for="o in LEAD_OPTIONS.bedrooms" :key="o">{{ o }}</option>
            </select>
            <span v-if="errors.bedrooms" id="lf-bedrooms-err" class="error">{{ errors.bedrooms }}</span>
          </div>
          <div class="field">
            <label for="lf-bath">Baños</label>
            <select id="lf-bath" v-model="form.bathrooms" class="select" v-bind="err('bathrooms')">
              <option value="" disabled>Elige</option>
              <option v-for="o in LEAD_OPTIONS.bathrooms" :key="o">{{ o }}</option>
            </select>
            <span v-if="errors.bathrooms" id="lf-bathrooms-err" class="error">{{ errors.bathrooms }}</span>
          </div>
          <div class="field">
            <label for="lf-size">Superficie <span class="opt">(opcional)</span></label>
            <div class="input-group">
              <input id="lf-size" v-model.number="form.sizeM2" class="input" type="number" min="10" max="2000" inputmode="numeric" placeholder="75" v-bind="err('sizeM2')">
              <span class="suffix">m²</span>
            </div>
            <span v-if="errors.sizeM2" id="lf-sizeM2-err" class="error">{{ errors.sizeM2 }}</span>
          </div>
        </div>

        <div class="sub">
          <span class="sublabel">Estado</span>
          <div class="chips" role="radiogroup" aria-label="Estado del piso" :aria-invalid="errors.condition ? 'true' : undefined" :aria-describedby="errors.condition ? 'lf-condition-err' : undefined">
            <label v-for="o in LEAD_OPTIONS.condition" :key="o" class="chip" :class="{ on: form.condition === o }">
              <input v-model="form.condition" type="radio" name="condition" :value="o">
              {{ o }}
            </label>
          </div>
          <span v-if="errors.condition" id="lf-condition-err" class="error">{{ errors.condition }}</span>
        </div>

        <div class="row">
          <div class="field">
            <label for="lf-furnished">Mobiliario <span class="opt">(opcional)</span></label>
            <select id="lf-furnished" v-model="form.furnished" class="select">
              <option value="">Sin indicar</option>
              <option v-for="o in LEAD_OPTIONS.furnished" :key="o">{{ o }}</option>
            </select>
          </div>
          <div class="field">
            <label for="lf-staypref">Prefieres alquilar <span class="opt">(opcional)</span></label>
            <select id="lf-staypref" v-model="form.stayPref" class="select">
              <option value="">Sin indicar</option>
              <option v-for="o in LEAD_OPTIONS.stayPref" :key="o">{{ o }}</option>
            </select>
          </div>
        </div>

        <div class="sub">
          <span class="sublabel">Extras <span class="opt">(opcional)</span></span>
          <div class="chips">
            <label v-for="o in LEAD_OPTIONS.features" :key="o" class="chip" :class="{ on: form.features.includes(o) }">
              <input v-model="form.features" type="checkbox" :value="o">
              {{ o }}
            </label>
          </div>
        </div>
      </fieldset>

      <template v-else>
        <fieldset>
          <legend>Lo que buscas</legend>
          <div class="row three">
            <div class="field">
              <label for="lf-maxrent">Renta máxima</label>
              <div class="input-group">
                <input id="lf-maxrent" v-model.number="form.maxRent" class="input" type="number" min="150" max="6000" step="10" inputmode="numeric" placeholder="850" v-bind="err('maxRent')">
                <span class="suffix">€/mes</span>
              </div>
              <span v-if="errors.maxRent" id="lf-maxRent-err" class="error">{{ errors.maxRent }}</span>
            </div>
            <div class="field">
              <label for="lf-wbed">Habitaciones</label>
              <select id="lf-wbed" v-model="form.wantedBedrooms" class="select" v-bind="err('wantedBedrooms')">
                <option value="" disabled>Mínimo</option>
                <option v-for="o in LEAD_OPTIONS.wantedBedrooms" :key="o">{{ o }}</option>
              </select>
              <span v-if="errors.wantedBedrooms" id="lf-wantedBedrooms-err" class="error">{{ errors.wantedBedrooms }}</span>
            </div>
            <div class="field">
              <label for="lf-wbath">Baños</label>
              <select id="lf-wbath" v-model="form.wantedBathrooms" class="select" v-bind="err('wantedBathrooms')">
                <option value="" disabled>Mínimo</option>
                <option v-for="o in LEAD_OPTIONS.wantedBathrooms" :key="o">{{ o }}</option>
              </select>
              <span v-if="errors.wantedBathrooms" id="lf-wantedBathrooms-err" class="error">{{ errors.wantedBathrooms }}</span>
            </div>
          </div>

          <div class="sub">
            <span class="sublabel">Tipo de estancia <span class="opt">(opcional)</span></span>
            <div class="chips" role="radiogroup" aria-label="Tipo de estancia">
              <label v-for="o in LEAD_OPTIONS.stayType" :key="o" class="chip" :class="{ on: form.stayType === o }">
                <input v-model="form.stayType" type="radio" name="stayType" :value="o">
                {{ o }}
              </label>
            </div>
          </div>

          <div class="sub">
            <span class="sublabel">Imprescindibles <span class="opt">(opcional)</span></span>
            <div class="chips">
              <label v-for="o in LEAD_OPTIONS.mustHaves" :key="o" class="chip" :class="{ on: form.mustHaves.includes(o) }">
                <input v-model="form.mustHaves" type="checkbox" :value="o">
                {{ o }}
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Quién vivirá</legend>
          <div class="row three">
            <div class="field">
              <label for="lf-age">Tu edad</label>
              <select id="lf-age" v-model="form.ageRange" class="select" v-bind="err('ageRange')">
                <option value="" disabled>Elige</option>
                <option v-for="o in LEAD_OPTIONS.ageRange" :key="o" :value="o">{{ o }} años</option>
              </select>
              <span v-if="errors.ageRange" id="lf-ageRange-err" class="error">{{ errors.ageRange }}</span>
            </div>
            <div class="field">
              <label for="lf-people">Personas en total</label>
              <select id="lf-people" v-model="form.people" class="select" v-bind="err('people')">
                <option value="" disabled>Elige</option>
                <option v-for="o in LEAD_OPTIONS.people" :key="o">{{ o }}</option>
              </select>
              <span v-if="errors.people" id="lf-people-err" class="error">{{ errors.people }}</span>
            </div>
            <div class="field">
              <label for="lf-household">Con quién <span class="opt">(opcional)</span></label>
              <select id="lf-household" v-model="form.household" class="select">
                <option value="">Prefiero no decirlo</option>
                <option v-for="o in LEAD_OPTIONS.household" :key="o">{{ o }}</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="field">
              <label for="lf-employment">Situación laboral <span class="opt">(opcional)</span></label>
              <select id="lf-employment" v-model="form.employment" class="select">
                <option value="">Prefiero no decirlo</option>
                <option v-for="o in LEAD_OPTIONS.employment" :key="o">{{ o }}</option>
              </select>
            </div>
            <div class="field">
              <label for="lf-pets">Mascotas <span class="opt">(opcional)</span></label>
              <select id="lf-pets" v-model="form.pets" class="select">
                <option value="">Sin indicar</option>
                <option v-for="o in LEAD_OPTIONS.pets" :key="o">{{ o }}</option>
              </select>
            </div>
          </div>
        </fieldset>
      </template>

      <fieldset>
        <legend>{{ isOwner ? '¿Cuándo te gustaría empezar?' : '¿Cuándo te mudarías?' }}</legend>
        <div class="chips" role="radiogroup" :aria-invalid="errors.timing ? 'true' : undefined" :aria-describedby="errors.timing ? 'lf-timing-err' : undefined">
          <label v-for="o in timingOptions" :key="o" class="chip" :class="{ on: form.timing === o }">
            <input v-model="form.timing" type="radio" name="timing" :value="o">
            {{ o }}
          </label>
        </div>
        <span v-if="errors.timing" id="lf-timing-err" class="error">{{ errors.timing }}</span>
      </fieldset>

      <fieldset>
        <legend>¿Qué te interesa más? <span class="opt">(opcional, varias)</span></legend>
        <div class="chips">
          <label v-for="o in interestOptions" :key="o" class="chip" :class="{ on: form.interests.includes(o) }">
            <input v-model="form.interests" type="checkbox" :value="o">
            {{ o }}
          </label>
        </div>
      </fieldset>

      <div class="field">
        <label for="lf-comments">¿Algo que quieras contarnos? <span class="opt">(opcional)</span></label>
        <textarea id="lf-comments" v-model="form.comments" class="textarea" rows="3" maxlength="500" placeholder="Dudas, lo que más te preocupa de alquilar…" />
      </div>

      <!-- Campo trampa para bots: oculto a personas y lectores de pantalla. -->
      <div class="hp" aria-hidden="true">
        <label for="lf-website">No rellenar</label>
        <input id="lf-website" v-model="form.website" tabindex="-1" autocomplete="off">
      </div>

      <div class="consents">
        <label class="checkbox">
          <input v-model="form.consentContact" type="checkbox" v-bind="err('consentContact')">
          <span>Acepto que {{ brand.name }} guarde estos datos para avisarme del lanzamiento y conocer el interés en el servicio, según la <NuxtLink to="/legal/privacidad">política de privacidad</NuxtLink>.</span>
        </label>
        <span v-if="errors.consentContact" id="lf-consentContact-err" class="error">{{ errors.consentContact }}</span>
        <label class="checkbox">
          <input v-model="form.adult" type="checkbox" v-bind="err('adult')">
          <span>Confirmo que soy mayor de edad.</span>
        </label>
        <span v-if="errors.adult" id="lf-adult-err" class="error">{{ errors.adult }}</span>
        <label class="checkbox">
          <input v-model="form.consentNews" type="checkbox">
          <span>Además, quiero recibir la newsletter con novedades y consejos <span class="opt">(opcional)</span>.</span>
        </label>
      </div>

      <details class="first-layer">
        <summary>Información básica sobre protección de datos</summary>
        <dl>
          <dt>Responsable</dt><dd>{{ holder }} · {{ brand.email }}</dd>
          <dt>Finalidad</dt><dd>Avisarte del lanzamiento, darte prioridad y analizar de forma agregada el interés en el servicio. La newsletter, solo si la marcas.</dd>
          <dt>Legitimación</dt><dd>Tu consentimiento, que puedes retirar cuando quieras.</dd>
          <dt>Destinatarios</dt><dd>Nadie, salvo el proveedor que aloja la web como encargado del tratamiento.</dd>
          <dt>Conservación</dt><dd>Hasta el lanzamiento y, como máximo, 24 meses.</dd>
          <dt>Derechos</dt><dd>Acceso, rectificación, supresión, oposición, limitación y portabilidad en {{ brand.email }}. <NuxtLink to="/legal/privacidad">Más información</NuxtLink>.</dd>
        </dl>
      </details>

      <p v-if="serverError" class="error server" role="alert">{{ serverError }}</p>

      <button class="btn btn-primary btn-block" type="submit" :disabled="pending">
        {{ pending ? 'Enviando…' : isOwner ? 'Quiero que me aviséis' : 'Quiero mi pasaporte de inquilino' }}
      </button>
      <p class="small muted reassure">Es una lista de espera: no te comprometes a nada y no te pedimos documentos.</p>
    </form>
  </div>
</template>

<style scoped>
.lead { padding: clamp(22px, 4vw, 36px); }
.form { display: grid; gap: 22px; }
fieldset { border: 0; padding: 0; margin: 0; display: grid; gap: 14px; min-width: 0; }
legend { font-weight: 600; font-size: 1.05rem; color: var(--ink); margin-bottom: 12px; padding: 0; }
.row { display: grid; gap: 14px; }
@media (min-width: 640px) { .row { grid-template-columns: 1fr 1fr; } .row.three { grid-template-columns: 1fr 1fr 1fr; } .row.four { grid-template-columns: 1fr 1fr; } }
@media (min-width: 900px) { .row.four { grid-template-columns: repeat(4, 1fr); } }
.sub { display: grid; gap: 8px; }
.sublabel { font-size: 0.875rem; font-weight: 500; color: var(--ink); }
.opt { font-weight: 400; color: var(--muted); font-size: 0.85em; }
.error { color: var(--danger); font-size: 0.82rem; }
.input[aria-invalid="true"],
.select[aria-invalid="true"] { border-color: var(--danger); }

.switch { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 6px; background: var(--grey-01); border-radius: 999px; }
.switch button {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; font: inherit; font-weight: 500;
  border: 0; border-radius: 999px; padding: 12px; cursor: pointer; background: transparent; color: var(--muted); transition: all 0.2s;
}
.switch button.on { background: var(--ink); color: #fff; box-shadow: var(--shadow); }
.switch button.on svg { color: var(--lime); }

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

.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.server { margin: 0; }
.reassure { margin: -8px 0 0; text-align: center; }

.done { text-align: center; padding: 24px 4px; }
.ok { width: 64px; height: 64px; border-radius: 50%; display: inline-grid; place-items: center; background: var(--lime); color: var(--ink); margin-bottom: 18px; }
.done h3 { font-size: 1.5rem; }
.next { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
</style>
