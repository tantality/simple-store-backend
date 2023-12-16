import {
  BadRequestException,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common/decorators';
import { OrderStatus } from '@prisma/client';
import { UserSessionDto } from 'domain/dto/user-session.dto';
import { ErrorMessage } from 'enums/error-message.enum';
import { CurrentUser } from 'libs/security/decorators/current-user.decorator';
import { AddItemToOrderForm } from './domain/add-item-to-order.form';
import { CreateOrderForm } from './domain/create-order.form';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @CurrentUser() user: UserSessionDto,
    @Body() body: CreateOrderForm,
  ) {
    const productEntity = await this.ordersService.findProductById(
      body.productId,
    );

    if (!productEntity) {
      throw new NotFoundException(ErrorMessage.RecordNotExists);
    }

    const orderEntity = await this.ordersService.findOrderByStatusAndUserId(
      OrderStatus.InCart,
      user.id,
    );

    if (orderEntity) {
      throw new BadRequestException(ErrorMessage.RecordAlreadyExist);
    }

    const orderItem = {
      productId: body.productId,
      quantity: 1,
      price: productEntity.price,
    };

    const createdOrderEntity = await this.ordersService.createOrder(
      user.id,
      orderItem,
    );

    if (!createdOrderEntity) {
      throw new BadRequestException(ErrorMessage.RecordCreationFailed);
    }

    return createdOrderEntity;
  }

  @Post(':id/items')
  async addItemToOrder(
    @Param('id') orderId: string,
    @CurrentUser() user: UserSessionDto,
    @Body() body: AddItemToOrderForm,
  ) {
    const [orderEntity, productEntity] = await Promise.all([
      this.ordersService.findOrderByIdAndUserId(orderId, user.id),
      this.ordersService.findProductById(body.productId),
    ]);

    if (!orderEntity || !productEntity) {
      throw new NotFoundException(ErrorMessage.RecordNotExists);
    }

    const item = {
      productId: body.productId,
      quantity: 1,
      price: productEntity.price,
    };

    const updatedOrderEntity = this.ordersService.addItemToOrder(orderId, item);

    if (!updatedOrderEntity) {
      throw new BadRequestException(ErrorMessage.RecordCreationFailed);
    }

    return updatedOrderEntity;
  }
}
