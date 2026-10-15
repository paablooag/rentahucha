export interface NewsletterEntry {
  email: string
  name: string
  source: 'Pie de la web' | 'Formulario propietario' | 'Formulario inquilino'
  createdAt: string
}

// Une los suscriptores del pie y los interesados que marcaron la newsletter; por correo, la alta más antigua.
export function listNewsletter(): Promise<NewsletterEntry[]> {
  return query<NewsletterEntry>(`
    WITH todos AS (
      SELECT email, '' AS name, 'Pie de la web' AS source, created_at FROM newsletter_subscribers
      UNION ALL
      SELECT email, name, CASE role WHEN 'propietario' THEN 'Formulario propietario' ELSE 'Formulario inquilino' END, consent_at
      FROM leads WHERE consent_news
    )
    SELECT DISTINCT ON (email)
      email,
      COALESCE((SELECT max(name) FROM todos t2 WHERE t2.email = todos.email AND t2.name <> ''), '') AS name,
      source,
      created_at
    FROM todos
    ORDER BY email, created_at ASC
  `).then(rows => rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
}
