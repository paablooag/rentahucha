<script setup lang="ts">
const route = useRoute()
const city = cityBySlug(String(route.params.ciudad))
if (!city) throw createError({ statusCode: 404, statusMessage: 'Ciudad no encontrada', fatal: true })

const region = REGIONS[city.region]
const title = `Alquilar mi piso en ${city.name} en 2027: guía para propietarios`
const description = `Cómo alquilar tu piso en ${city.name}: ${city.tension ? 'zona tensionada y límites de renta' : 'renta, contrato LAU'}, dónde va la fianza en ${region.name}, cómo elegir inquilino y qué hacer si no paga.`
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: 'https://rentahucha.es/og/ciudades.png' })

const faqs = computed(() => [
  {
    q: `¿${city.name} es zona tensionada?`,
    a: city.tension
      ? `Sí. Según el Ministerio de Vivienda, ${city.name} tiene declarada como zona de mercado residencial tensionado ${city.tension.scope}, con vigencia hasta el ${city.tension.until}. Datos consultados el ${CITIES_CHECKED}.`
      : `No figura en la lista de zonas de mercado residencial tensionado del Ministerio de Vivienda consultada el ${CITIES_CHECKED}. Las declaraciones se publican cada trimestre, así que conviene comprobarlo antes de firmar.`,
  },
  {
    q: `¿Dónde se deposita la fianza del alquiler en ${city.name}?`,
    a: region.deposit
      ? `En ${region.name}, la fianza se deposita en ${region.deposit}. Es una mensualidad de renta en vivienda habitual y el plazo y la forma de pago los fija la comunidad.`
      : `Según el Ministerio de Vivienda, en ${region.name} ahora mismo no existe obligación de depositar la fianza en un organismo público. La fianza de una mensualidad sigue siendo obligatoria: la guarda el propietario y la devuelve al final del contrato.`,
  },
  {
    q: '¿Cuánto puedo pedir de garantía además de la fianza?',
    a: 'Como máximo dos mensualidades de garantía adicional en contratos de hasta cinco años (siete si el arrendador es empresa), además de la fianza legal de una mensualidad.',
  },
  {
    q: '¿Quién paga a la inmobiliaria?',
    a: 'Desde la Ley de Vivienda de 2023, los gastos de gestión inmobiliaria y de formalización del contrato corren a cargo del propietario.',
  },
  {
    q: `¿RentaHucha funciona en ${city.name}?`,
    a: `Estamos en lista de espera en toda España, incluida ${city.name}. Si apuntas tu piso ahora, entras con prioridad y condiciones de lanzamiento, sin compromiso.`,
  },
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
          { '@type': 'ListItem', position: 2, name: 'Alquilar mi piso', item: 'https://rentahucha.es/alquilar-mi-piso' },
          { '@type': 'ListItem', position: 3, name: city.name, item: `https://rentahucha.es/alquilar-mi-piso/${city.slug}` },
        ] },
      ],
    }),
  }],
})

const steps = [
  { t: 'Prepara los papeles', d: 'Certificado de eficiencia energética (obligatorio y en el anuncio), seguro de hogar y, si tu comunidad la exige, cédula de habitabilidad.' },
  { t: 'Fija la renta con datos', d: 'Compara pisos parecidos de tu barrio y consulta el sistema estatal de índices de referencia del alquiler.' },
  { t: 'Elige inquilino por solvencia', d: 'Ingresos acreditados, contrato y vida laboral. Como referencia prudente, que la renta no pase del 30-35 % de sus ingresos netos.' },
  { t: 'Firma un contrato LAU con inventario', d: 'Duración, renta, actualización, gastos y un inventario con fotos firmado por las dos partes.' },
  { t: 'Cobra con rastro y actúa pronto', d: 'Transferencia o domiciliación. Si un pago falla, habla enseguida y, si hace falta, por la vía legal: nunca cambies la cerradura.' },
]
const others = CITIES.filter(c => c.slug !== city.slug)
// Demanda real en la ciudad (alertas y lista de espera). Solo se muestra a partir de 5 personas.
const { data: demand } = await useFetch<{ show: boolean; n: number | null }>(`/api/demanda/${encodeURIComponent(city.name)}`, { default: () => ({ show: false, n: null }) })
</script>

