<script setup lang="ts">
const title = 'Calculadora de la reducción del IRPF por alquiler de vivienda (2026-2027)'
const description = '¿Cuánto IRPF pagas por alquilar tu piso? Calcula la reducción del rendimiento neto según la fecha del contrato: del 50 % al 90 % con la Ley 12/2023 y hasta el 100 % en los contratos posteriores al 1 de diciembre de 2026. Gratis y sin registro.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/propietarios.png' })

const faqs = [
  { q: '¿Qué reducción del IRPF tiene el alquiler de vivienda?', a: 'Depende de cuándo se firmó el contrato. Antes del 26 de mayo de 2023, un 60 %. Entre esa fecha y el 1 de diciembre de 2026, del 50 % al 90 % según el caso (Ley 12/2023). En los contratos posteriores al 1 de diciembre de 2026, del 15 % al 100 % según el Real Decreto-ley 29/2026, pendiente de convalidación.' },
  { q: '¿Cuándo se puede aplicar el 100 %?', a: 'En los contratos nuevos posteriores al 1 de diciembre de 2026, si el arrendador no es gran tenedor y la renta se rebaja más de un 5 % respecto al contrato anterior y además se renueva con el mismo inquilino al acabar el plazo mínimo o la renta queda por debajo del límite del índice de referencia. También en el primer alquiler de una vivienda si la renta está por debajo de ese límite.' },
  { q: '¿Y si subo la renta al cambiar de inquilino?', a: 'En el nuevo régimen la reducción baja: 40 % si la subida es de hasta un 5 %, 30 % hasta un 10 %, 25 % hasta un 15 %, 20 % hasta un 20 % y 15 % si sube más. Si mantienes la renta, la reducción es del 50 %.' },
  { q: '¿Qué pasa si el decreto no se convalida?', a: 'El Real Decreto-ley 29/2026 tiene que ser convalidado por el Congreso. Si no se convalida, decae y se mantiene el régimen de la Ley 12/2023 (del 50 % al 90 %).' },
  { q: '¿Dónde consulto el índice de referencia?', a: 'En el sistema estatal de índices de referencia del precio del alquiler del Ministerio de Vivienda (serpavi.mivau.gob.es), con la referencia catastral de la vivienda. Si lo prefieres, te lo calculamos gratis en la valoración del alquiler.' },
  { q: '¿La reducción se aplica sobre lo que cobro?', a: 'No: se aplica sobre el rendimiento neto positivo, es decir, las rentas menos los gastos deducibles (IBI, comunidad, seguro, intereses, reparaciones, amortización…). Y solo si declaras el alquiler antes de que Hacienda inicie una comprobación.' },
]
useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }],
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Calculadora para propietarios · actualizada al decreto de octubre de 2026</span>
          <h1>¿Cuánto IRPF pagas por alquilar tu piso?</h1>
          <p class="lead">Calcula la reducción del rendimiento neto según la fecha del contrato y compara si te conviene firmar antes o después del 1 de diciembre de 2026.</p>
        </div>
        <IrpfCalculator />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>La reducción del IRPF por alquiler, explicada</h2>
        </div>
        <FaqList :items="faqs" />
        <div class="cta">
          <NuxtLink to="/blog/reduccion-irpf-alquiler-vivienda-2027-hasta-100" class="btn btn-ghost">Las tablas completas, con ejemplos</NuxtLink>
          <NuxtLink to="/valoracion-alquiler" class="btn btn-primary">Pedir mi valoración gratis</NuxtLink>
        </div>
        <p class="small muted src">Fuente: BOE, <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764" target="_blank" rel="noopener">Ley 35/2006 del IRPF</a> (art. 23.2 y disposición transitoria 38.ª) y <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823" target="_blank" rel="noopener">Real Decreto-ley 29/2026</a>. Comprobado el 22-10-2026.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
.cta { margin-top: 32px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.src { text-align: center; margin-top: 20px; }
.src a { color: inherit; }
</style>
