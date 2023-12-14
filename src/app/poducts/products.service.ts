import { Injectable } from '@nestjs/common';
import { ProductsRepo } from 'domain/repos/products.repo';

@Injectable()
export class ProductsService {
  constructor(private productsRepo: ProductsRepo) {}
}
