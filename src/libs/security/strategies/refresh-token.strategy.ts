import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserSessionDto } from 'domain/dto/user-session.dto';
import { UsersRepo } from 'domain/repos/users.repo';
import { ErrorMessage } from 'enums/error-message.enum';
import { Request } from 'express';
import { EnvConfigService } from 'libs/env-config/env-config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CookieName, StrategyName } from '../constants/security.constants';
import { SecurityService } from '../security.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  StrategyName.RefreshTokenStrategy,
) {
  constructor(
    private envConfigService: EnvConfigService,
    private securityService: SecurityService,
    private usersRepo: UsersRepo,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractRefreshTokenFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: envConfigService.getJwtRefreshTokenSecret(),
      passReqToCallback: true,
    });
  }

  async validate(@Req() req: Request): Promise<UserSessionDto> {
    const token = req.cookies[CookieName.RefreshToken] as string;
    const dto = UserSessionDto.fromPayload(
      this.securityService.verifyRefreshToken(token),
    );

    const user = await this.usersRepo.findOneById(dto.id);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException(ErrorMessage.BadRefreshToken);
    }

    const areTokensEqual = user.refreshToken === token;

    if (!areTokensEqual) {
      throw new UnauthorizedException(ErrorMessage.BadRefreshToken);
    }

    return dto;
  }
}

const extractRefreshTokenFromCookie = (req: Request): string => {
  const refreshToken = req.cookies[CookieName.RefreshToken];

  if (!refreshToken) {
    throw new UnauthorizedException(ErrorMessage.BadRefreshToken);
  }

  return refreshToken;
};
