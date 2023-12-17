import { IsUUID, Max, Min } from 'class-validator';
import { OrderItemQuantity } from './enums/validation.enums';

class OrderItem {
  @IsUUID()
  productId: string;

  @Max(OrderItemQuantity.Max)
  @Min(OrderItemQuantity.Min)
  quantity: number;
}

export class CreateOrderForm {
  item: OrderItem;
}
