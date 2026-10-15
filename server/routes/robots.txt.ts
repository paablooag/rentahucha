// robots.txt: todo indexable salvo el panel y la API; indica dónde está el sitemap.
export default defineEventHandler((event) => {
  const base = `https://${useAppConfig().brand.domain}`
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${base}/sitemap.xml
`
})
