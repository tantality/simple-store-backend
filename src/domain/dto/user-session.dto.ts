import { RoleTypes } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class UserSessionDto {
  @IsUUID()
  id: string;

  @IsUUID()
  roleType: RoleTypes;

  public static fromPayload(dto: UserSessionDto): UserSessionDto {
    if (!dto) {
      return;
    }

    return {
      id: dto.id,
      roleType: dto.roleType,
    };
  }
}
