// Sitemap para buscadores: páginas públicas indexables y todos los artículos publicados del blog.
// Se genera en cada petición (con caché corta), así un artículo nuevo o despublicado se refleja solo.
// Quedan fuera las páginas con noindex (legales, dossieres, demos de panel y pasaporte) y el panel /admin.


const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default defineCachedEventHandler(async (event) => {
  const base = `https://${useAppConfig().brand.domain}`
  const posts = await listPosts()

  const urls = [
    ...PUBLIC_PAGES.map(p => `  <url><loc>${base}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`),
    ...posts.map(p => `  <url><loc>${base}/blog/${esc(p.slug)}</loc><lastmod>${(p.updatedAt || p.publishedAt).slice(0, 10)}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`),
  ]

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}, { maxAge: 60 * 10, name: 'sitemap' })
