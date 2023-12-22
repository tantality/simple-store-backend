import { Order } from '@prisma/client';
import { OrderDto } from './order.dto';

interface OrdersAndCount {
  count: number;
  orders: Order[];
}

export class OrdersDto {
  count: number;
  orders: OrderDto[];

  static fromResponse({ count, orders }: OrdersAndCount) {
    const it = new OrdersDto();
    it.count = count;
    it.orders = OrderDto.fromEntities(orders);
    return it;
  }
}
