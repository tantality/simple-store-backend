import { Injectable } from '@nestjs/common';
import { OrdersRepo } from 'domain/repos/orders.repo';

@Injectable()
export class OrdersService {
  constructor(private ordersRepo: OrdersRepo) {}
}
