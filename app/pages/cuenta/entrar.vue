<script setup lang="ts">
useSeoMeta({ title: 'Entrar', robots: 'noindex' })
const route = useRoute()
const { refresh } = useAccount()

const email = ref('')
const password = ref('')
const pending = ref(false)
const error = ref('')

const next = computed(() => (typeof route.query.next === 'string' && route.query.next.startsWith('/') && !route.query.next.startsWith('//') ? route.query.next : '/mi-cuenta'))

async function submit() {
  pending.value = true
  error.value = ''
  try {
    await $fetch('/api/cuenta/login', { method: 'POST', body: { email: email.value, password: password.value } })
    await refresh()
    await navigateTo(next.value)
  }
  catch (e) { error.value = apiError(e).message }
  finally { pending.value = false }
}
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <div class="card card-shadow box">
        <h1>Entrar</h1>
        <p class="muted">Accede a tus pisos y a tus mensajes.</p>
        <form class="form" @submit.prevent="submit">
          <div class="field">
            <label for="in-email">Correo electrónico</label>
            <input id="in-email" v-model="email" class="input" type="email" required autocomplete="email">
          </div>
          <div class="field">
            <label for="in-pass">Contraseña</label>
            <input id="in-pass" v-model="password" class="input" type="password" required autocomplete="current-password">
          </div>
          <p v-if="error" class="err" role="alert">{{ error }}</p>
          <button class="btn btn-primary" type="submit" :disabled="pending">{{ pending ? 'Entrando…' : 'Entrar' }}</button>
        </form>
        <p class="small muted alt">¿No tienes cuenta? <NuxtLink :to="{ path: '/cuenta/registro', query: route.query }">Créala gratis</NuxtLink></p>
        <p class="small muted">¿Has olvidado la contraseña? Escríbenos a <a :href="`mailto:${useAppConfig().brand.email}`">{{ useAppConfig().brand.email }}</a> desde el correo de tu cuenta y te ayudamos.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 480px; }
.box { display: grid; gap: 8px; }
h1 { font-size: 2rem; margin: 0; }
.form { display: grid; gap: 14px; margin: 12px 0 6px; }
.err { color: var(--danger); margin: 0; font-size: 0.92rem; }
.alt { margin: 10px 0 0; }
</style>
