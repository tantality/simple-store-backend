ALTER TABLE "products" ADD CONSTRAINT "price_is_greater_than_zero" CHECK (price > 0);
ALTER TABLE "order_items" ADD CONSTRAINT "price_is_greater_than_zero" CHECK (price > 0);

ALTER TABLE "products" ADD CONSTRAINT "quantity_is_positive_number" CHECK (quantity >= 0);
ALTER TABLE "order_items" ADD CONSTRAINT "quantity_is_greater_than_zero" CHECK (quantity > 0);