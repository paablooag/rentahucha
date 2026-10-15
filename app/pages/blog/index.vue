<script setup lang="ts">
import type { Audience, BlogPostSummary } from '#shared/utils/blog'

const route = useRoute()
const router = useRouter()

const PAGE = 12

const filter = computed<Audience | 'todos'>(() => (route.query.para === 'propietarios' || route.query.para === 'inquilinos' ? route.query.para : 'todos'))
const topic = computed(() => (typeof route.query.tema === 'string' ? route.query.tema : ''))
const { data: posts } = await useFetch<BlogPostSummary[]>('/api/blog', { default: () => [] })

const byAudience = computed(() => (filter.value === 'todos' ? posts.value : posts.value.filter(p => p.audience === filter.value)))
// Temas disponibles para el público elegido, de más a menos artículos.
const topics = computed(() => {
  const count = new Map<string, number>()
  for (const p of byAudience.value) count.set(p.category, (count.get(p.category) ?? 0) + 1)
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([name, n]) => ({ name, n }))
})
const visible = computed(() => (topic.value ? byAudience.value.filter(p => p.category === topic.value) : byAudience.value))
const featured = computed(() => visible.value[0])
const shown = ref(PAGE)
const rest = computed(() => visible.value.slice(1, shown.value + 1))
const remaining = computed(() => Math.max(0, visible.value.length - 1 - shown.value))
watch([filter, topic], () => { shown.value = PAGE })

function setFilter(f: Audience | 'todos') {
  router.replace({ query: f === 'todos' ? {} : { para: f } })
}

function setTopic(t: string) {
  const { tema: _, ...q } = route.query
  router.replace({ query: t && t !== topic.value ? { ...q, tema: t } : q })
}

useSeoMeta({
  title: 'Blog: guías de alquiler para propietarios e inquilinos',
  description: 'Impagos, fianzas, garantías, duración de los contratos y cómo ahorrar mientras alquilas. Guías claras, con números y con la ley en la mano.',
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="container head">
        <span class="eyebrow">Blog</span>
        <h1>Alquilar bien, con números y con la ley en la mano</h1>
        <p class="lead">Guías prácticas para propietarios que quieren cobrar tranquilos e inquilinos que quieren entrar con menos y ahorrar.</p>
        <div class="filters" role="tablist" aria-label="Filtrar artículos">
          <button v-for="f in (['todos', 'propietarios', 'inquilinos'] as const)" :key="f" type="button" role="tab" :aria-selected="filter === f" :class="{ on: filter === f }" @click="setFilter(f)">
            {{ f === 'todos' ? 'Todos' : AUDIENCES[f] }}
          </button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-if="topics.length > 1" class="topics" aria-label="Filtrar por tema">
          <button type="button" class="chip" :class="{ on: !topic }" :aria-pressed="!topic" @click="setTopic('')">Todos los temas</button>
          <button v-for="t in topics" :key="t.name" type="button" class="chip" :class="{ on: topic === t.name }" :aria-pressed="topic === t.name" @click="setTopic(t.name)">
            {{ t.name }} <span>{{ t.n }}</span>
          </button>
        </div>

        <p v-if="!visible.length" class="muted">Todavía no hay artículos publicados.</p>

        <NuxtLink v-if="featured" :to="`/blog/${featured.slug}`" class="featured">
          <div>
            <span class="badge" :class="featured.audience === 'propietarios' ? 'b-owner' : 'b-tenant'">{{ AUDIENCES[featured.audience] }} · {{ featured.category }}</span>
            <h2>{{ featured.title }}</h2>
            <p class="lead">{{ featured.excerpt }}</p>
            <span class="read">Leer artículo · {{ featured.readingMinutes }} min <AppIcon name="arrow" :size="18" /></span>
          </div>
        </NuxtLink>

        <div class="grid grid-3 list">
          <BlogCard v-for="p in rest" :key="p.slug" :post="p" />
        </div>
        <div v-if="remaining" class="more">
          <button type="button" class="btn btn-ghost" @click="shown += PAGE">Ver más artículos ({{ remaining }})</button>
        </div>

        <div class="ctas grid grid-2">
          <BlogCta audience="propietarios" compact />
          <BlogCta audience="inquilinos" compact />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { padding-bottom: 72px; }
.head { max-width: 820px; }
.filters { display: inline-flex; gap: 6px; padding: 6px; margin-top: 12px; border-radius: 999px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.14); }
.filters button { font: inherit; border: 0; border-radius: 999px; padding: 9px 18px; cursor: pointer; background: transparent; color: #e8e8e8; }
.filters button.on { background: var(--lime); color: var(--ink); font-weight: 500; }
.featured {
  display: block; text-decoration: none; color: #cfcfcf; background: var(--black); border-radius: 24px;
  padding: clamp(28px, 5vw, 56px); margin-bottom: 24px; transition: transform 0.2s;
}
.featured:hover { transform: translateY(-3px); }
.featured h2 { color: #fff; margin: 18px 0 12px; max-width: 22ch; }
.featured .lead { color: #bdbdbd; }
.read { display: inline-flex; gap: 6px; align-items: center; color: var(--lime); font-weight: 500; }
.b-owner { background: var(--lime); color: var(--ink); }
.b-tenant { background: #fff; color: var(--ink); }
.list { margin-bottom: 32px; }
.topics { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.chip { font: inherit; font-size: 0.9rem; border: 1px solid var(--line); background: #fff; color: var(--ink); border-radius: 999px; padding: 7px 14px; cursor: pointer; transition: all 0.15s; }
.chip span { color: var(--muted); font-size: 0.8rem; margin-left: 2px; }
.chip:hover { border-color: var(--ink); }
.chip.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.chip.on span { color: #bdbdbd; }
.more { display: flex; justify-content: center; margin-bottom: 48px; }
</style>
