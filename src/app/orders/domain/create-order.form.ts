import { Type } from 'class-transformer';
import { IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { OrderItemQuantity } from './enums/validation.enums';

class OrderItem {
  @IsUUID()
  productId: string;

  @Max(OrderItemQuantity.Max)
  @Min(OrderItemQuantity.Min)
  quantity: number;
}

export class CreateOrderForm {
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  item: OrderItem;
}
