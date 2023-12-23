import { Product } from '@prisma/client';
import { ProductDto } from './product.dto';

interface ProductsAndCount {
  count: number;
  products: Product[];
}

export class ProductsDto {
  count: number;
  products: ProductDto[];

  static fromResponse({ count, products }: ProductsAndCount) {
    const it = new ProductsDto();
    it.count = count;
    it.products = ProductDto.fromEntities(products);
    return it;
  }
}
