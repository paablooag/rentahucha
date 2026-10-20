<script setup lang="ts">
// Portal de alquiler por ciudad (para quien busca piso). Muestra los pisos publicados de verdad y, mientras no los hay,
// la información útil para alquilar allí y la alerta para que le avisemos. Datos regionales de shared/utils/cities.ts.
const route = useRoute()
const city = cityBySlug(String(route.params.ciudad))
if (!city) throw createError({ statusCode: 404, statusMessage: 'Ciudad no encontrada', fatal: true })
const region = REGIONS[city.region] as Region

const { data } = await useFetch<{ items: PublicProperty[] }>('/api/pisos', { query: { ciudad: city.name }, default: () => ({ items: [] }) })
const pisos = computed(() => data.value.items.filter(p => p.city.toLowerCase() === city.name.toLowerCase()).slice(0, 9))

const title = `Alquiler de pisos en ${city.name}: requisitos, fianza y zona tensionada (2027)`
const description = `Guía para alquilar piso en ${city.name}: ${city.tension ? 'zona tensionada y tus derechos, ' : ''}cuánto se paga de fianza, dónde se deposita en ${region.name}, qué piden los propietarios y pisos de particulares revisados.`
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/ciudades.png' })

const faqs = computed(() => [
  {
    q: `¿${city.name} es zona tensionada?`,
    a: city.tension
      ? `Sí. Según el Ministerio de Vivienda, está declarada zona de mercado residencial tensionado en ${city.tension.scope}, hasta el ${city.tension.until}. Para ti, como inquilino, eso limita la renta de un contrato nuevo y te permite pedir una prórroga extraordinaria al acabar el contrato (datos consultados el ${CITIES_CHECKED}).`
      : `No figura en la lista de zonas de mercado residencial tensionado del Ministerio de Vivienda consultada el ${CITIES_CHECKED}. Las declaraciones se actualizan cada trimestre.`,
  },
  {
    q: `¿Cuánto se paga de fianza al alquilar en ${city.name}?`,
    a: `Una mensualidad de fianza legal en vivienda habitual y, como mucho, dos mensualidades de garantía adicional en contratos de hasta cinco años (siete si el propietario es una empresa). ${region.deposit ? `En ${region.name}, el propietario debe depositar la fianza en ${region.deposit}: puedes pedirle el justificante.` : `En ${region.name}, según el Ministerio, ahora mismo no hay obligación de depositarla en un organismo público: pide siempre un recibo.`}`,
  },
  { q: '¿Tengo que pagar los honorarios de la inmobiliaria?', a: 'No. Desde la Ley de Vivienda de 2023, los gastos de gestión inmobiliaria y de formalización del contrato los paga el propietario.' },
  { q: '¿Cuánto tiempo puedo quedarme?', a: 'En vivienda habitual puedes prorrogar el contrato año a año hasta cinco años (siete si el propietario es una empresa), aunque se firme por menos. Después hay una prórroga tácita de hasta tres años si nadie avisa.' },
  { q: '¿Qué suelen pedir los propietarios?', a: 'Ingresos acreditados (nóminas, contrato o declaración de la renta), DNI o NIE y, a veces, referencias. Como orientación, que la renta no supere el 30-35 % de los ingresos netos del hogar.' },
])
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'FAQPage', mainEntity: faqs.value.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://rentahucha.es/' },
          { '@type': 'ListItem', position: 2, name: 'Alquiler por ciudad', item: 'https://rentahucha.es/alquiler' },
          { '@type': 'ListItem', position: 3, name: city.name, item: `https://rentahucha.es/alquiler/${city.slug}` },
        ] },
      ],
    }),
  }],
})

const max = ref('')
const hab = ref('')
function search() {
  navigateTo({ path: '/pisos', query: { ciudad: city!.name, ...(max.value ? { max: max.value } : {}), ...(hab.value ? { hab: hab.value } : {}) } })
}
const sameRegion = CITIES.filter(c => c.region === city.region && c.slug !== city.slug)
const others = CITIES.filter(c => c.region !== city.region).slice(0, 18)
</script>

