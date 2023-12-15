CREATE OR REPLACE FUNCTION calculate_order_price()
  RETURNS trigger AS
$$
  DECLARE 
     received_order_id uuid;
BEGIN
  
  IF ( TG_OP = 'DELETE' ) THEN
  received_order_id := old.order_id;
  END IF ;
  
  IF ( TG_OP = 'INSERT' OR TG_OP = 'UPDATE'  ) THEN
  received_order_id := new.order_id;
  END IF ;

  UPDATE orders
  SET total_price = ( 
    SELECT SUM(quantity*price)
    FROM order_items
    WHERE order_items.order_id = received_order_id
  )
  WHERE orders.id= received_order_id;
  
  RETURN null;

END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER calculate_order_price
AFTER INSERT OR UPDATE OR DELETE ON "order_items"
FOR EACH ROW
EXECUTE PROCEDURE calculate_order_price();