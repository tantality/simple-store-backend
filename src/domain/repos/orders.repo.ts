import { Injectable } from '@nestjs/common';
import { OrderItem, OrderStatus, Prisma } from '@prisma/client';
import { GetUserOrdersQueryDto } from 'app/orders/domain/get-user-orders-query.dto';
import { PrismaService } from 'libs/prisma/prisma.service';
import {
  OrderIdentifier,
  OrderItemIdentifier,
  UserIdentifier,
} from 'types/model-identifiers.types';

@Injectable()
export class OrdersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUserOrders(
    userId: UserIdentifier,
    query: GetUserOrdersQueryDto,
  ) {
    const { pageNumber, pageSize, excludeCart } = query;

    const exceptOrderWithInCartStatusCondition: Prisma.OrderWhereInput = {
      NOT: {
        status: OrderStatus.InCart,
      },
    };

    const prismaQuery: Prisma.OrderFindManyArgs = {
      where: {
        userId,
        ...(excludeCart && exceptOrderWithInCartStatusCondition),
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    };

    const [count, orders] = await this.prisma.$transaction([
      this.prisma.order.count({ where: prismaQuery.where }),
      this.prisma.order.findMany(prismaQuery),
    ]);

    return { count, orders };
  }

  async findOrderItemByIdAndOrderId(
    itemId: OrderItemIdentifier,
    orderId: OrderIdentifier,
  ) {
    return await this.prisma.orderItem.findUnique({
      where: { id: itemId, orderId },
    });
  }

  async findOrderByUserIdWithInCartStatus(userId: UserIdentifier) {
    return await this.prisma.order.findFirst({
      where: {
        status: OrderStatus.InCart,
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async findOneByIdAndUserId(id: OrderIdentifier, userId: UserIdentifier) {
    return await this.prisma.order.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async createOne(
    userId: UserIdentifier,
    item: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return this.prisma.order.create({
      data: {
        userId,
        items: {
          create: {
            ...item,
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async createOrderItem(
    orderId: OrderIdentifier,
    item: Pick<OrderItem, 'productId' | 'quantity' | 'price'>,
  ) {
    return await this.prisma.order.update({
      data: {
        items: {
          create: {
            ...item,
          },
        },
      },
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async placeOrder(id: OrderIdentifier) {
    return await this.prisma.$transaction(
      async (tx) => {
        const orderItems = await tx.orderItem.findMany({
          where: {
            orderId: id,
          },
          select: { id: true, quantity: true, product: true },
        });

        const updateProductPromises = orderItems.map((item) => {
          return tx.product.update({
            data: { quantity: item.product.quantity - item.quantity },
            where: { id: item.product.id },
          });
        });

        await Promise.all(updateProductPromises);

        const order = await tx.order.update({
          data: {
            status: OrderStatus.Placed,
          },
          where: { id },
          include: {
            items: {
              include: {
                product: true,
              },
              orderBy: {
                id: 'asc',
              },
            },
          },
        });

        return order;
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead },
    );
  }

  async updateOrderItem(
    orderId: OrderIdentifier,
    itemId: OrderItemIdentifier,
    item: Pick<OrderItem, 'quantity'>,
  ) {
    return await this.prisma.order.update({
      data: {
        items: {
          update: {
            data: {
              ...item,
            },
            where: { id: itemId },
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
      where: { id: orderId },
    });
  }

  async deleteOne(orderId: OrderIdentifier, userId: UserIdentifier) {
    return await this.prisma.order.delete({ where: { id: orderId, userId } });
  }

  async deleteOrderItem(orderId: OrderIdentifier, itemId: OrderItemIdentifier) {
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
        items: {
          include: {
            product: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }
}
