import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { OrdersRepo } from 'domain/repos/orders.repo';
import { ProductsRepo } from 'domain/repos/products.repo';
import {
  OrderIdentifier,
  OrderItemIdentifier,
  ProductIdentifier,
  UserIdentifier,
} from 'types/model-identifires.types';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepo: OrdersRepo,
    private productsRepo: ProductsRepo,
  ) {}

  async findOrderItemByIdAndOrderId(
    itemId: OrderItemIdentifier,
    orderId: OrderIdentifier,
  ) {
    return await this.ordersRepo.findOrderItemByIdAndOrderId(itemId, orderId);
  }

  async findProductById(id: ProductIdentifier) {
    return await this.productsRepo.findOneById(id);
  }

  async findOrderByUserIdWithInCartStatus(userId: UserIdentifier) {
    return await this.ordersRepo.findOrderByUserIdWithInCartStatus(userId);
  }

  async findOrderByIdAndUserId(id: OrderIdentifier, userId: UserIdentifier) {
    return await this.ordersRepo.findOneByIdAndUserId(id, userId);
  }

  async createOrder(
    userId: UserIdentifier,
    item: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return await this.ordersRepo.createOne(userId, item);
  }

  async createOrderItem(
    orderId: OrderIdentifier,
    item: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return await this.ordersRepo.createOrderItem(orderId, item);
  }

  async updateOrderItem(
    orderId: OrderIdentifier,
    itemId: OrderItemIdentifier,
    item: Pick<OrderItem, 'quantity'>,
  ) {
    return await this.ordersRepo.updateOrderItem(orderId, itemId, item);
  }

  async deleteOrder(orderId: OrderIdentifier, userId: UserIdentifier) {
    return await this.ordersRepo.deleteOne(orderId, userId);
  }

  async deleteOrderItem(orderId: OrderIdentifier, itemId: OrderItemIdentifier) {
    return await this.ordersRepo.deleteOrderItem(orderId, itemId);
  }
}
