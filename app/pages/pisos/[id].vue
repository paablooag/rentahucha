<script setup lang="ts">
const route = useRoute()
const { user, refresh } = useAccount()
await refresh()

const { data, error } = await useFetch<{ property: PublicProperty; conversationId: string | null; saved: boolean; isOwner: boolean }>(() => `/api/pisos/${route.params.id}`)
if (error.value || !data.value) throw createError({ statusCode: 404, statusMessage: 'Piso no encontrado', fatal: true })
const p = computed(() => data.value!.property)

const title = computed(() => `${p.value.title} · ${formatEuro(p.value.rent)}/mes en ${p.value.city}`)
useSeoMeta({
  title: () => title.value,
  description: () => `${p.value.propertyType} en alquiler en ${p.value.district ? `${p.value.district}, ` : ''}${p.value.city}: ${p.value.bedrooms} hab., ${p.value.bathrooms} baños${p.value.sizeM2 ? `, ${p.value.sizeM2} m²` : ''}. ${p.value.description.slice(0, 110)}`,
  ogImage: () => (p.value.photos[0] ? `https://rentahucha.es/api/fotos/${p.value.photos[0].id}` : 'https://rentahucha.es/og/default.png'),
})

const current = ref(0)
const photo = computed(() => p.value.photos[current.value])
const go = (d: number) => { const n = p.value.photos.length; if (n) current.value = (current.value + d + n) % n }

