import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByNormalizedEmail({
    normalizedEmail,
  }: Pick<User, 'normalizedEmail'>) {
    return await this.prisma.user.findUnique({
      where: { normalizedEmail },
    });
  }

  async createOne(
    user: Pick<User, 'roleId' | 'email' | 'normalizedEmail' | 'password'>,
  ) {
    return await this.prisma.user.create({
      data: { ...user },
    });
  }
}
