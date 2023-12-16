import { Order, OrderItem, OrderStatus } from '@prisma/client';
import { OrderItemDto } from './order-item.dto';
import { UUIDDto } from './uuid.dto';

export class OrderDto extends UUIDDto {
  status: OrderStatus;
  totalPrice: number;
  userId: string;
  items?: OrderItemDto[];

  static fromEntity(entity?: Order & { items?: OrderItem[] }) {
    if (!entity) {
      return;
    }

    const it = new OrderDto();
    it.id = entity.id;
    it.createdAt = entity.createdAt.valueOf();
    it.updatedAt = entity.updatedAt.valueOf();
    it.status = entity.status;
    it.totalPrice = entity.totalPrice;
    it.userId = entity.userId;
    it.items = OrderItemDto.fromEntities(entity.items);

    return it;
  }

  static fromEntities(entities?: Order[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
