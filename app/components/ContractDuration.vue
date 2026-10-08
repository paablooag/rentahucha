<template>
  <div>
    <div class="grid grid-3">
      <div v-for="(o, i) in DURATION_OPTIONS" :key="o.title" class="card">
        <span class="n" :class="{ ink: i === DURATION_OPTIONS.length - 1 }">{{ i + 1 }}</span>
        <h3>{{ o.title }}</h3>
        <p class="muted small">{{ o.text }}</p>
      </div>
    </div>
    <div class="note note-green tip">
      <strong>Tú nos dices cuánto tiempo quieres alquilar</strong>
      <p>Te recomendamos el contrato que encaja y lo dejamos bien redactado desde el primer día, para que no haya sorpresas al final.</p>
    </div>
  </div>
</template>

<style scoped>
.n { width: 40px; height: 40px; border-radius: 50%; background: var(--lime); color: var(--ink); display: grid; place-items: center; font-weight: 600; margin-bottom: 18px; }
.n.ink { background: var(--ink); color: var(--lime); }
.card p { margin: 0; }
.tip { margin-top: 20px; }
</style>
