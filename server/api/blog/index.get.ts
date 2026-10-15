export default defineEventHandler(async (event) => {
  const { audience } = getQuery(event)
  return listPosts({ audience: typeof audience === 'string' ? audience : undefined })
})
