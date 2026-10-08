<script setup lang="ts">
import '~/assets/css/dossier.css'

useHead({ bodyAttrs: { class: 'is-print' } })
</script>

<template>
  <div class="print-doc">
    <slot />
  </div>
</template>
