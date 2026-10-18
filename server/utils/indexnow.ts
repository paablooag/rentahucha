// IndexNow: avisa a Bing, Yandex, Seznam, Naver… de las páginas nuevas o cambiadas, sin esperar a que rastreen.
// La clave es pública por diseño (los buscadores la comprueban en /<clave>.txt, que está en public/).
export const INDEXNOW_KEY = '78a2ae352375f946d2dee5cef69ca5c4'

// Cada URL pública con su fecha de cambio: si la fecha cambia, se vuelve a avisar.
export async function publicUrlVersions(): Promise<string[]> {
  const base = `https://${useAppConfig().brand.domain}`
  const posts = await listPosts()
  const pisos = await query<{ id: string; updatedAt: string }>(`SELECT id, updated_at FROM properties WHERE status = 'publicado'`)
  return [
    ...PUBLIC_PAGES.map(p => `${base}${p.path}`),
    ...pisos.map(p => `${base}/pisos/${p.id}|${p.updatedAt.slice(0, 16)}`),
    ...posts.map(p => `${base}/blog/${p.slug}|${(p.updatedAt || p.publishedAt).slice(0, 10)}`),
  ]
}

export async function submitIndexNow(urls: string[]): Promise<number> {
  const host = useAppConfig().brand.domain
  let sent = 0
  for (let i = 0; i < urls.length; i += 10_000) {
    const urlList = urls.slice(i, i + 10_000)
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`, urlList }),
    })
    // 200 y 202 son aceptación; cualquier otra cosa se reintenta en la siguiente pasada.
    if (res.status !== 200 && res.status !== 202) throw new Error(`IndexNow respondió ${res.status}`)
    sent += urlList.length
  }
  return sent
}
