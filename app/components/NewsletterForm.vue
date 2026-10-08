<script setup lang="ts">
const { subscribe, pending, error } = useNewsletter()

const email = ref('')
const consent = ref(false)
const done = ref(false)

async function onSubmit() {
  if (!consent.value) return
  done.value = await subscribe(email.value.trim().toLowerCase())
}
</script>

<template>
  <div class="newsletter">
    <div class="intro">
      <h3>Te avisamos de las novedades</h3>
      <p>Lanzamiento, nuevas ciudades y consejos para alquilar mejor. Un correo de vez en cuando, nada de spam.</p>
    </div>

    <p v-if="done" class="done" role="status">
      <span class="ok"><AppIcon name="check" :size="16" /></span>
      ¡Apuntado! Te escribiremos a <strong>{{ email }}</strong>.
    </p>

    <form v-else class="form" @submit.prevent="onSubmit">
      <div class="row">
        <label for="newsletter-email" class="sr-only">Tu correo electrónico</label>
        <input id="newsletter-email" v-model="email" class="field-input" type="email" required autocomplete="email" placeholder="tu@correo.com">
        <button class="btn btn-primary" type="submit" :disabled="pending || !consent">
          {{ pending ? 'Enviando…' : 'Suscribirme' }}
        </button>
      </div>
      <label class="consent">
        <input v-model="consent" type="checkbox" required>
        <span>Acepto recibir correos informativos y la <NuxtLink to="/legal/privacidad">política de privacidad</NuxtLink>. Puedo darme de baja cuando quiera.</span>
      </label>
      <p v-if="error" class="err" role="alert">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.newsletter { display: grid; gap: 20px; align-items: center; padding: 28px; border-radius: 20px; background: #141414; border: 1px solid #232323; }
@media (min-width: 900px) { .newsletter { grid-template-columns: 1fr 1.2fr; gap: 40px; padding: 32px 36px; } }
h3 { color: #fff; font-size: 1.5rem; font-weight: 500; letter-spacing: -0.03em; margin-bottom: 6px; }
.intro p { margin: 0; color: #a8a8a8; }
.form { display: grid; gap: 12px; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
.field-input {
  flex: 1 1 220px; min-width: 0; font: inherit; color: #fff; padding: 13px 20px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.18);
}
.field-input::placeholder { color: #7a7a7a; }
.field-input:focus { outline: none; border-color: var(--lime); box-shadow: 0 0 0 3px rgba(224, 251, 0, 0.25); }
.row .btn { flex: 0 0 auto; }
.consent { display: flex; gap: 10px; align-items: flex-start; font-size: 0.82rem; color: #8d8a8a; }
.consent input { margin-top: 3px; accent-color: var(--lime); }
.consent a { display: inline; padding: 0; color: #cfcfcf; text-decoration: underline; font-size: inherit; }
.done { margin: 0; display: flex; gap: 10px; align-items: center; color: #cfcfcf; }
.done strong { color: #fff; }
.ok { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: var(--lime); color: var(--ink); flex: none; }
.err { margin: 0; color: #ff8a80; font-size: 0.9rem; }
</style>
