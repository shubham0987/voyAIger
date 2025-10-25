-- Postgres DDL for users table used by voyAIger
-- Creates users table, unique indexes, and a trigger to maintain updated_at

-- create table
CREATE TABLE
IF NOT EXISTS users
(
  id              SERIAL PRIMARY KEY,
  email           VARCHAR
(255) NOT NULL,
  password        VARCHAR
(255),
  google_id       VARCHAR
(255),
  name            VARCHAR
(255),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now
(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now
()
);

-- case-insensitive unique constraint on email
CREATE UNIQUE INDEX
IF NOT EXISTS users_email_lower_idx ON users
(lower
(email));

-- unique index on google_id, but only for non-null values
CREATE UNIQUE INDEX
IF NOT EXISTS users_google_id_idx ON users
(google_id) WHERE google_id IS NOT NULL;

-- trigger function to auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at
()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now
();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'trg_set_updated_at'
  ) THEN
    CREATE TRIGGER trg_set_updated_at
    BEFORE
    UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at
    ();
END
IF;
END$$;
