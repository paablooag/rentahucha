<script setup lang="ts">
// Material impreso para captar propietarios fuera de internet (portales, comercios, tablones de anuncios):
// página 1, cartel A4; página 2, 8 tarjetas para recortar. El QR lleva a la valoración gratis con utm=cartel.
// Se genera a PDF con Playwright (public/dossier/rentahucha-cartel-propietarios.pdf).
import QRCode from 'qrcode'

definePageMeta({ layout: 'print' })
useSeoMeta({ title: 'Cartel para propietarios', robots: 'noindex' })

const URL_CARTEL = 'https://rentahucha.es/valoracion-alquiler?utm_source=cartel&utm_medium=impreso&utm_campaign=propietarios'
const URL_TARJETA = 'https://rentahucha.es/valoracion-alquiler?utm_source=tarjeta&utm_medium=impreso&utm_campaign=propietarios'
const { data: qr } = await useAsyncData('qr-cartel', async () => ({
  cartel: await QRCode.toString(URL_CARTEL, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#141414', light: '#ffffff' } }),
  tarjeta: await QRCode.toString(URL_TARJETA, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#141414', light: '#ffffff' } }),
}))
</script>

<template>
  <div>
    <section class="d-page dark poster">
      <div class="top"><AppLogo light /><span class="tag">Para propietarios</span></div>
      <div class="main">
        <h1>¿Alquilas tu piso?</h1>
        <p class="big">Te decimos <span class="hl">cuánto puedes pedir</span>, gratis.</p>
        <p class="lead">Una persona del equipo compara tu piso con otros parecidos de tu zona y el índice oficial, y te envía una horquilla en menos de 48 horas laborables. Sin compromiso.</p>
        <ul>
          <li>Inquilinos verificados: ingresos, contrato y vida laboral comprobados</li>
          <li>Contrato conforme a la LAU y aviso de cada pago</li>
          <li>El inquilino llena cada mes una hucha que, si hay un impago comprobado, pasa a ti</li>
        </ul>
      </div>
      <div class="qr-row">
        <div class="qr" v-html="qr?.cartel" />
        <div>
          <p class="scan">Escanea y pide tu valoración</p>
          <p class="url">rentahucha.es/valoracion-alquiler</p>
          <p class="fine">RentaHucha no es una aseguradora. Servicio en beta: la hucha se activa en el lanzamiento.</p>
        </div>
      </div>
    </section>

    <section class="d-page cards-page">
      <div class="cards">
        <div v-for="n in 8" :key="n" class="card-cut">
          <div class="c-text">
            <AppLogo />
            <strong>¿Alquilas tu piso?</strong>
            <span>Valoración gratis del alquiler, hecha por una persona, en 48 h.</span>
            <span class="c-url">rentahucha.es/valoracion-alquiler</span>
          </div>
          <div class="c-qr" v-html="qr?.tarjeta" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.poster { display: flex; flex-direction: column; justify-content: space-between; padding: 18mm 18mm 16mm; }
.top { display: flex; justify-content: space-between; align-items: center; }
.top :deep(.logo) { font-size: 22pt; }
.top :deep(svg) { width: 13mm; height: 13mm; }
.tag { font-size: 10pt; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #a8a8a8; }
h1 { font-size: 54pt; line-height: 1; letter-spacing: -0.04em; color: #fff; margin: 0 0 5mm; }
.big { font-size: 28pt; line-height: 1.15; letter-spacing: -0.02em; color: #fff; margin: 0 0 8mm; font-weight: 500; }
.hl { color: #e0fb00; }
.lead { font-size: 13pt; line-height: 1.5; color: #cfcfcf; margin: 0 0 8mm; max-width: 160mm; }
ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 3mm; }
li { font-size: 12pt; color: #e8e8e8; padding-left: 8mm; position: relative; }
li::before { content: ''; position: absolute; left: 0; top: 1.6mm; width: 3.4mm; height: 3.4mm; border-radius: 50%; background: #e0fb00; }
.qr-row { display: flex; gap: 10mm; align-items: center; background: #fff; border-radius: 6mm; padding: 8mm; }
.qr { width: 52mm; height: 52mm; flex: none; }
.qr :deep(svg), .c-qr :deep(svg) { width: 100%; height: 100%; display: block; }
.scan { font-size: 20pt; font-weight: 700; color: #141414; margin: 0 0 2mm; letter-spacing: -0.02em; }
.url { font-size: 13pt; color: #141414; margin: 0 0 5mm; }
.fine { font-size: 8pt; color: #777; margin: 0; }
.cards-page { padding: 10mm; }
.cards { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: repeat(4, 1fr); height: 100%; border: 0.3mm dashed #bbb; }
.card-cut { display: flex; gap: 5mm; align-items: center; justify-content: space-between; padding: 6mm; border: 0.3mm dashed #bbb; }
.c-text { display: grid; gap: 1.5mm; }
.c-text :deep(.logo) { font-size: 11pt; }
.c-text :deep(svg) { width: 6mm; height: 6mm; }
.c-text strong { font-size: 14pt; letter-spacing: -0.02em; color: #141414; }
.c-text span { font-size: 9pt; color: #444; line-height: 1.35; }
.c-url { font-weight: 600; color: #141414 !important; }
.c-qr { width: 26mm; height: 26mm; flex: none; }
</style>
