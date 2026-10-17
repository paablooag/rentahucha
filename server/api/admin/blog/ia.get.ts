// ¿Está configurada la IA en el servidor? El panel lo usa para mostrar u ocultar la generación.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return { configured: aiConfigured() }
})
