export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return listPosts({ includeDrafts: true })
})
