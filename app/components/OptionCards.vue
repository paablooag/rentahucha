<script setup lang="ts">
defineProps<{
  items: { title: string; text: string; tag?: string }[]
  noteTitle: string
  noteText: string
}>()
</script>

<template>
  <div>
    <div class="grid grid-3">
      <div v-for="(o, i) in items" :key="o.title" class="card">
        <div class="top">
          <span class="n" :class="{ ink: i === items.length - 1 }">{{ i + 1 }}</span>
          <span v-if="o.tag" class="badge">{{ o.tag }}</span>
        </div>
        <h3>{{ o.title }}</h3>
        <p class="muted small">{{ o.text }}</p>
      </div>
    </div>
    <div class="note note-green tip">
      <strong>{{ noteTitle }}</strong>
      <p>{{ noteText }}</p>
    </div>
  </div>
</template>

<style scoped>
.top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.n { width: 40px; height: 40px; border-radius: 50%; background: var(--lime); color: var(--ink); display: grid; place-items: center; font-weight: 600; }
.n.ink { background: var(--ink); color: var(--lime); }
.card p { margin: 0; }
.tip { margin-top: 20px; }
</style>
