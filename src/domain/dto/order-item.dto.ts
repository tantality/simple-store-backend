import { OrderItem, Product } from '@prisma/client';
import { ProductDto } from './product.dto';
import { UUIDDto } from './uuid.dto';

export class OrderItemDto extends UUIDDto {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: ProductDto;

  static fromEntity(entity?: OrderItem & { product?: Product }) {
    if (!entity) {
      return;
    }

    const it = new OrderItemDto();
    it.id = entity.id;
    it.createdAt = entity.createdAt.valueOf();
    it.updatedAt = entity.updatedAt.valueOf();
    it.orderId = entity.orderId;
    it.productId = entity.productId;
    it.quantity = entity.quantity;
    it.price = entity.price;
    it.product = ProductDto.fromEntity(entity.product);

    return it;
  }

  static fromEntities(entities?: OrderItem[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
