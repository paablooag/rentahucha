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
  const usuarios = await query<{ role: string; n: number }>('SELECT role, count(*)::int AS n FROM users GROUP BY role')
  const mensajes = await queryOne<{ n: number }>(`SELECT count(*)::int AS n FROM messages WHERE created_at > now() - interval '30 days'`)
  return {
    pisos: pisos.map(p => ({ ...p, photos: typeof p.photos === 'string' ? JSON.parse(p.photos as string) : p.photos })),
    usuarios: Object.fromEntries(usuarios.map(u => [u.role, u.n])),
    mensajes30: mensajes?.n ?? 0,
  }
})
