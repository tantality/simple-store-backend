import {
  BadRequestException,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { Body, Delete, HttpCode, Param, Post } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
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
    const [orderEntity, productEntity] = await Promise.all([
      this.ordersService.findOrderByStatusAndUserId(
        OrderStatus.InCart,
        user.id,
      ),
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

    const createdOrderEntity = await this.ordersService.createOrder(
      user.id,
      item,
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(
    @Param('id') id: string,
    @CurrentUser() user: UserSessionDto,
  ) {
    const orderEntity = await this.ordersService.findOrderByIdAndUserId(
      id,
      user.id,
    );

    if (!orderEntity) {
      throw new NotFoundException(ErrorMessage.RecordNotExists);
    }

    const deletedOrderEntity = await this.ordersService.deleteOrder(
      id,
      user.id,
    );

    if (!deletedOrderEntity) {
      throw new BadRequestException(ErrorMessage.RecordDeletionFailed);
    }
  }

  @Delete(':orderId/items/:itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItemFromOrder(
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
    @CurrentUser() user: UserSessionDto,
  ) {
    const [orderEntity, itemEntity] = await Promise.all([
      this.ordersService.findOrderByIdAndUserId(orderId, user.id),
      this.ordersService.findOrderItemByIdAndOrderId(itemId, orderId),
    ]);

    if (!orderEntity || !itemEntity) {
      throw new NotFoundException(ErrorMessage.RecordNotExists);
    }

    const deletedItemEntity = await this.ordersService.deleteItemFromOrder(
      itemId,
      orderId,
    );

    if (!deletedItemEntity) {
      throw new BadRequestException(ErrorMessage.RecordDeletionFailed);
    }
  }
}
