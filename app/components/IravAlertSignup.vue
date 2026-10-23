<script setup lang="ts">
// Alta en el aviso mensual del IRAV por correo (newsletter con origen «irav», server/utils/irav.ts).
const { subscribe, pending, error } = useNewsletter()

const email = ref('')
const consent = ref(false)
const website = ref('')
const done = ref(false)

async function onSubmit() {
  if (!consent.value || website.value) return
  done.value = await subscribe(email.value.trim().toLowerCase(), 'irav')
  if (done.value) trackEvent('aviso_irav')
}
</script>

<template>
  <div id="aviso-irav" class="dl">
    <div class="intro">
      <span class="badge">Gratis · un correo al mes</span>
      <h2>Recibe el IRAV cada mes</h2>
      <p>Cuando el INE publique el índice, te enviamos el dato y cuánto puedes subir el alquiler con la normativa vigente. Para no tener que buscarlo cuando tu contrato cumpla año.</p>
    </div>

    <div v-if="done" class="ok-box" role="status">
      <p><AppIcon name="check" :size="18" /> ¡Hecho! Te hemos enviado el último IRAV y te escribiremos con cada dato nuevo.</p>
      <p class="small">¿Tu renta supera el índice de referencia? Te lo decimos en una <NuxtLink to="/valoracion-alquiler">valoración gratis</NuxtLink>.</p>
    </div>

    <form v-else class="form" @submit.prevent="onSubmit">
      <input v-model="website" class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="row">
        <label for="irav-email" class="sr-only">Tu correo electrónico</label>
        <input id="irav-email" v-model="email" class="input" type="email" required autocomplete="email" placeholder="tu@correo.com">
        <button class="btn btn-primary" type="submit" :disabled="pending || !consent">{{ pending ? 'Enviando…' : 'Avisadme' }}</button>
      </div>
      <label class="consent">
        <input v-model="consent" type="checkbox" required>
        <span>Acepto recibir el aviso del IRAV y correos informativos de RentaHucha y la <NuxtLink to="/legal/privacidad">política de privacidad</NuxtLink>. Cada correo trae un enlace para darme de baja.</span>
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
.ok-box p { margin: 0; }
</style>
