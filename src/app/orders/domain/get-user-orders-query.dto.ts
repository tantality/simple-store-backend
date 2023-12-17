import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { PaginationQueryDto } from 'domain/dto/pagination-query.dto';

enum ExcludeCart {
  DefaultNotExclude = 0,
}

export class GetUserOrdersQueryDto extends PaginationQueryDto {
  @Type(() => Boolean)
  @IsBoolean()
  excludeCart: boolean = Boolean(ExcludeCart.DefaultNotExclude);
}
