import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Roles } from '../decorators/admin.decorator';
import { UserRole } from '../enums/user-role.enum';
import { JwtData } from '../decorators/types/jwt-data.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesPermitted = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!rolesPermitted) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const data = request.user as JwtData;
    return rolesPermitted.includes(data.user.role);
  }
}
