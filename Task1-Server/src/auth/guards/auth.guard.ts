import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGaurd } from '@nestjs/passport';
import { Public } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard extends PassportAuthGaurd('access-jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(Public, context.getHandler());

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
