<script setup lang="ts">
useSeoMeta({
  title: 'Simulador: cuánto ahorrar para la entrada de un piso pagando el alquiler',
  description: 'Calcula cuánto acumularías en tu hucha de garantía-ahorro pagando el alquiler a tiempo, y cuánto recuperarías al salir con el bonus de buen pagador.',
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <NuxtLink to="/herramientas" class="back">← Herramientas</NuxtLink>
          <span class="eyebrow">Simulador para inquilinos</span>
          <h1>¿Cuánto puedes ahorrar para la entrada de tu casa pagando el alquiler?</h1>
          <p class="lead">
            En lugar de dejar dos meses de garantía muertos al entrar, aportas un poco cada mes a una hucha a tu nombre.
            Si pagas a tiempo, la recuperas entera con un bonus.
          </p>
        </div>
        <HuchaSimulator />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container prose">
        <h2>Cómo funciona la hucha</h2>
        <ul class="check-list">
          <li><AppIcon name="check" :size="18" /> Aportas un porcentaje pequeño de la renta cada mes, junto con el pago del alquiler.</li>
          <li><AppIcon name="check" :size="18" /> El dinero está en una cuenta a tu nombre en una entidad regulada, bloqueada a favor del contrato.</li>
          <li><AppIcon name="check" :size="18" /> Tiene un tope de dos mensualidades, el máximo de garantía adicional que permite la ley en vivienda habitual. Al llegar, dejas de aportar.</li>
          <li><AppIcon name="check" :size="18" /> Si terminas sin deudas ni desperfectos, te la devolvemos con un bonus por buen pagador.</li>
          <li><AppIcon name="check" :size="18" /> Si te mudas a otro piso de la red, puedes llevártela y seguir ahorrando.</li>
        </ul>
        <div class="cta">
          <NuxtLink to="/inquilinos#pasaporte" class="btn btn-amber">Quiero mi hucha</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; font-size: 0.9rem; text-decoration: none; }
.prose { max-width: 820px; }
.cta { margin-top: 28px; }
</style>
