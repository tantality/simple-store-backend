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

  async findOneByNormalizedEmailAndPassword(
    normalizedEmail: string,
    password: string,
  ) {
    return await this.prisma.user.findUnique({
      where: { normalizedEmail, password },
    });
  }

  async createOne(
    user: Pick<User, 'roleId' | 'email' | 'normalizedEmail' | 'password'>,
  ) {
    return await this.prisma.user.create({
      data: { ...user },
    });
  }

  async setRefreshToken(id: string, refreshToken: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
