<script setup lang="ts">
const open = ref(false)
const scrolled = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })

function onScroll() {
  scrolled.value = window.scrollY > 24
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const links = [
  { to: '/propietarios', label: 'Propietarios' },
  { to: '/inquilinos', label: 'Inquilinos' },
  { to: '/como-funciona', label: 'Cómo funciona' },
  { to: '/herramientas', label: 'Herramientas' },
]
</script>

<template>
  <header class="header" :class="{ scrolled: scrolled || open }">
    <div class="bar">
      <NuxtLink to="/" class="brand" aria-label="Inicio">
        <AppLogo light />
      </NuxtLink>

      <nav class="nav" :class="{ open }" aria-label="Principal">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="nav-link">{{ l.label }}</NuxtLink>
        <div class="nav-cta">
          <NuxtLink to="/inquilinos#pasaporte" class="btn btn-sm cta-ghost">Busco piso</NuxtLink>
          <NuxtLink to="/propietarios#alta" class="btn btn-sm btn-primary">Soy propietario <AppIcon name="arrow" :size="16" /></NuxtLink>
        </div>
      </nav>

      <button class="toggle" type="button" :aria-expanded="open" aria-label="Menú" @click="open = !open">
        <AppIcon :name="open ? 'close' : 'menu'" :size="22" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed; z-index: 100; top: 16px; left: 0; right: 0;
  width: 94%; max-width: 1200px; margin: 0 auto;
  border-radius: 40px; border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.55);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  transition: background 0.2s, box-shadow 0.2s;
}
.header.scrolled { background: rgba(0, 0, 0, 0.78); box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); }
.bar { display: flex; align-items: center; justify-content: space-between; height: var(--header-h); padding: 0 12px 0 20px; gap: 16px; }
.brand { text-decoration: none; }
.nav { display: flex; align-items: center; gap: 2px; }
.nav-link {
  color: #e8e8e8; text-decoration: none; font-weight: 400; font-size: 0.95rem;
  padding: 8px 14px; border-radius: 999px; transition: background 0.2s, color 0.2s;
}
.nav-link:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
.nav-link.router-link-active { color: var(--lime); }
.nav-cta { display: flex; gap: 8px; margin-left: 10px; }
.cta-ghost { background: rgba(255, 255, 255, 0.1); color: #fff; box-shadow: none; }
.cta-ghost:hover { background: rgba(255, 255, 255, 0.18); }
.toggle { display: none; background: rgba(255, 255, 255, 0.1); border: 0; color: #fff; cursor: pointer; width: 42px; height: 42px; border-radius: 50%; place-items: center; }

@media (max-width: 960px) {
  .toggle { display: grid; }
  .header.scrolled { border-radius: 24px; }
  .nav {
    display: none; position: absolute; top: calc(var(--header-h) + 8px); left: 0; right: 0;
    flex-direction: column; align-items: stretch; gap: 2px;
    background: rgba(0, 0, 0, 0.92); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 24px; padding: 12px;
  }
  .nav.open { display: flex; }
  .nav-link { padding: 14px 16px; font-size: 1.05rem; }
  .nav-cta { margin: 8px 0 0; flex-direction: column; }
}
</style>
