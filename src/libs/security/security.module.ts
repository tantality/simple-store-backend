import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepo } from 'domain/repos/users.repo';
import { EnvConfigModule } from 'libs/env-config/env-config.module';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { AccessTokenGuard } from './guards/access-token.guard';
import { SecurityService } from './security.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [JwtModule.register({}), EnvConfigModule, PrismaModule],
  providers: [
    UsersRepo,
    SecurityService,
    AccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    RefreshTokenStrategy,
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
