import { Injectable } from '@nestjs/common';
import { User, RoleTypes } from '@prisma/client';
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
}
