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
]
