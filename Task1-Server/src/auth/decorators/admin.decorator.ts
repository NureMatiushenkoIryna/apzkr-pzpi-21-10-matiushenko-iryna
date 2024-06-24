import { UserRole } from '../enums/user-role.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: UserRole[]) => SetMetadata('roles', roles);
