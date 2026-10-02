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

ALTER TABLE abbio_editorial.articles ADD COLUMN IF NOT EXISTS source_id text;
CREATE UNIQUE INDEX IF NOT EXISTS articles_source_id ON abbio_editorial.articles(source_id) WHERE source_id IS NOT NULL;
CREATE TABLE IF NOT EXISTS abbio_editorial.article_slug_aliases (
  slug text PRIMARY KEY,
  article_id uuid NOT NULL REFERENCES abbio_editorial.articles(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Repeatable migration: keep the Airtable identity private and reserve old URLs.
DO $$
DECLARE row_record record; base text; candidate text; suffix integer;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('abbio-article-slugs'));
  FOR row_record IN SELECT id,slug,status FROM abbio_editorial.articles
    WHERE source_id IS NULL AND slug ~ '-rec[a-z0-9]{14}$' ORDER BY created_at,id FOR UPDATE LOOP
    base := regexp_replace(row_record.slug,'-rec[a-z0-9]{14}$','');
    candidate := base; suffix := 2;
    WHILE EXISTS(SELECT 1 FROM abbio_editorial.articles WHERE slug=candidate)
       OR EXISTS(SELECT 1 FROM abbio_editorial.article_slug_aliases WHERE slug=candidate) LOOP
      candidate := base || '-' || suffix; suffix := suffix+1;
    END LOOP;
    INSERT INTO abbio_editorial.article_slug_aliases(slug,article_id) VALUES(row_record.slug,row_record.id);
    UPDATE abbio_editorial.articles SET slug=candidate,
      source_id=COALESCE(source_id,substring(row_record.slug FROM 'rec[a-z0-9]{14}$')),
      public_updated_at=CASE WHEN status='published' THEN now() ELSE public_updated_at END
      WHERE id=row_record.id;
    -- Idempotent import replay must return the current address after the move.
    UPDATE abbio_editorial.api_operations SET response=jsonb_set(response,'{data,slug}',to_jsonb(candidate))
      WHERE response->'data'->>'id'=row_record.id::text AND response->'data' ? 'slug';
    UPDATE abbio_editorial.api_operations SET response=jsonb_set(response,'{data,url}',to_jsonb('/articles/' || candidate))
      WHERE response->'data'->>'id'=row_record.id::text AND response->'data' ? 'url';
    IF row_record.status='published' THEN
      INSERT INTO abbio_editorial.indexnow_outbox(path) VALUES('/articles/' || row_record.slug),('/articles/' || candidate),('/articles');
    END IF;
  END LOOP;
END $$;
