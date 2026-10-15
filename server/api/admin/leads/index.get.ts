export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const [leads, subscribers] = await Promise.all([listLeads(), listSubscribers()])
  return { leads, subscribers }
})
