<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Formularios' })

interface Item { id: string; kind: 'valoracion' | 'encuesta'; name: string; email: string; phone: string; city: string; data: Record<string, unknown>; consentNews: boolean; status: string; notes: string; createdAt: string }
const { data, refresh } = await useFetch<{ items: Item[]; survey: { total: number; ready: boolean; min: number; [k: string]: unknown } }>('/api/admin/formularios', { default: () => ({ items: [], survey: { total: 0, ready: false, min: 20 } }) })

const tab = ref<'valoracion' | 'encuesta'>('valoracion')
const list = computed(() => data.value.items.filter(i => i.kind === tab.value))
const pendientes = computed(() => data.value.items.filter(i => i.kind === 'valoracion' && i.status === 'nuevo').length)
const openId = ref<string | null>(null)
const date = (d: string) => new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(d))

async function update(i: Item, patch: { status?: string; notes?: string }) {
  await $fetch(`/api/admin/formularios/${i.id}`, { method: 'PUT', body: patch })
  Object.assign(i, patch)
}
async function remove(i: Item) {
  if (!confirm('¿Borrar definitivamente esta respuesta?')) return
  await $fetch(`/api/admin/formularios/${i.id}`, { method: 'DELETE' })
  await refresh()
}

// Correo de respuesta con la valoración: plantilla para completar con la horquilla y los comparables.
function replyLink(i: Item) {
  const d = i.data as Record<string, string | number | string[] | null>
  const subject = `Valoración del alquiler de tu piso en ${d.district}, ${i.city}`
  const body = [
    `Hola, ${i.name.split(' ')[0]}:`,
    `Gracias por pedirnos la valoración de tu ${String(d.propertyType).toLowerCase()} de ${d.sizeM2} m² y ${d.bedrooms} habitaciones en ${d.district}, ${i.city}.`,
    'Con pisos parecidos anunciados ahora en la zona y el índice de referencia del Ministerio de Vivienda, la horquilla orientativa sería de [XXX] a [XXX] € al mes.',
    'Referencias que hemos usado:\n- [comparable 1]\n- [comparable 2]\n- [comparable 3]\n- Índice de referencia del Ministerio: [XXX–XXX €]',
    '[Zona tensionada: sí / no. Si sí: qué implica para la renta.]',
    'Si quieres, te ayudamos a alquilarlo con inquilinos verificados y la hucha del inquilino, que pasa a ti si hay un impago comprobado. Puedes publicarlo gratis en https://rentahucha.es/cuenta/registro?tipo=propietario o responderme a este correo.',
    'Un saludo,\nPablo\nRentaHucha · rentahucha.es',
  ].join('\n\n')
  return `mailto:${i.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
const label = (k: string) => ({ propertyType: 'Tipo', sizeM2: 'm²', bedrooms: 'Habitaciones', bathrooms: 'Baños', condition: 'Estado', furnished: 'Mobiliario', features: 'Extras', situation: 'Situación', currentRent: 'Renta actual', comments: 'Comentarios', district: 'Barrio', role: 'Caso', ownerWorry: 'Le frena', tenantWorry: 'Le cuesta', wants: 'Valora' } as Record<string, string>)[k] ?? k
const show = (v: unknown) => (Array.isArray(v) ? v.join(', ') : v === null || v === '' ? '—' : String(v))
</script>

<template>
  <div>
    <h1>Formularios</h1>
    <p class="muted">Valoraciones del alquiler pendientes de responder: <strong>{{ pendientes }}</strong> · Respuestas a la encuesta: <strong>{{ data.survey.total }}</strong>{{ data.survey.ready ? '' : ` (los resultados se publican a partir de ${data.survey.min})` }}</p>

    <div class="tabs" role="tablist">
      <button type="button" role="tab" :aria-selected="tab === 'valoracion'" :class="{ on: tab === 'valoracion' }" @click="tab = 'valoracion'">Valoraciones</button>
      <button type="button" role="tab" :aria-selected="tab === 'encuesta'" :class="{ on: tab === 'encuesta'}" @click="tab = 'encuesta'">Encuesta</button>
    </div>

    <p v-if="tab === 'valoracion'" class="note small">Responde en menos de 48 h laborables. «Responder» abre tu correo con una plantilla: completa la horquilla con 3 comparables de la zona (Idealista, Fotocasa…) y el índice del Ministerio (serpavi.mivau.gob.es). No des cifras sin comparables.</p>
    <p v-if="!list.length" class="muted">Todavía no hay respuestas.</p>

    <div class="list">
      <article v-for="i in list" :key="i.id" class="card item" :class="`st-${i.status}`">
        <div class="top" @click="openId = openId === i.id ? null : i.id">
          <div>
            <strong v-if="i.kind === 'valoracion'">{{ i.name }} · {{ (i.data as any).district }}, {{ i.city }}</strong>
            <strong v-else>{{ show(i.data.role) }}{{ i.city ? ` · ${i.city}` : '' }}</strong>
            <span class="small muted">{{ date(i.createdAt) }}<template v-if="i.email"> · {{ i.email }}</template><template v-if="i.phone"> · {{ i.phone }}</template><template v-if="i.consentNews"> · newsletter</template></span>
          </div>
          <span v-if="i.kind === 'valoracion'" class="pill">{{ i.status }}</span>
        </div>
        <div v-if="openId === i.id || (i.kind === 'valoracion' && i.status === 'nuevo')" class="detail">
          <dl>
            <template v-for="(v, k) in i.data" :key="k"><dt>{{ label(String(k)) }}</dt><dd>{{ show(v) }}</dd></template>
          </dl>
          <template v-if="i.kind === 'valoracion'">
            <textarea class="input" rows="2" :value="i.notes" placeholder="Notas internas: comparables, horquilla enviada…" @change="update(i, { notes: ($event.target as HTMLTextAreaElement).value })" />
            <div class="btns">
              <a :href="replyLink(i)" class="btn btn-dark btn-sm">Responder por correo</a>
              <button type="button" class="btn btn-ghost btn-sm" @click="update(i, { status: 'respondido' })">Marcar respondida</button>
              <button type="button" class="link small" @click="update(i, { status: 'descartado' })">Descartar</button>
              <button type="button" class="link small danger" @click="remove(i)">Borrar</button>
            </div>
          </template>
          <button v-else type="button" class="link small danger" @click="remove(i)">Borrar</button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
h1 { font-size: 2.2rem; margin: 0 0 4px; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; margin: 16px 0; }
.tabs button { font: inherit; font-size: 0.9rem; border: 0; background: transparent; border-radius: 999px; padding: 7px 14px; cursor: pointer; color: var(--muted); }
.tabs button.on { background: var(--ink); color: #fff; }
.list { display: grid; gap: 10px; margin-top: 12px; }
.item { padding: 14px 16px; }
.item.st-respondido, .item.st-descartado { opacity: 0.7; }
.top { display: flex; justify-content: space-between; gap: 12px; cursor: pointer; }
.top > div { display: grid; gap: 2px; }
.pill { font-size: 0.75rem; font-weight: 600; padding: 3px 10px; border-radius: 999px; background: #fff3cd; height: fit-content; }
.st-respondido .pill { background: var(--lime); }
.detail { margin-top: 12px; display: grid; gap: 10px; }
dl { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 4px 16px; margin: 0; font-size: 0.9rem; }
dd { min-width: 0; overflow-wrap: anywhere; }
dt { color: var(--muted); }
dd { margin: 0; }
.btns { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.link { font: inherit; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 6px 2px; min-height: 32px; color: var(--muted); }
.danger { color: var(--danger); }
</style>
