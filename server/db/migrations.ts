// Migraciones del esquema. Se aplican en orden y una sola vez (tabla schema_migrations).
// Para cambiar el esquema: añade una migración nueva al final; nunca edites una ya aplicada.
export const MIGRATIONS: { id: number; name: string; sql: string }[] = [
  {
    id: 1,
    name: 'esquema inicial',
    sql: `
      CREATE TABLE leads (
        id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        role             text NOT NULL CHECK (role IN ('propietario', 'inquilino')),
        name             text NOT NULL,
        email            text NOT NULL,
        phone            text NOT NULL DEFAULT '',
        city             text NOT NULL,
        timing           text NOT NULL,
        interests        text[] NOT NULL DEFAULT '{}',
        comments         text NOT NULL DEFAULT '',
        consent_news     boolean NOT NULL DEFAULT false,
        consent_at       timestamptz NOT NULL,
        consent_text     text NOT NULL,
        -- Propietario
        units            text,
        rent_range       text,
        flat_status      text,
        property_type    text,
        bedrooms         text,
        bathrooms        text,
        size_m2          integer CHECK (size_m2 IS NULL OR size_m2 BETWEEN 10 AND 2000),
        condition        text,
        furnished        text,
        features         text[] NOT NULL DEFAULT '{}',
        stay_pref        text,
        -- Inquilino
        max_rent         integer CHECK (max_rent IS NULL OR max_rent BETWEEN 150 AND 6000),
        age_range        text,
        people           text,
        wanted_bedrooms  text,
        wanted_bathrooms text,
        household        text,
        employment       text,
        pets             text,
        stay_type        text,
        must_haves       text[] NOT NULL DEFAULT '{}',
        created_at       timestamptz NOT NULL DEFAULT now(),
        updated_at       timestamptz NOT NULL DEFAULT now(),
        UNIQUE (email, role)
      );
      CREATE INDEX leads_created_at_idx ON leads (created_at DESC);
      CREATE INDEX leads_city_idx ON leads (lower(city));

      CREATE TABLE newsletter_subscribers (
        id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email       text NOT NULL UNIQUE,
        consent_at  timestamptz NOT NULL DEFAULT now(),
        created_at  timestamptz NOT NULL DEFAULT now()
      );

      CREATE TABLE blog_posts (
        slug          text PRIMARY KEY,
        title         text NOT NULL,
        excerpt       text NOT NULL,
        audience      text NOT NULL CHECK (audience IN ('propietarios', 'inquilinos')),
        category      text NOT NULL,
        body          text NOT NULL,
        published     boolean NOT NULL DEFAULT false,
        published_at  date NOT NULL DEFAULT current_date,
        created_at    timestamptz NOT NULL DEFAULT now(),
        updated_at    timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX blog_posts_listing_idx ON blog_posts (published, published_at DESC);

      CREATE TABLE app_meta (
        key    text PRIMARY KEY,
        value  text NOT NULL
      );
    `,
  },
  {
    id: 2,
    name: 'inmobiliarias: interesados y público del blog',
    sql: `
      ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_role_check;
      ALTER TABLE leads ADD CONSTRAINT leads_role_check CHECK (role IN ('propietario', 'inquilino', 'inmobiliaria'));
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS company text;
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS managed_units text;
      ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_audience_check;
      ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_audience_check CHECK (audience IN ('propietarios', 'inquilinos', 'inmobiliarias'));
    `,
  },
  {
    id: 3,
    name: 'tablero de tareas',
    sql: `
      CREATE TABLE tasks (
        id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title        text NOT NULL,
        description  text NOT NULL DEFAULT '',
        status       text NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'en_curso', 'esperando', 'hecha')),
        owner        text NOT NULL DEFAULT 'claude' CHECK (owner IN ('pablo', 'claude')),
        priority     text NOT NULL DEFAULT 'media' CHECK (priority IN ('alta', 'media', 'baja')),
        area         text NOT NULL DEFAULT '',
        position     double precision NOT NULL DEFAULT 0,
        created_at   timestamptz NOT NULL DEFAULT now(),
        updated_at   timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX tasks_board_idx ON tasks (status, position);
    `,
  },
  {
    id: 4,
    name: 'estadísticas de visitas sin cookies',
    sql: `
      -- Sin IP ni cookies: visitor es un hash con sal diaria (no permite seguir a nadie de un día para otro).
      CREATE TABLE pageviews (
        id            bigserial PRIMARY KEY,
        ts            timestamptz NOT NULL DEFAULT now(),
        event         text NOT NULL DEFAULT 'view',
        path          text NOT NULL,
        referrer      text,
        utm_source    text,
        utm_medium    text,
        utm_campaign  text,
        device        text,
        visitor       text NOT NULL
      );
      CREATE INDEX pageviews_ts_idx ON pageviews (ts DESC);
      CREATE INDEX pageviews_event_idx ON pageviews (event, ts DESC);
    `,
  },
  {
    id: 5,
    name: 'origen de las altas en la newsletter',
    sql: `
      ALTER TABLE newsletter_subscribers ADD COLUMN source text NOT NULL DEFAULT 'pie';
    `,
  },
  {
    id: 6,
    name: 'seguimiento de interesados',
    sql: `
      ALTER TABLE leads ADD COLUMN stage text NOT NULL DEFAULT 'nuevo'
        CHECK (stage IN ('nuevo', 'contactado', 'conversacion', 'listo', 'descartado'));
      ALTER TABLE leads ADD COLUMN notes text NOT NULL DEFAULT '';
      ALTER TABLE leads ADD COLUMN contacted_at timestamptz;
    `,
  },
  {
    id: 7,
    name: 'cuentas, pisos, fotos y mensajes',
    sql: `
      CREATE TABLE users (
        id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        role           text NOT NULL CHECK (role IN ('propietario', 'inquilino')),
        name           text NOT NULL,
        email          text NOT NULL UNIQUE,
        phone          text NOT NULL DEFAULT '',
        password_hash  text NOT NULL,
        consent_at     timestamptz NOT NULL,
        consent_text   text NOT NULL,
        last_login_at  timestamptz,
        created_at     timestamptz NOT NULL DEFAULT now()
      );

      -- status: borrador → revision → publicado (o rechazado); pausado y alquilado los pone el propietario.
      CREATE TABLE properties (
        id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        owner_id       uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        status         text NOT NULL DEFAULT 'borrador' CHECK (status IN ('borrador', 'revision', 'publicado', 'rechazado', 'pausado', 'alquilado')),
        review_note    text NOT NULL DEFAULT '',
        title          text NOT NULL,
        city           text NOT NULL,
        district       text NOT NULL DEFAULT '',
        address        text NOT NULL DEFAULT '',
        property_type  text NOT NULL,
        rent           integer NOT NULL CHECK (rent BETWEEN 100 AND 20000),
        expenses_incl  boolean NOT NULL DEFAULT false,
        size_m2        integer CHECK (size_m2 IS NULL OR size_m2 BETWEEN 10 AND 2000),
        bedrooms       integer NOT NULL CHECK (bedrooms BETWEEN 0 AND 20),
        bathrooms      integer NOT NULL CHECK (bathrooms BETWEEN 1 AND 10),
        floor          text NOT NULL DEFAULT '',
        furnished      text NOT NULL,
        features       text[] NOT NULL DEFAULT '{}',
        energy_rating  text NOT NULL DEFAULT '',
        stay_type      text NOT NULL,
        available_from date,
        description    text NOT NULL DEFAULT '',
        published_at   timestamptz,
        created_at     timestamptz NOT NULL DEFAULT now(),
        updated_at     timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX properties_owner_idx ON properties (owner_id);
      CREATE INDEX properties_public_idx ON properties (status, lower(city), rent);

      CREATE TABLE property_photos (
        id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        property_id  uuid NOT NULL REFERENCES properties (id) ON DELETE CASCADE,
        mime         text NOT NULL,
        data         bytea NOT NULL,
        width        integer,
        height       integer,
        position     double precision NOT NULL DEFAULT 0,
        created_at   timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX property_photos_idx ON property_photos (property_id, position);

      -- Una conversación por piso e inquilino.
      CREATE TABLE conversations (
        id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        property_id       uuid NOT NULL REFERENCES properties (id) ON DELETE CASCADE,
        tenant_id         uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        owner_id          uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        last_message_at   timestamptz NOT NULL DEFAULT now(),
        owner_read_at     timestamptz,
        tenant_read_at    timestamptz,
        created_at        timestamptz NOT NULL DEFAULT now(),
        UNIQUE (property_id, tenant_id)
      );
      CREATE INDEX conversations_owner_idx ON conversations (owner_id, last_message_at DESC);
      CREATE INDEX conversations_tenant_idx ON conversations (tenant_id, last_message_at DESC);

      CREATE TABLE messages (
        id               bigserial PRIMARY KEY,
        conversation_id  uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
        sender_id        uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        body             text NOT NULL CHECK (length(body) BETWEEN 1 AND 4000),
        created_at       timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX messages_conversation_idx ON messages (conversation_id, id);
    `,
  },
  {
    id: 8,
    name: 'favoritos y visitas por anuncio',
    sql: `
      CREATE TABLE favorites (
        user_id      uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        property_id  uuid NOT NULL REFERENCES properties (id) ON DELETE CASCADE,
        created_at   timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY (user_id, property_id)
      );
      CREATE INDEX pageviews_path_idx ON pageviews (path, ts DESC);
    `,
  },
  {
    id: 9,
    name: 'perfil del inquilino y visitas en el chat',
    sql: `
      -- Lo que el inquilino cuenta de sí mismo (declarado, sin verificar). Solo lo ven los propietarios a los que escribe.
      CREATE TABLE tenant_profiles (
        user_id      uuid PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
        employment   text NOT NULL DEFAULT '',
        income       text NOT NULL DEFAULT '',
        household    text NOT NULL DEFAULT '',
        people       text NOT NULL DEFAULT '',
        pets         text NOT NULL DEFAULT '',
        move_date    date,
        stay         text NOT NULL DEFAULT '',
        about        text NOT NULL DEFAULT '',
        updated_at   timestamptz NOT NULL DEFAULT now()
      );
      -- Mensajes especiales: propuesta de visita (meta: { at, status: propuesta | aceptada | rechazada | cancelada }).
      ALTER TABLE messages ADD COLUMN kind text NOT NULL DEFAULT 'texto' CHECK (kind IN ('texto', 'visita'));
      ALTER TABLE messages ADD COLUMN meta jsonb;
      ALTER TABLE messages ADD COLUMN updated_at timestamptz;
    `,
  },
  {
    id: 10,
    name: 'denuncias de conversaciones',
    sql: `
      CREATE TABLE reports (
        id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        conversation_id  uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
        reporter_id      uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        reason           text NOT NULL,
        details          text NOT NULL DEFAULT '',
        resolved_at      timestamptz,
        created_at       timestamptz NOT NULL DEFAULT now()
      );
      -- Una conversación bloqueada ya no admite mensajes (la bloquea quien denuncia o el equipo).
      ALTER TABLE conversations ADD COLUMN blocked_at timestamptz;
    `,
  },
  {
    id: 11,
    name: 'formularios: valoración del alquiler y encuesta',
    sql: `
      CREATE TABLE form_submissions (
        id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        kind          text NOT NULL CHECK (kind IN ('valoracion', 'encuesta')),
        name          text NOT NULL DEFAULT '',
        email         text NOT NULL DEFAULT '',
        phone         text NOT NULL DEFAULT '',
        city          text NOT NULL DEFAULT '',
        data          jsonb NOT NULL DEFAULT '{}',
        consent_news  boolean NOT NULL DEFAULT false,
        consent_at    timestamptz,
        consent_text  text NOT NULL DEFAULT '',
        status        text NOT NULL DEFAULT 'nuevo' CHECK (status IN ('nuevo', 'respondido', 'descartado')),
        notes         text NOT NULL DEFAULT '',
        created_at    timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX form_submissions_kind_idx ON form_submissions (kind, created_at DESC);
    `,
  },
  {
    id: 12,
    name: 'avisos por correo y recuperación de contraseña',
    sql: `
      ALTER TABLE users ADD COLUMN notify_messages boolean NOT NULL DEFAULT true;
      -- Último aviso por correo de mensajes nuevos, para no enviar uno por cada mensaje.
      ALTER TABLE conversations ADD COLUMN owner_notified_at timestamptz;
      ALTER TABLE conversations ADD COLUMN tenant_notified_at timestamptz;
      -- Solo se guarda el hash del enlace: quien lea la base de datos no puede usarlo.
      CREATE TABLE password_resets (
        token_hash  text PRIMARY KEY,
        user_id     uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        expires_at  timestamptz NOT NULL,
        used_at     timestamptz,
        created_at  timestamptz NOT NULL DEFAULT now()
      );
    `,
  },
  {
    id: 13,
    name: 'captación de inmobiliarias y administradores',
    sql: `
      -- Empresas a las que llamamos. Solo datos públicos de empresa; el correo solo se usa si lo piden (consentimiento).
      CREATE TABLE prospects (
        id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        kind              text NOT NULL DEFAULT 'inmobiliaria' CHECK (kind IN ('inmobiliaria', 'administrador', 'otro')),
        company           text NOT NULL,
        contact_name      text NOT NULL DEFAULT '',
        city              text NOT NULL,
        phone             text NOT NULL DEFAULT '',
        email             text NOT NULL DEFAULT '',
        website           text NOT NULL DEFAULT '',
        source            text NOT NULL DEFAULT '',
        status            text NOT NULL DEFAULT 'por_llamar'
          CHECK (status IN ('por_llamar', 'volver_a_llamar', 'pide_info', 'en_conversacion', 'cliente', 'no_interesa')),
        notes             text NOT NULL DEFAULT '',
        next_call_at      date,
        consent_at        timestamptz,
        proposal_sent_at  timestamptz,
        followup_sent_at  timestamptz,
        do_not_contact    boolean NOT NULL DEFAULT false,
        created_at        timestamptz NOT NULL DEFAULT now(),
        updated_at        timestamptz NOT NULL DEFAULT now()
      );
      CREATE UNIQUE INDEX prospects_company_city_idx ON prospects (lower(company), lower(city));
      CREATE INDEX prospects_status_idx ON prospects (status, next_call_at);

      -- Historial de cada empresa: llamadas, correos, cambios de estado.
      CREATE TABLE prospect_events (
        id           bigserial PRIMARY KEY,
        prospect_id  uuid NOT NULL REFERENCES prospects (id) ON DELETE CASCADE,
        kind         text NOT NULL,
        detail       text NOT NULL DEFAULT '',
        created_at   timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX prospect_events_idx ON prospect_events (prospect_id, id);
    `,
  },
  {
    id: 14,
    name: 'alertas de búsqueda de pisos',
    sql: `
      -- Quien busca piso deja su búsqueda y su correo; se le avisa (como mucho una vez al día) de los pisos nuevos que encajan.
      CREATE TABLE search_alerts (
        id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email         text NOT NULL,
        city          text NOT NULL,
        max_rent      integer,
        min_bedrooms  integer,
        stay_type     text NOT NULL DEFAULT '',
        token         text NOT NULL UNIQUE,
        consent_at    timestamptz NOT NULL DEFAULT now(),
        last_sent_at  timestamptz,
        created_at    timestamptz NOT NULL DEFAULT now(),
        UNIQUE (email, city, max_rent, min_bedrooms, stay_type)
      );
      CREATE INDEX search_alerts_city_idx ON search_alerts (lower(city));
    `,
  },
  {
    id: 15,
    name: 'recordatorio al propietario de interesados sin respuesta',
    sql: `
      ALTER TABLE conversations ADD COLUMN owner_reminded_at timestamptz;
    `,
  },
  {
    id: 16,
    name: 'estadísticas de comportamiento: tiempo, recorridos y mapa de calor',
    sql: `
      -- visit: identificador aleatorio que solo vive en la memoria de la pestaña (no se guarda en el dispositivo);
      -- seq: orden de la página dentro de la visita; duration_ms: tiempo visible; max_scroll: % de la página recorrido.
      ALTER TABLE pageviews ADD COLUMN visit text;
      ALTER TABLE pageviews ADD COLUMN seq integer;
      ALTER TABLE pageviews ADD COLUMN duration_ms integer;
      ALTER TABLE pageviews ADD COLUMN max_scroll smallint;
      CREATE INDEX pageviews_visit_idx ON pageviews (visit, seq);
      CREATE INDEX pageviews_path_ts_idx ON pageviews (path, ts DESC);

      -- Clics para el mapa de calor: posición relativa (0-1000) en la página, sin nada de lo que se escribe.
      CREATE TABLE page_clicks (
        id      bigserial PRIMARY KEY,
        ts      timestamptz NOT NULL DEFAULT now(),
        path    text NOT NULL,
        device  text NOT NULL,
        x       smallint NOT NULL,
        y       smallint NOT NULL,
        target  text NOT NULL DEFAULT ''
      );
      CREATE INDEX page_clicks_path_idx ON page_clicks (path, device, ts DESC);
    `,
  },
  {
    id: 17,
    name: 'cuentas de inmobiliaria',
    sql: `
      -- Una inmobiliaria es una cuenta de propietario con nombre comercial: publica igual, con su marca en los anuncios.
      ALTER TABLE users ADD COLUMN is_agency boolean NOT NULL DEFAULT false;
      ALTER TABLE users ADD COLUMN company text NOT NULL DEFAULT '';
    `,
  },
  {
    id: 18,
    name: 'datos obligatorios del anuncio (RDL 29/2026, art. 20)',
    sql: `
      ALTER TABLE properties ADD COLUMN reg_code text NOT NULL DEFAULT '';
      ALTER TABLE properties ADD COLUMN reference_index text NOT NULL DEFAULT '';
      ALTER TABLE properties ADD COLUMN rent_limit text NOT NULL DEFAULT '';
      ALTER TABLE properties ADD COLUMN big_holder boolean NOT NULL DEFAULT false;
    `,
  },
  {
    id: 19,
    name: 'datos de Google Search Console',
    sql: `
      -- Copia diaria de Search Console (server/utils/search-console.ts). Rutas sin dominio.
      CREATE TABLE gsc_daily (day date PRIMARY KEY, clicks integer NOT NULL, impressions integer NOT NULL, position real NOT NULL);
      CREATE TABLE gsc_pages (day date NOT NULL, page text NOT NULL, clicks integer NOT NULL, impressions integer NOT NULL, position real NOT NULL);
      CREATE INDEX gsc_pages_day_idx ON gsc_pages (day);
      -- Google omite las búsquedas poco frecuentes (anonimizadas): la suma de esta tabla es menor que el total.
      CREATE TABLE gsc_queries (day date NOT NULL, query text NOT NULL, page text NOT NULL, clicks integer NOT NULL, impressions integer NOT NULL, position real NOT NULL);
      CREATE INDEX gsc_queries_day_idx ON gsc_queries (day);
    `,
  },
]
