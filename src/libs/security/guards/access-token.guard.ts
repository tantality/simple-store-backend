import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { StrategyName } from '../constants/security.constants';
import { IS_ROUTE_FREE_FROM_ACCESS_TOKEN_CHECK } from '../decorators/skip-access-token-check.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard(
  StrategyName.AccessTokenStrategy,
) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isRouteFreeFromAccessTokenCheck =
      this.reflector.getAllAndOverride<boolean>(
        IS_ROUTE_FREE_FROM_ACCESS_TOKEN_CHECK,
        [context.getHandler(), context.getClass()],
      );

    if (isRouteFreeFromAccessTokenCheck) {
      return true;
    }

    return super.canActivate(context);
  }
}
