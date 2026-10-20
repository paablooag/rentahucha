<script setup lang="ts">
useSeoMeta({ title: 'Cancelar alerta', robots: 'noindex' })
const route = useRoute()
const state = ref<'idle' | 'ok' | 'error'>('idle')
const msg = ref('')
async function cancel() {
  try {
    const r = await $fetch<{ city: string }>('/api/alertas/baja', { method: 'POST', body: { token: route.query.token } })
    state.value = 'ok'
    msg.value = `Hemos cancelado tu alerta de pisos en ${r.city}. No recibirás más correos de esta alerta.`
  }
  catch (e) { state.value = 'error'; msg.value = apiError(e).message }
}
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <div class="card card-shadow box">
        <h1>Cancelar alerta de pisos</h1>
        <template v-if="state === 'idle'">
          <p>¿Quieres dejar de recibir correos de esta alerta?</p>
          <button type="button" class="btn btn-dark" @click="cancel">Sí, cancelarla</button>
        </template>
        <p v-else :class="{ err: state === 'error' }" role="status">{{ msg }}</p>
        <NuxtLink to="/pisos" class="small">Ver los pisos publicados</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 520px; }
.box { display: grid; gap: 12px; justify-items: start; }
h1 { font-size: 1.8rem; margin: 0; }
.box p { margin: 0; }
.err { color: var(--danger); }
</style>
