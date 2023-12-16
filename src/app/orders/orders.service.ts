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

  async findOrderItemByIdAndOrderId(itemId: string, orderId: string) {
    return await this.ordersRepo.findOrderItemByIdAndOrderId(itemId, orderId);
  }

  async findProductById(id: string) {
    return await this.productsRepo.findOneById(id);
  }

  async findOrderByStatusAndUserId(status: OrderStatus, userId: string) {
    return await this.ordersRepo.findOrderByStatusAndUserId(status, userId);
  }

  async findOrderByIdAndUserId(id: string, userId: string) {
    return await this.ordersRepo.findOneByIdAndUserId(id, userId);
  }

  async createOrder(
    userId: string,
    orderItem: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return await this.ordersRepo.createOne(userId, orderItem);
  }

  async addItemToOrder(
    orderId: string,
    orderItem: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return await this.ordersRepo.addItemToOrder(orderId, orderItem);
  }

  async deleteOrder(orderId: string, userId: string) {
    return await this.ordersRepo.deleteOne(orderId, userId);
  }

  async deleteItemFromOrder(itemId: string, orderId: string) {
    return await this.ordersRepo.deleteItemFromOrder(itemId, orderId);
  }
}
