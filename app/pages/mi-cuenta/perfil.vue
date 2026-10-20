<script setup lang="ts">
definePageMeta({ middleware: 'cuenta' })
useSeoMeta({ title: 'Mi perfil de inquilino', robots: 'noindex' })
const { user } = useAccount()
if (user.value?.role !== 'inquilino') await navigateTo('/mi-cuenta')

const { data } = await useFetch<{ profile: TenantProfile | null }>('/api/cuenta/perfil')
const form = reactive<TenantProfile>({ employment: '', income: '', household: '', people: '', pets: '', moveDate: null, stay: '', about: '', ...(data.value?.profile ?? {}) })
const pending = ref(false)
const saved = ref(false)
const error = ref('')
const pct = computed(() => profileCompleteness(form))

// Borrador de la carta de presentación (/herramientas/carta-inquilino): rellena lo que esté vacío.
const fromDraft = ref(false)
onMounted(() => {
  try {
    const raw = localStorage.getItem('rh-draft-perfil')
    if (!raw) return
    const d = JSON.parse(raw) as Partial<TenantProfile>
    for (const [k, v] of Object.entries(d)) if (v && !form[k as keyof TenantProfile]) (form as Record<string, unknown>)[k] = v
    localStorage.removeItem('rh-draft-perfil')
    fromDraft.value = true
  }
  catch {}
})

async function save() {
  pending.value = true
  error.value = ''
  saved.value = false
  try {
    await $fetch('/api/cuenta/perfil', { method: 'PUT', body: form })
    saved.value = true
  }
  catch (e) { error.value = apiError(e).message }
  finally { pending.value = false }
}
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <AccountNav />
      <h1>Mi perfil de inquilino</h1>
      <p class="muted intro">Los propietarios a los que escribas verán este perfil junto a tus mensajes. Un perfil completo recibe más respuestas. Nadie más lo ve.</p>

      <p v-if="fromDraft" class="note note-green small">Hemos rellenado tu perfil con la carta de presentación. Revísalo y pulsa «Guardar perfil».</p>
      <div class="progress">
        <span>Perfil completo al {{ pct }} %</span>
        <div class="bar"><span :style="{ width: `${pct}%` }" /></div>
      </div>

      <form class="card form" @submit.prevent="save">
        <div class="field">
          <label for="tp-emp">Situación laboral</label>
          <select id="tp-emp" v-model="form.employment" class="select"><option value="">Prefiero no decirlo</option><option v-for="o in TENANT_OPTIONS.employment" :key="o" :value="o">{{ o }}</option></select>
        </div>
        <div class="field">
          <label for="tp-inc">Ingresos netos al mes (de todo el hogar)</label>
          <select id="tp-inc" v-model="form.income" class="select"><option value="">Prefiero no decirlo</option><option v-for="o in TENANT_OPTIONS.income" :key="o" :value="o">{{ o }}</option></select>
          <span class="hint">Solo el tramo. Ayuda al propietario a ver si la renta encaja (¿no lo tienes claro? <NuxtLink to="/herramientas/cuanto-alquiler-puedo-pagar">calcula cuánto alquiler puedes pagar</NuxtLink>).</span>
        </div>
        <div class="field">
          <label for="tp-house">Con quién vivirás</label>
          <select id="tp-house" v-model="form.household" class="select"><option value="">—</option><option v-for="o in TENANT_OPTIONS.household" :key="o" :value="o">{{ o }}</option></select>
        </div>
        <div class="field">
          <label for="tp-people">Cuántas personas</label>
          <select id="tp-people" v-model="form.people" class="select"><option value="">—</option><option v-for="o in TENANT_OPTIONS.people" :key="o" :value="o">{{ o }}</option></select>
        </div>
        <div class="field">
          <label for="tp-pets">Mascotas</label>
          <select id="tp-pets" v-model="form.pets" class="select"><option value="">—</option><option v-for="o in TENANT_OPTIONS.pets" :key="o" :value="o">{{ o }}</option></select>
        </div>
        <div class="field">
          <label for="tp-move">Cuándo te mudarías</label>
          <input id="tp-move" v-model="form.moveDate" class="input" type="date">
        </div>
        <div class="field">
          <label for="tp-stay">Cuánto tiempo piensas quedarte</label>
          <select id="tp-stay" v-model="form.stay" class="select"><option value="">—</option><option v-for="o in TENANT_OPTIONS.stay" :key="o" :value="o">{{ o }}</option></select>
        </div>
        <div class="field full">
          <label for="tp-about">Preséntate</label>
          <textarea id="tp-about" v-model="form.about" class="input" rows="5" maxlength="1000" placeholder="A qué te dedicas, por qué te mudas, cómo cuidas la casa… Lo que le contarías al propietario en la primera visita." />
          <span class="hint">{{ form.about.length }}/1000</span>
        </div>
        <div class="actions full">
          <p v-if="error" class="err small" role="alert">{{ error }}</p>
          <p v-else-if="saved" class="ok small" role="status">Guardado</p>
          <button class="btn btn-primary" type="submit" :disabled="pending">{{ pending ? 'Guardando…' : 'Guardar perfil' }}</button>
        </div>
      </form>
      <p class="small muted note-v">Pronto podrás verificar tus ingresos con tu banco para tener el «pasaporte de inquilino» y alquilar sin aval. Te avisaremos.</p>
    </div>
  </section>
</template>

<style scoped>
.narrow { max-width: 820px; }
h1 { font-size: 2.2rem; margin: 0 0 6px; }
.intro { margin: 0 0 16px; }
.progress { display: grid; gap: 6px; margin-bottom: 16px; font-size: 0.9rem; font-weight: 500; }
.bar { height: 8px; background: var(--grey-02); border-radius: 99px; overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--green); transition: width 0.3s; }
.form { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }
.form > * { min-width: 0; }
.full { grid-column: 1 / -1; }
.actions { display: flex; gap: 12px; justify-content: flex-end; align-items: center; }
.actions p { margin: 0; }
.err { color: var(--danger); }
.ok { color: var(--green); }
.note-v { margin-top: 14px; }
@media (max-width: 640px) { .form { grid-template-columns: 1fr; } }
</style>
