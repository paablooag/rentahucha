<script setup lang="ts">
useHead({ title: 'Panel', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const { data: me } = await useFetch<{ user: string; weakPassword: boolean }>('/api/admin/me')
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })

const links = [
  { to: '/admin', label: 'Resumen', icon: 'chart', exact: true },
  { to: '/admin/interesados', label: 'Interesados', icon: 'users' },
  { to: '/admin/newsletter', label: 'Newsletter', icon: 'bell' },
  { to: '/admin/blog', label: 'Blog', icon: 'file' },
]

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}

const isActive = (l: { to: string; exact?: boolean }) => (l.exact ? route.path === l.to : route.path.startsWith(l.to))
</script>

<template>
  <div class="admin">
    <aside class="sidebar" :class="{ open }">
      <div class="brand">
        <NuxtLink to="/admin" class="logo-link"><AppLogo light /></NuxtLink>
        <span class="tag">Panel</span>
      </div>
      <nav>
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="item" :class="{ active: isActive(l) }">
          <AppIcon :name="l.icon" :size="18" /> {{ l.label }}
        </NuxtLink>
      </nav>
      <div class="bottom">
        <NuxtLink to="/" target="_blank" class="item"><AppIcon name="home" :size="18" /> Ver la web</NuxtLink>
        <div class="user">
          <span>{{ me?.user }}</span>
          <button type="button" class="logout" @click="logout">Salir</button>
        </div>
      </div>
    </aside>

    <div class="main">
      <header class="topbar">
        <button type="button" class="menu" aria-label="Menú" :aria-expanded="open" @click="open = !open"><AppIcon :name="open ? 'close' : 'menu'" :size="22" /></button>
        <span class="crumb">{{ links.find(isActive)?.label ?? 'Panel' }}</span>
      </header>
      <div v-if="me?.weakPassword" class="warn" role="alert">
        <AppIcon name="alert" :size="18" />
        <span>Estás usando una contraseña débil. Vale para probar en local, pero en producción el acceso se bloqueará hasta que pongas una de al menos 12 caracteres en <code>NUXT_ADMIN_PASSWORD</code>.</span>
      </div>
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin { min-height: 100vh; display: grid; grid-template-columns: 1fr; background: var(--off); }
@media (min-width: 900px) { .admin { grid-template-columns: 240px 1fr; } }
.sidebar { background: var(--black); color: #cfcfcf; padding: 20px 14px; display: flex; flex-direction: column; gap: 24px; }
@media (min-width: 900px) { .sidebar { position: sticky; top: 0; height: 100vh; } }
@media (max-width: 899px) {
  .sidebar { position: fixed; inset: 0 auto 0 0; width: 260px; z-index: 50; transform: translateX(-100%); transition: transform 0.2s; }
  .sidebar.open { transform: none; box-shadow: var(--shadow-lg); }
}
.brand { display: flex; align-items: center; justify-content: space-between; padding: 0 6px; }
.logo-link { text-decoration: none; }
.tag { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink); background: var(--lime); padding: 3px 8px; border-radius: 999px; }
nav { display: grid; gap: 4px; }
.item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; color: #cfcfcf; text-decoration: none; font-size: 0.95rem; }
.item:hover { background: rgba(255, 255, 255, 0.06); color: #fff; }
.item.active { background: rgba(224, 251, 0, 0.12); color: var(--lime); }
.bottom { margin-top: auto; display: grid; gap: 8px; }
.user { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-top: 1px solid #222; font-size: 0.9rem; }
.logout { font: inherit; background: none; border: 1px solid #333; color: #cfcfcf; border-radius: 999px; padding: 4px 12px; cursor: pointer; }
.logout:hover { border-color: #fff; color: #fff; }
.main { min-width: 0; display: flex; flex-direction: column; }
.topbar { display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: #fff; border-bottom: 1px solid var(--line); }
.menu { display: none; background: var(--grey-01); border: 0; border-radius: 10px; width: 40px; height: 40px; place-items: center; cursor: pointer; }
@media (max-width: 899px) { .menu { display: grid; } }
.crumb { font-weight: 600; }
.warn { display: flex; gap: 10px; align-items: flex-start; margin: 16px 24px 0; padding: 12px 16px; border-radius: 12px; background: #fff4e5; color: #7a4a00; font-size: 0.9rem; }
.warn svg { flex: none; margin-top: 2px; }
.warn code { background: rgba(0, 0, 0, 0.06); padding: 1px 6px; border-radius: 6px; }
.content { padding: 24px; }
@media (min-width: 900px) { .content { padding: 32px; } }
</style>
