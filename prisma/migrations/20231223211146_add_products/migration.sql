CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO "products" ("id", "name", "quantity", "price", "img")
VALUES
  (uuid_generate_v4(), 'Nike Calm', 50, 50, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/08edaff4-2d6d-4b6c-82b4-9bc0ddf9cac9/calm-womens-slides-7XtJSh.png'),
  (uuid_generate_v4(), 'Nike Burrow', 5, 50, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9f2b1d8d-872a-4914-8769-0c86585c72fb/burrow-womens-slippers-Mwlm1j.png'),
  (uuid_generate_v4(), 'Nike Dunk Low', 10, 115, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-mens-shoes-87q0hf.png'),
  (uuid_generate_v4(), 'Nike Air Huarache By You', 10, 130, 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/844d1e27-a857-4172-b42c-0a60468620c8/custom-huarache-run-by-you.png'),
  (uuid_generate_v4(), 'Nike Icon Classic', 15, 65, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f39c0519-2458-4880-af51-78d0116d3b09/icon-classic-womens-sandals-c4bCfN.png'),
  (uuid_generate_v4(), 'Nike BRSB', 100, 90, 'https://cncpts.com/cdn/shop/products/Nike_BRSBWHITEBLACKWHITEBLACK_DH9227-101_2.jpg?v=1677180078&width=713'),
  (uuid_generate_v4(), 'Jordan Sophia', 35, 85, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7272467b-66a8-4a79-8b2b-45822b167f87/jordan-sophia-womens-slides-bW5vFq.png'),
  (uuid_generate_v4(), 'Nike ACG Moc', 50, 90, 'https://ir.ozone.ru/s3/multimedia-e/wc1000/6464072846.jpg'),
  (uuid_generate_v4(), 'KD16 By You', 30, 190, 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c0c9ab2b-8bd0-40b3-a3fd-d58d861e4c23/custom-nike-kd-16-by-you.png'),
  (uuid_generate_v4(), 'Nike Air VaporMax Moc Roam', 20, 200, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/413a8ac4-b0fb-4ec6-ac83-77dd0ee5d512/air-vapormax-moc-roam-mens-shoes-SfMBB4.png'),
  (uuid_generate_v4(), 'Nike Free Crater Trail Moc N7', 35, 160, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/931a4207-654e-4190-9c40-78034d3c91a4/free-crater-trail-moc-n7-shoes-6h2pKs.png'),
  (uuid_generate_v4(), 'Nike Air Max 1 LX', 70, 150, 'https://cncpts.ae/cdn/shop/files/5555_f0dbe5ec-c5be-4638-a5bc-4e575a3c59d3_1024x1024.jpg?v=1688044680'),
  (uuid_generate_v4(), 'Nike V2K Run', 80, 110, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1f73a907-32b6-45b6-85e5-1240cc9aed4a/v2k-run-womens-shoes-nRRH5X.png'),
  (uuid_generate_v4(), 'Nike Offcourt Duo', 20, 145, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b0e1298c-a2da-4d4a-8089-ce06cc33b404/offcourt-duo-womens-slides-X0HQzh.png'),
  (uuid_generate_v4(), 'Nike Air Penny 2', 35, 180, 'https://brandland.by/image/cache/catalog/Alenawork/yjdjt/nike-air-max-penny-2-rosewood-dv1163-100-64074719c5f0e-500x500.jpg');
