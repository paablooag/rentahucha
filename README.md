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
| `NUXT_DATABASE_URL` | PostgreSQL (`postgres://usuario:clave@host:5432/bd`). En local es opcional (PGlite). |

## Backend y datos

- **Servidor:** rutas en `server/api/` (TypeScript sobre Nitro, el servidor de Nuxt). Validación compartida con la web en `shared/utils/`.
- **Base de datos:** PostgreSQL 16 (driver `postgres`). Tablas `leads`, `newsletter_subscribers` y `blog_posts`.
  El esquema está en `server/db/migrations.ts` y se aplica solo al arrancar: para cambiarlo, añade una migración nueva al final.
- **En local:** sin `NUXT_DATABASE_URL`, `npm run dev` usa PGlite (Postgres embebido) y guarda en `.data/pglite`. Para usar un
  Postgres real, pon la URL en `.env` (por ejemplo, con `docker run -p 5432:5432 -e POSTGRES_PASSWORD=dev postgres:16`).
- **En producción:** Postgres en el propio VPS, solo accesible desde el servidor, con copia diaria (`pg_dump`) en `/opt/rentahucha/backups`.
- **Seguridad:** sesión en cookie cifrada `httpOnly` + `SameSite=Strict`, límite de intentos de login y de envíos de formularios,
  campo trampa contra bots, no se guarda la IP y se registra la prueba del consentimiento de cada alta.

| Ruta | Qué hace |
| --- | --- |
| `POST /api/leads` | Alta en la lista de espera (propietario o inquilino) |
| `POST /api/newsletter` | Alta en la newsletter |
| `GET /api/blog`, `GET /api/blog/:slug` | Blog público (solo publicados) |
| `/api/admin/*` | Login, interesados, newsletter, exportaciones CSV y gestión del blog (requiere sesión) |

## Ramas

- `main`: lo que está en producción. Solo se despliega desde aquí.
- `develop`: integración de cambios ya revisados, a la espera de pasar a `main`.
- `feature/<nombre>` o `fix/<nombre>`: una rama por cambio, que sale de `develop` y vuelve por pull request.

```bash
git checkout develop && git pull
git checkout -b feature/mi-cambio
# ...cambios y commits...
git push -u origin feature/mi-cambio   # y abrir el pull request hacia develop
```

## Publicar (VPS de IONOS, Ubuntu 24.04)

El servidor ya está preparado con `deploy/setup-server.sh` (Node 22, Nginx, HTTPS, cortafuegos, copias diarias).
Para publicar una versión nueva desde `main`:

```bash
git checkout main && git pull
npm run pdf                                   # solo si cambiaron los dossieres
DEPLOY_HOST=31.70.158.20 bash scripts/deploy.sh
```

Compila en local, sube el build y cambia de versión sin tocar los datos (`/opt/rentahucha/shared/.data`).
Se guardan las 5 últimas versiones en `/opt/rentahucha/releases` por si hay que volver atrás. Las variables de
entorno de producción están en `/opt/rentahucha/shared/.env` del servidor (nunca en git).

Antes de abrir la lista de espera al público:

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
