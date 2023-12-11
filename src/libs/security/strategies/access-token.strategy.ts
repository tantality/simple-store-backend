import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserSessionDto } from 'domain/dto/user-session.dto';
import { EnvConfigService } from 'libs/env-config/env-config.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { StrategyName } from '../constants/security.constants';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  StrategyName.AccessTokenStrategy,
) {
  constructor(private envConfigService: EnvConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfigService.getJwtAccessTokenSecret(),
    });
  }

  validate(payload: UserSessionDto): UserSessionDto {
    return payload;
  }
}
