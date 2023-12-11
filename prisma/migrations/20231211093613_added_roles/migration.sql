CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO "roles" ("id", "type", "permissions")
VALUES
  (uuid_generate_v4(), 'admin', '{"permissions.all"}'),
  (uuid_generate_v4(), 'user', '{"permissions.all"}')