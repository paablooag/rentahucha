<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Mapa de calor' })

// Mapa de calor de clics sobre la página real (cargada en un iframe con ?notrack para no contarse a sí misma),
// al ancho del dispositivo elegido, con la profundidad de scroll y lo más pulsado.
interface Heat { days: number; device: string; path: string; paths: { path: string; clicks: number }[]; clicks: { x: number; y: number }[]; targets: { target: string; n: number }[]; scroll: { views: number; p25: number; p50: number; p75: number; p100: number } | null }

const route = useRoute()
const ruta = ref(typeof route.query.ruta === 'string' ? route.query.ruta : '')
const device = ref<'escritorio' | 'tablet' | 'móvil'>('escritorio')
const days = ref(30)
const { data: h } = await useFetch<Heat>('/api/admin/mapa-calor', { query: computed(() => ({ ruta: ruta.value || undefined, dispositivo: device.value, dias: days.value })) })
watch(() => h.value?.path, (p) => { if (p && !ruta.value) ruta.value = p })

const WIDTHS = { escritorio: 1280, tablet: 820, móvil: 390 } as const
const frameWidth = computed(() => WIDTHS[device.value])
const wrap = ref<HTMLElement | null>(null)
const frame = ref<HTMLIFrameElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const docHeight = ref(2000)
const scale = ref(1)
const loading = ref(true)

function measure() {
  const doc = frame.value?.contentDocument
  if (!doc) return
  docHeight.value = Math.max(doc.documentElement.scrollHeight, doc.body?.scrollHeight ?? 0, 600)
  scale.value = Math.min(1, (wrap.value?.clientWidth ?? frameWidth.value) / frameWidth.value)
  draw()
}
function onLoad() {
  loading.value = false
  // Las imágenes y fuentes cambian la altura: se mide de nuevo al cabo de un momento.
  measure()
  setTimeout(measure, 1200)
  setTimeout(measure, 3000)
}

// Pinta los clics: manchas en escala de grises acumuladas y luego coloreadas (azul → verde → amarillo → rojo).
function draw() {
  const c = canvas.value
  if (!c || !h.value) return
  const w = frameWidth.value
  const ht = docHeight.value
  c.width = w
  c.height = ht
  const ctx = c.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, w, ht)
  const r = device.value === 'móvil' ? 28 : 40
  for (const p of h.value.clicks) {
    const x = (p.x / 1000) * w
    const y = (p.y / 1000) * ht
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, 'rgba(0,0,0,0.35)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  const img = ctx.getImageData(0, 0, w, ht)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const a = d[i + 3]! / 255
    if (!a) continue
    // Rampa de calor
    const t = Math.min(1, a * 1.6)
    const [rr, gg, bb] = t < 0.33 ? [0, Math.round(t * 3 * 255), 255] : t < 0.66 ? [Math.round((t - 0.33) * 3 * 255), 255, Math.round(255 - (t - 0.33) * 3 * 255)] : [255, Math.round(255 - (t - 0.66) * 3 * 255), 0]
    d[i] = rr; d[i + 1] = gg; d[i + 2] = bb; d[i + 3] = Math.round(Math.min(0.75, a * 1.4) * 255)
  }
  ctx.putImageData(img, 0, 0)
}
watch(() => h.value?.clicks, () => nextTick(draw))
watch([device, ruta], () => { loading.value = true })
onMounted(() => window.addEventListener('resize', measure))
onBeforeUnmount(() => window.removeEventListener('resize', measure))

const src = computed(() => `${ruta.value || h.value?.path || '/'}?notrack=1`)
const pct = (n: number) => (h.value?.scroll?.views ? Math.round((n / h.value.scroll.views) * 100) : 0)
</script>

