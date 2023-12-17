import { Max, Min } from 'class-validator';
import { OrderItemQuantity } from './enums/validation.enums';

export class UpdateOrderItemForm {
  @Max(OrderItemQuantity.Max)
  @Min(OrderItemQuantity.Min)
  quantity: number;
}
