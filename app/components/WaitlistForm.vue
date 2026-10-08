<script setup lang="ts">
import type { WaitlistRole } from '~/composables/useWaitlist'

const props = defineProps<{ role: WaitlistRole }>()
const { brand } = useAppConfig()
const { submit, pending, error } = useWaitlist()

const form = reactive({
  name: '',
  email: '',
  city: '',
  units: 1,
  rent: 850,
  maxRent: 800,
  employment: '',
  consent: false,
})
const done = ref(false)
const isOwner = computed(() => props.role === 'propietario')

const employmentOptions = ['Contrato indefinido', 'Contrato temporal', 'Autónomo/a', 'Estudiante con ingresos o beca', 'Funcionario/a', 'Otra situación']

async function onSubmit() {
  if (!form.consent) return
  const ok = await submit({
    role: props.role,
    name: form.name.trim(),
    email: form.email.trim(),
    city: form.city.trim(),
    ...(isOwner.value
      ? { units: form.units, rent: form.rent }
      : { maxRent: form.maxRent, employment: form.employment }),
  })
  if (ok) done.value = true
}
</script>

<template>
  <div class="card card-shadow wl">
    <div v-if="done" class="done" role="status">
      <span class="icon-chip chip-green"><AppIcon name="check" :size="24" /></span>
      <h3>¡Estás dentro, {{ form.name.split(' ')[0] }}!</h3>
      <p v-if="isOwner" class="muted">Te escribiremos a {{ form.email }} en cuanto lancemos para dar de alta tu piso de {{ form.city }} con prioridad.</p>
      <p v-else class="muted">Te escribiremos a {{ form.email }} para crear tu pasaporte de inquilino en cuanto lancemos.</p>
    </div>

    <form v-else class="form" @submit.prevent="onSubmit">
      <div class="row">
        <div class="field">
          <label :for="`${role}-name`">Nombre</label>
          <input :id="`${role}-name`" v-model="form.name" class="input" required autocomplete="given-name">
        </div>
        <div class="field">
          <label :for="`${role}-email`">Email</label>
          <input :id="`${role}-email`" v-model="form.email" class="input" type="email" required autocomplete="email">
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label :for="`${role}-city`">{{ isOwner ? 'Ciudad del piso' : 'Ciudad donde buscas' }}</label>
          <input :id="`${role}-city`" v-model="form.city" class="input" required autocomplete="address-level2" placeholder="Madrid, Valencia, Sevilla…">
        </div>

        <template v-if="isOwner">
          <div class="field">
            <label :for="`${role}-units`">Pisos en alquiler</label>
            <input :id="`${role}-units`" v-model.number="form.units" class="input" type="number" min="1" required>
          </div>
        </template>
        <template v-else>
          <div class="field">
            <label :for="`${role}-maxrent`">Renta máxima que buscas</label>
            <div class="input-group">
              <input :id="`${role}-maxrent`" v-model.number="form.maxRent" class="input" type="number" min="100" step="10" required>
              <span class="suffix">€/mes</span>
            </div>
          </div>
        </template>
      </div>

      <div v-if="isOwner" class="field">
        <label :for="`${role}-rent`">Renta aproximada por piso</label>
        <div class="input-group">
          <input :id="`${role}-rent`" v-model.number="form.rent" class="input" type="number" min="100" step="10" required>
          <span class="suffix">€/mes</span>
        </div>
      </div>
      <div v-else class="field">
        <label :for="`${role}-employment`">Situación laboral</label>
        <select :id="`${role}-employment`" v-model="form.employment" class="select" required>
          <option value="" disabled>Elige una opción</option>
          <option v-for="o in employmentOptions" :key="o" :value="o">{{ o }}</option>
        </select>
      </div>

      <label class="checkbox">
        <input v-model="form.consent" type="checkbox" required>
        <span>
          Acepto que {{ brand.name }} use estos datos para contactarme sobre el lanzamiento.
          Puedo darme de baja cuando quiera. <NuxtLink to="/legal/privacidad">Política de privacidad</NuxtLink>.
        </span>
      </label>

      <p v-if="error" class="err" role="alert">{{ error }}</p>

      <button class="btn btn-block" :class="isOwner ? 'btn-primary' : 'btn-amber'" type="submit" :disabled="pending || !form.consent">
        {{ pending ? 'Enviando…' : isOwner ? 'Quiero dar de alta mi piso' : 'Quiero mi pasaporte de inquilino' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.form { display: grid; gap: 16px; }
.row { display: grid; gap: 16px; }
@media (min-width: 560px) { .row { grid-template-columns: 1fr 1fr; } }
.done { text-align: center; padding: 24px 8px; }
.done .icon-chip { width: 56px; height: 56px; border-radius: 50%; }
.err { color: var(--danger); margin: 0; font-size: 0.9rem; }
</style>
