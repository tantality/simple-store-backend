import { IsUUID } from 'class-validator';

export class UserSessionDto {
  @IsUUID()
  id: string;

  @IsUUID()
  roleId: string;

  public static fromPayload(dto: UserSessionDto): UserSessionDto {
    if (!dto) {
      return;
    }

    return {
      id: dto.id,
      roleId: dto.roleId,
    };
  }
}
