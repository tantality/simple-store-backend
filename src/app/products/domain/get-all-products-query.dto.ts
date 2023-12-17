import { IsOptional, IsString, Length } from 'class-validator';
import { RemoveExtraSpaces } from 'decorators/remove-extra-spaces.decorator';
import { PaginationQueryDto } from 'domain/dto/pagination-query.dto';

enum Q {
  MinLength = 1,
  MaxLength = 255,
}

export class GetAllProductsQueryDto extends PaginationQueryDto {
  @Length(Q.MinLength, Q.MaxLength)
  @RemoveExtraSpaces()
  @IsString()
  @IsOptional()
  q: string;
}
