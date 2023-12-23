import { RoleTypes } from '@prisma/client';
import { IsIn, IsUUID } from 'class-validator';

export class UserSessionDto {
  @IsUUID()
  id: string;

  @IsIn(Object.values(RoleTypes))
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
