<template>
  <section class="section cta">
    <div class="container">
      <div class="panel">
        <div>
          <h2>Alquilar te cuesta. Aquí, pagar bien te suma.</h2>
          <p>Apúntate antes de que abramos: los primeros propietarios e inquilinos de la lista entran con condiciones de lanzamiento.</p>
        </div>
        <div class="actions">
          <NuxtLink to="/propietarios#alta" class="btn btn-dark">Soy propietario <AppIcon name="arrow" :size="18" /></NuxtLink>
          <NuxtLink to="/inquilinos#pasaporte" class="btn btn-white">Busco piso <AppIcon name="arrow" :size="18" /></NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.panel {
  background: var(--lime); border-radius: 24px; padding: clamp(32px, 6vw, 72px);
  display: grid; gap: 32px; align-items: end;
}
@media (min-width: 900px) { .panel { grid-template-columns: 1.4fr auto; } }
h2 { font-size: clamp(2rem, 5vw, 3.6rem); max-width: 16ch; }
p { margin: 0; max-width: 52ch; font-size: 1.1rem; color: #2f2f2f; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-white { background: #fff; color: var(--ink); }
.btn-white:hover { background: #f0f0f0; }
</style>
