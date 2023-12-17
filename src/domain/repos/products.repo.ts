import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { ProductIdentifier } from 'types/model-identifiers.types';

@Injectable()
export class ProductsRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProducts() {
    return await this.prisma.product.findMany();
  }

  async findOneById(id: ProductIdentifier) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
