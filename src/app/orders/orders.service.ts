import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
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

  async findOrderByUserIdWithInCartStatus(userId: string) {
    return await this.ordersRepo.findOrderByUserIdWithInCartStatus(userId);
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

  async updateItemInOrder(
    orderId: string,
    itemId: string,
    item: Pick<OrderItem, 'quantity'>,
  ) {
    return await this.ordersRepo.updateItemInOrder(orderId, itemId, item);
  }

  async deleteOrder(orderId: string, userId: string) {
    return await this.ordersRepo.deleteOne(orderId, userId);
  }

  async deleteItemFromOrder(itemId: string, orderId: string) {
    return await this.ordersRepo.deleteItemFromOrder(itemId, orderId);
  }
}
