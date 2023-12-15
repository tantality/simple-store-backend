INSERT INTO "products" ("id", "name", "quantity", "price", "img")
VALUES
  (uuid_generate_v4(), 'DJI Air 3', 50, 150, 'img1'),
  (uuid_generate_v4(), 'DJI Osmo Action 4', 50, 100, 'img2'),
  (uuid_generate_v4(), 'DJI Mini 3 Pro (DJI RC)', 20, 200, 'img3'),
  (uuid_generate_v4(), 'DJI Mini 3 Pro', 35, 350, 'img4');

INSERT INTO "users" ("id", "email", "normalized_email", "role_id", "password")
VALUES
  (uuid_generate_v4(), 'email@you.coms999!', 'email@you.coms999!', (SELECT id FROM roles WHERE type='user'), 'password');

INSERT INTO "orders" ("id", "user_id")
VALUES
  (uuid_generate_v4(), (SELECT id FROM users WHERE normalized_email='email@you.coms999!'));


INSERT INTO "order_items" ("id", "order_id", "product_id", "quantity", "price")
VALUES
  (uuid_generate_v4(), (SELECT id FROM orders LIMIT 1), (SELECT id FROM products WHERE name='DJI Air 3'), 1, 150),
  (uuid_generate_v4(),  (SELECT id FROM orders LIMIT 1), (SELECT id FROM products WHERE name='DJI Mini 3 Pro (DJI RC)'), 2, 400);


