import { Module } from '@nestjs/common';
import { AuthModule } from 'app/auth/auth.module';
import { OrdersModule } from 'app/orders/orders.module';
import { ProductsModule } from 'app/products/products.module';

@Module({
  imports: [AuthModule, ProductsModule, OrdersModule],
})
export class AppModule {}