<template>
  <div v-if="city">
    <section class="section">
      <div class="container">
        <nav class="crumbs small" aria-label="Migas de pan"><NuxtLink to="/alquiler">Alquiler por ciudad</NuxtLink> / <span>{{ city.name }}</span></nav>
        <div class="section-head">
          <span class="eyebrow">{{ region.name }} · Pisos de particulares revisados</span>
          <h1>Alquiler de pisos en {{ city.name }}</h1>
          <p class="lead">Busca piso, escribe a los propietarios sin dar tu teléfono y entra sin aval: en lugar de garantías grandes, vas llenando cada mes una hucha a tu nombre que recuperas con un 10 % extra si todo va bien (desde el lanzamiento).</p>
        </div>

        <form class="search" role="search" @submit.prevent="search">
          <div class="field"><label for="s-max">Renta máxima</label>
            <select id="s-max" v-model="max" class="select"><option value="">Cualquiera</option><option v-for="v in [500, 700, 900, 1100, 1300, 1600, 2000]" :key="v" :value="String(v)">{{ formatEuro(v) }}</option></select>
          </div>
          <div class="field"><label for="s-hab">Habitaciones</label>
            <select id="s-hab" v-model="hab" class="select"><option value="">Cualquiera</option><option v-for="v in [1, 2, 3, 4]" :key="v" :value="String(v)">{{ v }} o más</option></select>
          </div>
          <button class="btn btn-primary" type="submit">Buscar en {{ city.name }}</button>
        </form>

        <div v-if="pisos.length" class="grid grid-3 listings">
          <PropertyCard v-for="p in pisos" :key="p.id" :p="p" />
        </div>
        <div v-else class="empty card">
          <strong>Todavía no hay pisos publicados en {{ city.name }}</strong>
          <p class="muted">Estamos empezando a abrir la plataforma ciudad a ciudad. Crea una alerta y te escribimos el primero cuando se publique un piso que encaje contigo.</p>
          <AlertForm :city="city.name" />
        </div>

        <div class="facts">
          <div class="fact" :class="{ warn: city.tension }">
            <span class="label">Zona tensionada</span>
            <strong>{{ city.tension ? 'Sí' : 'No declarada' }}</strong>
            <p v-if="city.tension">En {{ city.tension.scope }}, hasta el {{ city.tension.until }}. La renta de un contrato nuevo tiene límites.</p>
            <p v-else>No figura en la lista del Ministerio de Vivienda.</p>
          </div>
          <div class="fact">
            <span class="label">Fianza</span>
            <strong>1 mes + 2 máx.</strong>
            <p>Fianza legal y, como mucho, dos meses de garantía adicional.</p>
          </div>
          <div class="fact">
            <span class="label">Honorarios de agencia</span>
            <strong>No los pagas tú</strong>
            <p>Desde la Ley de Vivienda de 2023, los paga el propietario.</p>
          </div>
        </div>
        <p class="checked small muted">Datos del Ministerio de Vivienda y Agenda Urbana consultados el {{ CITIES_CHECKED }}.</p>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container prose">
        <h2>Lo que tienes que saber para alquilar en {{ city.name }}</h2>
        <ul class="check-list">
          <li><AppIcon name="check" :size="18" /> <span><strong>La fianza.</strong> Una mensualidad en vivienda habitual. {{ region.deposit ? `En ${region.name}, el propietario debe depositarla en ${region.deposit}; puedes pedirle el justificante.` : `En ${region.name} no hay obligación de depositarla en un organismo público: pide siempre un recibo.` }}</span></li>
          <li v-if="city.tension"><AppIcon name="check" :size="18" /> <span><strong>Zona tensionada: tus derechos.</strong> En un contrato nuevo, la renta en general no puede superar la del contrato anterior de los últimos cinco años (con su actualización) y, si el propietario es gran tenedor, el índice de referencia. Al acabar las prórrogas, puedes pedir una prórroga extraordinaria de hasta tres años, salvo excepciones legales.</span></li>
          <li><AppIcon name="check" :size="18" /> <span><strong>Cuánto puedes pagar.</strong> Los propietarios suelen pedir que la renta no supere el 30-35 % de los ingresos netos del hogar. <NuxtLink to="/herramientas/cuanto-alquiler-puedo-pagar">Calcula tu renta máxima</NuxtLink>.</span></li>
          <li><AppIcon name="check" :size="18" /> <span><strong>Destaca entre los candidatos.</strong> Preséntate con un mensaje claro: quién vivirá, tu situación laboral y desde cuándo. <NuxtLink to="/herramientas/carta-inquilino">Prepara tu carta de presentación</NuxtLink>.</span></li>
          <li><AppIcon name="check" :size="18" /> <span><strong>Cuidado con las estafas.</strong> Nunca pagues una señal ni envíes dinero antes de visitar el piso y comprobar quién es el propietario.</span></li>
        </ul>
      </div>
    </section>

    <section id="avisame" class="section">
      <div class="container signup">
        <div>
          <span class="eyebrow">Alerta de pisos · {{ city.name }}</span>
          <h2>Te avisamos cuando haya pisos en {{ city.name }}</h2>
          <p class="lead">Dinos qué buscas y serás de los primeros en verlos. Sin compromiso.</p>
          <ul class="check-list">
            <li><AppIcon name="check" :size="18" /> Pisos de particulares, revisados antes de publicarse</li>
            <li><AppIcon name="check" :size="18" /> Escribe al propietario sin dar tu teléfono</li>
            <li><AppIcon name="check" :size="18" /> Sin aval: una hucha a tu nombre que recuperas con premio</li>
          </ul>
        </div>
        <LeadForm role="inquilino" :city="city.name" />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Alquilar en {{ city.name }}</h2>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="owner small">¿Tienes un piso en {{ city.name }}? <NuxtLink :to="`/alquilar-mi-piso/${city.slug}`">Guía para alquilarlo</NuxtLink> · <NuxtLink to="/valoracion-alquiler">Valoración gratis</NuxtLink></p>
        <template v-if="sameRegion.length">
          <h2 class="others-title">Alquiler en {{ region.name }}</h2>
          <div class="others"><NuxtLink v-for="c in sameRegion" :key="c.slug" :to="`/alquiler/${c.slug}`">{{ c.name }}</NuxtLink></div>
        </template>
        <h2 class="others-title">Otras ciudades</h2>
        <div class="others">
          <NuxtLink v-for="c in others" :key="c.slug" :to="`/alquiler/${c.slug}`">{{ c.name }}</NuxtLink>
          <NuxtLink to="/alquiler" class="all">Todas →</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.crumbs { margin-bottom: 16px; color: var(--muted); }
