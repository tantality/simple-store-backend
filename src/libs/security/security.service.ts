import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserSessionDto } from 'domain/dto/user-session.dto';
import { EnvConfigService } from 'libs/env-config/env-config.service';
import {
  ACCESS_TOKEN_LIFETIME_IN_MS,
  REFRESH_TOKEN_LIFETIME_IN_MS,
} from './constants/security.constants';

@Injectable()
export class SecurityService {
  constructor(
    private jwtService: JwtService,
    private envConfigService: EnvConfigService,
  ) {}

  async hashPassword(password: string) {
    const hash = crypto.createHash('MD5');
    return hash.update(password).digest('hex');
  }

  async comparePasswords(plainPassword: string, hashedPassword: string) {
    return (await this.hashPassword(plainPassword)) === hashedPassword;
  }

  generateTokens(payload: UserSessionDto) {
    const atSecret = this.envConfigService.getJwtAccessTokenSecret();
    const accessToken = this.jwtService.sign(payload, {
      secret: atSecret,
      expiresIn: `${ACCESS_TOKEN_LIFETIME_IN_MS}ms`,
    });

    const rtSecret = this.envConfigService.getJwtRefreshTokenSecret();
    const refreshToken = this.jwtService.sign(payload, {
      secret: rtSecret,
      expiresIn: `${REFRESH_TOKEN_LIFETIME_IN_MS}ms`,
    });

    return { accessToken, refreshToken };
  }
}
