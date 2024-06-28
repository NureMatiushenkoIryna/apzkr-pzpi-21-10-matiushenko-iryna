import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import 'dotenv/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.signUp(signUpDto);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env['REFRESH_EXPIRATION_TIME']) * 1000,
    });

    return {
      accessToken,
    };
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env['REFRESH_EXPIRATION_TIME']) * 1000,
    });

    return {
      accessToken,
    };
  }

  @Post('refresh')
  async refresh(@Req() request, @Res({ passthrough: true }) response) {}
}
