<script setup lang="ts">
definePageMeta({ middleware: 'cuenta' })
useSeoMeta({ title: 'Editar anuncio', robots: 'noindex' })
const route = useRoute()
const { user } = useAccount()
if (user.value?.role !== 'propietario') await navigateTo('/mi-cuenta')

const { data: piso, error: loadError } = await useFetch<Property>(() => `/api/mis-pisos/${route.params.id}`)
if (loadError.value) throw createError({ statusCode: 404, statusMessage: 'Piso no encontrado', fatal: true })
const isNew = computed(() => route.query.nuevo === '1')

const blockers = computed(() => (piso.value ? publishBlockers(piso.value) : []))
const busy = ref(false)
const msg = ref('')
const msgErr = ref(false)
function flash(text: string, isErr = false) { msg.value = text; msgErr.value = isErr }

// Fotos: se reducen en el navegador y se suben de una en una.
const uploading = ref(0)
async function onFiles(e: Event) {
  const input = e.target as HTMLInputElement
  const files = [...(input.files ?? [])]
  input.value = ''
  for (const file of files) {
    if (!piso.value || piso.value.photos.length >= MAX_PHOTOS) { flash(`Máximo ${MAX_PHOTOS} fotos.`, true); break }
    uploading.value++
    try {
      const { blob, width, height } = await resizeImage(file)
      const fd = new FormData()
      fd.append('foto', blob, 'foto.jpg')
      fd.append('width', String(width))
      fd.append('height', String(height))
      piso.value = await $fetch<Property>(`/api/mis-pisos/${piso.value.id}/fotos`, { method: 'POST', body: fd })
      flash('')
    }
    catch (err) { flash(err instanceof Error && !('statusCode' in err) ? err.message : apiError(err).message, true) }
    finally { uploading.value-- }
  }
}
async function removePhoto(id: string) {
  if (!piso.value || !confirm('¿Borrar esta foto?')) return
  piso.value = await $fetch<Property>(`/api/mis-pisos/${piso.value.id}/fotos/${id}`, { method: 'DELETE' })
}
async function makeCover(id: string) {
  if (!piso.value) return
  piso.value = await $fetch<Property>(`/api/mis-pisos/${piso.value.id}/fotos/${id}`, { method: 'PUT' })
}

async function setStatus(action: 'enviar' | 'pausar' | 'reactivar' | 'alquilado') {
  if (!piso.value) return
  busy.value = true
  try {
    piso.value = await $fetch<Property>(`/api/mis-pisos/${piso.value.id}/estado`, { method: 'POST', body: { action } })
    flash(action === 'enviar' ? 'Enviado. Lo revisamos y te avisamos al publicarlo.' : 'Hecho.')
  }
  catch (e) { flash(apiError(e).message, true) }
  finally { busy.value = false }
}
async function remove() {
  if (!piso.value || !confirm('¿Borrar este anuncio con sus fotos y conversaciones? No se puede deshacer.')) return
  await $fetch(`/api/mis-pisos/${piso.value.id}`, { method: 'DELETE' })
  await navigateTo('/mi-cuenta/pisos')
}
const onSaved = (p: Property) => { piso.value = p; flash(p.status === 'revision' ? 'Guardado. Como estaba publicado, lo revisamos de nuevo antes de mostrar los cambios.' : 'Guardado.') }
</script>