<template>
  <div v-if="city">
    <section class="section">
      <div class="container">
        <nav class="crumbs small" aria-label="Migas de pan"><NuxtLink to="/alquilar-mi-piso">Alquilar mi piso</NuxtLink> / <span>{{ city.name }}</span></nav>
        <div class="section-head">
          <span class="eyebrow">Guía local para propietarios · {{ region.name }}</span>
          <h1>Alquilar mi piso en {{ city.name }}</h1>
          <p class="lead">{{ city.intro }}</p>
          <div class="hero-cta">
            <a href="#formulario" class="btn btn-primary">Apuntar mi piso en {{ city.name }}</a>
            <NuxtLink to="/herramientas/checklist-alquilar-piso" class="btn btn-ghost">Checklist gratis</NuxtLink>
          </div>
        </div>

        <div class="facts">
          <div class="fact" :class="{ warn: city.tension }">
            <span class="label">Zona tensionada</span>
            <strong>{{ city.tension ? 'Sí' : 'No declarada' }}</strong>
            <p v-if="city.tension">Declarada en {{ city.tension.scope }}, hasta el {{ city.tension.until }}.</p>
            <p v-else>No figura en la lista del Ministerio de Vivienda.</p>
          </div>
          <div class="fact">
            <span class="label">Depósito de la fianza</span>
            <strong>{{ region.deposit ? 'Obligatorio' : 'No obligatorio ahora' }}</strong>
            <p v-if="region.deposit">En {{ region.deposit }}.</p>
            <p v-else>La fianza sigue siendo obligatoria; la guardas tú.</p>
          </div>
          <div class="fact">
            <span class="label">Fianza y garantía</span>
            <strong>1 + 2 meses máx.</strong>
            <p>Fianza legal de una mensualidad y, como mucho, dos de garantía adicional.</p>
          </div>
        </div>
        <p v-if="demand.show" class="demand"><strong>{{ demand.n }} personas</strong> buscan piso en {{ city.name }} en RentaHucha ahora mismo.</p>
        <p class="checked small muted">Datos del Ministerio de Vivienda y Agenda Urbana consultados el {{ CITIES_CHECKED }}. Las zonas tensionadas se actualizan cada trimestre.</p>
      </div>
    </section>

    <section v-if="city.tension" class="section section-alt">
      <div class="container prose">
        <h2>Qué significa que {{ city.name }} sea zona tensionada</h2>
        <ul class="check-list">
          <li><AppIcon name="check" :size="18" /> <span><strong>La renta de un contrato nuevo tiene límite.</strong> En general, no puede superar la del contrato anterior de los últimos cinco años (con su actualización). Si eres gran tenedor, además, el índice de referencia de precios. Hay excepciones, por ejemplo tras ciertas obras de rehabilitación.</span></li>
          <li><AppIcon name="check" :size="18" /> <span><strong>Prórroga extraordinaria.</strong> Al acabar las prórrogas, el inquilino puede pedir una prórroga extra por años hasta un máximo de tres, salvo en los supuestos que prevé la ley.</span></li>
          <li><AppIcon name="check" :size="18" /> <span><strong>Ventajas en el IRPF.</strong> En los contratos firmados hasta el 1-12-2026, la reducción del rendimiento puede subir al 90 % si bajas la renta más de un 5 %, o al 70 % en algunos primeros alquileres a jóvenes. En los posteriores, con el decreto de octubre, al 90 % o al 95 % (inquilino de 18 a 35 años), o al 100 % si quedas por debajo del índice. <NuxtLink to="/herramientas/reduccion-irpf-alquiler">Calcúlalo</NuxtLink>.</span></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>Qué cambia con el decreto de vivienda de octubre de 2026 en {{ city.name }}</h2>
        <p class="small muted">Real Decreto-ley 29/2026, en vigor desde el 8 de octubre y pendiente de convalidación. <NuxtLink to="/blog/decretos-de-vivienda-octubre-2026-explicados">Guía completa</NuxtLink>.</p>
        <ul class="check-list">
          <li><AppIcon name="check" :size="18" /> <span><strong>Subida de la renta.</strong> Hasta el 31-12-2027, sin nuevo acuerdo, como máximo un 2 %, y nada si la renta supera el índice de referencia. <NuxtLink to="/herramientas/subida-alquiler-irav">Calcula tu subida</NuxtLink>.</span></li>
          <li v-if="city.tension"><AppIcon name="check" :size="18" /> <span><strong>Anuncio.</strong> Al ser zona tensionada, el anuncio debe indicar el índice de referencia del precio y, si hay limitación, el límite de renta aplicable. <NuxtLink to="/blog/que-debe-incluir-un-anuncio-de-alquiler-decreto-29-2026">Qué debe incluir</NuxtLink>.</span></li>
          <li v-else><AppIcon name="check" :size="18" /> <span><strong>Anuncio.</strong> Debe ser veraz e incluir, cuando proceda, el número de registro de la vivienda y si eres gran tenedor. <NuxtLink to="/blog/que-debe-incluir-un-anuncio-de-alquiler-decreto-29-2026">Qué debe incluir</NuxtLink>.</span></li>
          <li><AppIcon name="check" :size="18" /> <span><strong>IRPF.</strong> En los contratos posteriores al 1-12-2026, la reducción va del 15 % (si subes la renta) al 100 % (si la bajas más de un 5 % y quedas por debajo del índice o renuevas con el mismo inquilino al acabar los cinco años). <NuxtLink to="/herramientas/reduccion-irpf-alquiler">Calculadora</NuxtLink>.</span></li>
          <li><AppIcon name="check" :size="18" /> <span><strong>Temporada y habitaciones.</strong> La temporada exige una causa escrita y probada, y dura más de 31 días y en general hasta 12 meses; la suma de las habitaciones no puede superar la renta del piso completo. <NuxtLink to="/blog/alquiler-de-temporada-nuevas-reglas-12-meses">Las reglas</NuxtLink>.</span></li>
          <li><AppIcon name="check" :size="18" /> <span><strong>IBI de pisos vacíos.</strong> {{ city.tension ? `En ${city.name}, al ser zona tensionada, el ayuntamiento puede recargar el IBI de un piso vacío más de dos años sin causa aunque sea el único que tienes.` : `Fuera de zona tensionada, el recargo por piso vacío más de dos años solo puede aplicarse a quien tiene cuatro o más viviendas.` }} <NuxtLink to="/blog/pisos-vacios-recargo-ibi-decreto">Detalle</NuxtLink>.</span></li>
          <li><AppIcon name="check" :size="18" /> <span><strong>Garantías y final del contrato.</strong> No puedes exigir al inquilino un seguro de impago, y al terminar hay que firmar un documento con el estado de la vivienda. <NuxtLink to="/blog/documento-finalizacion-contrato-alquiler-plantilla">Plantilla</NuxtLink>.</span></li>
        </ul>

        <h2>Cómo alquilar tu piso en {{ city.name }}, paso a paso</h2>
        <ol class="steps">
          <li v-for="s in steps" :key="s.t"><strong>{{ s.t }}.</strong> {{ s.d }}</li>
        </ol>
        <h2>Consejos para {{ city.name }}</h2>
        <ul class="check-list">
          <li v-for="tip in city.tips" :key="tip"><AppIcon name="check" :size="18" /> <span>{{ tip }}</span></li>
        </ul>
        <div class="note note-green more">
          <strong>Así te ayuda RentaHucha</strong>
          <p>Ya puedes publicar tu piso gratis en la beta: lo revisamos y los interesados te escriben por chat sin dar su teléfono. Desde el lanzamiento, verificaremos a los inquilinos, prepararemos el contrato conforme a la LAU con inventario y te avisaremos de cada pago; el inquilino irá llenando cada mes una hucha a su nombre, custodiada por una entidad financiera autorizada, y si hay un impago comprobado su saldo se usará para pagarte. Pagarás el 5 % de la renta, solo cuando cobres.</p>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas sobre alquilar en {{ city.name }}</h2>
        </div>
        <FaqList :items="faqs" />
      </div>
    </section>

    <section id="formulario" class="section">
      <div class="container signup">
        <div>
          <span class="eyebrow">Lista de espera · {{ city.name }}</span>
          <h2>Apunta tu piso en {{ city.name }}</h2>
          <p class="lead">Los primeros pisos de cada ciudad entran con prioridad y condiciones de lanzamiento. Sin compromiso ni coste hasta que firmes.</p>
          <ul class="check-list">
            <li><AppIcon name="check" :size="18" /> Inquilinos verificados en tu zona</li>
            <li><AppIcon name="check" :size="18" /> Contrato LAU, inventario y aviso de cada pago</li>
            <li><AppIcon name="check" :size="18" /> La hucha del inquilino, que pasa a ti si hay impago</li>
          </ul>
        </div>
        <LeadForm role="propietario" :city="city.name" />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <p class="small tenant-link">¿Buscas piso en {{ city.name }}? <NuxtLink :to="`/alquiler/${city.slug}`">Alquiler de pisos en {{ city.name }}</NuxtLink></p>
        <h2 class="others-title">Alquilar en otras ciudades</h2>
        <div class="others">
          <NuxtLink v-for="c in others" :key="c.slug" :to="`/alquilar-mi-piso/${c.slug}`">{{ c.name }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.crumbs { margin-bottom: 16px; color: var(--muted); }
.crumbs a { color: var(--muted); }
.hero-cta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
.facts { display: grid; gap: 14px; }
@media (min-width: 800px) { .facts { grid-template-columns: repeat(3, 1fr); } }
.fact { border: 1px solid var(--line); border-radius: 16px; padding: 18px; background: #fff; display: grid; gap: 4px; align-content: start; }
.fact.warn { background: var(--lime-soft); border-color: transparent; }
.fact .label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
.fact strong { font-size: 1.4rem; font-weight: 600; letter-spacing: -0.02em; }
.fact p { margin: 0; font-size: 0.92rem; color: var(--muted); }
.checked { margin-top: 12px; }
.prose { max-width: 820px; }
.prose h2 { margin-top: 8px; }
.prose h2 + * { margin-bottom: 32px; }
.steps { padding-left: 20px; display: grid; gap: 12px; }
.steps li::marker { color: var(--green); font-weight: 700; }
.more { margin-top: 28px; }
.signup { display: grid; gap: 48px; align-items: start; }
@media (min-width: 900px) { .signup { grid-template-columns: 1fr 1fr; } }
.others-title { font-size: 1.3rem; margin-bottom: 14px; }
.others { display: flex; flex-wrap: wrap; gap: 8px; }
.others a { padding: 8px 14px; border-radius: 999px; background: #fff; border: 1px solid var(--line); color: var(--ink); text-decoration: none; font-size: 0.92rem; }
.others a:hover { border-color: var(--green); }
.demand { margin: 16px 0 0; padding: 12px 16px; border-radius: 14px; background: var(--lime); display: inline-block; }
</style>
