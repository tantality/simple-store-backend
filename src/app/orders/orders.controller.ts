import {
  BadRequestException,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { OrderDto } from 'domain/dto/order.dto';
import { UserSessionDto } from 'domain/dto/user-session.dto';
import { ErrorMessage } from 'enums/error-message.enum';
import { CurrentUser } from 'libs/security/decorators/current-user.decorator';
import { AddItemToOrderForm } from './domain/add-item-to-order.form';
import { CreateOrderForm } from './domain/create-order.form';
import { UpdateItemInOrderForm } from './domain/update-item-in-order.form';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  async getOrder(@Param('id') id: string, @CurrentUser() user: UserSessionDto) {
    const orderEntity = await this.ordersService.findOrderByIdAndUserId(
      id,
      user.id,
    );

    return OrderDto.fromEntity(orderEntity);
  }

  @Get('/cart')
  async getOrderWithInCartStatus(@CurrentUser() user: UserSessionDto) {
    const orderEntity =
      await this.ordersService.findOrderByUserIdWithInCartStatus(user.id);

    return OrderDto.fromEntity(orderEntity);
  }

  @Post()
  async createOrder(
    @CurrentUser() user: UserSessionDto,
    @Body() body: CreateOrderForm,
  ) {
    const { item } = body;
    const [orderEntity, productEntity] = await Promise.all([
      this.ordersService.findOrderByUserIdWithInCartStatus(user.id),
      this.ordersService.findProductById(item.productId),
    ]);

    if (orderEntity) {
      throw new BadRequestException(ErrorMessage.RecordAlreadyExist);
    }

    if (!productEntity) {
      throw new NotFoundException(ErrorMessage.RecordNotExists);
    }

    const orderItem = {
      ...item,
      price: productEntity.price,
    };

    const createdOrderEntity = await this.ordersService.createOrder(
      user.id,
      orderItem,
    );

    if (!createdOrderEntity) {
      throw new BadRequestException(ErrorMessage.RecordCreationFailed);
    }

    return OrderDto.fromEntity(createdOrderEntity);
  }

  @Post(':orderId/items')
  async createOrderItem(
    @Param('orderId') orderId: string,
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
      ...body,
      price: productEntity.price,
    };

    const updatedOrderEntity = await this.ordersService.createOrderItem(
      orderId,
      item,
    );

    if (!updatedOrderEntity) {
      throw new BadRequestException(ErrorMessage.RecordCreationFailed);
    }

    return OrderDto.fromEntity(updatedOrderEntity);
  }

  @Put(':orderId/items/:itemId')
  async updateOrderItem(
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
    @CurrentUser() user: UserSessionDto,
    @Body() body: UpdateItemInOrderForm,
  ) {
    const [orderEntity, itemEntity] = await Promise.all([
      this.ordersService.findOrderByIdAndUserId(orderId, user.id),
      this.ordersService.findOrderItemByIdAndOrderId(itemId, orderId),
    ]);

    if (!orderEntity || !itemEntity) {
      throw new NotFoundException(ErrorMessage.RecordNotExists);
    }

    const updatedOrderEntity = await this.ordersService.updateOrderItem(
      orderId,
      itemId,
      body,
    );

    if (!updatedOrderEntity) {
      throw new BadRequestException(ErrorMessage.RecordUpdationFailed);
    }

    return OrderDto.fromEntity(updatedOrderEntity);
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
  async deleteOrderItem(
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

    const updatedOrderEntity = await this.ordersService.deleteOrderItem(
      orderId,
      itemId,
    );

    if (!updatedOrderEntity) {
      throw new BadRequestException(ErrorMessage.RecordDeletionFailed);
    }

    return OrderDto.fromEntity(updatedOrderEntity);
  }
}
