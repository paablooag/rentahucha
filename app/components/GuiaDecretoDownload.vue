<script setup lang="ts">
// Entrega el PDF de la guía del decreto de vivienda a cambio del correo (alta en la newsletter con origen «guia-decreto»).
const PDF = '/dossier/rentahucha-guia-decreto-vivienda-2026.pdf'
const { subscribe, pending, error } = useNewsletter()

const email = ref('')
const consent = ref(false)
const website = ref('')
const done = ref(false)

async function onSubmit() {
  if (!consent.value || website.value) return
  done.value = await subscribe(email.value.trim().toLowerCase(), 'guia-decreto')
  if (done.value) trackEvent('guia_decreto')
}
</script>

<template>
  <div id="guia-decreto" class="dl">
    <div class="intro">
      <span class="badge">PDF gratuito · 5 páginas</span>
      <h2>El decreto de vivienda, en una guía para propietarios</h2>
      <p>Subidas, prórrogas, temporada, IRPF, IVA, IBI y desahucios, con el texto del BOE y el calendario. Te la damos al momento y te avisamos cuando se vote la convalidación.</p>
    </div>

    <div v-if="done" class="ok-box" role="status">
      <p><AppIcon name="check" :size="18" /> ¡Lista! Ya puedes descargarla.</p>
      <a :href="PDF" class="btn btn-primary" download>Descargar la guía (PDF)</a>
      <p class="small">¿Vas a alquilar? Pide una <NuxtLink to="/valoracion-alquiler">valoración gratis</NuxtLink> con el índice oficial o <NuxtLink to="/cuenta/registro">publica tu piso gratis</NuxtLink>.</p>
    </div>

    <form v-else class="form" @submit.prevent="onSubmit">
      <input v-model="website" class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="row">
        <label for="guia-email" class="sr-only">Tu correo electrónico</label>
        <input id="guia-email" v-model="email" class="input" type="email" required autocomplete="email" placeholder="tu@correo.com">
        <button class="btn btn-primary" type="submit" :disabled="pending || !consent">{{ pending ? 'Enviando…' : 'Quiero la guía' }}</button>
      </div>
      <label class="consent">
        <input v-model="consent" type="checkbox" required>
        <span>Acepto recibir correos informativos de RentaHucha y la <NuxtLink to="/legal/privacidad">política de privacidad</NuxtLink>. Puedo darme de baja cuando quiera.</span>
      </label>
      <p v-if="error" class="err" role="alert">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.dl { display: grid; gap: 20px; padding: 28px; border-radius: 20px; background: var(--lime-soft); scroll-margin-top: 90px; margin-top: 40px; }
@media (min-width: 900px) { .dl { grid-template-columns: 1fr 1.1fr; gap: 40px; padding: 36px; align-items: center; } }
.intro h2 { font-size: 1.5rem; margin: 10px 0 6px; }
.intro p { margin: 0; color: var(--muted); }
.form { display: grid; gap: 12px; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
.row .input { flex: 1 1 220px; min-width: 0; background: #fff; }
.row .btn { flex: 0 0 auto; }
.consent { display: flex; gap: 10px; align-items: flex-start; font-size: 0.82rem; color: var(--muted); }
.consent input { margin-top: 3px; accent-color: var(--green); }
.err { margin: 0; color: var(--danger); font-size: 0.9rem; }
.ok-box { display: grid; gap: 12px; justify-items: start; }
</style>
