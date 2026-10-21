<script setup lang="ts">
definePageMeta({ middleware: 'cuenta' })
useSeoMeta({ title: 'Mi cuenta', robots: 'noindex' })
const { user, logout } = useAccount()
const isOwner = computed(() => user.value?.role === 'propietario')

const { data: pisos } = await useFetch<Property[]>('/api/mis-pisos', { immediate: isOwner.value, default: () => [], headers: useRequestHeaders(['cookie']) })
const { data: convs } = await useFetch<{ id: string; unread: number }[]>('/api/conversaciones', { default: () => [], headers: useRequestHeaders(['cookie']) })
const unreadConvs = computed(() => convs.value.filter(c => c.unread > 0).length)

const notify = ref(true)
onMounted(async () => { notify.value = (await $fetch<{ notifyMessages: boolean }>('/api/cuenta/yo')).notifyMessages })
async function toggleNotify() {
  notify.value = (await $fetch<{ messages: boolean }>('/api/cuenta/avisos', { method: 'PUT', body: { messages: !notify.value } })).messages
}
const deleting = ref(false)
const delPass = ref('')
const delError = ref('')
async function removeAccount() {
  delError.value = ''
  try {
    await $fetch('/api/cuenta', { method: 'DELETE', body: { password: delPass.value } })
    await logout()
  }
  catch (e) { delError.value = apiError(e).message }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <AccountNav />
      <h1>Hola, {{ user?.name.split(' ')[0] }}</h1>
      <p v-if="user?.isAgency" class="agency small">Cuenta de inmobiliaria · <strong>{{ user.company }}</strong> · hasta 300 pisos</p>
      <p class="muted lead-s">{{ isOwner ? 'Publica tu piso, revisa su estado y responde a los interesados.' : 'Busca piso y habla con los propietarios desde aquí, sin dar tu teléfono.' }}</p>

      <div class="beta note">
        <strong>Estamos en beta</strong>
        <p>Ya puedes {{ isOwner ? 'publicar tu piso y hablar con inquilinos' : 'ver pisos y escribir a sus propietarios' }}. La hucha, la firma online del contrato y los cobros se activarán en el lanzamiento: te avisaremos.</p>
      </div>

      <div class="tiles">
        <NuxtLink v-if="isOwner" to="/mi-cuenta/pisos" class="tile">
          <span class="label">Mis pisos</span>
          <strong>{{ pisos.length }}</strong>
          <span class="sub">{{ pisos.filter(p => p.status === 'publicado').length }} publicados · {{ pisos.filter(p => p.status === 'revision').length }} en revisión</span>
        </NuxtLink>
        <NuxtLink v-else to="/pisos" class="tile">
          <span class="label">Buscar piso</span>
          <strong>→</strong>
          <span class="sub">Filtra por ciudad, renta y habitaciones</span>
        </NuxtLink>
        <NuxtLink to="/mi-cuenta/mensajes" class="tile">
          <span class="label">Mensajes</span>
          <strong>{{ convs.length }}</strong>
          <span class="sub">{{ unreadConvs ? `${unreadConvs} con mensajes nuevos` : 'Todo leído' }}</span>
        </NuxtLink>
        <NuxtLink v-if="!isOwner" to="/mi-cuenta/perfil" class="tile tile-cta">
          <span class="label">Mi perfil</span>
          <strong>→</strong>
          <span class="sub">Los propietarios lo ven al recibir tu mensaje</span>
        </NuxtLink>
        <NuxtLink v-if="isOwner" to="/mi-cuenta/pisos/nuevo" class="tile tile-cta">
          <span class="label">Nuevo anuncio</span>
          <strong>+</strong>
          <span class="sub">Publica un piso en unos minutos</span>
        </NuxtLink>
      </div>

      <div class="card settings">
        <h2>Tu cuenta</h2>
        <dl>
          <dt>Nombre</dt><dd>{{ user?.name }}</dd>
          <dt>Correo</dt><dd>{{ user?.email }}</dd>
          <dt>Tipo</dt><dd>{{ user?.isAgency ? `Inmobiliaria (${user.company})` : isOwner ? 'Propietario' : 'Busco piso' }}</dd>
        </dl>
        <label class="notify"><input type="checkbox" :checked="notify" @change="toggleNotify"> Avisarme por correo cuando reciba un mensaje</label>
        <div class="row">
          <button type="button" class="btn btn-ghost btn-sm" @click="logout">Salir</button>
          <button type="button" class="link danger" @click="deleting = !deleting">Borrar mi cuenta</button>
        </div>
        <form v-if="deleting" class="del" @submit.prevent="removeAccount">
          <p class="small">Se borrarán tu cuenta, tus anuncios, sus fotos y tus conversaciones. No se puede deshacer.</p>
          <input v-model="delPass" class="input" type="password" placeholder="Tu contraseña" autocomplete="current-password" required>
          <button class="btn btn-sm danger-btn" type="submit">Borrar definitivamente</button>
          <p v-if="delError" class="err small">{{ delError }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 { font-size: 2.2rem; margin: 0 0 6px; }
.lead-s { margin: 0 0 20px; }
.beta { margin-bottom: 20px; }
.tiles { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 28px; }
.tile { border: 1px solid var(--line); border-radius: 18px; padding: 20px; background: #fff; display: grid; gap: 4px; color: var(--ink); text-decoration: none; transition: transform 0.15s, border-color 0.15s; }
.tile:hover { transform: translateY(-2px); border-color: var(--green); }
.tile .label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
.tile strong { font-size: 2rem; font-weight: 600; }
.tile .sub { font-size: 0.88rem; color: var(--muted); }
.tile-cta { background: var(--lime); border-color: var(--lime); }
.tile-cta .label, .tile-cta .sub { color: #2f2f2f; }
.settings h2 { font-size: 1.2rem; margin: 0 0 12px; }
dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 18px; margin: 0 0 16px; font-size: 0.95rem; }
dt { font-weight: 600; }
dd { margin: 0; word-break: break-word; }
.notify { display: flex; gap: 10px; align-items: center; margin: 0 0 16px; font-size: 0.95rem; }
.notify input { accent-color: var(--green); }
.row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.link { font: inherit; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 0; }
.danger { color: var(--danger); }
.del { display: grid; gap: 10px; max-width: 360px; margin-top: 14px; }
.danger-btn { background: var(--danger); color: #fff; border-color: var(--danger); }
.err { color: var(--danger); margin: 0; }
</style>
