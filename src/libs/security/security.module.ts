import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigModule } from 'libs/env-config/env-config.module';
import { SecurityService } from './security.service';

@Module({
  imports: [JwtModule.register({}), EnvConfigModule],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
