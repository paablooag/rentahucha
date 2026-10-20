<script setup lang="ts">
const title = 'Test: ¿estás preparado para alquilar tu piso?'
const description = '8 preguntas en 2 minutos para saber si tienes todo listo para alquilar tu piso: certificado energético, zona tensionada, fianza, inquilino, impago y seguro. Con consejos para lo que te falte.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/checklist.png' })

interface Answer { label: string; points: number; tip?: string; link?: { to: string; label: string } }
interface Question { q: string; answers: Answer[] }

const QUESTIONS: Question[] = [
  { q: '¿Tienes el certificado de eficiencia energética del piso en vigor?', answers: [
    { label: 'Sí, y está registrado', points: 2 },
    { label: 'Lo tengo, pero no sé si sigue en vigor', points: 1, tip: 'El certificado energético dura 10 años (5 si la calificación es G). Compruébalo: es obligatorio para alquilar y la etiqueta debe aparecer en el anuncio.' },
    { label: 'No', points: 0, tip: 'Necesitas el certificado de eficiencia energética para alquilar, y la etiqueta debe salir en el anuncio. Lo hace un técnico habilitado y se registra en tu comunidad autónoma.' },
  ] },
  { q: '¿Sabes si tu piso está en una zona de mercado residencial tensionado?', answers: [
    { label: 'Sí, lo he comprobado', points: 2 },
    { label: 'No lo sé', points: 0, tip: 'En zona tensionada, la renta de un contrato nuevo tiene límites y el inquilino puede pedir una prórroga extraordinaria. Compruébalo antes de poner precio.', link: { to: '/alquilar-mi-piso', label: 'Guías por ciudad' } },
  ] },
  { q: '¿Cómo vas a poner el precio?', answers: [
    { label: 'Comparando pisos parecidos de mi barrio y el índice de referencia', points: 2 },
    { label: 'Según lo que necesito para cubrir la hipoteca y los gastos', points: 0, tip: 'El mercado no sabe cuánto pagas de hipoteca: si te pasas de precio, el piso se queda vacío y cada mes vacío cuesta una mensualidad entera.', link: { to: '/valoracion-alquiler', label: 'Pide una valoración gratis' } },
    { label: 'Lo que me dijo un conocido', points: 0, tip: 'Mejor con datos: compara pisos parecidos de tu zona y consulta el sistema estatal de referencia del alquiler.', link: { to: '/valoracion-alquiler', label: 'Pide una valoración gratis' } },
  ] },
  { q: '¿Cómo vas a elegir al inquilino?', answers: [
    { label: 'Pidiendo ingresos, contrato y vida laboral, y comprobándolos', points: 2 },
    { label: 'Me lo elige una agencia', points: 1, tip: 'Pregunta a la agencia qué comprueba exactamente y pide verlo. Y recuerda: sus honorarios los paga el propietario, no el inquilino.' },
    { label: 'Por la impresión que me dé en la visita', points: 0, tip: 'La impresión no paga el alquiler. Pide ingresos acreditados: como referencia prudente, que la renta no pase del 30-35 % de sus ingresos netos.' },
  ] },
  { q: '¿Vas a hacer un inventario con fotos al firmar?', answers: [
    { label: 'Sí, firmado por las dos partes', points: 2 },
    { label: 'No lo había pensado', points: 0, tip: 'Sin inventario con fotos y fecha, al final del contrato es tu palabra contra la suya. Es tu mejor prueba para la fianza.' },
  ] },
  { q: '¿Sabes qué hacer con la fianza?', answers: [
    { label: 'Sí: una mensualidad y la deposito donde toca en mi comunidad', points: 2 },
    { label: 'Me la quedo yo hasta el final', points: 1, tip: 'En la mayoría de comunidades hay que depositar la fianza en un organismo autonómico en un plazo. Comprueba la tuya.', link: { to: '/alquilar-mi-piso', label: 'Dónde se deposita en tu ciudad' } },
    { label: 'No lo sé', points: 0, tip: 'La fianza legal es de una mensualidad en vivienda habitual y, en muchas comunidades, se deposita en un organismo público. La garantía adicional tiene un tope de dos meses.' },
  ] },
  { q: 'Si el inquilino deja de pagar, ¿qué harías?', answers: [
    { label: 'Hablar con él, requerimiento fehaciente y, si hace falta, demanda', points: 2 },
    { label: 'Cambiar la cerradura o cortar los suministros', points: 0, tip: 'Nunca: cambiar la cerradura o cortar suministros puede ser delito de coacciones aunque te deba dinero. La vía es el requerimiento y la demanda.', link: { to: '/herramientas/coste-impago', label: 'Qué hacer si no paga' } },
    { label: 'No lo sé', points: 0, tip: 'Conviene tenerlo claro antes: habla pronto, requiere el pago de forma fehaciente (burofax) y, si no se resuelve, demanda con abogado.', link: { to: '/herramientas/coste-impago', label: 'Cuánto cuesta un impago' } },
  ] },
  { q: '¿Tu seguro de hogar te cubre como arrendador?', answers: [
    { label: 'Sí, continente y responsabilidad civil como arrendador', points: 2 },
    { label: 'No lo sé', points: 1, tip: 'Revisa la póliza: muchas no cubren igual una vivienda alquilada. Avisa a tu aseguradora de que la vas a alquilar.' },
    { label: 'No tengo seguro', points: 0, tip: 'Un seguro de hogar con continente y responsabilidad civil es básico. El seguro de impago es aparte y opcional.' },
  ] },
]
const MAX = QUESTIONS.length * 2

