<script setup lang="ts">
useSeoMeta({ title: 'Darse de baja', robots: 'noindex' })
const route = useRoute()
const state = ref<'idle' | 'ok' | 'error'>('idle')
const msg = ref('')
async function cancel() {
  try {
    await $fetch('/api/baja', { method: 'POST', body: { token: route.query.token } })
    state.value = 'ok'
    msg.value = 'Te hemos dado de baja. No recibirás más correos del aviso del IRAV ni de la newsletter.'
  }
  catch (e) { state.value = 'error'; msg.value = apiError(e).message }
}
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <div class="card card-shadow box">
        <h1>Darse de baja</h1>
        <template v-if="state === 'idle'">
          <p>¿Quieres dejar de recibir el aviso del IRAV y las novedades de RentaHucha?</p>
          <button type="button" class="btn btn-dark" @click="cancel">Sí, darme de baja</button>
        </template>
        <p v-else :class="{ err: state === 'error' }" role="status">{{ msg }}</p>
        <NuxtLink to="/herramientas/subida-alquiler-irav" class="small">Consultar el último IRAV</NuxtLink>
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
