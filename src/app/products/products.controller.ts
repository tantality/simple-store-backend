import { ParseUUIDPipe } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { Controller, Param, Get } from '@nestjs/common';
import { ProductDto } from 'domain/dto/product.dto';
import { ProductsDto } from 'domain/dto/products.dto';
import { ErrorMessage } from 'enums/error-message.enum';
import { SkipAccessTokenCheck } from 'libs/security/decorators/skip-access-token-check.decorator';
import { GetAllProductsQueryDto } from './domain/get-all-products-query.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @SkipAccessTokenCheck()
  async getAllProducts(@Query() query: GetAllProductsQueryDto) {
    const productsAndCount = await this.productsService.findAllProducts(query);
    return ProductsDto.fromResponse(productsAndCount);
  }

  @Get(':id')
  @SkipAccessTokenCheck()
  async getProduct(@Param('id', ParseUUIDPipe) id: string) {
    const productEntity = await this.productsService.findProductById(id);

    if (!productEntity) {
      throw new InternalServerErrorException(ErrorMessage.RecordNotExists);
    }

    return ProductDto.fromEntity(productEntity);
  }
}
