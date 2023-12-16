import { Module } from '@nestjs/common';
import { ProductsRepo } from 'domain/repos/products.repo';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepo],
})
export class ProductsModule {}
