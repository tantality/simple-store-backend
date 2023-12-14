import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class ProductsRepo {
  constructor(private readonly prisma: PrismaService) {}
}
