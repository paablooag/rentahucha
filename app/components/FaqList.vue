<script setup lang="ts">
export interface FaqItem { q: string; a: string }
defineProps<{ items: FaqItem[] }>()
</script>

<template>
  <div class="faq">
    <details v-for="item in items" :key="item.q" class="item">
      <summary>{{ item.q }}</summary>
      <p>{{ item.a }}</p>
    </details>
  </div>
</template>

<style scoped>
.faq { display: grid; gap: 10px; max-width: 820px; margin: 0 auto; }
.item { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 0 24px; transition: border-color 0.2s; }
.item[open] { border-color: var(--ink); }
summary { cursor: pointer; padding: 22px 0; font-weight: 500; font-size: 1.1rem; letter-spacing: -0.01em; color: var(--ink); list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
summary::-webkit-details-marker { display: none; }
summary::after {
  content: '+'; flex: none; width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center;
  font-size: 1.3rem; line-height: 1; background: var(--grey-01); color: var(--ink); transition: background 0.2s;
}
.item[open] summary::after { content: '−'; background: var(--lime); }
p { color: var(--muted); margin: 0 0 18px; }
</style>
