import { IsUUID, Max, Min } from 'class-validator';
import { OrderItemQuantity } from './enums/validation.enums';

export class CreateOrderItemForm {
  @IsUUID()
  productId: string;

  @Max(OrderItemQuantity.Max)
  @Min(OrderItemQuantity.Min)
  quantity: number;
}
