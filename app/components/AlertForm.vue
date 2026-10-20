<script setup lang="ts">
// Alerta de pisos: correo + búsqueda. Para quien busca piso en una ciudad donde aún hay pocos anuncios.
const props = withDefaults(defineProps<{ city?: string; maxRent?: string; minBedrooms?: string; compact?: boolean }>(), { city: '', maxRent: '', minBedrooms: '', compact: false })

const f = reactive({ email: '', city: props.city, maxRent: props.maxRent, minBedrooms: props.minBedrooms, consent: false, website: '' })
watch(() => props.city, v => { f.city = v })
const pending = ref(false)
const done = ref(false)
const error = ref('')
async function submit() {
  pending.value = true
  error.value = ''
  try {
    await $fetch('/api/alertas', { method: 'POST', body: { ...f, maxRent: f.maxRent || null, minBedrooms: f.minBedrooms || null } })
    done.value = true
    trackEvent('alerta')
  }
  catch (e) { error.value = apiError(e).message }
  finally { pending.value = false }
}
</script>

<template>
  <div class="alert-form" :class="{ compact }">
    <p v-if="done" class="done" role="status"><AppIcon name="check" :size="18" /> Alerta creada. Te escribiremos a <strong>{{ f.email }}</strong> cuando haya pisos que encajen.</p>
    <form v-else @submit.prevent="submit">
      <input v-model="f.website" class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="fields">
        <label class="f-city"><span>Ciudad</span><input v-model="f.city" class="input" required autocomplete="address-level2" placeholder="Valencia"></label>
        <label><span>Renta máx.</span>
          <select v-model="f.maxRent" class="select"><option value="">Cualquiera</option><option v-for="v in [500, 700, 900, 1100, 1300, 1600, 2000]" :key="v" :value="String(v)">{{ formatEuro(v) }}</option></select>
        </label>
        <label><span>Habitaciones</span>
          <select v-model="f.minBedrooms" class="select"><option value="">Cualquiera</option><option v-for="v in [1, 2, 3, 4]" :key="v" :value="String(v)">{{ v }} o más</option></select>
        </label>
        <label class="f-email"><span>Tu correo</span><input v-model="f.email" class="input" type="email" required autocomplete="email" placeholder="tu@correo.com"></label>
      </div>
      <label class="consent"><input v-model="f.consent" type="checkbox" required> <span>Quiero recibir por correo los pisos nuevos que encajen (como mucho uno al día). Puedo cancelarlo en cualquier momento. <NuxtLink to="/legal/privacidad" target="_blank">Privacidad</NuxtLink>.</span></label>
      <p v-if="error" class="err" role="alert">{{ error }}</p>
      <button class="btn btn-primary btn-sm" type="submit" :disabled="pending || !f.consent">{{ pending ? 'Creando…' : 'Crear alerta' }}</button>
    </form>
  </div>
</template>

<style scoped>
.alert-form form { display: grid; gap: 10px; }
.fields { display: grid; grid-template-columns: 1.3fr 1fr 1fr 1.6fr; gap: 10px; }
.fields > * { min-width: 0; }
.fields label { display: grid; gap: 4px; font-size: 0.82rem; font-weight: 600; }
.compact .fields { grid-template-columns: 1fr 1fr; }
.compact .f-city, .compact .f-email { grid-column: 1 / -1; }
@media (max-width: 760px) { .fields { grid-template-columns: 1fr 1fr; } .f-city, .f-email { grid-column: 1 / -1; } }
.consent { display: flex; gap: 8px; align-items: flex-start; font-size: 0.82rem; color: var(--muted); }
.consent input { margin-top: 3px; accent-color: var(--green); }
.alert-form .btn { justify-self: start; }
.err { color: var(--danger); margin: 0; font-size: 0.9rem; }
.done { display: flex; gap: 8px; align-items: center; margin: 0; }
</style>
