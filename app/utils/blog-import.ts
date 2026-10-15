import type { Audience } from '#shared/utils/blog'

// Importación de artículos desde archivos (.md, .markdown, .txt, .docx) para el panel.
// Cabecera opcional al principio del archivo, entre líneas «---», con claves en español o inglés:
//   ---
//   titulo: Cómo elegir inquilino
//   resumen: Lo que tienes que comprobar…
//   publico: propietarios          (o inquilinos)
//   categoria: Selección
//   fecha: 2026-10-15              (o 15/10/2026)
//   url: como-elegir-inquilino
//   publicado: si                  (si / no)
//   ---

export const IMPORT_EXTENSIONS = ['.md', '.markdown', '.txt', '.docx']

export interface ImportDefaults {
  audience: Audience
  category: string
  publishedAt: string
  published: boolean
}

export interface ImportedPost {
  file: string
  title: string
  slug: string
  excerpt: string
  audience: Audience
  category: string
  publishedAt: string
  published: boolean
  body: string
  notes: string[]
}

const KEYS: Record<string, keyof ImportedPost> = {
  title: 'title', titulo: 'title', 'título': 'title',
  excerpt: 'excerpt', resumen: 'excerpt', descripcion: 'excerpt', 'descripción': 'excerpt', description: 'excerpt',
  audience: 'audience', publico: 'audience', 'público': 'audience', para: 'audience',
  category: 'category', categoria: 'category', 'categoría': 'category',
  date: 'publishedAt', fecha: 'publishedAt', publishedat: 'publishedAt',
  slug: 'slug', url: 'slug',
  published: 'published', publicado: 'published', publicar: 'published',
}

function parseFrontMatter(text: string): { meta: Record<string, string>; body: string } {
  const m = text.match(/^﻿?---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/)
  if (!m) return { meta: {}, body: text }
  const meta: Record<string, string> = {}
  for (const line of m[1]!.split(/\r?\n/)) {
    const kv = line.match(/^\s*([^:#]+?)\s*:\s*(.*?)\s*$/)
    if (kv) meta[kv[1]!.toLowerCase()] = kv[2]!.replace(/^["']|["']$/g, '')
  }
  return { meta, body: text.slice(m[0].length) }
}

function toAudience(v: string): Audience | null {
  const s = v.toLowerCase()
  if (s.startsWith('propietari') || s.startsWith('owner')) return 'propietarios'
  if (s.startsWith('inquilin') || s.startsWith('tenant')) return 'inquilinos'
  return null
}

function toDate(v: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v
  const m = v.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/)
  return m ? `${m[3]}-${m[2]!.padStart(2, '0')}-${m[1]!.padStart(2, '0')}` : null
}

const plain = (md: string) => md
  .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[*_`>#|]/g, '')
  .replace(/\s+/g, ' ')
  .trim()

function firstParagraph(md: string): string {
  const para = md.split(/\r?\n\s*\r?\n/).map(p => p.trim()).find(p => p && !/^(#|\||-|\*|\d+\.)/.test(p)) ?? ''
  const text = plain(para)
  if (text.length <= 240) return text
  return `${text.slice(0, 240).replace(/\s+\S*$/, '')}…`
}

const titleFromFile = (name: string) => {
  const base = name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
  return base.charAt(0).toUpperCase() + base.slice(1)
}

export function parseArticle(text: string, file: string, d: ImportDefaults): ImportedPost {
  const notes: string[] = []
  const { meta, body: rawBody } = parseFrontMatter(text.replace(/\r\n/g, '\n'))
  let body = rawBody.trim()

  const get = (field: keyof ImportedPost) => Object.entries(meta).find(([k]) => KEYS[k] === field)?.[1]

  // Título: cabecera, si no el primer «# título» (que se quita del cuerpo), si no el nombre del archivo.
  let title = get('title') ?? ''
  const h1 = body.match(/^#\s+(.+)\n?/)
  if (!title && h1) title = h1[1]!.trim()
  if (h1 && h1[1]!.trim() === title) body = body.slice(h1[0].length).trim()
  if (!title) {
    title = titleFromFile(file)
    notes.push('Título tomado del nombre del archivo')
  }

  let excerpt = get('excerpt') ?? ''
  if (!excerpt) {
    excerpt = firstParagraph(body)
    if (excerpt) notes.push('Resumen tomado del primer párrafo')
  }

  const audienceRaw = get('audience')
  const audience = (audienceRaw && toAudience(audienceRaw)) || d.audience
  if (audienceRaw && !toAudience(audienceRaw)) notes.push(`Público «${audienceRaw}» no reconocido: se usa ${AUDIENCES[d.audience].toLowerCase()}`)

  const dateRaw = get('publishedAt')
  const publishedAt = (dateRaw && toDate(dateRaw)) || d.publishedAt
  if (dateRaw && !toDate(dateRaw)) notes.push(`Fecha «${dateRaw}» no válida: se usa ${d.publishedAt}`)

  const pubRaw = get('published')
  const published = pubRaw ? /^(s[ií]|yes|true|1)$/i.test(pubRaw) : d.published

  return {
    file,
    title,
    slug: slugify(get('slug') || title),
    excerpt,
    audience,
    category: get('category') || d.category || AUDIENCES[audience],
    publishedAt,
    published,
    body,
    notes,
  }
}

// Word → Markdown en el navegador. Las imágenes no se importan (inflarían el artículo).
export async function docxToMarkdown(buffer: ArrayBuffer): Promise<{ markdown: string; notes: string[] }> {
  const [{ default: mammoth }, { default: TurndownService }, gfm] = await Promise.all([
    import('mammoth/mammoth.browser'),
    import('turndown'),
    import('turndown-plugin-gfm'),
  ])
  const notes: string[] = []
  const result = await mammoth.convertToHtml(
    { arrayBuffer: buffer },
    { convertImage: mammoth.images.imgElement(() => { notes.push('Las imágenes del Word no se importan'); return Promise.resolve({ src: '' }) }) },
  )
  const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', emDelimiter: '*' })
  td.use(gfm.gfm)
  td.remove('img')
  return { markdown: td.turndown(result.value), notes: [...new Set(notes)] }
}

export async function readArticleFile(file: File, d: ImportDefaults): Promise<ImportedPost> {
  if (file.name.toLowerCase().endsWith('.docx')) {
    const { markdown, notes } = await docxToMarkdown(await file.arrayBuffer())
    const post = parseArticle(markdown, file.name, d)
    post.notes.push(...notes)
    return post
  }
  return parseArticle(await file.text(), file.name, d)
}

export const ARTICLE_TEMPLATE = `---
titulo: Título del artículo
resumen: Una o dos frases que resumen el artículo. Se ven en el listado y en Google.
publico: propietarios
categoria: Legal
fecha: ${new Date().toISOString().slice(0, 10)}
publicado: no
---

## Primer apartado

Escribe aquí el artículo. Puedes usar **negrita**, listas y tablas:

- Un punto
- Otro punto

| Concepto | Importe |
|---|---|
| Ejemplo | 850 € |

Al final de cada artículo se añade sola la llamada al formulario según el público.
`
