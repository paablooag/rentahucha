// Sitemap para buscadores: páginas públicas indexables y todos los artículos publicados del blog.
// Se genera en cada petición (con caché corta), así un artículo nuevo o despublicado se refleja solo.
// Quedan fuera las páginas con noindex (legales, dossieres, demos de panel y pasaporte) y el panel /admin.

const PAGES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/propietarios', priority: '0.9', changefreq: 'monthly' },
  { path: '/inquilinos', priority: '0.9', changefreq: 'monthly' },
  { path: '/inmobiliarias', priority: '0.9', changefreq: 'monthly' },
  { path: '/como-funciona', priority: '0.8', changefreq: 'monthly' },
  { path: '/apuntate', priority: '0.8', changefreq: 'monthly' },
  { path: '/herramientas', priority: '0.7', changefreq: 'monthly' },
  { path: '/herramientas/coste-impago', priority: '0.7', changefreq: 'monthly' },
  { path: '/herramientas/simulador-hucha', priority: '0.7', changefreq: 'monthly' },
  { path: '/herramientas/cuanto-alquiler-puedo-pagar', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default defineCachedEventHandler(async (event) => {
  const base = `https://${useAppConfig().brand.domain}`
  const posts = await listPosts()

  const urls = [
    ...PAGES.map(p => `  <url><loc>${base}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`),
    ...posts.map(p => `  <url><loc>${base}/blog/${esc(p.slug)}</loc><lastmod>${(p.updatedAt || p.publishedAt).slice(0, 10)}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`),
  ]

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}, { maxAge: 60 * 10, name: 'sitemap' })
