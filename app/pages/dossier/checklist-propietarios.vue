<script setup lang="ts">
definePageMeta({ layout: 'print' })
useSeoMeta({ title: 'Checklist 2027 para alquilar tu piso', robots: 'noindex' })

const label = 'Checklist para alquilar tu piso'
const pages = [CHECKLIST.slice(0, 2), CHECKLIST.slice(2, 4), CHECKLIST.slice(4)]
</script>

<template>
  <div>
    <DossierCover
      tag="Checklist"
      audience="Propietarios"
      title="Alquila tu piso 2027:"
      highlight="todo lo que tienes que revisar."
      :lead="`${CHECKLIST_TOTAL} comprobaciones, de los papeles a la devolución de la fianza, para alquilar tu piso con tranquilidad y sin sorpresas. Imprímela y ve marcando.`"
      :stats="[
        { value: String(CHECKLIST.length), label: 'fases, desde antes de anunciar hasta el final del contrato.' },
        { value: String(CHECKLIST_TOTAL), label: 'comprobaciones explicadas en una línea.' },
        { value: 'LAU', label: 'basada en la normativa estatal vigente de alquiler de vivienda.' },
      ]"
    />

    <DossierPage v-for="(group, i) in pages" :key="i" :label="label" :n="i + 2">
      <div v-for="section in group" :key="section.id" class="d-section">
        <span class="eyebrow">{{ section.when }}</span>
        <h2>{{ section.title }}</h2>
        <ul class="check">
          <li v-for="item in section.items" :key="item.id">
            <span class="box" aria-hidden="true" />
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </DossierPage>

    <DossierPage :label="label" :n="pages.length + 2" dark>
      <div class="d-section">
        <span class="eyebrow">Y si quieres ahorrarte la mitad de la lista</span>
        <h2>RentaHucha se encarga de lo difícil</h2>
        <div class="d-grid d-2">
          <div class="d-card glass"><h3>Inquilinos verificados</h3><p>Ingresos, contrato y vida laboral comprobados, con un ratio de renta prudente y revisión humana en los casos límite.</p></div>
          <div class="d-card glass"><h3>Contrato conforme a la LAU</h3><p>Firma online, inventario con fotos y la hucha del inquilino vinculada al contrato desde el primer día.</p></div>
          <div class="d-card glass"><h3>Aviso de cada pago</h3><p>Sabes cuándo cobras. Si un pago falla, te avisamos y preparamos el expediente para reclamar.</p></div>
          <div class="d-card glass"><h3>La hucha del inquilino</h3><p>Se llena cada mes y la custodia una entidad financiera autorizada. Si hay un impago comprobado, su saldo pasa a ti.</p></div>
        </div>
      </div>
      <div class="d-section">
        <div class="d-card lime cta">
          <h3>Apunta tu piso a la lista de espera</h3>
          <p>Sin compromiso y sin coste de entrada: pagas el 5 % de la renta solo cuando cobras. Entra en <strong>rentahucha.es/propietarios</strong>.</p>
        </div>
        <p class="fine">Esta checklist es informativa y resume la normativa estatal general (Ley de Arrendamientos Urbanos y Ley 12/2023 de Vivienda). Algunas obligaciones dependen de tu comunidad autónoma o de tu municipio: compruébalas o consulta a un profesional antes de firmar. RentaHucha no es una aseguradora; el seguro de impago, si lo quieres, lo contratas tú.</p>
      </div>
    </DossierPage>
  </div>
</template>

<style scoped>
.check { list-style: none; padding: 0; margin: 4mm 0 0; display: grid; gap: 3.2mm; }
.check li { display: flex; gap: 3.5mm; align-items: flex-start; }
.box { flex: none; width: 4.6mm; height: 4.6mm; border: 0.45mm solid #141414; border-radius: 1.2mm; margin-top: 0.5mm; }
.check strong { display: block; font-size: 10.5pt; }
.check p { margin: 0.6mm 0 0; font-size: 9.2pt; line-height: 1.4; color: #555; }
.cta h3 { margin-bottom: 2mm; color: #141414 !important; }
.cta p, .cta strong { color: #141414; }
.fine { margin-top: 6mm; font-size: 8pt; line-height: 1.45; color: #a8a8a8; }
</style>
