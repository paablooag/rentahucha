<script setup lang="ts">
const { brand } = useAppConfig()

// URL canónica sin parámetros (los filtros del blog no compiten con la página principal en buscadores).
// Las páginas que necesitan otra la sobrescriben con su propio useHead.
const route = useRoute()
const canonical = computed(() => `https://${brand.domain}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`)

useHead({
  titleTemplate: title => (title ? `${title} · ${brand.name}` : `${brand.name} · Inquilinos verificados y hucha anti-impago`),
  link: [{ rel: 'canonical', href: canonical }],
})

useSeoMeta({
  description: 'Alquiler con inquilinos verificados y una hucha que el inquilino llena cada mes: si hay impago, su saldo pasa al propietario; si cumple, la recupera con premio. En toda España.',
  ogSiteName: brand.name,
  ogType: 'website',
  ogLocale: 'es_ES',
  ogUrl: () => canonical.value,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
