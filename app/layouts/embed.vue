<script setup lang="ts">
// Páginas que otras webs insertan con un iframe (/embed/*): sin cabecera ni pie, fondo blanco.
useHead({ bodyAttrs: { class: 'is-embed' } })
</script>

<template>
  <main class="embed-doc">
    <slot />
  </main>
</template>

<style>
body.is-embed { background: #fff; }
.embed-doc { padding: 16px; max-width: 760px; margin: 0 auto; }
</style>
