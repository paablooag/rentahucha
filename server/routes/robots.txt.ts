// robots.txt: todo indexable salvo el panel, la API (menos las fotos de los anuncios) y las páginas de cuenta; indica dónde está el sitemap.
export default defineEventHandler((event) => {
  const base = `https://${useAppConfig().brand.domain}`
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Allow: /api/fotos/
Disallow: /mi-cuenta
Disallow: /cuenta/

Sitemap: ${base}/sitemap.xml
`
})
