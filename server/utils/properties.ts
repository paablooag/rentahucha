// Acceso a pisos y fotos. Las fotos se guardan en la base de datos (bytea): se conservan entre despliegues
// y entran en las copias de seguridad sin configurar almacenamiento aparte.

const COLUMNS = `p.id, p.status, p.review_note, p.title, p.city, p.district, p.address, p.property_type, p.rent, p.expenses_incl,
  p.size_m2, p.bedrooms, p.bathrooms, p.floor, p.furnished, p.features, p.energy_rating, p.stay_type,
  to_char(p.available_from, 'YYYY-MM-DD') AS available_from, p.description, p.published_at, p.created_at, p.updated_at,
  p.reg_code, p.reference_index, p.rent_limit, p.big_holder,
  COALESCE((SELECT json_agg(json_build_object('id', f.id, 'width', f.width, 'height', f.height) ORDER BY f.position, f.created_at)
            FROM property_photos f WHERE f.property_id = p.id), '[]'::json) AS photos`

// Solo para el propietario: visitas (estadísticas anónimas), conversaciones y favoritos de su anuncio.
const OWNER_STATS = `,
  (SELECT count(DISTINCT v.visitor) FROM pageviews v WHERE v.path = '/pisos/' || p.id::text AND v.event = 'view' AND v.ts > now() - interval '30 days')::int AS views30,
  (SELECT count(*) FROM conversations c WHERE c.property_id = p.id)::int AS conversations,
  (SELECT count(*) FROM favorites fv WHERE fv.property_id = p.id)::int AS favorites`

type Row = Property & { photos: Property['photos'] | string; ownerName?: string; ownerIsAgency?: boolean; ownerId?: string }
// PGlite devuelve el JSON ya parseado; postgres.js también, pero por si acaso.
const fix = <T extends Row>(r: T) => ({ ...r, photos: typeof r.photos === 'string' ? JSON.parse(r.photos) : r.photos, rent: Number(r.rent) })

export async function listOwnerProperties(ownerId: string): Promise<Property[]> {
  const rows = await query<Row>(`SELECT ${COLUMNS}${OWNER_STATS} FROM properties p WHERE p.owner_id = $1 ORDER BY p.updated_at DESC`, [ownerId])
  return rows.map(fix)
}

export async function getOwnerProperty(ownerId: string, id: string): Promise<Property> {
  if (!isUuid(id)) throw createError({ statusCode: 404, statusMessage: 'Piso no encontrado' })
  const row = await queryOne<Row>(`SELECT ${COLUMNS}${OWNER_STATS} FROM properties p WHERE p.id = $1 AND p.owner_id = $2`, [id, ownerId])
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Piso no encontrado' })
  return fix(row)
}

const PUBLIC = (cols: string) => `SELECT ${cols}, CASE WHEN u.is_agency AND u.company <> '' THEN u.company ELSE split_part(u.name, ' ', 1) END AS owner_name, u.is_agency AS owner_is_agency FROM properties p JOIN users u ON u.id = p.owner_id`

/** Sin dirección exacta ni notas internas. */
function toPublic(r: Row): PublicProperty {
  const { address: _a, reviewNote: _r, ownerId: _o, ownerIsAgency: _ag, views30: _v, conversations: _c, favorites: _f, ...rest } = fix(r) as Row & { views30?: number; conversations?: number; favorites?: number }
  return { ...rest, ownerName: r.ownerName ?? '', ownerIsAgency: r.ownerIsAgency === true }
}

export async function searchProperties(f: { city?: string; maxRent?: number; minBedrooms?: number; stayType?: string; page?: number }) {
  const where = [`p.status = 'publicado'`]
  const params: unknown[] = []
  if (f.city) { params.push(`%${f.city.toLowerCase()}%`); where.push(`(lower(p.city) LIKE $${params.length} OR lower(p.district) LIKE $${params.length})`) }
  if (f.maxRent) { params.push(f.maxRent); where.push(`p.rent <= $${params.length}`) }
  if (f.minBedrooms) { params.push(f.minBedrooms); where.push(`p.bedrooms >= $${params.length}`) }
  if (f.stayType) { params.push(f.stayType); where.push(`p.stay_type = $${params.length}`) }
  const limit = 24
  const offset = Math.max(0, (f.page ?? 1) - 1) * limit
  const rows = await query<Row>(`${PUBLIC(COLUMNS)} WHERE ${where.join(' AND ')} ORDER BY p.published_at DESC NULLS LAST LIMIT ${limit + 1} OFFSET ${offset}`, params)
  return { items: rows.slice(0, limit).map(toPublic), hasMore: rows.length > limit }
}

export async function getPublicProperty(id: string): Promise<PublicProperty & { ownerId: string }> {
  if (!isUuid(id)) throw createError({ statusCode: 404, statusMessage: 'Piso no encontrado' })
  const row = await queryOne<Row>(`${PUBLIC(`${COLUMNS}, p.owner_id`)} WHERE p.id = $1 AND p.status IN ('publicado', 'alquilado')`, [id])
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Piso no encontrado' })
  return { ...toPublic(row), ownerId: row.ownerId! }
}

export const PROPERTY_FIELDS: [keyof PropertyInput, string][] = [
  ['title', 'title'], ['city', 'city'], ['district', 'district'], ['address', 'address'], ['propertyType', 'property_type'],
  ['rent', 'rent'], ['expensesIncl', 'expenses_incl'], ['sizeM2', 'size_m2'], ['bedrooms', 'bedrooms'], ['bathrooms', 'bathrooms'],
  ['floor', 'floor'], ['furnished', 'furnished'], ['features', 'features'], ['energyRating', 'energy_rating'], ['stayType', 'stay_type'],
  ['availableFrom', 'available_from'], ['description', 'description'],
  ['regCode', 'reg_code'], ['referenceIndex', 'reference_index'], ['rentLimit', 'rent_limit'], ['bigHolder', 'big_holder'],
]

// Comprobación de tipo real de imagen por sus primeros bytes (no nos fiamos del nombre ni del tipo declarado).
export function sniffImage(buf: Uint8Array): 'image/jpeg' | 'image/png' | 'image/webp' | null {
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return 'image/jpeg'
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return 'image/png'
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp'
  return null
}
