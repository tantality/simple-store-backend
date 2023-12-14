import { Module } from '@nestjs/common';
import { OrdersRepo } from 'domain/repos/orders.repo';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepo],
})
export class OrdersModule {}
