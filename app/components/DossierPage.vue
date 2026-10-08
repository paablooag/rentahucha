<script setup lang="ts">
defineProps<{ label: string; n: number; dark?: boolean }>()
const { brand } = useAppConfig()

const body = ref<HTMLElement | null>(null)
const fit = ref<HTMLElement | null>(null)

// Si el contenido no cabe en el A4 (fuente distinta, textos más largos…), se reduce
// lo justo con `zoom` para que nunca se monte sobre el pie de página.
async function fitToPage() {
  if (!body.value || !fit.value) return
  await document.fonts?.ready
  fit.value.style.zoom = '1'
  let zoom = 1
  while (body.value.scrollHeight > body.value.clientHeight + 1 && zoom > 0.7) {
    zoom -= 0.02
    fit.value.style.zoom = String(zoom)
  }
}

onMounted(fitToPage)
</script>

<template>
  <section class="d-page" :class="{ dark }">
    <header class="d-head">
      <AppLogo :light="dark" />
      <span>{{ label }}</span>
    </header>
    <div ref="body" class="d-body">
      <div ref="fit" class="d-fit">
        <slot />
      </div>
    </div>
    <footer class="d-foot">
      <span>{{ brand.domain }} · {{ brand.email }}</span>
      <span>{{ String(n).padStart(2, '0') }}</span>
    </footer>
  </section>
</template>

<style scoped>
.d-body { overflow: hidden; }
.d-fit { flex: 1 0 auto; display: flex; flex-direction: column; }
</style>
