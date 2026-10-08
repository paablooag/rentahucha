<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
useHead({ title: is404.value ? 'Página no encontrada' : 'Error' })
</script>

<template>
  <NuxtLayout>
    <section class="section">
      <div class="container center">
        <span class="eyebrow">{{ error.statusCode }}</span>
        <h1>{{ is404 ? 'Esta página no existe' : 'Algo ha fallado' }}</h1>
        <p class="lead">{{ is404 ? 'Puede que el enlace esté mal o que la hayamos movido.' : 'Inténtalo de nuevo en unos minutos.' }}</p>
        <button class="btn btn-primary" type="button" @click="clearError({ redirect: '/' })">Volver al inicio</button>
      </div>
    </section>
  </NuxtLayout>
</template>
