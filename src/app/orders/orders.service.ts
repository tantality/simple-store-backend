import { Injectable } from '@nestjs/common';
import { OrderItem, OrderStatus } from '@prisma/client';
import { OrdersRepo } from 'domain/repos/orders.repo';
import { ProductsRepo } from 'domain/repos/products.repo';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepo: OrdersRepo,
    private productsRepo: ProductsRepo,
  ) {}

  async findProductById(id: string) {
    return await this.productsRepo.findOneById(id);
  }

  async findOrderByStatusAndUserId(status: OrderStatus, userId: string) {
    return await this.ordersRepo.findOrderByStatusAndUserId(status, userId);
  }

  async createOrder(
    userId: string,
    orderItem: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return await this.ordersRepo.createOne(userId, orderItem);
  }
}
