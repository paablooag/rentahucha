<script setup lang="ts">
const route = useRoute()
const { brand } = useAppConfig()

const pages: Record<string, { title: string; body: string[] }> = {
  'aviso-legal': {
    title: 'Aviso legal',
    body: [
      `Este sitio web pertenece a ${brand.name}, proyecto en fase de lanzamiento. Los datos del titular (razón social, NIF y domicilio) se publicarán aquí al constituir la sociedad.`,
      'La información de esta web es orientativa. Las condiciones de la renta garantizada dependen de la póliza de la aseguradora socia y se facilitan antes de contratar.',
      'Las calculadoras y simuladores ofrecen estimaciones con los datos que introduce el usuario y no constituyen asesoramiento jurídico ni financiero.',
    ],
  },
  'privacidad': {
    title: 'Política de privacidad',
    body: [
      `Responsable: ${brand.name}. Contacto: ${brand.email}.`,
      'Finalidad: gestionar la lista de espera, contactarte sobre el lanzamiento del servicio y, si te suscribes a la newsletter, enviarte correos informativos. Base jurídica: tu consentimiento.',
      'Conservación: hasta que te des de baja o, como máximo, 24 meses desde el alta. No cedemos tus datos a terceros salvo obligación legal.',
      'Derechos: puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a nuestro email, y reclamar ante la AEPD.',
      'Texto provisional pendiente de revisión jurídica antes del lanzamiento.',
    ],
  },
}

const page = computed(() => pages[route.params.slug as string])
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada', fatal: true })
}

useSeoMeta({ title: () => page.value?.title ?? '', robots: 'noindex' })
</script>

<template>
  <section v-if="page" class="section">
    <div class="container prose">
      <h1>{{ page.title }}</h1>
      <p v-for="(p, i) in page.body" :key="i">{{ p }}</p>
    </div>
  </section>
</template>

<style scoped>
.prose { max-width: 760px; }
p { color: var(--muted); }
</style>
