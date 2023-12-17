import { Injectable } from '@nestjs/common';
import { ProductsRepo } from 'domain/repos/products.repo';
import { ProductIdentifier } from 'types/model-identifiers.types';
import { GetAllProductsQueryDto } from './domain/get-all-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepo: ProductsRepo) {}

  async findAllProducts(query: GetAllProductsQueryDto) {
    return await this.productsRepo.findAllProducts(query);
  }

  async findProductById(id: ProductIdentifier) {
    return this.productsRepo.findOneById(id);
  }
}
