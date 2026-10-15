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
]
