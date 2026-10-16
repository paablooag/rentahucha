// Entradas del blog: tipo y validación compartidos por la web, el panel y el servidor.

export type Audience = 'propietarios' | 'inquilinos' | 'inmobiliarias'

export const AUDIENCES: Record<Audience, string> = {
  propietarios: 'Propietarios',
  inquilinos: 'Inquilinos',
  inmobiliarias: 'Inmobiliarias',
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  audience: Audience
  category: string
  body: string // Markdown
  published: boolean
  publishedAt: string // AAAA-MM-DD
  updatedAt: string // ISO
}

export type BlogPostSummary = Omit<BlogPost, 'body'> & { readingMinutes: number }

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function readingMinutes(markdown: string): number {
  return Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 220))
}

export function validatePost(input: Record<string, unknown>): { ok: true; post: Omit<BlogPost, 'updatedAt'> } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  const s = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

  const title = s(input.title, 140)
  const slug = slugify(s(input.slug, 80) || title)
  const excerpt = s(input.excerpt, 300)
  const category = s(input.category, 40)
  const body = typeof input.body === 'string' ? input.body.slice(0, 60_000) : ''
  const audience = typeof input.audience === 'string' && input.audience in AUDIENCES ? input.audience as Audience : null
  const publishedAt = /^\d{4}-\d{2}-\d{2}$/.test(String(input.publishedAt)) ? String(input.publishedAt) : new Date().toISOString().slice(0, 10)

  if (title.length < 5) errors.title = 'El título es demasiado corto.'
  if (!slug) errors.slug = 'La URL no es válida.'
  if (excerpt.length < 20) errors.excerpt = 'Escribe un resumen de al menos 20 caracteres.'
  if (!audience) errors.audience = 'Elige el público.'
  if (body.trim().length < 50) errors.body = 'El artículo es demasiado corto.'

  if (Object.keys(errors).length || !audience) return { ok: false, errors }
  return { ok: true, post: { slug, title, excerpt, audience, category: category || AUDIENCES[audience], body, published: input.published === true, publishedAt } }
}
