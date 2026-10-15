<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Acceso al panel', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const route = useRoute()
const user = ref('')
const password = ref('')
const pending = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  pending.value = true
  error.value = null
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { user: user.value, password: password.value } })
    const next = typeof route.query.next === 'string' && route.query.next.startsWith('/admin') ? route.query.next : '/admin'
    await navigateTo(next)
  }
  catch (e: unknown) {
    const err = e as { statusMessage?: string; data?: { statusMessage?: string } }
    error.value = err.data?.statusMessage ?? err.statusMessage ?? 'No se ha podido iniciar sesión.'
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="login">
    <form class="box" @submit.prevent="onSubmit">
      <AppLogo light />
      <h1>Panel de administración</h1>
      <div class="field">
        <label for="adm-user">Usuario</label>
        <input id="adm-user" v-model="user" class="input" autocomplete="username" required autofocus>
      </div>
      <div class="field">
        <label for="adm-pass">Contraseña</label>
        <input id="adm-pass" v-model="password" class="input" type="password" autocomplete="current-password" required>
      </div>
      <p v-if="error" class="err" role="alert">{{ error }}</p>
      <button class="btn btn-primary btn-block" type="submit" :disabled="pending">{{ pending ? 'Entrando…' : 'Entrar' }}</button>
      <NuxtLink to="/" class="back">← Volver a la web</NuxtLink>
    </form>
  </div>
</template>

<style scoped>
.login {
  min-height: 100vh; display: grid; place-items: center; padding: 24px;
  background: radial-gradient(circle at 85% 15%, rgba(224, 251, 0, 0.14), transparent 42%), var(--black);
}
.box { width: 100%; max-width: 380px; display: grid; gap: 16px; padding: 32px; border-radius: 20px; background: #141414; border: 1px solid #232323; }
h1 { color: #fff; font-size: 1.5rem; margin: 8px 0 4px; }
.field label { color: #cfcfcf; }
.input { background: #0d0d0d; border-color: #333; color: #fff; }
.err { margin: 0; color: #ff8a80; font-size: 0.9rem; }
.back { color: #8d8a8a; font-size: 0.9rem; text-decoration: none; text-align: center; }
.back:hover { color: #fff; }
</style>
