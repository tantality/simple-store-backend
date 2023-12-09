import { Injectable } from '@nestjs/common';
import { UsersRepo } from 'domain/repos/users.repo';

@Injectable()
export class AuthService {
  constructor(private usersRepo: UsersRepo) {}

  async findUserByNormalizedEmail(email: string) {
    return await this.usersRepo.findOneByNormalizedEmail({
      normalizedEmail: email,
    });
  }
}
