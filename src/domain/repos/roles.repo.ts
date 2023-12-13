import { Injectable } from '@nestjs/common';
import { RoleTypes } from '@prisma/client';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class RolesRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByType(type: RoleTypes) {
    return await this.prisma.role.findUnique({ where: { type } });
  }
}
