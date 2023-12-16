import { Controller, Param, Get, NotFoundException } from '@nestjs/common';
import { ProductDto } from 'domain/dto/product.dto';
import { ErrorMessage } from 'enums/error-message.enum';
import { SkipAccessTokenCheck } from 'libs/security/decorators/skip-access-token-check.decorator';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  @SkipAccessTokenCheck()
  async getProduct(@Param('id') id: string) {
    const product = await this.productsService.findProductById(id);

    if (!product) {
      throw new NotFoundException(ErrorMessage.RecordNotExists);
    }

    return ProductDto.fromEntity(product);
  }
}