const answers = ref<(number | null)[]>(QUESTIONS.map(() => null))
const current = ref(0)
const finished = ref(false)

function choose(i: number) {
  answers.value[current.value] = i
  if (current.value < QUESTIONS.length - 1) current.value++
  else { finished.value = true; trackEvent('test') }
}
const score = computed(() => answers.value.reduce<number>((s, a, qi) => s + (a === null ? 0 : QUESTIONS[qi]!.answers[a]!.points), 0))
const pct = computed(() => Math.round((score.value / MAX) * 100))
const level = computed(() => (pct.value >= 85
  ? { title: 'Lo tienes muy bien preparado', text: 'Conoces lo importante. Repasa los detalles y elige bien al inquilino: es lo que más protege lo que ganas.' }
  : pct.value >= 55
  ? { title: 'Vas bien, pero te faltan cosas', text: 'Tienes la base, aunque hay puntos que pueden darte un disgusto. Mira los consejos de abajo antes de anunciar el piso.' }
  : { title: 'Mejor prepararlo antes de anunciarlo', text: 'Hay varias cosas que conviene resolver antes de alquilar. Tranquilo: todas tienen solución y aquí te decimos cuáles.' }))
const tips = computed(() => answers.value.flatMap((a, qi) => {
  const ans = a === null ? null : QUESTIONS[qi]!.answers[a]!
  return ans?.tip ? [{ q: QUESTIONS[qi]!.q, tip: ans.tip, link: ans.link }] : []
}))
function restart() {
  answers.value = QUESTIONS.map(() => null)
  current.value = 0
  finished.value = false
}
</script>

