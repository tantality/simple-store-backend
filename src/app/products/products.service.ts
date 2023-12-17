import { Injectable } from '@nestjs/common';
import { ProductsRepo } from 'domain/repos/products.repo';
import { ProductIdentifier } from 'types/model-identifiers.types';

@Injectable()
export class ProductsService {
  constructor(private productsRepo: ProductsRepo) {}

  async findAllProducts() {
    return await this.productsRepo.findAllProducts();
  }

  async findProductById(id: ProductIdentifier) {
    return this.productsRepo.findOneById(id);
  }
}
