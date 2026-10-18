// Reduce una foto en el navegador antes de subirla: máximo 1600 px de lado, JPEG de calidad 0,82.
// Así se suben 200–400 KB en vez de varios MB, y se quitan los datos EXIF (ubicación GPS incluida).
export async function resizeImage(file: File, max = 1600): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' }).catch(() => null)
  if (!bitmap) throw new Error('No se pudo leer la imagen. Prueba con una foto JPG o PNG.')
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.82))
  if (!blob) throw new Error('No se pudo procesar la imagen.')
  return { blob, width, height }
}
