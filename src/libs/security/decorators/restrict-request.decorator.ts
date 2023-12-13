import { SetMetadata } from '@nestjs/common';
import { UserPermissions } from '@prisma/client';

export const USER_PERMISSIONS = 'user_permissions';

export const RestrictRequest = (...scopes: UserPermissions[]) =>
  SetMetadata(USER_PERMISSIONS, scopes);
