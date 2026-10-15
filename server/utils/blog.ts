import { marked } from 'marked'
import type { BlogPost, BlogPostSummary } from '#shared/utils/blog'
import { BLOG_SEED } from '../data/blog-seed'

const SEED_FLAG = 'blog:_seeded'

// La primera vez se cargan los artículos iniciales; después mandan los cambios hechos en /admin.
async function ensureSeed() {
  const storage = db()
  if (await storage.hasItem(SEED_FLAG)) return
  const now = new Date().toISOString()
  await Promise.all(BLOG_SEED.map(p => storage.setItem(`blog:posts:${p.slug}`, { ...p, published: true, updatedAt: now })))
  await storage.setItem(SEED_FLAG, now)
}

export function toSummary(post: BlogPost): BlogPostSummary {
  const { body, ...rest } = post
  return { ...rest, readingMinutes: readingMinutes(body) }
}

export async function listPosts(opts: { includeDrafts?: boolean; audience?: string } = {}): Promise<BlogPostSummary[]> {
  await ensureSeed()
  const posts = await listByPrefix<BlogPost>('blog:posts:')
  return posts
    .filter(p => (opts.includeDrafts || p.published) && (!opts.audience || p.audience === opts.audience))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.updatedAt.localeCompare(a.updatedAt))
    .map(toSummary)
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  await ensureSeed()
  return db().getItem<BlogPost>(`blog:posts:${slug}`)
}

export async function savePost(post: Omit<BlogPost, 'updatedAt'>, previousSlug?: string): Promise<BlogPost> {
  await ensureSeed()
  const storage = db()
  if (post.slug !== previousSlug && await storage.hasItem(`blog:posts:${post.slug}`)) {
    throw createError({ statusCode: 409, statusMessage: 'Ya existe un artículo con esa URL.' })
  }
  const saved: BlogPost = { ...post, updatedAt: new Date().toISOString() }
  await storage.setItem(`blog:posts:${post.slug}`, saved)
  if (previousSlug && previousSlug !== post.slug) await storage.removeItem(`blog:posts:${previousSlug}`)
  return saved
}

export async function deletePost(slug: string) {
  await db().removeItem(`blog:posts:${slug}`)
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false, gfm: true }) as string
}
