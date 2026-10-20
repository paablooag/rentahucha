<script setup lang="ts">
// Logo para los correos (los clientes de correo no muestran SVG). Se captura a public/email/logo.png con Playwright.
definePageMeta({ layout: false })
useSeoMeta({ title: 'Logo para correos', robots: 'noindex' })
</script>

<template>
  <div class="wrap"><div id="logo"><AppLogo light /></div></div>
</template>

<style scoped>
.wrap { background: #141414; padding: 0; display: inline-block; }
#logo { display: inline-flex; padding: 6px 4px; background: #141414; font-family: 'Inter Tight Variable', 'Inter Tight', system-ui, sans-serif; }
#logo :deep(.logo) { font-size: 2.4rem; gap: 14px; }
#logo :deep(svg) { width: 56px; height: 56px; }
</style>
