import { Module } from '@nestjs/common';
import { AuthModule } from 'app/auth/auth.module';
import { ProductsModule } from 'app/poducts/products.module';

@Module({
  imports: [AuthModule, ProductsModule],
})
export class AppModule {}
