# RentaHucha · web (frontend)

Frontend en Nuxt 4 del plan de negocio: renta garantizada para propietarios + hucha de garantía-ahorro y pasaporte para inquilinos.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción (prerenderiza las páginas públicas)
npm run build:all  # build + regenera los dossieres en PDF
```

### Dossieres en PDF

Los PDF que se descargan desde el pie de la web (`public/dossier/*.pdf`) se generan a partir de las páginas
`/dossier/propietarios` y `/dossier/inquilinos`, con los mismos estilos que la web. `npm run pdf` arranca el build
y los imprime en A4 con Chrome o Edge en modo headless (si no los encuentra, define `CHROME_PATH`). Hay que
regenerarlos cada vez que cambien los textos, las cifras o el diseño.

Nuxt está fijado en `~4.4.5` porque es la última versión compatible con Node 23. Con Node 22.22+ o 24.15+ se puede subir a la última 4.x.

## Rutas

| Ruta | Qué es |
| --- | --- |
| `/` | Home con las dos puertas (propietario / busco piso), simulador y capas antiimpago |
| `/propietarios` | Landing propietario: calculadora de cuota, flujo del dinero, coste de un impago, lista de espera |
| `/inquilinos` | Landing inquilino: coste de entrada, simulador de hucha, pasaporte, lista de espera |
| `/como-funciona` | Flujo del dinero, cronología de un impago, qué permite la ley |
| `/herramientas/*` | Herramientas SEO: simulador de hucha y coste de un impago |
| `/pasaporte/demo` | Ejemplo de pasaporte compartido |
| `/panel/inquilino`, `/panel/propietario` | Demos de los paneles con datos ficticios (`app/data/demo.ts`) |
| `/dossier/propietarios`, `/dossier/inquilinos` | Fuente de los PDF descargables (A4, no indexadas) |

## Dónde tocar

- Nombre, dominio, ámbito (toda España) y email: `app/app.config.ts`.
- Hipótesis de negocio (aportación a la hucha, bonus, tope, cuotas): `app/utils/hucha.ts` y `app/utils/fees.ts`.
- Lista de espera: `app/composables/useWaitlist.ts` guarda en `localStorage`; sustituir por una llamada a la API cuando haya backend.
