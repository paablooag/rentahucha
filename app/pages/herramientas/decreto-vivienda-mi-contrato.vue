<script setup lang="ts">
import type { DecretoInput } from '#shared/utils/decreto'

const title = '¿Qué cambia en mi contrato con el decreto de vivienda? Comprobador gratis (RDL 29/2026)'
const description = 'Responde 6 preguntas sobre tu contrato de alquiler y mira qué medidas del decreto de octubre de 2026 se te aplican: subida máxima, prórroga extraordinaria, IRPF, IBI, desistimiento, temporada, anuncio y reparaciones.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/propietarios.png' })

const f = reactive<DecretoInput>({ signedOn: '', kind: 'habitual', tensionZone: false, termEnds: '', hasUpdateClause: true, aboveIndex: 'nose', bigHolder: false })
const items = computed(() => decretoChecks({ ...f }))
watch(f, () => trackEvent('comprobador_decreto'), { once: true })

const faqs = [
  { q: '¿El decreto se aplica a mi contrato antiguo?', a: 'Algunas medidas sí: el límite del 2 % a las actualizaciones hasta finales de 2027 y la prórroga extraordinaria se aplican a contratos vigentes. Otras, como la prohibición de repercutir el IBI o de pactar indemnización por desistimiento, afectan en general a los contratos firmados desde el 8 de octubre de 2026.' },
  { q: '¿Y si el decreto no se convalida?', a: 'El Real Decreto-ley 29/2026 tiene que convalidarlo el Congreso (la votación está prevista el 12 de noviembre, según la prensa). Si no se convalida, decae y se vuelve a las reglas anteriores.' },
  { q: '¿Esto sustituye a un abogado?', a: 'No. Es una orientación general sobre la norma publicada en el BOE. Para un caso concreto, consulta con un profesional.' },
]
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(x => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })) }) }] })
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Comprobador gratis · Real Decreto-ley 29/2026</span>
          <h1>¿Qué cambia en tu contrato con el decreto de vivienda?</h1>
          <p class="lead">Responde unas preguntas sobre tu alquiler y mira qué medidas del decreto de octubre de 2026 se te aplican, con un enlace a cada explicación.</p>
        </div>

        <div class="calc card card-shadow">
          <form class="inputs" @submit.prevent>
            <div class="field">
              <label for="dc-signed">Fecha de firma del contrato</label>
              <input id="dc-signed" v-model="f.signedOn" class="input" type="date">
              <span class="hint">Déjala vacía si aún no lo has firmado.</span>
            </div>
            <fieldset class="group">
              <legend>Tipo de alquiler</legend>
              <label><input v-model="f.kind" type="radio" value="habitual"> Vivienda habitual</label>
              <label><input v-model="f.kind" type="radio" value="temporada"> Temporada (estudios, trabajo…)</label>
              <label><input v-model="f.kind" type="radio" value="habitacion"> Habitación</label>
            </fieldset>
            <div v-if="f.kind !== 'temporada' && f.signedOn && f.signedOn < '2026-10-08'" class="field">
              <label for="dc-term">¿Cuándo termina el periodo obligatorio (5 o 7 años) o la prórroga tácita?</label>
              <input id="dc-term" v-model="f.termEnds" class="input" type="date">
            </div>
            <label class="check"><input v-model="f.hasUpdateClause" type="checkbox"> El contrato prevé actualizar la renta</label>
            <fieldset class="group">
              <legend>¿La renta supera el límite del índice de referencia?</legend>
              <label><input v-model="f.aboveIndex" type="radio" value="no"> No</label>
              <label><input v-model="f.aboveIndex" type="radio" value="si"> Sí</label>
              <label><input v-model="f.aboveIndex" type="radio" value="nose"> No lo sé</label>
            </fieldset>
            <label class="check"><input v-model="f.tensionZone" type="checkbox"> La vivienda está en zona tensionada <NuxtLink to="/alquilar-mi-piso" class="small">(ver ciudades)</NuxtLink></label>
            <label class="check"><input v-model="f.bigHolder" type="checkbox"> El propietario es gran tenedor</label>
          </form>

          <div class="output" aria-live="polite">
            <div class="stat-label">Lo que se aplica a tu contrato</div>
            <ul class="items">
              <li v-for="it in items" :key="it.title" :class="it.tone">
                <strong>{{ it.title }}</strong>
                <p>{{ it.text }}</p>
                <NuxtLink v-if="it.link" :to="it.link.to" class="small">{{ it.link.label }} →</NuxtLink>
              </li>
            </ul>
            <p class="small muted">Orientativo, según el texto del Real Decreto-ley 29/2026 publicado en el BOE (comprobado el 22-10-2026), <strong>pendiente de convalidación</strong>. No sustituye el asesoramiento de un profesional.</p>
          </div>
        </div>

        <GuiaDecretoDownload />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>El decreto y tu contrato</h2>
        </div>
        <FaqList :items="faqs" />
        <div class="cta">
          <NuxtLink to="/blog/decretos-de-vivienda-octubre-2026-explicados" class="btn btn-ghost">Todas las medidas, explicadas</NuxtLink>
          <NuxtLink to="/valoracion-alquiler" class="btn btn-primary">Valoración gratis de tu alquiler</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
.calc { display: grid; gap: 32px; }
@media (min-width: 900px) { .calc { grid-template-columns: 1fr 1.25fr; } }
.inputs { display: grid; gap: 16px; align-content: start; }
.group { border: 0; padding: 0; margin: 0; display: grid; gap: 8px; }
.group legend { font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; padding: 0; }
.group label, .check { display: flex; gap: 8px; align-items: center; font-size: 0.95rem; font-weight: 400; }
.group input, .check input { accent-color: var(--green); flex: none; }
.items { list-style: none; padding: 0; margin: 10px 0 16px; display: grid; gap: 10px; }
.items li { border: 1px solid var(--line); border-left-width: 4px; border-radius: 12px; padding: 12px 14px; background: #fff; }
.items li.warn { border-left-color: #e0a100; }
.items li.ok { border-left-color: var(--green); }
.items li.info { border-left-color: #9aa0a6; }
.items strong { display: block; margin-bottom: 2px; }
.items p { margin: 0 0 4px; font-size: 0.93rem; }
.cta { margin-top: 32px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
</style>
