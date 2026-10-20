<script setup lang="ts">
useSeoMeta({ title: 'Nueva contraseña', robots: 'noindex' })
const route = useRoute()
const { refresh } = useAccount()
const password = ref('')
const pending = ref(false)
const error = ref('')
async function submit() {
  pending.value = true
  error.value = ''
  try {
    await $fetch('/api/cuenta/restablecer', { method: 'POST', body: { token: route.query.token, password: password.value } })
    await refresh()
    await navigateTo('/mi-cuenta')
  }
  catch (e) { error.value = apiError(e).message }
  finally { pending.value = false }
}
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <div class="card card-shadow box">
        <h1>Elige una contraseña nueva</h1>
        <form class="form" @submit.prevent="submit">
          <div class="field">
            <label for="rs-pass">Contraseña nueva</label>
            <input id="rs-pass" v-model="password" class="input" type="password" minlength="10" required autocomplete="new-password">
            <span class="hint">Al menos 10 caracteres.</span>
          </div>
          <p v-if="error" class="err" role="alert">{{ error }} <NuxtLink v-if="error.includes('caducado')" to="/cuenta/recuperar">Pedir otro enlace</NuxtLink></p>
          <button class="btn btn-primary" type="submit" :disabled="pending || password.length < 10">{{ pending ? 'Guardando…' : 'Guardar y entrar' }}</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 480px; }
.box { display: grid; gap: 10px; }
h1 { font-size: 2rem; margin: 0; }
.form { display: grid; gap: 14px; }
.err { color: var(--danger); margin: 0; }
</style>