.crumbs a { color: var(--muted); }
.search { display: grid; grid-template-columns: 1fr 1fr auto; gap: 12px; align-items: end; padding: 16px; border: 1px solid var(--line); border-radius: 18px; background: #fff; margin-bottom: 20px; }
.search > * { min-width: 0; }
@media (max-width: 640px) { .search { grid-template-columns: 1fr 1fr; } .search .btn { grid-column: 1 / -1; } }
.listings { margin-bottom: 24px; }
.empty { display: grid; gap: 6px; justify-items: start; margin-bottom: 24px; }
.empty p { margin: 0 0 6px; }
.facts { display: grid; gap: 14px; }
@media (min-width: 800px) { .facts { grid-template-columns: repeat(3, 1fr); } }
.fact { border: 1px solid var(--line); border-radius: 16px; padding: 18px; background: #fff; display: grid; gap: 4px; align-content: start; }
.fact.warn { background: var(--lime-soft); border-color: transparent; }
.fact .label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
.fact strong { font-size: 1.35rem; font-weight: 600; letter-spacing: -0.02em; }
.fact p { margin: 0; font-size: 0.92rem; color: var(--muted); }
.checked { margin-top: 12px; }
.prose { max-width: 820px; }
.signup { display: grid; gap: 48px; align-items: start; }
@media (min-width: 900px) { .signup { grid-template-columns: 1fr 1fr; } }
.owner { margin: 0 0 24px; }
.others-title { font-size: 1.2rem; margin: 18px 0 12px; }
.others { display: flex; flex-wrap: wrap; gap: 8px; }
.others a { padding: 7px 13px; border-radius: 999px; background: #fff; border: 1px solid var(--line); color: var(--ink); text-decoration: none; font-size: 0.9rem; }
.others a:hover { border-color: var(--green); }
.others a.all { border-color: transparent; text-decoration: underline; }
</style>
