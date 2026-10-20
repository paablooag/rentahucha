<script setup lang="ts">
// Guía del modelo orientativo oficial de contrato de arrendamiento de vivienda (Ministerio de Vivienda, 29-05-2025).
// No redactamos un contrato propio: enlazamos al oficial y explicamos cada cláusula con la LAU.
const title = 'Modelo de contrato de alquiler de vivienda 2027: el oficial, explicado cláusula a cláusula'
const description = 'Descarga el modelo orientativo de contrato de alquiler del Ministerio de Vivienda (PDF y editable) y entiende cada cláusula: duración, renta, actualización, fianza, gastos, obras, desistimiento e inventario.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/checklist.png' })

const MIVAU = 'https://www.mivau.gob.es'
const FILES = {
  pdf: `${MIVAU}/recursos_mfom/paginabasica/recursos/29-05-2025_modelo_orientativo_de_contrato_de_arrendamiento_de_vivienda.pdf`,
  odt: `${MIVAU}/recursos_mfom/paginabasica/recursos/29-05-2025_modelo_orientativo_de_contrato_de_arrendamiento_de_vivienda.odt`,
  guia: `${MIVAU}/recursos_mfom/paginabasica/recursos/29-05-2025_guia-ejemplos-clausulas-arrendamiento.pdf`,
  pagina: `${MIVAU}/vivienda/alquila-bien-es-tu-derecho/alquiler/atenuando-el-precio-de-los-alquileres`,
}

const CLAUSES = [
  { t: 'Las partes', d: 'Identifica bien al propietario y a todas las personas que vivirán en el piso (nombre, DNI o NIE). Incluye un correo para notificaciones: la LAU permite pactar que las comunicaciones se hagan por medios electrónicos.' },
  { t: 'La vivienda', d: 'Dirección completa, referencia catastral, superficie, anexos (garaje, trastero) y si se alquila amueblada. Adjunta el certificado de eficiencia energética, que es obligatorio.' },
  { t: 'Duración y prórrogas', d: 'Aunque se pacte un año, el inquilino puede prorrogar año a año hasta 5 años (7 si el arrendador es una empresa). Después hay una prórroga tácita de hasta 3 años si nadie avisa: el propietario con 4 meses de antelación y el inquilino con 2. Si el propietario podría necesitar el piso para él o un familiar, tiene que constar en el contrato.' },
  { t: 'Renta y forma de pago', d: 'Importe mensual, día de pago (normalmente los siete primeros días del mes) y forma: mejor transferencia o domiciliación, para que quede rastro.' },
  { t: 'Actualización de la renta', d: 'Solo se actualiza si el contrato lo dice. En los contratos firmados desde el 26 de mayo de 2023, la subida anual tiene como límite el índice que publica el INE. En zona tensionada hay además límites a la renta inicial.' },
  { t: 'Fianza y garantía adicional', d: 'La fianza legal es de una mensualidad en vivienda habitual y, en muchas comunidades, el propietario debe depositarla en un organismo público. Se puede pedir además una garantía adicional de, como máximo, dos mensualidades en contratos de hasta 5 o 7 años.' },
  { t: 'Gastos y suministros', d: 'Los gastos generales del inmueble (comunidad, IBI) solo puede pagarlos el inquilino si se pacta por escrito con su importe anual. Los honorarios de la inmobiliaria y de formalización del contrato corren a cargo del propietario desde la Ley de Vivienda de 2023. Ojo: el decreto de vivienda de octubre de 2026, pendiente de convalidación, limita los gastos repercutibles; comprueba la norma vigente al firmar.' },
  { t: 'Conservación y obras', d: 'Las reparaciones necesarias para conservar la vivienda son del propietario; las pequeñas por el uso diario, del inquilino. El inquilino no puede hacer obras que modifiquen la vivienda sin consentimiento por escrito.' },
  { t: 'Desistimiento', d: 'El inquilino puede irse a partir de los 6 meses avisando con 30 días. Se puede pactar una indemnización de una mensualidad por cada año que quede de contrato (proporcional si es menos).' },
  { t: 'Cesión y subarriendo', d: 'Solo con consentimiento por escrito del propietario. Por eso conviene que consten en el contrato todas las personas que vivirán en el piso.' },
  { t: 'Inventario y estado de la vivienda', d: 'No es obligatorio, pero es la mejor prueba al final del contrato: estado de cada estancia y de los muebles, con fotos y fecha, firmado por las dos partes.' },
  { t: 'Mascotas, normas de la comunidad y otras cláusulas', d: 'Se pueden pactar libremente siempre que no vayan contra la LAU ni contra los derechos del inquilino. Las cláusulas que empeoren los derechos que da la ley al inquilino se tienen por no puestas.' },
]

