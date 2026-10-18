<script setup lang="ts">
definePageMeta({ middleware: 'cuenta' })
useSeoMeta({ title: 'Mensajes', robots: 'noindex' })
const { user } = useAccount()

interface Conv { id: string; propertyId: string; propertyTitle: string; propertyCity: string; propertyStatus: string; photoId: string | null; otherName: string; lastMessageAt: string; lastBody: string; unread: number }
const { data: convs, refresh } = await useFetch<Conv[]>('/api/conversaciones', { default: () => [] })

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => { timer = setInterval(() => { if (!document.hidden) refresh() }, 15_000) })
onBeforeUnmount(() => clearInterval(timer))

const when = (d: string) => {
  const date = new Date(d)
  const today = new Date().toDateString() === date.toDateString()
  return new Intl.DateTimeFormat('es-ES', today ? { hour: '2-digit', minute: '2-digit' } : { day: 'numeric', month: 'short' }).format(date)
}
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <AccountNav />
      <h1>Mensajes</h1>
      <div v-if="!convs.length" class="card empty">
        <p v-if="user?.role === 'propietario'">Cuando alguien se interese por uno de tus pisos publicados, su mensaje aparecerá aquí.</p>
        <p v-else>Aún no has escrito a ningún propietario. <NuxtLink to="/pisos">Busca un piso</NuxtLink> y pulsa «Escribir al propietario».</p>
      </div>
      <ul v-else class="inbox">
        <li v-for="c in convs" :key="c.id">
          <NuxtLink :to="`/mi-cuenta/mensajes/${c.id}`" :class="{ unread: c.unread }">
            <span class="thumb"><img v-if="c.photoId" :src="`/api/fotos/${c.photoId}`" alt="" loading="lazy"></span>
            <span class="body">
              <span class="top"><strong>{{ c.otherName }}</strong><span class="muted small">{{ when(c.lastMessageAt) }}</span></span>
              <span class="small muted prop">{{ c.propertyTitle }} · {{ c.propertyCity }}</span>
              <span class="last">{{ c.lastBody }}</span>
            </span>
            <span v-if="c.unread" class="badge-n">{{ c.unread }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 820px; }
h1 { font-size: 2.2rem; margin: 0 0 16px; }
.empty p { margin: 0; }
.inbox { list-style: none; padding: 0; margin: 0; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: #fff; }
.inbox li + li { border-top: 1px solid var(--line); }
.inbox a { display: flex; gap: 14px; align-items: center; padding: 14px 16px; color: var(--ink); text-decoration: none; }
.inbox a:hover { background: #fafafa; }
.thumb { width: 56px; height: 56px; border-radius: 12px; overflow: hidden; background: var(--grey-01); flex: none; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.body { display: grid; gap: 2px; flex: 1; min-width: 0; }
.top { display: flex; justify-content: space-between; gap: 8px; }
.prop, .last { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.last { color: var(--muted); font-size: 0.92rem; }
.unread .last { color: var(--ink); font-weight: 600; }
.badge-n { background: var(--lime); border-radius: 999px; font-size: 0.75rem; font-weight: 700; min-width: 22px; height: 22px; display: grid; place-items: center; padding: 0 6px; }
</style>
