export interface NewsletterEntry {
  email: string
  name: string
  source: 'Pie de la web' | 'Checklist propietarios' | 'Guía del decreto' | 'Aviso del IRAV' | 'Test del propietario' | 'Valoración del alquiler' | 'Encuesta' | 'Formulario propietario' | 'Formulario inquilino' | 'Formulario inmobiliaria'
  createdAt: string
}

// Une los suscriptores del pie y los interesados que marcaron la newsletter; por correo, la alta más antigua.
export function listNewsletter(): Promise<NewsletterEntry[]> {
  return query<NewsletterEntry>(`
    WITH todos AS (
      SELECT email, '' AS name, CASE source WHEN 'checklist' THEN 'Checklist propietarios' WHEN 'guia-decreto' THEN 'Guía del decreto' WHEN 'irav' THEN 'Aviso del IRAV' WHEN 'test' THEN 'Test del propietario' WHEN 'valoracion' THEN 'Valoración del alquiler' WHEN 'encuesta' THEN 'Encuesta' ELSE 'Pie de la web' END AS source, created_at FROM newsletter_subscribers
      UNION ALL
      SELECT email, name, CASE role WHEN 'propietario' THEN 'Formulario propietario' WHEN 'inmobiliaria' THEN 'Formulario inmobiliaria' ELSE 'Formulario inquilino' END, consent_at
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
