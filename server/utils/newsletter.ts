export interface NewsletterEntry {
  email: string
  name: string
  source: 'Pie de la web' | 'Formulario propietario' | 'Formulario inquilino'
  createdAt: string
}

// Une los suscriptores del pie y los interesados que marcaron la newsletter, sin correos repetidos.
export async function listNewsletter(): Promise<NewsletterEntry[]> {
  const [subscribers, leads] = await Promise.all([
    listByPrefix<StoredSubscriber>('newsletter:'),
    listByPrefix<StoredLead>('leads:'),
  ])
  const byEmail = new Map<string, NewsletterEntry>()
  const add = (e: NewsletterEntry) => {
    const prev = byEmail.get(e.email)
    if (!prev || e.createdAt < prev.createdAt) byEmail.set(e.email, { ...e, name: e.name || prev?.name || '' })
    else if (!prev.name && e.name) prev.name = e.name
  }
  subscribers.forEach(s => add({ email: s.email, name: '', source: 'Pie de la web', createdAt: s.createdAt }))
  leads.filter(l => l.consentNews).forEach(l => add({
    email: l.email,
    name: l.name,
    source: l.role === 'propietario' ? 'Formulario propietario' : 'Formulario inquilino',
    createdAt: l.consentAt,
  }))
  return [...byEmail.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
