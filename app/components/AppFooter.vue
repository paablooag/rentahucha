<script setup lang="ts">
const { brand, downloads } = useAppConfig()
const year = new Date().getFullYear()

const dossiers = [
  { href: withBase(downloads.propietarios), who: 'Para propietarios', title: 'Inquilinos verificados, la hucha anti-impago y precios', pages: 5 },
  { href: withBase(downloads.inquilinos), who: 'Para inquilinos', title: 'La hucha, el pasaporte y cuánto ahorras', pages: 4 },
]
</script>

<template>
  <footer class="footer">
    <div class="container downloads">
      <div class="dl-intro">
        <span class="eyebrow">Descargas</span>
        <h3>Llévatelo en PDF</h3>
        <p>Todo explicado en un dossier para leerlo con calma o compartirlo.</p>
      </div>
      <a v-for="d in dossiers" :key="d.href" :href="d.href" class="dl-card" download>
        <span class="dl-icon"><AppIcon name="file" :size="22" /></span>
        <span class="dl-text">
          <span class="dl-who">{{ d.who }}</span>
          <strong>{{ d.title }}</strong>
          <span class="dl-meta">Dossier · PDF · {{ d.pages }} páginas</span>
        </span>
        <span class="dl-go" aria-hidden="true"><AppIcon name="arrow" :size="18" /></span>
      </a>
    </div>

    <div class="container cols">
      <div class="about">
        <AppLogo light />
        <p>El alquiler donde pagar a tiempo te hace ahorrar y el propietario alquila tranquilo. Para pisos de {{ brand.area }}.</p>
        <a :href="`mailto:${brand.email}`" class="mail">{{ brand.email }}</a>
      </div>
      <div>
        <h4>Propietarios</h4>
        <NuxtLink to="/propietarios">Alquilar mi piso</NuxtLink>
        <NuxtLink to="/valoracion-alquiler">Valoración gratis</NuxtLink>
        <NuxtLink to="/alquilar-mi-piso">Guías por ciudad</NuxtLink>
        <NuxtLink to="/herramientas/generador-anuncio">Generador de anuncios</NuxtLink>
        <NuxtLink to="/herramientas/modelo-contrato-alquiler">Modelo de contrato</NuxtLink>
        <NuxtLink to="/herramientas/checklist-alquilar-piso">Checklist para alquilar</NuxtLink>
        <NuxtLink to="/herramientas/rentabilidad-alquiler">Rentabilidad del alquiler</NuxtLink>
        <NuxtLink to="/herramientas/reduccion-irpf-alquiler">IRPF del alquiler</NuxtLink>
        <NuxtLink to="/herramientas/subida-alquiler-irav">IRAV y subida del alquiler</NuxtLink>
        <NuxtLink to="/herramientas/decreto-vivienda-mi-contrato">El decreto y tu contrato</NuxtLink>
        <NuxtLink to="/herramientas/coste-impago">Coste de un impago</NuxtLink>
        <NuxtLink to="/panel/propietario">Demo del panel</NuxtLink>
      </div>
      <div>
        <h4>Inquilinos</h4>
        <NuxtLink to="/inquilinos">Alquilar sin aval</NuxtLink>
        <NuxtLink to="/pisos">Pisos en alquiler</NuxtLink>
        <NuxtLink to="/alquiler">Alquiler por ciudad</NuxtLink>
        <NuxtLink to="/herramientas/cuanto-alquiler-puedo-pagar">Cuánto alquiler puedo pagar</NuxtLink>
        <NuxtLink to="/herramientas/carta-inquilino">Carta de presentación</NuxtLink>
        <NuxtLink to="/herramientas/simulador-hucha">Simulador de la hucha</NuxtLink>
        <NuxtLink to="/pasaporte/demo">Pasaporte de inquilino</NuxtLink>
      </div>
      <div>
        <h4>Empresa</h4>
        <NuxtLink to="/inmobiliarias">Para inmobiliarias</NuxtLink>
        <NuxtLink to="/como-funciona">Cómo funciona</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/apuntate#formulario">Lista de espera</NuxtLink>
        <NuxtLink to="/legal/aviso-legal">Aviso legal</NuxtLink>
        <NuxtLink to="/legal/privacidad">Privacidad</NuxtLink>
        <NuxtLink to="/legal/cookies">Cookies</NuxtLink>
      </div>
    </div>

    <div class="container news">
      <NewsletterForm />
    </div>

    <div class="container wordmark" aria-hidden="true">{{ brand.name }}</div>

    <div class="container fine">
      <p>
        © {{ year }} {{ brand.name }}. En fase beta: ya puedes publicar tu piso y hablar con inquilinos; la hucha se activa en el lanzamiento. {{ brand.name }} no es una aseguradora ni comercializa seguros.
        Desde el lanzamiento, la hucha la custodiará una entidad financiera autorizada, en una cuenta a nombre de cada inquilino; {{ brand.name }} no custodiará fondos de terceros.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--black); color: #a8a8a8; padding: 72px 0 24px; margin-top: auto; overflow: hidden; }
.downloads { display: grid; gap: 16px; align-items: stretch; padding-bottom: 56px; margin-bottom: 56px; border-bottom: 1px solid #222; }
@media (min-width: 900px) { .downloads { grid-template-columns: 1fr 1.2fr 1.2fr; } }
.dl-intro h3 { color: #fff; font-size: 1.8rem; font-weight: 500; letter-spacing: -0.03em; margin-bottom: 8px; }
.dl-intro p { margin: 0; }
.dl-intro .eyebrow { background: rgba(255, 255, 255, 0.08); color: #fff; }
.dl-intro .eyebrow::before { box-shadow: none; }
.dl-card {
  display: flex; align-items: center; gap: 16px; padding: 20px 22px; border-radius: 16px;
  background: #141414; border: 1px solid #232323; text-decoration: none; transition: border-color 0.2s, transform 0.2s;
}
.dl-card:hover { border-color: #3a3a3a; transform: translateY(-3px); }
.dl-icon { flex: none; width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center; background: var(--lime); color: var(--ink); }
.dl-text { display: grid; gap: 2px; flex: 1; }
.dl-who { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lime); }
.dl-text strong { color: #fff; font-weight: 500; font-size: 1.05rem; line-height: 1.3; }
.dl-meta { font-size: 0.82rem; color: #7a7a7a; }
.dl-go { color: #7a7a7a; transform: rotate(90deg); transition: color 0.2s; }
.dl-card:hover .dl-go { color: var(--lime); }
.cols { display: grid; gap: 32px 20px; grid-template-columns: 1fr 1fr; }
.cols > :first-child { grid-column: 1 / -1; }
@media (min-width: 720px) { .cols { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; } .cols > :first-child { grid-column: auto; } }
.about p { margin: 18px 0 10px; max-width: 34ch; }
.mail { color: var(--lime) !important; }
h4 { color: #fff; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 14px; }
a { display: block; color: #a8a8a8; text-decoration: none; padding: 4px 0; font-size: 0.95rem; transition: color 0.2s; }
a:hover { color: #fff; }
.news { margin-top: 56px; }
.wordmark {
  font-size: clamp(3.5rem, 15vw, 13rem); font-weight: 600; letter-spacing: -0.06em; line-height: 0.9;
  color: #1a1a1a; margin-top: 64px; white-space: nowrap; user-select: none;
}
.fine { border-top: 1px solid #222; margin-top: 24px; padding-top: 20px; font-size: 0.8rem; color: #7a7a7a; }
</style>
