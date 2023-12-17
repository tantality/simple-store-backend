import { Injectable } from '@nestjs/common';
import { User, RoleTypes } from '@prisma/client';
import { UserSessionDto } from 'domain/dto/user-session.dto';
import { RolesRepo } from 'domain/repos/roles.repo';
import { UsersRepo } from 'domain/repos/users.repo';
import { SecurityService } from 'libs/security/security.service';
import { UserIdentifier } from 'types/model-identifiers.types';

@Injectable()
export class AuthService {
  constructor(
    private usersRepo: UsersRepo,
    private rolesRepo: RolesRepo,
    private securityService: SecurityService,
  ) {}

  async findUserByNormalizedEmail(
    normalizedEmail: Pick<User, 'normalizedEmail'>['normalizedEmail'],
  ) {
    return await this.usersRepo.findOneByNormalizedEmail(normalizedEmail);
  }

  async findUserByNormalizedEmailAndPassword(
    user: Pick<User, 'normalizedEmail' | 'password'>,
  ) {
    const hashedPassword = await this.securityService.hashPassword(
      user.password,
    );

    return this.usersRepo.findOneByNormalizedEmailAndPassword(
      user.normalizedEmail,
      hashedPassword,
    );
  }

  async makeNewUser(
    user: Pick<User, 'normalizedEmail' | 'email' | 'password'>,
  ) {
    const role = await this.rolesRepo.findOneByType(RoleTypes.User);
    if (!role) {
      return;
    }

    const hashedPassword = await this.securityService.hashPassword(
      user.password,
    );

    return await this.usersRepo.createOne({
      roleId: role.id,
      email: user.email,
      normalizedEmail: user.normalizedEmail,
      password: hashedPassword,
    });
  }

  generateTokens(payload: UserSessionDto) {
    return this.securityService.generateTokens(payload);
  }

  async setRefreshToken(
    userId: UserIdentifier,
    token: Pick<User, 'refreshToken'>['refreshToken'],
  ) {
    return await this.usersRepo.setRefreshToken(userId, token);
  }

  async signout(userId: UserIdentifier) {
    return await this.usersRepo.deleteRefreshToken(userId);
  }

  async refreshTokens(payload: UserSessionDto) {
    const tokens = this.securityService.generateTokens(payload);
    await this.usersRepo.setRefreshToken(payload.id, tokens.refreshToken);

    return tokens;
  }
}
