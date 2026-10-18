// Sube una foto (multipart, campo «foto»). La web la reduce antes a 1600 px en JPEG.
export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'propietario')
  rateLimit(event, 'photo-upload', 120, 60 * 60 * 1000)
  const p = await getOwnerProperty(user.id, getRouterParam(event, 'id') ?? '')
  if (p.photos.length >= MAX_PHOTOS) throw createError({ statusCode: 422, statusMessage: `Máximo ${MAX_PHOTOS} fotos por piso.` })

  const parts = await readMultipartFormData(event)
  const file = parts?.find(x => x.name === 'foto')
  if (!file?.data?.length) throw createError({ statusCode: 422, statusMessage: 'No llegó ninguna foto.' })
  if (file.data.length > MAX_PHOTO_BYTES) throw createError({ statusCode: 413, statusMessage: 'La foto pesa demasiado (máximo 2,5 MB).' })
  const mime = sniffImage(file.data)
  if (!mime) throw createError({ statusCode: 415, statusMessage: 'Formato no admitido: usa JPG, PNG o WebP.' })

  const dims = (k: string) => { const v = Number(parts?.find(x => x.name === k)?.data.toString()); return Number.isFinite(v) && v > 0 && v < 20000 ? Math.round(v) : null }
  await query(
    `INSERT INTO property_photos (property_id, mime, data, width, height, position)
     VALUES ($1, $2, $3, $4, $5, COALESCE((SELECT max(position) + 1 FROM property_photos WHERE property_id = $1), 0))`,
    [p.id, mime, file.data, dims('width'), dims('height')],
  )
  await query('UPDATE properties SET updated_at = now() WHERE id = $1', [p.id])
  return getOwnerProperty(user.id, p.id)
})
