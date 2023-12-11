import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigModule } from 'libs/env-config/env-config.module';
import { AccessTokenGuard } from './guards/access-token.guard';
import { SecurityService } from './security.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [JwtModule.register({}), EnvConfigModule],
  providers: [
    SecurityService,
    AccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
