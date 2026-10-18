// Ficha pública de un piso. Si quien la ve es inquilino y ya ha escrito, se indica su conversación.
export default defineEventHandler(async (event) => {
  const p = await getPublicProperty(getRouterParam(event, 'id') ?? '')
  const user = await getUser(event)
  let conversationId: string | null = null
  const saved = user ? !!(await queryOne('SELECT 1 FROM favorites WHERE user_id = $1 AND property_id = $2', [user.id, p.id])) : false
  if (user?.role === 'inquilino') {
    conversationId = (await queryOne<{ id: string }>('SELECT id FROM conversations WHERE property_id = $1 AND tenant_id = $2', [p.id, user.id]))?.id ?? null
  }
  const { ownerId, ...property } = p
  return { property, conversationId, saved, isOwner: user?.id === ownerId }
})
