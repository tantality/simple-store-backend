import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_ROUTE_FREE_FROM_ACCESS_TOKEN_CHECK =
  'is_route_free_from_access_token_check';

export const SkipAccessTokenCheck = (): CustomDecorator<string> =>
  SetMetadata(IS_ROUTE_FREE_FROM_ACCESS_TOKEN_CHECK, true);
