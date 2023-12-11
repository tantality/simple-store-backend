import { Injectable } from '@nestjs/common';
import { User, RoleTypes } from '@prisma/client';
import { UserSessionDto } from 'domain/dto/user-session.dto';
import { RolesRepo } from 'domain/repos/roles.repo';
import { UsersRepo } from 'domain/repos/users.repo';
import { SecurityService } from 'libs/security/security.service';
import { SignUpForm } from './domain/signup.form';

@Injectable()
export class AuthService {
  constructor(
    private usersRepo: UsersRepo,
    private rolesRepo: RolesRepo,
    private securityService: SecurityService,
  ) {}

  async findUserByNormalizedEmail(email: string) {
    return await this.usersRepo.findOneByNormalizedEmail({
      normalizedEmail: email,
    });
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
    formWithNormalizedEmail: SignUpForm & Pick<User, 'normalizedEmail'>,
  ) {
    const role = await this.rolesRepo.findOneByType(RoleTypes.User);
    if (!role) {
      return;
    }

    const hashedPassword = await this.securityService.hashPassword(
      formWithNormalizedEmail.password,
    );

    const user = await this.usersRepo.createOne({
      roleId: role.id,
      email: formWithNormalizedEmail.email,
      normalizedEmail: formWithNormalizedEmail.normalizedEmail,
      password: hashedPassword,
    });

    return user;
  }

  generateTokens(payload: UserSessionDto) {
    return this.securityService.generateTokens(payload);
  }

  async setRefreshToken(userId: string, token: string) {
    return await this.usersRepo.setRefreshToken(userId, token);
  }
}
