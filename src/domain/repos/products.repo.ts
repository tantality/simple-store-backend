import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetAllProductsQueryDto } from 'app/products/domain/get-all-products-query.dto';
import { PrismaService } from 'libs/prisma/prisma.service';
import { ProductIdentifier } from 'types/model-identifiers.types';

@Injectable()
export class ProductsRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProducts(query: GetAllProductsQueryDto) {
    const { pageNumber, pageSize, q } = query;

    const prismaQuery: Prisma.ProductFindManyArgs = {
      where: {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    };

    const [products, count] = await this.prisma.$transaction([
      this.prisma.product.findMany(prismaQuery),
      this.prisma.product.count({ where: prismaQuery.where }),
    ]);

    return { count, products };
  }

  async findOneById(id: ProductIdentifier) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