<template>
  <section v-if="piso" class="section">
    <div class="container narrow">
      <AccountNav />
      <NuxtLink to="/mi-cuenta/pisos" class="back small">← Mis pisos</NuxtLink>
      <div class="head">
        <h1>{{ piso.title }}</h1>
        <span class="status" :class="`s-${piso.status}`">{{ PROPERTY_STATUS[piso.status] }}</span>
      </div>

      <!-- Estado y siguiente paso -->
      <div class="card state">
        <template v-if="piso.status === 'borrador' || piso.status === 'rechazado'">
          <div v-if="piso.status === 'rechazado' && piso.reviewNote" class="note note-danger">
            <strong>Necesita cambios</strong>
            <p>{{ piso.reviewNote }}</p>
          </div>
          <p v-if="blockers.length" class="small"><strong>Para enviarlo a revisión falta:</strong></p>
          <ul v-if="blockers.length" class="small blockers"><li v-for="b in blockers" :key="b">{{ b }}</li></ul>
          <p v-else class="small">Todo listo. Lo revisamos y lo publicamos, normalmente en menos de 24 horas.</p>
          <button type="button" class="btn btn-primary" :disabled="busy || blockers.length > 0" @click="setStatus('enviar')">Enviar a revisión</button>
        </template>
        <template v-else-if="piso.status === 'revision'">
          <p>Estamos revisando tu anuncio. Te avisaremos cuando esté publicado.</p>
        </template>
        <template v-else-if="piso.status === 'publicado'">
          <p>Tu anuncio está publicado. <NuxtLink :to="`/pisos/${piso.id}`">Ver anuncio</NuxtLink></p>
          <div class="row">
            <button type="button" class="btn btn-ghost btn-sm" :disabled="busy" @click="setStatus('pausar')">Pausar</button>
            <button type="button" class="btn btn-dark btn-sm" :disabled="busy" @click="setStatus('alquilado')">Marcar como alquilado</button>
          </div>
        </template>
        <template v-else>
          <p>{{ piso.status === 'pausado' ? 'El anuncio está pausado y no aparece en el buscador.' : 'Marcado como alquilado: se ve, pero no se puede contactar.' }}</p>
          <button type="button" class="btn btn-primary btn-sm" :disabled="busy" @click="setStatus('reactivar')">Volver a publicar</button>
        </template>
        <p v-if="msg" class="small" :class="msgErr ? 'err' : 'ok'" role="status">{{ msg }}</p>
      </div>

      <!-- Fotos -->
      <div class="card photos" :class="{ highlight: isNew && piso.photos.length < 3 }">
        <div class="photos-head">
          <h2>Fotos <span class="muted small">{{ piso.photos.length }}/{{ MAX_PHOTOS }}</span></h2>
          <label class="btn btn-dark btn-sm" :class="{ disabled: piso.photos.length >= MAX_PHOTOS }">
            {{ uploading ? `Subiendo ${uploading}…` : '+ Añadir fotos' }}
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple class="sr-only" :disabled="piso.photos.length >= MAX_PHOTOS" @change="onFiles">
          </label>
        </div>
        <p class="small muted">Horizontales, con luz de día y el piso recogido. La primera es la portada. Mínimo 3 para publicar.</p>
        <div v-if="piso.photos.length" class="grid-photos">
          <figure v-for="(f, i) in piso.photos" :key="f.id">
            <img :src="`/api/fotos/${f.id}`" :alt="`Foto ${i + 1}`" loading="lazy">
            <figcaption>
              <span v-if="i === 0" class="cover">Portada</span>
              <button v-else type="button" class="mini-btn" @click="makeCover(f.id)">Hacer portada</button>
              <button type="button" class="mini-btn danger" :aria-label="`Borrar foto ${i + 1}`" @click="removePhoto(f.id)">Borrar</button>
            </figcaption>
          </figure>
        </div>
      </div>

      <h2 class="sec">Datos del piso</h2>
      <PropertyForm :key="piso.id":initial="piso" submit-label="Guardar cambios" @saved="onSaved" />

      <button type="button" class="link danger del" @click="remove">Borrar anuncio</button>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 860px; }
.back { display: inline-block; margin-bottom: 8px; color: var(--muted); }
.head { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 16px; }
h1 { font-size: 2rem; margin: 0; }
.status { font-size: 0.78rem; font-weight: 600; padding: 4px 12px; border-radius: 999px; background: var(--grey-01); }
.s-publicado { background: var(--lime); }
.s-revision { background: #fff3cd; }
.s-rechazado { background: var(--danger-soft); color: var(--danger); }
.s-alquilado { background: #dfe5ff; }
.state { display: grid; gap: 10px; justify-items: start; margin-bottom: 16px; }
.state p { margin: 0; }
.blockers { margin: 0; padding-left: 20px; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
.photos { margin-bottom: 28px; }
.photos.highlight { border-color: var(--green); box-shadow: 0 0 0 3px var(--lime-soft); }
.photos-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.photos h2 { font-size: 1.2rem; margin: 0; }
.photos label.disabled { opacity: 0.5; pointer-events: none; }
.grid-photos { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); margin-top: 12px; }
figure { margin: 0; border-radius: 12px; overflow: hidden; border: 1px solid var(--line); background: #fff; }
figure img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; }
figcaption { display: flex; justify-content: space-between; gap: 6px; padding: 6px 8px; font-size: 0.78rem; }
.cover { font-weight: 600; color: var(--green); }
.mini-btn { font: inherit; background: none; border: 0; padding: 0; cursor: pointer; text-decoration: underline; color: var(--ink); }
.sec { font-size: 1.3rem; margin: 0 0 12px; }
.link { font: inherit; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 0; }
.danger { color: var(--danger); }
.del { margin-top: 24px; }
.err { color: var(--danger); }
.ok { color: var(--green); }
</style>
