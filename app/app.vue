<script setup lang="ts">
const { brand } = useAppConfig()

useHead({
  titleTemplate: title => (title ? `${title} · ${brand.name}` : `${brand.name} · Alquila con renta garantizada y hucha de ahorro`),
})

useSeoMeta({
  description: 'Gestión de alquiler con renta garantizada para propietarios y una hucha de garantía que el inquilino recupera con premio. En toda España.',
  ogSiteName: brand.name,
  ogType: 'website',
  ogLocale: 'es_ES',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
