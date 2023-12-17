import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'libs/prisma/prisma.service';
import { UserIdentifier } from 'types/model-identifiers.types';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: UserIdentifier) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findOneByNormalizedEmail(
    normalizedEmail: Pick<User, 'normalizedEmail'>['normalizedEmail'],
  ) {
    return await this.prisma.user.findUnique({
      where: { normalizedEmail },
    });
  }

  async findOneByNormalizedEmailAndPassword(
    normalizedEmail: Pick<User, 'normalizedEmail'>['normalizedEmail'],
    password: Pick<User, 'password'>['password'],
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

  async setRefreshToken(
    id: UserIdentifier,
    refreshToken: Pick<User, 'refreshToken'>['refreshToken'],
  ) {
    return await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }

  async deleteRefreshToken(userId: UserIdentifier) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
      },
    });
  }
}
