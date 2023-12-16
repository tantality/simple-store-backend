import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { OrdersRepo } from 'domain/repos/orders.repo';
import { ProductsRepo } from 'domain/repos/products.repo';
import {
  OrderIdentifier,
  OrderItemIdentifier,
  ProductIdentifier,
  UserIdentifier,
} from 'types/model-identities.types';

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
    orderItem: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return await this.ordersRepo.createOne(userId, orderItem);
  }

  async addItemToOrder(
    orderId: OrderIdentifier,
    orderItem: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return await this.ordersRepo.addItemToOrder(orderId, orderItem);
  }

  async updateItemInOrder(
    orderId: OrderIdentifier,
    itemId: OrderItemIdentifier,
    item: Pick<OrderItem, 'quantity'>,
  ) {
    return await this.ordersRepo.updateItemInOrder(orderId, itemId, item);
  }

  async deleteOrder(orderId: OrderIdentifier, userId: UserIdentifier) {
    return await this.ordersRepo.deleteOne(orderId, userId);
  }

  async deleteItemFromOrder(
    itemId: OrderItemIdentifier,
    orderId: OrderIdentifier,
  ) {
    return await this.ordersRepo.deleteItemFromOrder(itemId, orderId);
  }
}
