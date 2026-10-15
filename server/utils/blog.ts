import { marked } from 'marked'
import type { BlogPost, BlogPostSummary } from '#shared/utils/blog'

// published_at se lee como texto (AAAA-MM-DD) para no convertir fechas con zona horaria.
const COLS = 'slug, title, excerpt, audience, category, body, published, published_at::text AS published_at, updated_at'

export function toSummary(post: BlogPost): BlogPostSummary {
  const { body, ...rest } = post
  return { ...rest, readingMinutes: readingMinutes(body) }
}

export async function listPosts(opts: { includeDrafts?: boolean; audience?: string } = {}): Promise<BlogPostSummary[]> {
  const where: string[] = []
  const params: unknown[] = []
  if (!opts.includeDrafts) where.push('published')
  if (opts.audience) {
    params.push(opts.audience)
    where.push(`audience = $${params.length}`)
  }
  const rows = await query<BlogPost>(
    `SELECT ${COLS} FROM blog_posts ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY published_at DESC, updated_at DESC`,
    params,
  )
  return rows.map(toSummary)
}

export function getPost(slug: string): Promise<BlogPost | null> {
  return queryOne<BlogPost>(`SELECT ${COLS} FROM blog_posts WHERE slug = $1`, [slug])
}

export async function savePost(post: Omit<BlogPost, 'updatedAt'>, previousSlug?: string): Promise<BlogPost> {
  if (post.slug !== previousSlug && await getPost(post.slug)) {
    throw createError({ statusCode: 409, statusMessage: 'Ya existe un artículo con esa URL.' })
  }
  const values = [post.slug, post.title, post.excerpt, post.audience, post.category, post.body, post.published, post.publishedAt]
  const saved = previousSlug
    ? await queryOne<BlogPost>(
        `UPDATE blog_posts SET slug = $1, title = $2, excerpt = $3, audience = $4, category = $5, body = $6, published = $7,
           published_at = $8::date, updated_at = now() WHERE slug = $9 RETURNING ${COLS}`,
        [...values, previousSlug],
      )
    : await queryOne<BlogPost>(
        `INSERT INTO blog_posts (slug, title, excerpt, audience, category, body, published, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8::date) RETURNING ${COLS}`,
        values,
      )
  if (!saved) throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
  return saved
}

export async function deletePost(slug: string) {
  await query('DELETE FROM blog_posts WHERE slug = $1', [slug])
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false, gfm: true }) as string
}
