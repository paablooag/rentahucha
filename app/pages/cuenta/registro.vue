<script setup lang="ts">
useSeoMeta({ title: 'Crear cuenta', robots: 'noindex' })
const route = useRoute()
const { refresh } = useAccount()

const form = reactive({
  role: (route.query.tipo === 'inquilino' ? 'inquilino' : 'propietario') as UserRole,
  name: '', email: '', phone: '', password: '', consent: false, adult: false, website: '',
})
const pending = ref(false)
const error = ref('')
const errors = ref<Record<string, string>>({})

const next = computed(() => {
  const n = route.query.next
  if (typeof n === 'string' && n.startsWith('/') && !n.startsWith('//')) return n
  return form.role === 'propietario' ? '/mi-cuenta/pisos/nuevo' : '/pisos'
})

async function submit() {
  pending.value = true
  error.value = ''
  errors.value = {}
  try {
    await $fetch('/api/cuenta/registro', { method: 'POST', body: form })
    await refresh()
    await navigateTo(next.value)
  }
  catch (e) {
    const r = apiError(e)
    errors.value = r.errors
    error.value = Object.keys(r.errors).length ? 'Revisa los campos marcados.' : r.message
  }
  finally { pending.value = false }
}
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <div class="card card-shadow box">
        <span class="badge">Beta · Gratis</span>
        <h1>Crear cuenta</h1>
        <div class="roles" role="radiogroup" aria-label="Tipo de cuenta">
          <label :class="{ on: form.role === 'propietario' }"><input v-model="form.role" type="radio" value="propietario"> <strong>Tengo un piso</strong><span>Publica tu anuncio y habla con inquilinos</span></label>
          <label :class="{ on: form.role === 'inquilino' }"><input v-model="form.role" type="radio" value="inquilino"> <strong>Busco piso</strong><span>Escribe a propietarios sin dar tu teléfono</span></label>
        </div>
        <form class="form" novalidate @submit.prevent="submit">
          <input v-model="form.website" class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="field">
            <label for="rg-name">Nombre</label>
            <input id="rg-name" v-model="form.name" class="input" autocomplete="name" required :aria-invalid="!!errors.name">
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </div>
          <div class="field">
            <label for="rg-email">Correo electrónico</label>
            <input id="rg-email" v-model="form.email" class="input" type="email" autocomplete="email" required :aria-invalid="!!errors.email">
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>
          <div class="field">
            <label for="rg-phone">Teléfono <span class="muted small">(opcional, no se muestra)</span></label>
            <input id="rg-phone" v-model="form.phone" class="input" type="tel" autocomplete="tel">
          </div>
          <div class="field">
            <label for="rg-pass">Contraseña</label>
            <input id="rg-pass" v-model="form.password" class="input" type="password" autocomplete="new-password" minlength="10" required :aria-invalid="!!errors.password">
            <span class="hint">Al menos 10 caracteres.</span>
            <span v-if="errors.password" class="error">{{ errors.password }}</span>
          </div>
          <label class="check"><input v-model="form.consent" type="checkbox"> <span>Acepto las <NuxtLink to="/legal/condiciones" target="_blank">condiciones de uso</NuxtLink> y la <NuxtLink to="/legal/privacidad" target="_blank">política de privacidad</NuxtLink>.</span></label>
          <span v-if="errors.consent" class="error">{{ errors.consent }}</span>
          <label class="check"><input v-model="form.adult" type="checkbox"> <span>Soy mayor de edad.</span></label>
          <span v-if="errors.adult" class="error">{{ errors.adult }}</span>
          <p v-if="error" class="err" role="alert">{{ error }}</p>
          <button class="btn btn-primary" type="submit" :disabled="pending">{{ pending ? 'Creando…' : 'Crear cuenta' }}</button>
        </form>
        <p class="small muted alt">¿Ya tienes cuenta? <NuxtLink :to="{ path: '/cuenta/entrar', query: route.query }">Entra</NuxtLink></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 520px; }
.box { display: grid; gap: 10px; justify-items: stretch; }
.box > .badge { justify-self: start; }
h1 { font-size: 2rem; margin: 0; }
.roles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.roles label { display: grid; gap: 2px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 14px; cursor: pointer; font-size: 0.95rem; }
.roles label span { font-size: 0.8rem; color: var(--muted); }
.roles label.on { border-color: var(--ink); box-shadow: inset 0 0 0 1px var(--ink); background: var(--lime-soft); }
.roles input { position: absolute; opacity: 0; pointer-events: none; }
.form { display: grid; gap: 14px; margin-top: 6px; }
.check { display: flex; gap: 10px; align-items: flex-start; font-size: 0.9rem; }
.check input { margin-top: 3px; accent-color: var(--green); }
.error { color: var(--danger); font-size: 0.85rem; }
.err { color: var(--danger); margin: 0; font-size: 0.92rem; }
.alt { margin: 6px 0 0; }
@media (max-width: 420px) { .roles { grid-template-columns: 1fr; } }
</style>
