// Genera los dossieres en PDF imprimiendo /dossier/* con Chrome o Edge (vía Playwright) en modo headless.
// Requiere un build previo (`nuxt build`). Uso: `npm run pdf` (o CHROME_PATH=/ruta/al/navegador npm run pdf).
import { spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const PORT = process.env.PDF_PORT ?? '3999'

// Los nombres deben coincidir con los enlaces de descarga (app/app.config.ts → downloads).
const docs = [
  { route: '/dossier/propietarios', file: 'rentahucha-propietarios.pdf' },
  { route: '/dossier/inquilinos', file: 'rentahucha-inquilinos.pdf' },
]

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)
  const found = candidates.find(p => existsSync(p))
  if (!found) throw new Error('No se encontró Chrome ni Edge. Define CHROME_PATH con la ruta del navegador.')
  return found
}

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    }
    catch {
      // El servidor aún no escucha.
    }
    await new Promise(r => setTimeout(r, 300))
  }
  throw new Error(`El servidor no respondió en ${url}`)
}

const serverEntry = join(root, '.output', 'server', 'index.mjs')
if (!existsSync(serverEntry)) throw new Error('No hay build. Ejecuta primero `npm run build`.')

const browser = findBrowser()
const server = spawn(process.execPath, [serverEntry], { env: { ...process.env, PORT, NITRO_PORT: PORT }, stdio: 'ignore' })

try {
  await waitForServer(`http://localhost:${PORT}/`)
  const outDirs = [join(root, 'public', 'dossier'), join(root, '.output', 'public', 'dossier')]
  outDirs.forEach(d => mkdirSync(d, { recursive: true }))

  // Se imprime con Playwright controlando el navegador: la opción --print-to-pdf de la línea de comandos
  // dejó de escribir el archivo en algunas versiones de Edge.
  const { chromium } = await import('playwright-core')
  const pdfBrowser = await chromium.launch({ executablePath: browser })
  try {
    const page = await pdfBrowser.newPage()
    for (const doc of docs) {
      const target = join(outDirs[0], doc.file)
      // Se borra antes para detectar un fallo en vez de dar por bueno el PDF anterior.
      rmSync(target, { force: true })
      await page.goto(`http://localhost:${PORT}${doc.route}`, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      await page.pdf({ path: target, preferCSSPageSize: true, printBackground: true })
      if (!existsSync(target) || statSync(target).size === 0) throw new Error(`No se generó ${doc.file}`)
      copyFileSync(target, join(outDirs[1], doc.file))
      console.log(`✓ ${doc.file} (${Math.round(statSync(target).size / 1024)} KB)`)
    }
  }
  finally {
    await pdfBrowser.close()
  }
}
finally {
  server.kill()
}
