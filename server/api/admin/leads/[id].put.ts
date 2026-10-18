import { LEAD_STAGES, type LeadStage } from '#shared/utils/stages'

// Actualiza el seguimiento de un interesado: fase y notas internas.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id') ?? ''
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw createError({ statusCode: 400, statusMessage: 'Identificador no válido' })
  const body = await readBody<{ stage?: string; notes?: string }>(event)
  const stage = LEAD_STAGES.includes(body?.stage as LeadStage) ? body!.stage : null
  const notes = typeof body?.notes === 'string' ? body.notes.slice(0, 4000) : null
  if (!stage && notes === null) throw createError({ statusCode: 422, statusMessage: 'Nada que actualizar' })

  const row = await queryOne<{ stage: string; notes: string; contactedAt: string | null }>(
    `UPDATE leads SET
       stage = COALESCE($2::text, stage),
       notes = COALESCE($3::text, notes),
       contacted_at = CASE WHEN contacted_at IS NULL AND COALESCE($2::text, stage) <> 'nuevo' THEN now() ELSE contacted_at END
     WHERE id = $1
     RETURNING stage, notes, contacted_at`,
    [id, stage, notes],
  )
  if (!row) throw createError({ statusCode: 404, statusMessage: 'No encontrado' })
  return row
})
