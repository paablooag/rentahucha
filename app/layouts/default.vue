<template>
  <div class="site">
    <AppHeader />
    <main id="contenido">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.site { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }
</style>
