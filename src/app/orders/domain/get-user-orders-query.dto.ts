import { IsBoolean } from 'class-validator';
import { ParseToBoolean } from 'decorators/parse-to-boolean.decorator';
import { PaginationQueryDto } from 'domain/dto/pagination-query.dto';

enum ExcludeCart {
  DefaultNotExclude = 0,
}

export class GetUserOrdersQueryDto extends PaginationQueryDto {
  @IsBoolean()
  @ParseToBoolean()
  excludeCart: boolean = Boolean(ExcludeCart.DefaultNotExclude);
}
