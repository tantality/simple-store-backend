import { Injectable } from '@nestjs/common';
import { GetAllProductsQueryDto } from 'app/products/domain/get-all-products-query.dto';
import { PrismaService } from 'libs/prisma/prisma.service';
import { ProductIdentifier } from 'types/model-identifiers.types';

@Injectable()
export class ProductsRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProducts(query: GetAllProductsQueryDto) {
    const { pageNumber, pageSize, q } = query;

    return await this.prisma.product.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
    });
  }

  async findOneById(id: ProductIdentifier) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
