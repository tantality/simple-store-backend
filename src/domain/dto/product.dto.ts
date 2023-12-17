import { Product } from '@prisma/client';
import { UUIDDto } from './uuid.dto';

export class ProductDto extends UUIDDto {
  name: string;
  quantity: number;
  price: number;
  img: string;

  static fromEntity(entity?: Product) {
    if (!entity) {
      return;
    }

    const it = new ProductDto();
    it.id = entity.id;
    it.createdAt = entity.createdAt.valueOf();
    it.updatedAt = entity.updatedAt.valueOf();
    it.name = entity.name;
    it.quantity = entity.quantity;
    it.price = entity.price;
    it.img = entity.img;

    return it;
  }

  static fromEntities(entities?: Product[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
