import { Injectable } from '@nestjs/common';
import { OrderItem, OrderStatus } from '@prisma/client';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class OrdersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findOrderItemByIdAndOrderId(itemId: string, orderId: string) {
    return await this.prisma.orderItem.findUnique({
      where: { id: itemId, orderId },
    });
  }

  async findOrderByStatusAndUserId(status: OrderStatus, userId: string) {
    return await this.prisma.order.findFirst({
      where: {
        status,
        userId,
      },
    });
  }

  async findOneByIdAndUserId(id: string, userId: string) {
    return await this.prisma.order.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        items: true,
      },
    });
  }

  async createOne(
    userId: string,
    orderItem: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return this.prisma.order.create({
      data: {
        userId,
        items: {
          create: {
            ...orderItem,
          },
        },
      },
      include: {
        items: true,
      },
    });
  }

  async addItemToOrder(
    orderId: string,
    orderItem: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return await this.prisma.order.update({
      data: {
        items: {
          create: {
            ...orderItem,
          },
        },
      },
      where: { id: orderId },
      include: { items: true },
    });
  }

  async deleteOne(orderId: string, userId: string) {
    return await this.prisma.order.delete({ where: { id: orderId, userId } });
  }

  async deleteItemFromOrder(itemId: string, orderId: string) {
    return await this.prisma.order.update({
      data: {
        items: {
          delete: {
            id: itemId,
          },
        },
      },
      where: { id: orderId },
      include: {
        items: true,
      },
    });
  }
}