const faqs = [
  { q: '¿El modelo del Ministerio es obligatorio?', a: 'No. Es un modelo orientativo: puedes usar cualquier contrato siempre que respete la Ley de Arrendamientos Urbanos. Tiene la ventaja de estar redactado por la Administración y de incluir ejemplos de cláusulas.' },
  { q: '¿Hay que registrar el contrato de alquiler?', a: 'No es obligatorio inscribirlo en el Registro de la Propiedad para vivienda habitual. Lo que sí suele ser obligatorio en muchas comunidades es depositar la fianza en el organismo autonómico. Si es alquiler de temporada o turístico, desde julio de 2025 necesitas el número del Registro Único de Arrendamientos para anunciarlo.' },
  { q: '¿Se puede firmar el contrato online?', a: 'Sí. La firma electrónica tiene la misma validez que la manuscrita.' },
  { q: '¿Qué pasa si una cláusula va contra la ley?', a: 'Las cláusulas que modifiquen en perjuicio del inquilino lo que dice la LAU para la vivienda habitual son nulas y se tienen por no puestas, aunque el contrato las incluya.' },
]
useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }],
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container narrow">
        <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
        <span class="eyebrow">Para propietarios e inquilinos · Modelo oficial</span>
        <h1>Modelo de contrato de alquiler de vivienda</h1>
        <p class="lead">El Ministerio de Vivienda publica un modelo orientativo de contrato y una guía con ejemplos de cláusulas. Te lo dejamos para descargar y te explicamos cada parte, con lo que dice la Ley de Arrendamientos Urbanos.</p>

        <div class="downloads card card-shadow">
          <div>
            <strong>Modelo orientativo del Ministerio de Vivienda</strong>
            <span class="small muted">Versión publicada el 29 de mayo de 2025. Los archivos se descargan de la web oficial del Ministerio.</span>
          </div>
          <div class="row">
            <a :href="FILES.pdf" target="_blank" rel="noopener" class="btn btn-dark btn-sm">Contrato en PDF</a>
            <a :href="FILES.odt" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">Editable (ODT)</a>
            <a :href="FILES.guia" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">Guía de cláusulas</a>
          </div>
        </div>

        <h2>Las cláusulas, una a una</h2>
        <ol class="clauses">
          <li v-for="(c, i) in CLAUSES" :key="c.t">
            <h3>{{ c.t }}</h3>
            <p>{{ c.d }}</p>
            <BlogInlineCta v-if="i === 4" audience="propietarios" slug="modelo-contrato" />
          </li>
        </ol>
        <p class="small muted">Resumen informativo de la normativa estatal general. No sustituye al asesoramiento de un profesional para tu caso. Fuente: <a :href="FILES.pagina" target="_blank" rel="noopener">Ministerio de Vivienda y Agenda Urbana, «Contrato orientativo»</a>.</p>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <ChecklistDownload />
        <div class="section-head center faq-head">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Sobre el contrato de alquiler</h2>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.narrow { max-width: 860px; }
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
h1 { font-size: clamp(2rem, 4vw, 2.8rem); margin: 10px 0; }
.downloads { display: grid; gap: 14px; margin: 24px 0 36px; }
.downloads > div:first-child { display: grid; gap: 4px; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
.clauses { padding-left: 22px; display: grid; gap: 6px; }
.clauses li::marker { font-weight: 700; color: var(--green); }
.clauses h3 { font-size: 1.15rem; margin: 10px 0 4px; }
.clauses p { margin: 0 0 8px; }
.faq-head { margin-top: 48px; }
</style>
