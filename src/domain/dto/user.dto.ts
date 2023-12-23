import { RoleTypes, User } from '@prisma/client';
import { UUIDDto } from './uuid.dto';

export class UserDto extends UUIDDto {
  email: string;
  roleType: RoleTypes;

  static fromEntity(entity?: User) {
    if (!entity) {
      return;
    }

    const it = new UserDto();
    it.id = entity.id;
    it.createdAt = entity.createdAt.valueOf();
    it.updatedAt = entity.updatedAt.valueOf();
    it.email = entity.email;
    it.roleType = entity.roleType;

    return it;
  }

  static fromEntities(entities?: User[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
