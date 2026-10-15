# RentaHucha · web

Web de RentaHucha en Nuxt 4: renta garantizada para propietarios y hucha de ahorro y pasaporte para inquilinos.
Incluye lista de espera, blog editable y panel de administración, con backend propio en las rutas de servidor de Nuxt (Nitro).

> La versión en GitHub Pages (https://paablooag.github.io/rentahucha/) es anterior al backend y ya no se actualiza sola:
> Pages solo sirve ficheros estáticos y la web ahora necesita servidor. Ver «Publicar».

## Arrancar en local

```bash
npm install
cp .env.example .env   # y rellena los valores (ver abajo)
npm run dev            # http://localhost:3000  ·  panel en /admin
```

Otros comandos:

```bash
npm run build      # build de producción (servidor Node en .output/)
npm run build:all  # build + regenera los dossieres en PDF
node .output/server/index.mjs   # arrancar el build (necesita las variables de entorno)
```

### Variables de entorno (`.env`, nunca se sube a git)

| Variable | Para qué |
| --- | --- |
| `NUXT_ADMIN_USER` / `NUXT_ADMIN_PASSWORD` | Acceso al panel `/admin`. En producción la contraseña debe tener 12 caracteres o más. |
| `NUXT_SESSION_PASSWORD` | Clave de cifrado de la cookie de sesión (32+ caracteres aleatorios). |
| `NUXT_ALLOW_WEAK_PASSWORD` | Solo en local: `true` permite una contraseña corta. Nunca en producción. |

## Backend y datos

- **Servidor:** rutas en `server/api/` (TypeScript sobre Nitro, el servidor de Nuxt). Validación compartida con la web en `shared/utils/`.
- **Datos:** almacenamiento clave-valor de Nitro (montaje `db` en `nuxt.config.ts`). En local son ficheros JSON en `.data/db/`.
  En producción se cambia el driver (Redis, Vercel KV, Netlify Blobs, Cloudflare KV…) o se usa un disco persistente, sin tocar el código.
- **Seguridad:** sesión en cookie cifrada `httpOnly` + `SameSite=Strict`, límite de intentos de login y de envíos de formularios,
  campo trampa contra bots, no se guarda la IP y se registra la prueba del consentimiento de cada alta.

| Ruta | Qué hace |
| --- | --- |
| `POST /api/leads` | Alta en la lista de espera (propietario o inquilino) |
| `POST /api/newsletter` | Alta en la newsletter |
| `GET /api/blog`, `GET /api/blog/:slug` | Blog público (solo publicados) |
| `/api/admin/*` | Login, interesados, newsletter, exportaciones CSV y gestión del blog (requiere sesión) |

## Publicar

Hace falta un hosting que ejecute Node (no estático): por ejemplo Render, Railway o Fly.io con disco persistente, o
Vercel/Netlify cambiando el driver de almacenamiento. Antes de abrir la lista de espera al público:

1. Rellenar los datos del titular en `app/app.config.ts` (`legal`), que exige la LSSI y el RGPD.
2. Poner el nombre real del proveedor de hosting en `legal.hostingProvider` y firmar su contrato de encargado del tratamiento.
3. Configurar las variables de entorno con una contraseña de admin fuerte.

## Rutas de la web

| Ruta | Qué es |
| --- | --- |
| `/` | Home con las dos puertas (propietario / busco piso) |
| `/propietarios`, `/inquilinos` | Landings con calculadoras, simulador y formulario |
| `/apuntate?tipo=propietario\|inquilino` | Formulario completo de la lista de espera |
| `/blog`, `/blog/:slug` | Blog con guías y llamadas al formulario según el público |
| `/admin` | Panel: resumen de demanda, interesados, newsletter y blog |
| `/como-funciona`, `/herramientas/*` | Explicación del modelo y herramientas SEO |
| `/pasaporte/demo`, `/panel/*` | Demos con datos ficticios |
| `/dossier/propietarios`, `/dossier/inquilinos` | Fuente de los PDF descargables (A4, no indexadas) |
| `/legal/*` | Aviso legal, privacidad y cookies |

## Dossieres en PDF

Los PDF del pie (`public/dossier/*.pdf`) se generan desde `/dossier/*` con los mismos estilos que la web.
`npm run pdf` arranca el build y los imprime en A4 con Chrome o Edge en modo headless (si no los encuentra, define `CHROME_PATH`).
Hay que regenerarlos cada vez que cambien los textos, las cifras o el diseño.

## Dónde tocar

- Nombre, dominio, ámbito, email y datos legales: `app/app.config.ts`.
- Hipótesis de negocio (hucha, bonus, cuotas): `app/utils/hucha.ts` y `app/utils/fees.ts`.
- Textos de garantías y duración (web y PDF): `app/utils/guarantee.ts` y `app/utils/duration.ts`.
- Campos del formulario y su validación: `shared/utils/leads.ts`.
- Artículos iniciales del blog: `server/data/blog-seed.ts` (solo se cargan la primera vez; luego se editan en `/admin`).

Nuxt está fijado en `~4.4.5` porque es la última versión compatible con Node 23.
