import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

const extractJwtFromHeader = (req: Request) => {
  const refreshToken = req?.cookies.refreshToken;

  return refreshToken ?? null;
};

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromHeader]),
      ignoreExpiration: false,
      secretOrKey: process.env['REFRESH_SECRET'],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, user: payload.data };
  }
}
