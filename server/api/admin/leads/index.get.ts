export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const [leads, subscribers] = await Promise.all([
    listByPrefix<StoredLead>('leads:'),
    listByPrefix<StoredSubscriber>('newsletter:'),
  ])
  leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  subscribers.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return { leads, subscribers }
})
