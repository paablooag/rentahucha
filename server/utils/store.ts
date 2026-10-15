// Almacenamiento de datos (montaje «db» en nuxt.config). En local son ficheros en .data/db;
// en producción se cambia el driver sin tocar este código.
export const db = () => useStorage('db')

export function newId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

export async function listByPrefix<T>(prefix: string): Promise<T[]> {
  const storage = db()
  const keys = await storage.getKeys(prefix)
  const items = await Promise.all(keys.map(k => storage.getItem<T>(k)))
  return items.filter((i): i is Awaited<T> & T => i !== null)
}
