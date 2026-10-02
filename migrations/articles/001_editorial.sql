CREATE SCHEMA IF NOT EXISTS abbio_editorial;
CREATE TABLE IF NOT EXISTS abbio_editorial.articles (
  id uuid PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  latest_revision integer NOT NULL DEFAULT 1,
  published_revision integer,
  published_at timestamptz,
  public_updated_at timestamptz,
  public_title text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (status <> 'published' OR (published_revision IS NOT NULL AND published_at IS NOT NULL))
);
CREATE TABLE IF NOT EXISTS abbio_editorial.article_revisions (
  article_id uuid NOT NULL REFERENCES abbio_editorial.articles(id),
  revision integer NOT NULL,
  data jsonb NOT NULL,
  reading_time integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (article_id, revision)
);
CREATE TABLE IF NOT EXISTS abbio_editorial.article_assets (
  id uuid PRIMARY KEY,
  data bytea NOT NULL,
  width integer NOT NULL,
  height integer NOT NULL,
  content_type text NOT NULL DEFAULT 'image/webp',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS abbio_editorial.api_operations (
  key text PRIMARY KEY,
  fingerprint text NOT NULL,
  response jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS articles_public ON abbio_editorial.articles(published_at DESC) WHERE status = 'published';
ALTER TABLE abbio_editorial.articles ADD COLUMN IF NOT EXISTS public_title text;
CREATE UNIQUE INDEX IF NOT EXISTS articles_public_title ON abbio_editorial.articles(public_title) WHERE status = 'published';

CREATE TABLE IF NOT EXISTS abbio_editorial.indexnow_outbox (
  id bigserial PRIMARY KEY,
  path text NOT NULL CHECK (path = '/articles' OR path ~ '^/articles/[a-z0-9-]+$'),
  attempts integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  last_status integer,
  delivered_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS indexnow_pending ON abbio_editorial.indexnow_outbox(next_attempt_at) WHERE delivered_at IS NULL;