<template>
  <div>
    <section class="section">
      <div class="container narrow">
        <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
        <span class="eyebrow">Test para propietarios · 2 minutos</span>
        <h1>¿Estás preparado para alquilar tu piso?</h1>
        <p class="lead">8 preguntas rápidas. Al final te decimos tu nivel y qué te falta, con consejos concretos.</p>

        <div v-if="!finished" class="card card-shadow quiz">
          <div class="progress" aria-hidden="true"><span :style="{ width: `${(current / QUESTIONS.length) * 100}%` }" /></div>
          <p class="small muted">Pregunta {{ current + 1 }} de {{ QUESTIONS.length }}</p>
          <h2>{{ QUESTIONS[current]!.q }}</h2>
          <div class="answers">
            <button v-for="(a, i) in QUESTIONS[current]!.answers" :key="a.label" type="button" class="answer" :class="{ on: answers[current] === i }" @click="choose(i)">{{ a.label }}</button>
          </div>
          <button v-if="current > 0" type="button" class="link small" @click="current--">← Anterior</button>
        </div>

        <div v-else class="result">
          <div class="card card-shadow score">
            <div class="ring" :style="{ '--p': pct }"><strong>{{ pct }}%</strong></div>
            <div>
              <span class="eyebrow">Tu resultado</span>
              <h2>{{ level.title }}</h2>
              <p>{{ level.text }}</p>
              <button type="button" class="link small" @click="restart">Repetir el test</button>
            </div>
          </div>

          <div v-if="tips.length" class="tips">
            <h2>Lo que te conviene revisar</h2>
            <article v-for="t in tips" :key="t.q" class="card tip">
              <p class="small muted">{{ t.q }}</p>
              <p>{{ t.tip }}</p>
              <NuxtLink v-if="t.link" :to="t.link.to" class="small">{{ t.link.label }} →</NuxtLink>
            </article>
          </div>

          <ChecklistDownload />

          <div class="note note-green next">
            <strong>¿Quieres que alguien haga la parte difícil?</strong>
            <p>En RentaHucha verificamos al inquilino, preparamos el contrato conforme a la LAU con inventario y te avisamos de cada pago. Y el inquilino llena cada mes una hucha que, si hay un impago comprobado, pasa a ti.</p>
            <div class="row">
              <NuxtLink to="/cuenta/registro?tipo=propietario" class="btn btn-dark btn-sm">Publicar mi piso gratis</NuxtLink>
              <NuxtLink to="/valoracion-alquiler" class="btn btn-ghost btn-sm">Valoración gratis del alquiler</NuxtLink>
            </div>
          </div>
        </div>
        <p class="small muted fine">Orientativo, según la normativa estatal general. Algunas obligaciones dependen de tu comunidad autónoma.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.narrow { max-width: 860px; }
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
h1 { font-size: clamp(2rem, 4vw, 2.8rem); margin: 10px 0; }
.quiz { margin-top: 24px; display: grid; gap: 12px; }
.progress { height: 6px; background: var(--grey-02); border-radius: 99px; overflow: hidden; }
.progress span { display: block; height: 100%; background: var(--green); transition: width 0.3s; }
.quiz h2 { font-size: 1.5rem; margin: 0 0 6px; }
.quiz p { margin: 0; }
.answers { display: grid; gap: 10px; }
.answer { font: inherit; text-align: left; padding: 16px 18px; border: 1px solid var(--line); border-radius: 14px; background: #fff; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
.answer:hover, .answer.on { border-color: var(--green); background: var(--lime-soft); }
.link { font: inherit; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 0; color: var(--muted); justify-self: start; }
.result { margin-top: 24px; display: grid; gap: 24px; }
.score { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }
.score h2 { margin: 6px 0; font-size: 1.6rem; }
.score p { margin: 0 0 8px; }
.ring { --p: 0; width: 120px; height: 120px; border-radius: 50%; flex: none; display: grid; place-items: center;
  background: radial-gradient(closest-side, #fff 78%, transparent 79%), conic-gradient(var(--green) calc(var(--p) * 1%), var(--grey-02) 0); }
.ring strong { font-size: 1.8rem; }
.tips { display: grid; gap: 10px; }
.tips h2 { font-size: 1.3rem; margin: 0 0 4px; }
.tip p { margin: 0 0 4px; }
.next { display: grid; gap: 8px; }
.next p { margin: 0; }
.row { display: flex; gap: 10px; flex-wrap: wrap; }
.fine { margin-top: 20px; }
</style>
