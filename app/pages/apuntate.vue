<script setup lang="ts">
import type { LeadRole } from '#shared/utils/leads'

const route = useRoute()
const router = useRouter()

const role = ref<LeadRole>(route.query.tipo === 'inquilino' ? 'inquilino' : 'propietario')
watch(role, (r) => { router.replace({ query: { ...route.query, tipo: r }, hash: route.hash }) })

// Si se llega desde un botón (?tipo=…) sin el ancla, se baja igualmente al formulario.
onMounted(() => {
  if (route.query.tipo && !route.hash) router.replace({ query: route.query, hash: '#formulario' })
})
watch(() => route.query.tipo, (t) => { role.value = t === 'inquilino' ? 'inquilino' : 'propietario' })

const isOwner = computed(() => role.value === 'propietario')

useSeoMeta({
  title: 'Apúntate a la lista de espera',
  description: 'Déjanos tus datos y te avisamos antes del lanzamiento: inquilinos verificados y hucha anti-impago para propietarios, y hucha de ahorro para inquilinos. Sin compromiso.',
})

const steps = computed(() => (isOwner.value
  ? [
      { t: 'Te escribimos antes del lanzamiento', d: 'Con las condiciones de lanzamiento y cómo funciona la hucha, antes de que decidas nada.' },
      { t: 'Das de alta tu piso con prioridad', d: 'Los primeros de la lista eligen antes entre los candidatos verificados de su zona.' },
      { t: 'Alquilas con tranquilidad', d: 'Avisos de cada pago y la hucha del inquilino, que pasa a ti si hay un impago.' },
    ]
  : [
      { t: 'Te escribimos antes del lanzamiento', d: 'Para crear tu pasaporte de inquilino antes que nadie.' },
      { t: 'Verificamos tu perfil una sola vez', d: 'Y te avisamos de pisos de la red que encajan con lo que buscas.' },
      { t: 'Entras y empiezas a ahorrar', d: 'Cada mes, tu hucha crece y tu historial de buen pagador también.' },
    ]))
</script>

<template>
  <div>
    <section class="hero">
      <div class="container head">
        <span class="eyebrow">Lista de espera · Sin compromiso</span>
        <h1>{{ isOwner ? 'Sé de los primeros propietarios' : 'Sé de los primeros en tener tu hucha' }}</h1>
        <p class="lead">
          Todavía no hemos lanzado. Déjanos tus datos y te avisamos antes que a nadie, con condiciones de lanzamiento.
          Solo te pedimos lo necesario para poder escribirte y saber qué buscas.
        </p>
      </div>
    </section>

    <section class="section">
      <div id="formulario" class="container layout form-anchor">
        <LeadForm v-model:role="role" switchable />

        <aside class="side">
          <div class="card">
            <h3>Qué pasa después</h3>
            <ol class="steps">
              <li v-for="(s, i) in steps" :key="s.t">
                <span class="n">{{ i + 1 }}</span>
                <div>
                  <strong>{{ s.t }}</strong>
                  <p class="small muted">{{ s.d }}</p>
                </div>
              </li>
            </ol>
          </div>
          <div class="card soft">
            <h3>Tus datos, a salvo</h3>
            <ul class="check-list small">
              <li><AppIcon name="lock" :size="16" /> No pedimos DNI, nóminas ni documentos.</li>
              <li><AppIcon name="check" :size="16" /> Solo los usamos para avisarte y conocer el interés.</li>
              <li><AppIcon name="check" :size="16" /> Te das de baja con un correo cuando quieras.</li>
            </ul>
          </div>
          <NuxtLink :to="`/blog?para=${isOwner ? 'propietarios' : 'inquilinos'}`" class="blog-link">
            ¿Aún con dudas? Lee nuestras guías para {{ isOwner ? 'propietarios' : 'inquilinos' }} <AppIcon name="arrow" :size="16" />
          </NuxtLink>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { padding-bottom: 72px; }
/* Al entrar con #formulario, el hueco para la cabecera fija lo pone scroll-padding-top (main.css). */
.form-anchor { scroll-margin-top: 8px; }
.head { max-width: 820px; }
.layout { display: grid; gap: 32px; align-items: start; }
@media (min-width: 980px) { .layout { grid-template-columns: 1.6fr 1fr; } }
.side { display: grid; gap: 16px; }
@media (min-width: 980px) { .side { position: sticky; top: 100px; } }
.soft { background: var(--off); border-color: transparent; }
.steps { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 16px; }
.steps li { display: flex; gap: 12px; }
.steps p { margin: 2px 0 0; }
.n { flex: none; width: 30px; height: 30px; border-radius: 50%; background: var(--lime); display: grid; place-items: center; font-weight: 600; font-size: 0.9rem; }
.check-list { margin-top: 12px; }
.blog-link { display: inline-flex; gap: 6px; align-items: center; font-weight: 500; padding: 4px 0; }
</style>
