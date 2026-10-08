// Antepone la base de la app (p. ej. «/rentahucha/» en GitHub Pages) a rutas de archivos de public/.
// NuxtLink ya lo hace solo; esto es para <a href> a archivos y URLs que se copian.
export function withBase(path: string): string {
  const base = useRuntimeConfig().app.baseURL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
