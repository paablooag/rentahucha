<script setup lang="ts">
import { ownerDemo, type OwnerFlat } from '~/data/demo'

definePageMeta({ layout: 'panel' })
useSeoMeta({ title: 'Mis pisos', robots: 'noindex' })

const o = ownerDemo
const rented = computed(() => o.flats.filter(f => f.tenant))
const rate = computed(() => feeRateFor(o.flats.length))
const netMonthly = computed(() => rented.value.reduce((s, f) => s + f.rent * (1 - rate.value / 100), 0))
const totalHucha = computed(() => o.flats.reduce((s, f) => s + f.hucha, 0))

const statusClass: Record<OwnerFlat['status'], string> = {
  'al día': '',
  'retraso': 'badge-danger',
  'buscando inquilino': 'badge-muted',
}

const selected = ref<number | null>(null)
</script>

<template>
  <div class="dash">
    <div class="hello">
      <h1>Hola, {{ o.name }}</h1>
      <p class="muted">{{ o.flats.length }} pisos · cuota de gestión del {{ formatPercent(rate) }}</p>
    </div>

    <div class="grid kpis">
      <div class="card">
        <div class="stat-label">Ingreso neto este mes</div>
        <div class="stat-value">{{ formatEuro(netMonthly, true) }}</div>
        <p class="small muted">{{ rented.length }} pisos alquilados</p>
      </div>
      <div class="card">
        <div class="stat-label">Garantía acumulada en huchas</div>
        <div class="stat-value">{{ formatEuro(totalHucha) }}</div>
        <p class="small muted">Primer colchón ante un impago</p>
      </div>
      <div class="card alert">
        <div class="stat-label">Requiere atención</div>
        <div class="stat-value danger">1</div>
        <p class="small muted">Retraso en el piso de Sevilla. Ya hemos contactado al inquilino.</p>
      </div>
    </div>

    <section class="card">
      <h2 class="h">Tus pisos</h2>
      <div class="table-wrap flat">
        <table class="table">
          <thead>
            <tr><th>Piso</th><th>Inquilino</th><th class="num">Renta</th><th class="num">Hucha</th><th>Último cobro</th><th>Estado</th></tr>
          </thead>
          <tbody>
            <tr v-for="f in o.flats" :key="f.id">
              <td><strong>{{ f.address }}</strong></td>
              <td>{{ f.tenant ?? '—' }}</td>
              <td class="num">{{ formatEuro(f.rent) }}</td>
              <td class="num">{{ f.hucha ? formatEuro(f.hucha) : '—' }}</td>
              <td>{{ f.lastPayment ?? '—' }}</td>
              <td><span class="badge" :class="statusClass[f.status]">{{ f.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="note note-danger late">
        <strong>Retraso · Av. de la Constitución 11, 1ºA · Sevilla</strong>
        <p>El cobro de octubre ha fallado. Plan activado: aviso al inquilino hoy; si no se resuelve en 5 días, la hucha ({{ formatEuro(547) }}) cubre la renta y se envía requerimiento. Tú cobras con normalidad.</p>
      </div>
    </section>

    <div class="grid cols">
      <section class="card">
        <h2 class="h">Candidatos verificados · C/ de Embajadores (Madrid)</h2>
        <p class="small muted intro">Ordenados por encaje económico con tu piso de {{ formatEuro(690) }}. Solo ves resúmenes verificados.</p>
        <ul class="cands">
          <li v-for="c in o.candidates" :key="c.id" :class="{ sel: selected === c.id }">
            <span class="avatar">{{ c.initials }}</span>
            <div class="info">
              <strong>Ingresos para hasta {{ formatEuro(c.affordableRent) }}/mes</strong>
              <span class="small muted">
                {{ c.employment }} ·
                {{ c.total ? `${c.onTime}/${c.total} pagos puntuales` : 'Sin historial previo en la red' }}
                <template v-if="c.huchaTransferable"> · trae {{ formatEuro(c.huchaTransferable) }} de hucha</template>
                · entrada {{ c.moveIn }}
              </span>
            </div>
            <span class="badge" :class="c.match === 'alto' ? '' : 'badge-amber'">Encaje {{ c.match }}</span>
            <button class="btn btn-sm" :class="selected === c.id ? 'btn-primary' : 'btn-ghost'" type="button" @click="selected = selected === c.id ? null : c.id">
              {{ selected === c.id ? 'Visita solicitada' : 'Pedir visita' }}
            </button>
          </li>
        </ul>
      </section>

      <section class="card">
        <h2 class="h">Incidencias</h2>
        <ul class="incidents">
          <li v-for="i in o.incidents" :key="i.id">
            <div>
              <strong>{{ i.title }}</strong>
              <span class="small muted">{{ i.category }} · {{ i.date }}</span>
            </div>
            <span class="badge" :class="i.status === 'resuelta' ? '' : 'badge-amber'">{{ i.status }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dash { display: grid; gap: 20px; }
.hello h1 { font-size: 1.8rem; margin-bottom: 2px; }
.hello p { margin: 0; }
.kpis { grid-template-columns: 1fr; }
@media (min-width: 820px) { .kpis { grid-template-columns: repeat(3, 1fr); } }
.card p { margin: 6px 0 0; }
.alert { border-color: #f0c9bf; }
.danger { color: var(--danger); }
.h { font-size: 1.1rem; margin-bottom: 12px; }
.flat { border-radius: 10px; }
.late { margin-top: 16px; }
.cols { grid-template-columns: 1fr; align-items: start; }
@media (min-width: 980px) { .cols { grid-template-columns: 1.5fr 1fr; } }
.intro { margin: -4px 0 12px !important; }
.cands { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.cands li { display: grid; grid-template-columns: auto 1fr; gap: 10px 12px; align-items: center; padding: 12px; border: 1.5px solid var(--line); border-radius: 12px; }
@media (min-width: 640px) { .cands li { grid-template-columns: auto 1fr auto auto; } }
.cands li.sel { border-color: var(--green); background: var(--green-soft); }
.avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--navy); color: #fff; display: grid; place-items: center; font-size: 0.8rem; font-weight: 700; }
.info { display: grid; }
.incidents { list-style: none; padding: 0; margin: 0; }
.incidents li { display: flex; justify-content: space-between; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--line); }
.incidents li:last-child { border-bottom: 0; }
.incidents li div { display: grid; }
</style>