<template>
  <div>
    <h1>Mapa de calor</h1>
    <p class="muted">Dónde hacen clic los visitantes y hasta dónde bajan, sobre la página real. Sin cookies y sin nada de lo que escriben.</p>

    <div class="controls">
      <label>Página
        <select v-model="ruta" class="select">
          <option v-if="ruta && !h?.paths.some(p => p.path === ruta)" :value="ruta">{{ ruta }}</option>
          <option v-for="p in h?.paths ?? []" :key="p.path" :value="p.path">{{ p.path }} ({{ p.clicks }} clics)</option>
        </select>
      </label>
      <div class="tabs" role="tablist" aria-label="Dispositivo">
        <button v-for="d in (['escritorio', 'tablet', 'móvil'] as const)" :key="d" type="button" role="tab" :aria-selected="device === d" :class="{ on: device === d }" @click="device = d">{{ d.charAt(0).toUpperCase() + d.slice(1) }}</button>
      </div>
      <div class="tabs" role="tablist" aria-label="Periodo">
        <button v-for="d in [7, 30, 90]" :key="d" type="button" role="tab" :aria-selected="days === d" :class="{ on: days === d }" @click="days = d">{{ d }} días</button>
      </div>
    </div>

    <div class="layout">
      <div ref="wrap" class="stage" :style="{ height: `${docHeight * scale}px` }">
        <div class="scaled" :style="{ width: `${frameWidth}px`, height: `${docHeight}px`, transform: `scale(${scale})` }">
          <iframe ref="frame" :key="src + device" :src="src" :style="{ width: `${frameWidth}px`, height: `${docHeight}px` }" title="Vista de la página" scrolling="no" @load="onLoad" />
          <canvas ref="canvas" class="heat" :style="{ width: `${frameWidth}px`, height: `${docHeight}px` }" />
        </div>
        <p v-if="loading" class="loading small muted">Cargando la página…</p>
      </div>

      <aside class="side">
        <div class="card">
          <h3>Clics</h3>
          <p class="big">{{ h?.clicks.length ?? 0 }}</p>
          <p class="small muted">en {{ device }}, últimos {{ days }} días</p>
        </div>
        <div class="card">
          <h3>Hasta dónde bajan</h3>
          <p v-if="!h?.scroll?.views" class="small muted">Sin datos de scroll todavía.</p>
          <ul v-else class="depth">
            <li v-for="[label, n] in ([['25 %', h.scroll.p25], ['50 %', h.scroll.p50], ['75 %', h.scroll.p75], ['Final', h.scroll.p100]] as const)" :key="label">
              <span>{{ label }}</span><span class="bar"><span :style="{ width: `${pct(n)}%` }" /></span><strong>{{ pct(n) }} %</strong>
            </li>
          </ul>
          <p v-if="h?.scroll?.views" class="small muted">{{ h.scroll.views }} visitas con datos</p>
        </div>
        <div class="card">
          <h3>Lo más pulsado</h3>
          <ol v-if="h?.targets.length" class="targets small">
            <li v-for="t in h.targets" :key="t.target"><span>{{ t.target }}</span><strong>{{ t.n }}</strong></li>
          </ol>
          <p v-else class="small muted">Sin clics en botones o enlaces todavía.</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
h1 { font-size: 2.2rem; margin: 0 0 4px; }
.controls { display: flex; gap: 12px; flex-wrap: wrap; align-items: end; margin: 16px 0; }
.controls label { display: grid; gap: 4px; font-size: 0.85rem; font-weight: 600; min-width: 280px; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: #fff; border: 1px solid var(--line); border-radius: 999px; }
.tabs button { font: inherit; font-size: 0.88rem; border: 0; background: transparent; border-radius: 999px; padding: 7px 12px; cursor: pointer; color: var(--muted); }
.tabs button.on { background: var(--ink); color: #fff; }
.layout { display: grid; gap: 16px; }
@media (min-width: 1100px) { .layout { grid-template-columns: minmax(0, 1fr) 280px; align-items: start; } .side { position: sticky; top: 16px; } }
.stage { position: relative; overflow: hidden; border: 1px solid var(--line); border-radius: 14px; background: #fff; }
.scaled { position: absolute; top: 0; left: 0; transform-origin: 0 0; }
.scaled iframe { border: 0; display: block; pointer-events: none; }
.heat { position: absolute; inset: 0; pointer-events: none; }
.loading { position: absolute; top: 12px; left: 12px; background: #fff; padding: 4px 10px; border-radius: 8px; }
.side { display: grid; gap: 12px; }
h3 { font-size: 1rem; margin: 0 0 8px; }
.big { font-size: 2rem; font-weight: 600; margin: 0; }
.side p { margin: 0; }
.depth { list-style: none; padding: 0; margin: 0 0 6px; display: grid; gap: 6px; font-size: 0.88rem; }
.depth li { display: grid; grid-template-columns: 48px 1fr 44px; gap: 8px; align-items: center; }
.bar { height: 8px; background: var(--grey-02); border-radius: 99px; overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--green); }
.targets { margin: 0; padding-left: 18px; display: grid; gap: 4px; }
.targets li span { overflow: hidden; text-overflow: ellipsis; }
.targets li { display: list-item; }
.targets strong { float: right; }
</style>
