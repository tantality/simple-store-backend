CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO "products" ("id", "name", "quantity", "price", "img")
VALUES
  (uuid_generate_v4(), 'DJI Air 3', 50, 150, 'img1'),
  (uuid_generate_v4(), 'DJI Osmo Action 4', 50, 100, 'img2'),
  (uuid_generate_v4(), 'DJI Mini 3 Pro (DJI RC)', 20, 200, 'img3'),
  (uuid_generate_v4(), 'DJI Mini 3 Pro', 35, 350, 'img4');
