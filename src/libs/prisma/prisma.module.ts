import { Module } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
