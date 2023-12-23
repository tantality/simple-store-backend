import { Module } from '@nestjs/common';
import { UsersRepo } from 'domain/repos/users.repo';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { SecurityModule } from 'libs/security/security.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule, SecurityModule],
  controllers: [AuthController],
  providers: [AuthService, UsersRepo],
})
export class AuthModule {}
