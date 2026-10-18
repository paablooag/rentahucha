<script setup lang="ts">
const title = 'Checklist 2027 para alquilar tu piso: todo lo que tienes que revisar'
const description = `${CHECKLIST_TOTAL} comprobaciones para alquilar tu piso sin sorpresas: certificado energético, fianza, contrato LAU, elección del inquilino, IRPF y fin del contrato. Gratis y en PDF.`
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/checklist.png' })
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Cómo preparar el alquiler de tu piso paso a paso',
      description,
      step: CHECKLIST.map(s => ({ '@type': 'HowToSection', name: s.title, itemListElement: s.items.map(i => ({ '@type': 'HowToStep', name: i.title, text: i.text })) })),
    }),
  }],
})

// Lo marcado se recuerda solo en este navegador (comodidad; si falla, no pasa nada).
const KEY = 'rh-checklist'
const checked = ref<Set<string>>(new Set())
onMounted(() => {
  try { checked.value = new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]')) }
  catch {}
})
function toggle(id: string) {
  const next = new Set(checked.value)
  next.has(id) ? next.delete(id) : next.add(id)
  checked.value = next
  try { localStorage.setItem(KEY, JSON.stringify([...next])) }
  catch {}
}
const done = computed(() => checked.value.size)
const sectionDone = (s: { items: { id: string }[] }) => s.items.filter(i => checked.value.has(i.id)).length
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Guía gratuita para propietarios</span>
          <h1>Checklist 2027 para alquilar tu piso</h1>
          <p class="lead">{{ CHECKLIST_TOTAL }} comprobaciones, de los papeles a la devolución de la fianza. Ve marcando lo que ya tienes o <a href="#descargar">descárgala en PDF</a>.</p>
        </div>

        <div class="layout">
          <aside class="side">
            <div class="progress-card">
              <strong>{{ done }} de {{ CHECKLIST_TOTAL }}</strong>
              <div class="bar" role="progressbar" :aria-valuenow="done" aria-valuemin="0" :aria-valuemax="CHECKLIST_TOTAL"><span :style="{ width: `${(done / CHECKLIST_TOTAL) * 100}%` }" /></div>
              <nav aria-label="Fases">
                <a v-for="s in CHECKLIST" :key="s.id" :href="`#${s.id}`">{{ s.title }} <span>{{ sectionDone(s) }}/{{ s.items.length }}</span></a>
              </nav>
            </div>
          </aside>

          <div class="phases">
            <section v-for="(s, n) in CHECKLIST" :id="s.id" :key="s.id" class="phase">
              <span class="eyebrow">{{ n + 1 }} · {{ s.when }}</span>
              <h2>{{ s.title }}</h2>
              <ul>
                <li v-for="item in s.items" :key="item.id">
                  <label :class="{ on: checked.has(item.id) }">
                    <input type="checkbox" :checked="checked.has(item.id)" @change="toggle(item.id)">
                    <span>
                      <strong>{{ item.title }}</strong>
                      <span class="txt">{{ item.text }}</span>
                    </span>
                  </label>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <ChecklistDownload />
        <div class="note note-green more">
          <strong>¿Y si alguien hace la mitad de la lista por ti?</strong>
          <p>En RentaHucha verificamos a los inquilinos, preparamos el contrato conforme a la LAU con inventario y te avisamos de cada pago. Además, el inquilino va llenando cada mes una hucha a su nombre, custodiada por una entidad financiera autorizada: si hay un impago comprobado, su saldo pasa a ti.</p>
          <NuxtLink to="/propietarios#formulario" class="btn btn-dark btn-sm">Apuntar mi piso</NuxtLink>
        </div>
        <p class="fine small muted">Resumen informativo de la normativa estatal general (Ley de Arrendamientos Urbanos y Ley 12/2023 de Vivienda). Algunas obligaciones dependen de tu comunidad autónoma o municipio: compruébalas o consulta a un profesional antes de firmar.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
.layout { display: grid; gap: 28px; }
@media (min-width: 960px) { .layout { grid-template-columns: 260px 1fr; gap: 48px; align-items: start; } .side { position: sticky; top: 96px; } }
.progress-card { background: var(--off); border-radius: 16px; padding: 18px; display: grid; gap: 10px; }
.progress-card strong { font-size: 1.2rem; }
.bar { height: 8px; background: var(--grey-02); border-radius: 99px; overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--green); border-radius: 99px; transition: width 0.3s; }
.progress-card nav { display: none; }
@media (min-width: 960px) { .progress-card nav { display: grid; gap: 2px; margin-top: 6px; } }
.progress-card nav a { display: flex; justify-content: space-between; gap: 8px; font-size: 0.9rem; padding: 6px 8px; border-radius: 8px; color: var(--ink); text-decoration: none; }
.progress-card nav a:hover { background: #fff; }
.progress-card nav span { color: var(--muted); font-variant-numeric: tabular-nums; }
.phases { display: grid; gap: 36px; min-width: 0; }
.phase { scroll-margin-top: 96px; }
.phase h2 { font-size: 1.6rem; margin: 6px 0 14px; }
.phase ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.phase label { display: flex; gap: 12px; align-items: flex-start; padding: 14px 16px; border: 1px solid var(--line); border-radius: 14px; background: #fff; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
.phase label:hover { border-color: var(--green); }
.phase label.on { background: var(--lime-soft); border-color: transparent; }
.phase label.on strong { text-decoration: line-through; text-decoration-color: rgba(0, 0, 0, 0.35); }
.phase input { flex: none; width: 20px; height: 20px; margin-top: 2px; accent-color: var(--green); }
.phase strong { display: block; }
.txt { display: block; color: var(--muted); font-size: 0.93rem; margin-top: 2px; }
.more { margin-top: 24px; display: grid; gap: 8px; justify-items: start; }
.more p { margin: 0 0 6px; }
.fine { margin-top: 20px; }
</style>