const message = ref('')
const sending = ref(false)
const sendError = ref('')
watchEffect(() => {
  if (!message.value && p.value) message.value = `Hola, me interesa el piso de ${p.value.district || p.value.city}. `
})
async function contact() {
  sending.value = true
  sendError.value = ''
  try {
    const r = await $fetch<{ conversationId: string }>(`/api/pisos/${p.value.id}/contactar`, { method: 'POST', body: { message: message.value } })
    await navigateTo(`/mi-cuenta/mensajes/${r.conversationId}`)
  }
  catch (e) { sendError.value = apiError(e).message }
  finally { sending.value = false }
}
const saved = ref(data.value!.saved)
async function toggleSave() {
  if (!user.value) return navigateTo({ path: '/cuenta/registro', query: { tipo: 'inquilino', next: `/pisos/${p.value.id}` } })
  saved.value = !saved.value
  try { saved.value = (await $fetch<{ saved: boolean }>(`/api/favoritos/${p.value.id}`, { method: 'POST' })).saved }
  catch { saved.value = !saved.value }
}
const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${d}T12:00:00`))
const availableNow = computed(() => !p.value.availableFrom || new Date(`${p.value.availableFrom}T12:00:00`) <= new Date())
</script>

<template>
  <section v-if="data" class="section">
    <div class="container">
      <nav class="crumbs small"><NuxtLink to="/pisos">Pisos</NuxtLink> / <NuxtLink :to="{ path: '/pisos', query: { ciudad: p.city } }">{{ p.city }}</NuxtLink></nav>

      <div class="layout">
        <div class="main">
          <div class="gallery">
            <div class="stage">
              <img v-if="photo" :src="`/api/fotos/${photo.id}`" :alt="`${p.title}, foto ${current + 1}`">
              <template v-if="p.photos.length > 1">
                <button type="button" class="nav prev" aria-label="Foto anterior" @click="go(-1)">‹</button>
                <button type="button" class="nav next" aria-label="Foto siguiente" @click="go(1)">›</button>
                <span class="count">{{ current + 1 }}/{{ p.photos.length }}</span>
              </template>
              <span v-if="p.status === 'alquilado'" class="tag">Alquilado</span>
            </div>
            <div v-if="p.photos.length > 1" class="thumbs">
              <button v-for="(f, i) in p.photos" :key="f.id" type="button" :class="{ on: i === current }" :aria-label="`Ver foto ${i + 1}`" @click="current = i">
                <img :src="`/api/fotos/${f.id}`" alt="" loading="lazy">
              </button>
            </div>
          </div>

          <h1>{{ p.title }}</h1>
          <p class="muted where">{{ p.propertyType }} · {{ p.district ? `${p.district}, ` : '' }}{{ p.city }}</p>

          <ul class="facts">
            <li><strong>{{ formatEuro(p.rent) }}</strong><span>al mes{{ p.expensesIncl ? ', comunidad incluida' : '' }}</span></li>
            <li><strong>{{ p.bedrooms === 0 ? 'Estudio' : p.bedrooms }}</strong><span>{{ p.bedrooms === 0 ? '' : p.bedrooms === 1 ? 'habitación' : 'habitaciones' }}</span></li>
            <li><strong>{{ p.bathrooms }}</strong><span>{{ p.bathrooms === 1 ? 'baño' : 'baños' }}</span></li>
            <li v-if="p.sizeM2"><strong>{{ p.sizeM2 }} m²</strong><span>superficie</span></li>
          </ul>

          <h2>Descripción</h2>
          <p class="desc">{{ p.description }}</p>

          <h2>Características</h2>
          <dl class="specs">
            <dt>Tipo de alquiler</dt><dd>{{ p.stayType }}</dd>
            <dt>Mobiliario</dt><dd>{{ p.furnished }}</dd>
            <dt v-if="p.floor">Planta</dt><dd v-if="p.floor">{{ p.floor }}</dd>
            <dt>Disponible</dt><dd>{{ availableNow ? 'Ya' : `Desde el ${date(p.availableFrom!)}` }}</dd>
            <dt>Certificado energético</dt><dd>{{ p.energyRating || '—' }}</dd>
          </dl>
          <div v-if="p.features.length" class="chips">
            <span v-for="x in p.features" :key="x" class="chip">{{ x }}</span>
          </div>
        </div>

        <aside class="side">
          <div class="card contact">
            <div class="price-row">
              <div class="price">{{ formatEuro(p.rent) }}<span>/mes</span></div>
              <button v-if="!data.isOwner" type="button" class="save" :class="{ on: saved }" :aria-pressed="saved" @click="toggleSave">{{ saved ? '♥ Guardado' : '♡ Guardar' }}</button>
            </div>
            <p class="small muted">Anuncio de {{ p.ownerName }}, particular · revisado por RentaHucha</p>

            <template v-if="data.isOwner">
              <p>Es tu anuncio.</p>
              <NuxtLink :to="`/mi-cuenta/pisos/${p.id}`" class="btn btn-dark">Editar anuncio</NuxtLink>
            </template>
            <template v-else-if="p.status === 'alquilado'">
              <p>Este piso ya está alquilado.</p>
              <NuxtLink :to="{ path: '/pisos', query: { ciudad: p.city } }" class="btn btn-ghost">Ver más pisos en {{ p.city }}</NuxtLink>
            </template>
            <template v-else-if="!user">
              <p>Crea tu cuenta gratis para escribir al propietario. No tendrás que dar tu teléfono.</p>
              <NuxtLink :to="{ path: '/cuenta/registro', query: { tipo: 'inquilino', next: `/pisos/${p.id}` } }" class="btn btn-primary">Escribir al propietario</NuxtLink>
              <NuxtLink :to="{ path: '/cuenta/entrar', query: { next: `/pisos/${p.id}` } }" class="small">Ya tengo cuenta</NuxtLink>
            </template>
            <template v-else-if="user.role === 'propietario'">
              <p class="small">Tu cuenta es de propietario. Para escribir a otros propietarios necesitas una cuenta de inquilino.</p>
            </template>
            <template v-else-if="data.conversationId">
              <p>Ya has escrito al propietario.</p>
              <NuxtLink :to="`/mi-cuenta/mensajes/${data.conversationId}`" class="btn btn-primary">Ver conversación</NuxtLink>
            </template>
            <form v-else class="form" @submit.prevent="contact">
              <label for="ct-msg" class="small"><strong>Escribe al propietario</strong></label>
              <textarea id="ct-msg" v-model="message" class="input" rows="5" maxlength="4000" placeholder="Preséntate: quién vivirá, cuándo te mudarías y por cuánto tiempo." />
              <p v-if="sendError" class="err small" role="alert">{{ sendError }}</p>
              <button class="btn btn-primary" type="submit" :disabled="sending || message.trim().length < 10">{{ sending ? 'Enviando…' : 'Enviar mensaje' }}</button>
              <p class="tiny muted">Nunca pagues señales ni envíes dinero antes de visitar el piso.</p>
            </form>
          </div>
          <div class="note note-green hucha">
            <strong>Con RentaHucha, desde el lanzamiento</strong>
            <p>Sin aval: el inquilino llena cada mes una hucha a su nombre y la recupera con un 10 % extra si el alquiler termina bien.</p>
            <NuxtLink to="/como-funciona" class="small">Cómo funciona</NuxtLink>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.crumbs { margin-bottom: 14px; color: var(--muted); }
.crumbs a { color: var(--muted); }
.layout { display: grid; gap: 32px; }
@media (min-width: 960px) { .layout { grid-template-columns: minmax(0, 1fr) 340px; align-items: start; } .side { position: sticky; top: 96px; } }
.main { min-width: 0; }
.stage { position: relative; aspect-ratio: 3 / 2; background: var(--grey-01); border-radius: 18px; overflow: hidden; }
.stage img { width: 100%; height: 100%; object-fit: cover; display: block; }
.nav { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 50%; border: 0; background: rgba(255, 255, 255, 0.9); font-size: 1.5rem; cursor: pointer; line-height: 1; }
.prev { left: 12px; }
.next { right: 12px; }
.count { position: absolute; bottom: 12px; right: 12px; background: rgba(0, 0, 0, 0.6); color: #fff; font-size: 0.8rem; padding: 3px 10px; border-radius: 999px; }
.tag { position: absolute; top: 12px; left: 12px; background: var(--ink); color: #fff; font-size: 0.8rem; font-weight: 600; padding: 4px 12px; border-radius: 999px; }
.thumbs { display: flex; gap: 8px; margin-top: 8px; overflow-x: auto; }
.thumbs button { flex: none; width: 84px; aspect-ratio: 4 / 3; padding: 0; border: 2px solid transparent; border-radius: 10px; overflow: hidden; cursor: pointer; background: none; }
.thumbs button.on { border-color: var(--ink); }
.thumbs img { width: 100%; height: 100%; object-fit: cover; display: block; }
h1 { font-size: clamp(1.6rem, 3vw, 2.2rem); margin: 24px 0 4px; }
.where { margin: 0 0 18px; }
.facts { list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-wrap: wrap; gap: 10px; }
.facts li { border: 1px solid var(--line); border-radius: 14px; padding: 10px 16px; display: grid; background: #fff; }
.facts strong { font-size: 1.2rem; }
.facts span { font-size: 0.82rem; color: var(--muted); }
h2 { font-size: 1.25rem; margin: 24px 0 10px; }
.desc { white-space: pre-line; margin: 0; }
.specs { display: grid; grid-template-columns: max-content 1fr; gap: 8px 20px; margin: 0 0 14px; }
.specs dt { color: var(--muted); }
.specs dd { margin: 0; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { padding: 6px 12px; border-radius: 999px; background: var(--grey-01); font-size: 0.88rem; }
.contact { display: grid; gap: 10px; }
.contact p { margin: 0; }
.price { font-size: 1.8rem; font-weight: 700; letter-spacing: -0.02em; }
.price span { font-size: 0.95rem; font-weight: 400; color: var(--muted); }
.form { display: grid; gap: 8px; }
.err { color: var(--danger); margin: 0; }
.tiny { font-size: 0.75rem; margin: 0; }
.hucha { margin-top: 14px; display: grid; gap: 4px; }
.hucha p { margin: 0; }
.price-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.save { font: inherit; font-size: 0.88rem; border: 1px solid var(--line); background: #fff; border-radius: 999px; padding: 6px 12px; cursor: pointer; white-space: nowrap; }
.save.on { background: var(--lime-soft); border-color: var(--green); }
</style>
