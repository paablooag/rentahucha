<script setup lang="ts">
useSeoMeta({ title: 'Recuperar contraseña', robots: 'noindex' })
const email = ref('')
const pending = ref(false)
const sent = ref(false)
const error = ref('')
async function submit() {
  pending.value = true
  error.value = ''
  try {
    await $fetch('/api/cuenta/recuperar', { method: 'POST', body: { email: email.value } })
    sent.value = true
  }
  catch (e) { error.value = apiError(e).message }
  finally { pending.value = false }
}
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <div class="card card-shadow box">
        <h1>Recuperar contraseña</h1>
        <template v-if="sent">
          <p>Si hay una cuenta con <strong>{{ email }}</strong>, te hemos enviado un enlace para elegir una contraseña nueva. Caduca en 1 hora.</p>
          <p class="small muted">¿No llega? Mira en correo no deseado o en la pestaña «Notificaciones». Si sigue sin llegar, escríbenos a {{ useAppConfig().brand.email }}.</p>
        </template>
        <form v-else class="form" @submit.prevent="submit">
          <p class="muted">Escribe el correo de tu cuenta y te enviamos un enlace para cambiarla.</p>
          <div class="field">
            <label for="rc-email">Correo electrónico</label>
            <input id="rc-email" v-model="email" class="input" type="email" required autocomplete="email">
          </div>
          <p v-if="error" class="err" role="alert">{{ error }}</p>
          <button class="btn btn-primary" type="submit" :disabled="pending">{{ pending ? 'Enviando…' : 'Enviar enlace' }}</button>
        </form>
        <NuxtLink to="/cuenta/entrar" class="small">← Volver a entrar</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 480px; }
.box { display: grid; gap: 10px; }
h1 { font-size: 2rem; margin: 0; }
.box p { margin: 0; }
.form { display: grid; gap: 14px; }
.err { color: var(--danger); }
</style>
