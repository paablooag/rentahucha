<script setup lang="ts">
const { brand } = useAppConfig()

useHead({
  titleTemplate: title => (title ? `${title} · ${brand.name}` : `${brand.name} · Inquilinos verificados y hucha anti-impago`),
})

useSeoMeta({
  description: 'Alquiler con inquilinos verificados y una hucha que el inquilino llena cada mes: si hay impago, su saldo pasa al propietario; si cumple, la recupera con premio. En toda España.',
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
