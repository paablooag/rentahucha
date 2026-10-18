// Todos los pisos con su propietario, para revisar anuncios y ver la actividad.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const pisos = await query(
    `SELECT p.id, p.status, p.review_note, p.title, p.city, p.district, p.address, p.rent, p.bedrooms, p.bathrooms, p.size_m2,
            p.energy_rating, p.stay_type, p.description, p.created_at, p.updated_at, p.published_at,
            u.name AS owner_name, u.email AS owner_email, u.phone AS owner_phone,
            COALESCE((SELECT json_agg(f.id ORDER BY f.position, f.created_at) FROM property_photos f WHERE f.property_id = p.id), '[]'::json) AS photos,
            (SELECT count(*) FROM conversations c WHERE c.property_id = p.id)::int AS conversations
     FROM properties p JOIN users u ON u.id = p.owner_id
     ORDER BY CASE p.status WHEN 'revision' THEN 0 ELSE 1 END, p.updated_at DESC`,
  )
  const denuncias = await query(
    `SELECT r.id, r.reason, r.details, r.created_at, r.resolved_at, r.conversation_id, ru.name AS reporter_name, ru.email AS reporter_email,
            p.title AS property_title, o.email AS owner_email, t.email AS tenant_email,
            (SELECT json_agg(json_build_object('from', CASE WHEN m.sender_id = c.owner_id THEN 'propietario' ELSE 'inquilino' END, 'body', m.body, 'at', m.created_at) ORDER BY m.id)
             FROM (SELECT * FROM messages WHERE conversation_id = c.id ORDER BY id DESC LIMIT 30) m) AS messages
     FROM reports r JOIN conversations c ON c.id = r.conversation_id JOIN users ru ON ru.id = r.reporter_id
     JOIN properties p ON p.id = c.property_id JOIN users o ON o.id = c.owner_id JOIN users t ON t.id = c.tenant_id
     ORDER BY r.resolved_at NULLS FIRST, r.created_at DESC LIMIT 100`,
  )
  const usuarios = await query<{ role: string; n: number }>('SELECT role, count(*)::int AS n FROM users GROUP BY role')
  const mensajes = await queryOne<{ n: number }>(`SELECT count(*)::int AS n FROM messages WHERE created_at > now() - interval '30 days'`)
  return {
    pisos: pisos.map(p => ({ ...p, photos: typeof p.photos === 'string' ? JSON.parse(p.photos as string) : p.photos })),
    usuarios: Object.fromEntries(usuarios.map(u => [u.role, u.n])),
    mensajes30: mensajes?.n ?? 0,
    denuncias: denuncias.map(d => ({ ...d, messages: typeof d.messages === 'string' ? JSON.parse(d.messages as string) : d.messages ?? [] })),
  }
})
